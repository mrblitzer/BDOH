from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    ADMIN = "admin"
    USER = "user"
    PANELIST = "panelist"

class DifficultyLevel(str, Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"

class QuestionType(str, Enum):
    MULTIPLE_CHOICE = "multiple_choice"
    TRUE_FALSE = "true_false"
    SHORT_ANSWER = "short_answer"

class CompetitionStatus(str, Enum):
    UPCOMING = "upcoming"
    LIVE = "live"
    COMPLETED = "completed"

# Base User Model
class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    name: str
    picture: Optional[str] = None
    role: UserRole = UserRole.USER
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_login: Optional[datetime] = None
    is_active: bool = True

class UserSession(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    session_token: str
    expires_at: datetime
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True

# Question Models
class Question(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    subject: str
    title: str
    question_text: str
    question_image: Optional[str] = None  # Base64 encoded image
    question_type: QuestionType = QuestionType.MULTIPLE_CHOICE
    options: List[str] = []
    correct_answer: int  # Index of correct option
    explanation: str
    difficulty: DifficultyLevel = DifficultyLevel.MEDIUM
    points: int = 10
    created_by: str  # User ID of creator
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True
    tags: List[str] = []

class QuestionCreate(BaseModel):
    subject: str
    title: str
    question_text: str
    question_image: Optional[str] = None
    question_type: QuestionType = QuestionType.MULTIPLE_CHOICE
    options: List[str] = []
    correct_answer: int
    explanation: str
    difficulty: DifficultyLevel = DifficultyLevel.MEDIUM
    points: int = 10
    tags: List[str] = []

# Competition Models
class Competition(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    subject: str
    duration_minutes: int
    total_questions: int
    start_date: datetime
    end_date: datetime
    status: CompetitionStatus = CompetitionStatus.UPCOMING
    participants: List[str] = []  # User IDs
    questions: List[str] = []  # Question IDs
    prizes: str
    created_by: str  # User ID
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True

class CompetitionCreate(BaseModel):
    title: str
    description: str
    subject: str
    duration_minutes: int
    start_date: datetime
    end_date: datetime
    questions: List[str] = []
    prizes: str

# Panelist Models
class Panelist(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    title: str
    subject_expertise: List[str] = []
    bio: str
    image: Optional[str] = None  # Base64 encoded image
    social_links: Dict[str, str] = {}
    achievements: List[str] = []
    created_by: str  # User ID
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True

class PanelistCreate(BaseModel):
    name: str
    title: str
    subject_expertise: List[str] = []
    bio: str
    image: Optional[str] = None
    social_links: Dict[str, str] = {}
    achievements: List[str] = []

# Administration Models
class AdminMember(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    position: str
    department: str
    bio: str
    image: Optional[str] = None
    contact_info: Dict[str, str] = {}
    responsibilities: List[str] = []
    created_by: str  # User ID
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True

class AdminMemberCreate(BaseModel):
    name: str
    position: str
    department: str
    bio: str
    image: Optional[str] = None
    contact_info: Dict[str, str] = {}
    responsibilities: List[str] = []

# Club Information Models
class ClubInfo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    section: str  # "about", "founder_quotes", "mission", etc.
    title: str
    content: str
    image: Optional[str] = None
    order: int = 0
    created_by: str  # User ID
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True

class ClubInfoCreate(BaseModel):
    section: str
    title: str
    content: str
    image: Optional[str] = None
    order: int = 0

# User Answer Models
class UserAnswer(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    question_id: str
    selected_answer: int
    is_correct: bool
    time_taken: int  # in seconds
    competition_id: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class UserScore(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    subject: str
    total_score: int = 0
    questions_answered: int = 0
    correct_answers: int = 0
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Response Models
class LoginResponse(BaseModel):
    user: User
    session_token: str
    expires_at: datetime

class QuestionResponse(BaseModel):
    question: Question
    user_answer: Optional[UserAnswer] = None

class CompetitionLeaderboard(BaseModel):
    user_id: str
    user_name: str
    score: int
    time_taken: int
    rank: int

class StatsResponse(BaseModel):
    total_users: int
    total_questions: int
    total_competitions: int
    active_users: int
    recent_activities: List[Dict[str, Any]]

# API Request Models
class AnswerSubmission(BaseModel):
    question_id: str
    selected_answer: int
    time_taken: int
    competition_id: Optional[str] = None

class BulkQuestionUpload(BaseModel):
    questions: List[QuestionCreate]

class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    picture: Optional[str] = None

# Subject Hub Models
class SubjectHub(BaseModel):
    id: str
    name: str
    description: str
    icon: str
    member_count: int
    question_count: int
    whatsapp_link: str
    topics: List[str] = []
    color_scheme: str
    is_active: bool = True

# Achievement Models
class Achievement(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    title: str
    description: str
    type: str  # "competition", "practice", "streak", etc.
    icon: str
    date_earned: datetime = Field(default_factory=datetime.utcnow)
    is_public: bool = True