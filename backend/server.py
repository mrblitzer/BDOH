from fastapi import FastAPI, APIRouter, Depends, HTTPException, status, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List, Optional, Dict, Any
from datetime import datetime
import os
import logging
from pathlib import Path
import base64
import uuid

# Import our models and services
from models import *
from database import Database
from auth import AuthService, get_current_user, get_current_admin

# Load environment variables
ROOT_DIR = Path(__file__).parent
from dotenv import load_dotenv
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db_client = Database(mongo_url, os.environ['DB_NAME'])

# Create the main app
app = FastAPI(title="Bangladesh Olympiadians Hub API", version="1.0.0")

# Create API router
api_router = APIRouter(prefix="/api")

# Initialize auth service
auth_service = None

@app.on_event("startup")
async def startup_event():
    """Initialize database and services on startup"""
    global auth_service
    await db_client.create_indexes()
    auth_service = AuthService(db_client)
    
    # Import auth service globally
    import auth
    auth.auth_service = auth_service
    
    # Create founder info if not exists
    founder_info = await db_client.get_club_info("founder")
    if not founder_info:
        founder_data = {
            "section": "founder",
            "title": "Founded by Md.Mehedi Hasin Anjum",
            "content": "Bangladesh Olympiadians Hub was founded with a vision to empower young minds across Bangladesh to excel in academic olympiads. Our founder, Md.Mehedi Hasin Anjum, believed that with proper guidance and community support, every student can achieve excellence.",
            "order": 1,
            "created_by": "system"
        }
        await db_client.create_club_info(founder_data)
    
    logging.info("Application startup complete")

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    await db_client.close()
    client.close()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@api_router.get("/")
async def root():
    return {"message": "Bangladesh Olympiadians Hub API is running"}

# Authentication endpoints
@api_router.post("/auth/login", response_model=LoginResponse)
async def login(session_id: str):
    """Login or register user using Emergent Auth"""
    try:
        result = await auth_service.login_or_register(session_id)
        return LoginResponse(**result)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e)
        )

@api_router.post("/auth/logout")
async def logout(user: User = Depends(get_current_user)):
    """Logout current user"""
    # Note: In real implementation, we'd get the token from the request
    # For now, we'll just return success
    return {"message": "Logged out successfully"}

@api_router.get("/auth/me", response_model=User)
async def get_current_user_info(user: User = Depends(get_current_user)):
    """Get current user information"""
    return user

# Question endpoints
@api_router.post("/questions", response_model=Question)
async def create_question(question: QuestionCreate, user: User = Depends(get_current_admin)):
    """Create a new question (Admin only)"""
    question_data = question.dict()
    question_data["created_by"] = user.id
    return await db_client.create_question(question_data)

@api_router.get("/questions", response_model=List[Question])
async def get_questions(
    subject: Optional[str] = None,
    difficulty: Optional[str] = None,
    limit: int = 20,
    skip: int = 0
):
    """Get questions with optional filtering"""
    questions = await db_client.get_questions(subject, limit, skip)
    return questions

@api_router.get("/questions/{question_id}", response_model=Question)
async def get_question(question_id: str):
    """Get a specific question"""
    question = await db_client.get_question_by_id(question_id)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    return question

@api_router.put("/questions/{question_id}", response_model=Question)
async def update_question(
    question_id: str,
    question_update: QuestionCreate,
    user: User = Depends(get_current_admin)
):
    """Update a question (Admin only)"""
    update_data = question_update.dict()
    success = await db_client.update_question(question_id, update_data)
    if not success:
        raise HTTPException(status_code=404, detail="Question not found")
    
    return await db_client.get_question_by_id(question_id)

@api_router.delete("/questions/{question_id}")
async def delete_question(question_id: str, user: User = Depends(get_current_admin)):
    """Delete a question (Admin only)"""
    success = await db_client.delete_question(question_id)
    if not success:
        raise HTTPException(status_code=404, detail="Question not found")
    return {"message": "Question deleted successfully"}

