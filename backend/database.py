from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import IndexModel, ASCENDING, DESCENDING
from datetime import datetime
import os
from typing import Optional, Dict, Any, List
from models import User, Question, Competition, Panelist, AdminMember, ClubInfo, UserAnswer, UserScore, UserSession

class Database:
    def __init__(self, mongo_url: str, db_name: str):
        self.client = AsyncIOMotorClient(mongo_url)
        self.db = self.client[db_name]
        
        # Collection references
        self.users = self.db.users
        self.sessions = self.db.sessions
        self.questions = self.db.questions
        self.competitions = self.db.competitions
        self.panelists = self.db.panelists
        self.admin_members = self.db.admin_members
        self.club_info = self.db.club_info
        self.user_answers = self.db.user_answers
        self.user_scores = self.db.user_scores
        self.achievements = self.db.achievements
    
    async def create_indexes(self):
        """Create database indexes for better performance"""
        try:
            # Users indexes
            await self.users.create_index([("email", ASCENDING)], unique=True)
            await self.users.create_index([("role", ASCENDING)])
            await self.users.create_index([("created_at", DESCENDING)])
            
            # Sessions indexes
            await self.sessions.create_index([("session_token", ASCENDING)], unique=True)
            await self.sessions.create_index([("user_id", ASCENDING)])
            await self.sessions.create_index([("expires_at", ASCENDING)])
            
            # Questions indexes
            await self.questions.create_index([("subject", ASCENDING)])
            await self.questions.create_index([("difficulty", ASCENDING)])
            await self.questions.create_index([("created_by", ASCENDING)])
            await self.questions.create_index([("is_active", ASCENDING)])
            await self.questions.create_index([("tags", ASCENDING)])
            
            # Competitions indexes
            await self.competitions.create_index([("status", ASCENDING)])
            await self.competitions.create_index([("subject", ASCENDING)])
            await self.competitions.create_index([("start_date", ASCENDING)])
            await self.competitions.create_index([("created_by", ASCENDING)])
            
            # User answers indexes
            await self.user_answers.create_index([("user_id", ASCENDING)])
            await self.user_answers.create_index([("question_id", ASCENDING)])
            await self.user_answers.create_index([("competition_id", ASCENDING)])
            await self.user_answers.create_index([("created_at", DESCENDING)])
            
            # User scores indexes
            await self.user_scores.create_index([("user_id", ASCENDING), ("subject", ASCENDING)], unique=True)
            await self.user_scores.create_index([("total_score", DESCENDING)])
            
            # Club info indexes
            await self.club_info.create_index([("section", ASCENDING)])
            await self.club_info.create_index([("order", ASCENDING)])
            
            print("Database indexes created successfully")
        except Exception as e:
            print(f"Error creating indexes: {e}")
    
    async def get_user_by_email(self, email: str) -> Optional[User]:
        """Get user by email"""
        user_doc = await self.users.find_one({"email": email})
        return User(**user_doc) if user_doc else None
    
    async def get_user_by_id(self, user_id: str) -> Optional[User]:
        """Get user by ID"""
        user_doc = await self.users.find_one({"id": user_id})
        return User(**user_doc) if user_doc else None
    
    async def create_user(self, user_data: Dict[str, Any]) -> User:
        """Create a new user"""
        user = User(**user_data)
        await self.users.insert_one(user.dict())
        return user
    
    async def create_session(self, session_data: Dict[str, Any]) -> UserSession:
        """Create a new user session"""
        session = UserSession(**session_data)
        await self.sessions.insert_one(session.dict())
        return session
    
    async def get_session_by_token(self, session_token: str) -> Optional[UserSession]:
        """Get session by token"""
        session_doc = await self.sessions.find_one({
            "session_token": session_token,
            "is_active": True,
            "expires_at": {"$gt": datetime.utcnow()}
        })
        return UserSession(**session_doc) if session_doc else None
    
    async def deactivate_session(self, session_token: str):
        """Deactivate a session"""
        await self.sessions.update_one(
            {"session_token": session_token},
            {"$set": {"is_active": False}}
        )
    
    async def create_question(self, question_data: Dict[str, Any]) -> Question:
        """Create a new question"""
        question = Question(**question_data)
        await self.questions.insert_one(question.dict())
        return question
    
    async def get_questions(self, subject: Optional[str] = None, limit: int = 20, skip: int = 0) -> List[Question]:
        """Get questions with optional filtering"""
        filter_query = {"is_active": True}
        if subject:
            filter_query["subject"] = subject
        
        cursor = self.questions.find(filter_query).skip(skip).limit(limit)
        questions = []
        async for doc in cursor:
            questions.append(Question(**doc))
        return questions
    
    async def get_question_by_id(self, question_id: str) -> Optional[Question]:
        """Get question by ID"""
        question_doc = await self.questions.find_one({"id": question_id, "is_active": True})
        return Question(**question_doc) if question_doc else None
    
    async def update_question(self, question_id: str, update_data: Dict[str, Any]) -> bool:
        """Update a question"""
        result = await self.questions.update_one(
            {"id": question_id},
            {"$set": update_data}
        )
        return result.modified_count > 0
    
    async def delete_question(self, question_id: str) -> bool:
        """Soft delete a question"""
        result = await self.questions.update_one(
            {"id": question_id},
            {"$set": {"is_active": False}}
        )
        return result.modified_count > 0
    
    async def create_panelist(self, panelist_data: Dict[str, Any]) -> Panelist:
        """Create a new panelist"""
        panelist = Panelist(**panelist_data)
        await self.panelists.insert_one(panelist.dict())
        return panelist
    
    async def get_panelists(self) -> List[Panelist]:
        """Get all active panelists"""
        cursor = self.panelists.find({"is_active": True})
        panelists = []
        async for doc in cursor:
            panelists.append(Panelist(**doc))
        return panelists
    
    async def update_panelist(self, panelist_id: str, update_data: Dict[str, Any]) -> bool:
        """Update a panelist"""
        result = await self.panelists.update_one(
            {"id": panelist_id},
            {"$set": update_data}
        )
        return result.modified_count > 0
    
    async def delete_panelist(self, panelist_id: str) -> bool:
        """Soft delete a panelist"""
        result = await self.panelists.update_one(
            {"id": panelist_id},
            {"$set": {"is_active": False}}
        )
        return result.modified_count > 0
    
    async def create_admin_member(self, admin_data: Dict[str, Any]) -> AdminMember:
        """Create a new admin member"""
        admin = AdminMember(**admin_data)
        await self.admin_members.insert_one(admin.dict())
        return admin
    
    async def get_admin_members(self) -> List[AdminMember]:
        """Get all active admin members"""
        cursor = self.admin_members.find({"is_active": True})
        admins = []
        async for doc in cursor:
            admins.append(AdminMember(**doc))
        return admins
    
    async def create_club_info(self, club_data: Dict[str, Any]) -> ClubInfo:
        """Create club information"""
        club_info = ClubInfo(**club_data)
        await self.club_info.insert_one(club_info.dict())
        return club_info
    
    async def get_club_info(self, section: Optional[str] = None) -> List[ClubInfo]:
        """Get club information by section"""
        filter_query = {"is_active": True}
        if section:
            filter_query["section"] = section
        
        cursor = self.club_info.find(filter_query).sort("order", ASCENDING)
        club_infos = []
        async for doc in cursor:
            club_infos.append(ClubInfo(**doc))
        return club_infos
    
    async def update_club_info(self, info_id: str, update_data: Dict[str, Any]) -> bool:
        """Update club information"""
        result = await self.club_info.update_one(
            {"id": info_id},
            {"$set": update_data}
        )
        return result.modified_count > 0
    
    async def save_user_answer(self, answer_data: Dict[str, Any]) -> UserAnswer:
        """Save user answer"""
        answer = UserAnswer(**answer_data)
        await self.user_answers.insert_one(answer.dict())
        return answer
    
    async def get_user_answers(self, user_id: str, question_id: Optional[str] = None) -> List[UserAnswer]:
        """Get user answers"""
        filter_query = {"user_id": user_id}
        if question_id:
            filter_query["question_id"] = question_id
        
        cursor = self.user_answers.find(filter_query).sort("created_at", DESCENDING)
        answers = []
        async for doc in cursor:
            answers.append(UserAnswer(**doc))
        return answers
    
    async def update_user_score(self, user_id: str, subject: str, score_delta: int, correct: bool):
        """Update user score"""
        await self.user_scores.update_one(
            {"user_id": user_id, "subject": subject},
            {
                "$inc": {
                    "total_score": score_delta,
                    "questions_answered": 1,
                    "correct_answers": 1 if correct else 0
                },
                "$set": {"updated_at": datetime.utcnow()}
            },
            upsert=True
        )
    
    async def get_user_score(self, user_id: str, subject: Optional[str] = None) -> List[UserScore]:
        """Get user scores"""
        filter_query = {"user_id": user_id}
        if subject:
            filter_query["subject"] = subject
        
        cursor = self.user_scores.find(filter_query)
        scores = []
        async for doc in cursor:
            scores.append(UserScore(**doc))
        return scores
    
    async def get_leaderboard(self, subject: Optional[str] = None, limit: int = 10) -> List[Dict[str, Any]]:
        """Get leaderboard"""
        pipeline = [
            {"$match": {"subject": subject} if subject else {}},
            {
                "$lookup": {
                    "from": "users",
                    "localField": "user_id",
                    "foreignField": "id",
                    "as": "user"
                }
            },
            {"$unwind": "$user"},
            {
                "$project": {
                    "user_id": 1,
                    "user_name": "$user.name",
                    "total_score": 1,
                    "questions_answered": 1,
                    "correct_answers": 1
                }
            },
            {"$sort": {"total_score": -1}},
            {"$limit": limit}
        ]
        
        cursor = self.user_scores.aggregate(pipeline)
        leaderboard = []
        async for doc in cursor:
            leaderboard.append(doc)
        return leaderboard
    
    async def get_stats(self) -> Dict[str, Any]:
        """Get platform statistics"""
        total_users = await self.users.count_documents({"is_active": True})
        total_questions = await self.questions.count_documents({"is_active": True})
        total_competitions = await self.competitions.count_documents({"is_active": True})
        
        return {
            "total_users": total_users,
            "total_questions": total_questions,
            "total_competitions": total_competitions,
            "active_users": total_users  # Simplified for now
        }
    
    async def close(self):
        """Close database connection"""
        self.client.close()