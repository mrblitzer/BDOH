import httpx
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
from fastapi import HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from models import User, UserSession, UserRole
from database import Database

security = HTTPBearer()

class AuthService:
    def __init__(self, db: Database):
        self.db = db
        self.emergent_auth_url = "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data"
    
    async def authenticate_with_emergent(self, session_id: str) -> Dict[str, Any]:
        """Authenticate user with Emergent Auth service"""
        try:
            headers = {"X-Session-ID": session_id}
            async with httpx.AsyncClient() as client:
                response = await client.get(self.emergent_auth_url, headers=headers)
                response.raise_for_status()
                return response.json()
        except httpx.HTTPError as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Authentication failed: {str(e)}"
            )
    
    async def login_or_register(self, session_id: str) -> Dict[str, Any]:
        """Login or register user using Emergent Auth"""
        # Get user data from Emergent Auth
        auth_data = await self.authenticate_with_emergent(session_id)
        
        # Check if user exists
        user = await self.db.get_user_by_email(auth_data["email"])
        
        if not user:
            # Create new user
            user_data = {
                "email": auth_data["email"],
                "name": auth_data["name"],
                "picture": auth_data.get("picture"),
                "role": UserRole.ADMIN if auth_data["email"] == "mehedi.hasin@example.com" else UserRole.USER,
                "last_login": datetime.utcnow()
            }
            user = await self.db.create_user(user_data)
        else:
            # Update last login
            await self.db.users.update_one(
                {"id": user.id},
                {"$set": {"last_login": datetime.utcnow()}}
            )
        
        # Create session
        session_data = {
            "user_id": user.id,
            "session_token": auth_data["session_token"],
            "expires_at": datetime.utcnow() + timedelta(days=7)
        }
        session = await self.db.create_session(session_data)
        
        return {
            "user": user,
            "session_token": session.session_token,
            "expires_at": session.expires_at
        }
    
    async def get_current_user(self, token: str) -> Optional[User]:
        """Get current user from session token"""
        session = await self.db.get_session_by_token(token)
        if not session:
            return None
        
        user = await self.db.get_user_by_id(session.user_id)
        return user
    
    async def logout(self, token: str):
        """Logout user by deactivating session"""
        await self.db.deactivate_session(token)
    
    async def require_auth(self, credentials: HTTPAuthorizationCredentials = Depends(security)) -> User:
        """Dependency to require authentication"""
        if not credentials:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication required"
            )
        
        user = await self.get_current_user(credentials.credentials)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired token"
            )
        
        return user
    
    async def require_admin(self, user: User = Depends(require_auth)) -> User:
        """Dependency to require admin authentication"""
        if user.role != UserRole.ADMIN:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Admin access required"
            )
        return user

# Global auth service instance (will be initialized with database)
auth_service: Optional[AuthService] = None

def get_auth_service() -> AuthService:
    """Get auth service instance"""
    if auth_service is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Auth service not initialized"
        )
    return auth_service

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> User:
    """Get current authenticated user"""
    service = get_auth_service()
    return await service.require_auth(credentials)

async def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security)) -> User:
    """Get current authenticated admin user"""
    service = get_auth_service()
    return await service.require_admin(credentials)