# Answer submission endpoints
@api_router.post("/questions/{question_id}/answer")
async def submit_answer(
    question_id: str,
    answer: AnswerSubmission,
    user: User = Depends(get_current_user)
):
    """Submit an answer to a question"""
    # Get the question
    question = await db_client.get_question_by_id(question_id)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    
    # Check if answer is correct
    is_correct = answer.selected_answer == question.correct_answer
    
    # Save user answer
    answer_data = {
        "user_id": user.id,
        "question_id": question_id,
        "selected_answer": answer.selected_answer,
        "is_correct": is_correct,
        "time_taken": answer.time_taken,
        "competition_id": answer.competition_id
    }
    user_answer = await db_client.save_user_answer(answer_data)
    
    # Update user score
    score_delta = question.points if is_correct else 0
    await db_client.update_user_score(user.id, question.subject, score_delta, is_correct)
    
    return {
        "is_correct": is_correct,
        "correct_answer": question.correct_answer,
        "explanation": question.explanation,
        "points_earned": score_delta
    }

# User score endpoints
@api_router.get("/users/me/scores")
async def get_my_scores(user: User = Depends(get_current_user)):
    """Get current user's scores"""
    scores = await db_client.get_user_score(user.id)
    return scores

@api_router.get("/leaderboard")
async def get_leaderboard(subject: Optional[str] = None, limit: int = 10):
    """Get leaderboard"""
    leaderboard = await db_client.get_leaderboard(subject, limit)
    return leaderboard

# Panelist endpoints
@api_router.post("/panelists", response_model=Panelist)
async def create_panelist(panelist: PanelistCreate, user: User = Depends(get_current_admin)):
    """Create a new panelist (Admin only)"""
    panelist_data = panelist.dict()
    panelist_data["created_by"] = user.id
    return await db_client.create_panelist(panelist_data)

@api_router.get("/panelists", response_model=List[Panelist])
async def get_panelists():
    """Get all panelists"""
    return await db_client.get_panelists()

@api_router.put("/panelists/{panelist_id}")
async def update_panelist(
    panelist_id: str,
    panelist_update: PanelistCreate,
    user: User = Depends(get_current_admin)
):
    """Update a panelist (Admin only)"""
    update_data = panelist_update.dict()
    success = await db_client.update_panelist(panelist_id, update_data)
    if not success:
        raise HTTPException(status_code=404, detail="Panelist not found")
    return {"message": "Panelist updated successfully"}

@api_router.delete("/panelists/{panelist_id}")
async def delete_panelist(panelist_id: str, user: User = Depends(get_current_admin)):
    """Delete a panelist (Admin only)"""
    success = await db_client.delete_panelist(panelist_id)
    if not success:
        raise HTTPException(status_code=404, detail="Panelist not found")
    return {"message": "Panelist deleted successfully"}

# Admin member endpoints
@api_router.post("/admin-members", response_model=AdminMember)
async def create_admin_member(admin: AdminMemberCreate, user: User = Depends(get_current_admin)):
    """Create a new admin member (Admin only)"""
    admin_data = admin.dict()
    admin_data["created_by"] = user.id
    return await db_client.create_admin_member(admin_data)

@api_router.get("/admin-members", response_model=List[AdminMember])
async def get_admin_members():
    """Get all admin members"""
    return await db_client.get_admin_members()

# Club info endpoints
@api_router.post("/club-info", response_model=ClubInfo)
async def create_club_info(club_info: ClubInfoCreate, user: User = Depends(get_current_admin)):
    """Create club information (Admin only)"""
    club_data = club_info.dict()
    club_data["created_by"] = user.id
    return await db_client.create_club_info(club_data)

@api_router.get("/club-info", response_model=List[ClubInfo])
async def get_club_info(section: Optional[str] = None):
    """Get club information"""
    return await db_client.get_club_info(section)

@api_router.put("/club-info/{info_id}")
async def update_club_info(
    info_id: str,
    club_update: ClubInfoCreate,
    user: User = Depends(get_current_admin)
):
    """Update club information (Admin only)"""
    update_data = club_update.dict()
    update_data["updated_at"] = datetime.utcnow()
    success = await db_client.update_club_info(info_id, update_data)
    if not success:
        raise HTTPException(status_code=404, detail="Club info not found")
    return {"message": "Club info updated successfully"}

# Statistics endpoints
@api_router.get("/stats")
async def get_stats():
    """Get platform statistics"""
    return await db_client.get_stats()

# Subject hub endpoints
@api_router.get("/subjects")
async def get_subjects():
    """Get all subject hubs with statistics"""
    subjects = [
        {
            "id": "physics",
            "name": "Physics Hub",
            "description": "Master the fundamental laws of nature through problem-solving",
            "icon": "⚡",
            "whatsapp_link": "https://chat.whatsapp.com/physics-hub",
            "topics": ["Mechanics", "Thermodynamics", "Electromagnetism", "Optics", "Modern Physics"],
            "color_scheme": "from-green-400 to-emerald-600"
        },
        {
            "id": "chemistry",
            "name": "Chemistry Hub",
            "description": "Explore molecular interactions and chemical processes",
            "icon": "🧪",
            "whatsapp_link": "https://chat.whatsapp.com/chemistry-hub",
            "topics": ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Analytical Chemistry"],
            "color_scheme": "from-emerald-400 to-green-600"
        },
        {
            "id": "biology",
            "name": "Biology Hub",
            "description": "Discover the intricate world of living organisms",
            "icon": "🧬",
            "whatsapp_link": "https://chat.whatsapp.com/biology-hub",
            "topics": ["Cell Biology", "Genetics", "Evolution", "Ecology", "Molecular Biology"],
            "color_scheme": "from-green-500 to-teal-600"
        },
        {
            "id": "astronomy",
            "name": "Astronomy Hub",
            "description": "Journey through the cosmos and celestial phenomena",
            "icon": "🌌",
            "whatsapp_link": "https://chat.whatsapp.com/astronomy-hub",
            "topics": ["Stellar Physics", "Planetary Science", "Cosmology", "Observational Astronomy"],
            "color_scheme": "from-teal-400 to-green-600"
        },
        {
            "id": "mathematics",
            "name": "Mathematics Hub",
            "description": "Solve complex mathematical problems and theorems",
            "icon": "📐",
            "whatsapp_link": "https://chat.whatsapp.com/mathematics-hub",
            "topics": ["Algebra", "Geometry", "Calculus", "Number Theory", "Combinatorics"],
            "color_scheme": "from-green-600 to-emerald-700"
        },
        {
            "id": "computer",
            "name": "Computer Science Hub",
            "description": "Master algorithms and computational thinking",
            "icon": "💻",
            "whatsapp_link": "https://chat.whatsapp.com/computer-hub",
            "topics": ["Data Structures", "Algorithms", "Programming", "Graph Theory"],
            "color_scheme": "from-emerald-500 to-green-700"
        }
    ]
    
    # Add member counts and question counts from database
    for subject in subjects:
        # Get question count for this subject
        question_count = await db_client.questions.count_documents({
            "subject": subject["id"],
            "is_active": True
        })
        subject["question_count"] = question_count
        
        # Mock member count (in real app, this would come from WhatsApp API or user registration)
        member_counts = {
            "physics": 1247,
            "chemistry": 982,
            "biology": 1156,
            "astronomy": 743,
            "mathematics": 1534,
            "computer": 891
        }
        subject["member_count"] = member_counts.get(subject["id"], 500)
    
    return subjects

# Image upload helper (for base64 images)
@api_router.post("/upload-image")
async def upload_image(image_data: str, user: User = Depends(get_current_admin)):
    """Upload image as base64 (Admin only)"""
    try:
        # Validate base64 image
        if not image_data.startswith("data:image/"):
            raise HTTPException(status_code=400, detail="Invalid image format")
        
        # In a real app, you might want to store this in cloud storage
        # For now, we'll just return the base64 data
        return {"image_url": image_data}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Image upload failed: {str(e)}")

# Include the router in the main app
app.include_router(api_router)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)