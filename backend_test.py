#!/usr/bin/env python3
"""
Bangladesh Olympiadians Hub Backend API Test Suite
Tests all backend endpoints for functionality, authentication, and error handling.
"""

import asyncio
import httpx
import json
import os
import sys
from datetime import datetime
from typing import Dict, Any, Optional

# Load environment variables
sys.path.append('/app/frontend')
from dotenv import load_dotenv
load_dotenv('/app/frontend/.env')

# Get backend URL from environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'http://localhost:8001')
API_BASE = f"{BACKEND_URL}/api"

class BackendTester:
    def __init__(self):
        self.client = httpx.AsyncClient(timeout=30.0)
        self.admin_token = None
        self.user_token = None
        self.test_results = []
        
    async def log_test(self, test_name: str, success: bool, message: str, details: Optional[Dict] = None):
        """Log test result"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "timestamp": datetime.now().isoformat(),
            "details": details or {}
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name} - {message}")
        if details and not success:
            print(f"   Details: {details}")
    
    async def test_health_check(self):
        """Test basic API health check"""
        try:
            response = await self.client.get(f"{API_BASE}/")
            if response.status_code == 200:
                data = response.json()
                await self.log_test(
                    "Health Check", 
                    True, 
                    f"API is running: {data.get('message', 'OK')}"
                )
                return True
            else:
                await self.log_test(
                    "Health Check", 
                    False, 
                    f"Unexpected status code: {response.status_code}",
                    {"response": response.text}
                )
                return False
        except Exception as e:
            await self.log_test(
                "Health Check", 
                False, 
                f"Connection failed: {str(e)}"
            )
            return False
    
    async def test_subjects_endpoint(self):
        """Test subjects hub endpoint"""
        try:
            response = await self.client.get(f"{API_BASE}/subjects")
            if response.status_code == 200:
                subjects = response.json()
                if isinstance(subjects, list) and len(subjects) > 0:
                    # Check if subjects have required fields
                    required_fields = ['id', 'name', 'description', 'icon', 'member_count', 'question_count']
                    first_subject = subjects[0]
                    missing_fields = [field for field in required_fields if field not in first_subject]
                    
                    if not missing_fields:
                        await self.log_test(
                            "Subjects Endpoint", 
                            True, 
                            f"Retrieved {len(subjects)} subjects successfully",
                            {"subjects": [s['name'] for s in subjects]}
                        )
                        return True
                    else:
                        await self.log_test(
                            "Subjects Endpoint", 
                            False, 
                            f"Missing required fields: {missing_fields}",
                            {"first_subject": first_subject}
                        )
                        return False
                else:
                    await self.log_test(
                        "Subjects Endpoint", 
                        False, 
                        "No subjects returned or invalid format",
                        {"response": subjects}
                    )
                    return False
            else:
                await self.log_test(
                    "Subjects Endpoint", 
                    False, 
                    f"HTTP {response.status_code}",
                    {"response": response.text}
                )
                return False
        except Exception as e:
            await self.log_test(
                "Subjects Endpoint", 
                False, 
                f"Request failed: {str(e)}"
            )
            return False
    
    async def test_questions_get_unauthenticated(self):
        """Test getting questions without authentication"""
        try:
            response = await self.client.get(f"{API_BASE}/questions")
            if response.status_code == 200:
                questions = response.json()
                await self.log_test(
                    "Questions GET (Unauthenticated)", 
                    True, 
                    f"Retrieved {len(questions)} questions without auth"
                )
                return True
            else:
                await self.log_test(
                    "Questions GET (Unauthenticated)", 
                    False, 
                    f"HTTP {response.status_code}",
                    {"response": response.text}
                )
                return False
        except Exception as e:
            await self.log_test(
                "Questions GET (Unauthenticated)", 
                False, 
                f"Request failed: {str(e)}"
            )
            return False
    
    async def test_questions_post_unauthenticated(self):
        """Test creating question without authentication (should fail)"""
        try:
            question_data = {
                "subject": "physics",
                "title": "Test Question",
                "question_text": "What is the speed of light?",
                "question_type": "multiple_choice",
                "options": ["299,792,458 m/s", "300,000,000 m/s", "299,000,000 m/s", "301,000,000 m/s"],
                "correct_answer": 0,
                "explanation": "The speed of light in vacuum is exactly 299,792,458 m/s",
                "difficulty": "medium",
                "points": 10,
                "tags": ["physics", "constants"]
            }
            
            response = await self.client.post(f"{API_BASE}/questions", json=question_data)
            if response.status_code == 401 or response.status_code == 403:
                await self.log_test(
                    "Questions POST (Unauthenticated)", 
                    True, 
                    "Correctly rejected unauthenticated request"
                )
                return True
            else:
                await self.log_test(
                    "Questions POST (Unauthenticated)", 
                    False, 
                    f"Should have returned 401/403, got {response.status_code}",
                    {"response": response.text}
                )
                return False
        except Exception as e:
            await self.log_test(
                "Questions POST (Unauthenticated)", 
                False, 
                f"Request failed: {str(e)}"
            )
            return False
    
    async def test_panelists_get(self):
        """Test getting panelists"""
        try:
            response = await self.client.get(f"{API_BASE}/panelists")
            if response.status_code == 200:
                panelists = response.json()
                await self.log_test(
                    "Panelists GET", 
                    True, 
                    f"Retrieved {len(panelists)} panelists"
                )
                return True
            else:
                await self.log_test(
                    "Panelists GET", 
                    False, 
                    f"HTTP {response.status_code}",
                    {"response": response.text}
                )
                return False
        except Exception as e:
            await self.log_test(
                "Panelists GET", 
                False, 
                f"Request failed: {str(e)}"
            )
            return False
    
    async def test_panelists_post_unauthenticated(self):
        """Test creating panelist without authentication (should fail)"""
        try:
            panelist_data = {
                "name": "Dr. Ahmed Rahman",
                "title": "Physics Professor",
                "subject_expertise": ["physics", "astronomy"],
                "bio": "Expert in theoretical physics with 15 years of experience",
                "achievements": ["PhD in Physics", "Published 50+ research papers"]
            }
            
            response = await self.client.post(f"{API_BASE}/panelists", json=panelist_data)
            if response.status_code == 401 or response.status_code == 403:
                await self.log_test(
                    "Panelists POST (Unauthenticated)", 
                    True, 
                    "Correctly rejected unauthenticated request"
                )
                return True
            else:
                await self.log_test(
                    "Panelists POST (Unauthenticated)", 
                    False, 
                    f"Should have returned 401/403, got {response.status_code}",
                    {"response": response.text}
                )
                return False
        except Exception as e:
            await self.log_test(
                "Panelists POST (Unauthenticated)", 
                False, 
                f"Request failed: {str(e)}"
            )
            return False
    
    async def test_admin_members_get(self):
        """Test getting admin members"""
        try:
            response = await self.client.get(f"{API_BASE}/admin-members")
            if response.status_code == 200:
                admins = response.json()
                await self.log_test(
                    "Admin Members GET", 
                    True, 
                    f"Retrieved {len(admins)} admin members"
                )
                return True
            else:
                await self.log_test(
                    "Admin Members GET", 
                    False, 
                    f"HTTP {response.status_code}",
                    {"response": response.text}
                )
                return False
        except Exception as e:
            await self.log_test(
                "Admin Members GET", 
                False, 
                f"Request failed: {str(e)}"
            )
            return False
    
    async def test_club_info_get(self):
        """Test getting club information"""
        try:
            response = await self.client.get(f"{API_BASE}/club-info")
            if response.status_code == 200:
                club_info = response.json()
                await self.log_test(
                    "Club Info GET", 
                    True, 
                    f"Retrieved {len(club_info)} club info entries"
                )
                
                # Check if founder info exists
                founder_info = [info for info in club_info if info.get('section') == 'founder']
                if founder_info:
                    founder = founder_info[0]
                    if "Md.Mehedi Hasin Anjum" in founder.get('title', ''):
                        await self.log_test(
                            "Founder Info Check", 
                            True, 
                            "Founder information correctly set"
                        )
                    else:
                        await self.log_test(
                            "Founder Info Check", 
                            False, 
                            "Founder information incorrect",
                            {"founder_title": founder.get('title')}
                        )
                else:
                    await self.log_test(
                        "Founder Info Check", 
                        False, 
                        "Founder information not found"
                    )
                
                return True
            else:
                await self.log_test(
                    "Club Info GET", 
                    False, 
                    f"HTTP {response.status_code}",
                    {"response": response.text}
                )
                return False
        except Exception as e:
            await self.log_test(
                "Club Info GET", 
                False, 
                f"Request failed: {str(e)}"
            )
            return False
    
    async def test_stats_endpoint(self):
        """Test platform statistics endpoint"""
        try:
            response = await self.client.get(f"{API_BASE}/stats")
            if response.status_code == 200:
                stats = response.json()
                required_fields = ['total_users', 'total_questions', 'total_competitions']
                missing_fields = [field for field in required_fields if field not in stats]
                
                if not missing_fields:
                    await self.log_test(
                        "Stats Endpoint", 
                        True, 
                        "Statistics retrieved successfully",
                        {"stats": stats}
                    )
                    return True
                else:
                    await self.log_test(
                        "Stats Endpoint", 
                        False, 
                        f"Missing required fields: {missing_fields}",
                        {"stats": stats}
                    )
                    return False
            else:
                await self.log_test(
                    "Stats Endpoint", 
                    False, 
                    f"HTTP {response.status_code}",
                    {"response": response.text}
                )
                return False
        except Exception as e:
            await self.log_test(
                "Stats Endpoint", 
                False, 
                f"Request failed: {str(e)}"
            )
            return False
    
    async def test_leaderboard_endpoint(self):
        """Test leaderboard endpoint"""
        try:
            response = await self.client.get(f"{API_BASE}/leaderboard")
            if response.status_code == 200:
                leaderboard = response.json()
                await self.log_test(
                    "Leaderboard Endpoint", 
                    True, 
                    f"Retrieved leaderboard with {len(leaderboard)} entries"
                )
                return True
            else:
                await self.log_test(
                    "Leaderboard Endpoint", 
                    False, 
                    f"HTTP {response.status_code}",
                    {"response": response.text}
                )
                return False
        except Exception as e:
            await self.log_test(
                "Leaderboard Endpoint", 
                False, 
                f"Request failed: {str(e)}"
            )
            return False
    
    async def test_auth_endpoints_unauthenticated(self):
        """Test authentication endpoints without valid session"""
        try:
            # Test /auth/me without token
            response = await self.client.get(f"{API_BASE}/auth/me")
            if response.status_code == 401 or response.status_code == 403:
                await self.log_test(
                    "Auth Me (Unauthenticated)", 
                    True, 
                    "Correctly rejected unauthenticated request"
                )
            else:
                await self.log_test(
                    "Auth Me (Unauthenticated)", 
                    False, 
                    f"Should have returned 401/403, got {response.status_code}",
                    {"response": response.text}
                )
            
            # Test /auth/login with invalid session
            response = await self.client.post(f"{API_BASE}/auth/login?session_id=invalid_session")
            if response.status_code == 401:
                await self.log_test(
                    "Auth Login (Invalid Session)", 
                    True, 
                    "Correctly rejected invalid session"
                )
            else:
                await self.log_test(
                    "Auth Login (Invalid Session)", 
                    False, 
                    f"Should have returned 401, got {response.status_code}",
                    {"response": response.text}
                )
            
            return True
        except Exception as e:
            await self.log_test(
                "Auth Endpoints (Unauthenticated)", 
                False, 
                f"Request failed: {str(e)}"
            )
            return False
    
    async def test_error_handling(self):
        """Test various error scenarios"""
        try:
            # Test non-existent question
            response = await self.client.get(f"{API_BASE}/questions/non-existent-id")
            if response.status_code == 404:
                await self.log_test(
                    "Error Handling - Non-existent Question", 
                    True, 
                    "Correctly returned 404 for non-existent question"
                )
            else:
                await self.log_test(
                    "Error Handling - Non-existent Question", 
                    False, 
                    f"Should have returned 404, got {response.status_code}"
                )
            
            # Test invalid question data
            invalid_question = {
                "subject": "invalid_subject",
                "title": "",  # Empty title
                "question_text": "",  # Empty question
                "correct_answer": -1  # Invalid answer index
            }
            
            response = await self.client.post(f"{API_BASE}/questions", json=invalid_question)
            if response.status_code in [400, 401, 403, 422]:
                await self.log_test(
                    "Error Handling - Invalid Question Data", 
                    True, 
                    f"Correctly rejected invalid data with status {response.status_code}"
                )
            else:
                await self.log_test(
                    "Error Handling - Invalid Question Data", 
                    False, 
                    f"Should have returned 400/401/403/422, got {response.status_code}"
                )
            
            return True
        except Exception as e:
            await self.log_test(
                "Error Handling", 
                False, 
                f"Request failed: {str(e)}"
            )
            return False
    
    async def test_cors_headers(self):
        """Test CORS headers are present"""
        try:
            response = await self.client.options(f"{API_BASE}/")
            cors_headers = [
                'access-control-allow-origin',
                'access-control-allow-methods',
                'access-control-allow-headers'
            ]
            
            present_headers = []
            for header in cors_headers:
                if header in response.headers:
                    present_headers.append(header)
            
            if len(present_headers) >= 1:  # At least some CORS headers present
                await self.log_test(
                    "CORS Headers", 
                    True, 
                    f"CORS headers present: {present_headers}"
                )
                return True
            else:
                await self.log_test(
                    "CORS Headers", 
                    False, 
                    "No CORS headers found",
                    {"response_headers": dict(response.headers)}
                )
                return False
        except Exception as e:
            await self.log_test(
                "CORS Headers", 
                False, 
                f"Request failed: {str(e)}"
            )
            return False
    
    async def run_all_tests(self):
        """Run all backend tests"""
        print(f"🚀 Starting Bangladesh Olympiadians Hub Backend API Tests")
        print(f"📍 Testing API at: {API_BASE}")
        print("=" * 80)
        
        # Core functionality tests
        await self.test_health_check()
        await self.test_subjects_endpoint()
        await self.test_questions_get_unauthenticated()
        await self.test_questions_post_unauthenticated()
        await self.test_panelists_get()
        await self.test_panelists_post_unauthenticated()
        await self.test_admin_members_get()
        await self.test_club_info_get()
        await self.test_stats_endpoint()
        await self.test_leaderboard_endpoint()
        
        # Authentication and security tests
        await self.test_auth_endpoints_unauthenticated()
        
        # Error handling tests
        await self.test_error_handling()
        
        # Infrastructure tests
        await self.test_cors_headers()
        
        # Summary
        print("=" * 80)
        total_tests = len(self.test_results)
        passed_tests = len([r for r in self.test_results if r['success']])
        failed_tests = total_tests - passed_tests
        
        print(f"📊 TEST SUMMARY:")
        print(f"   Total Tests: {total_tests}")
        print(f"   ✅ Passed: {passed_tests}")
        print(f"   ❌ Failed: {failed_tests}")
        print(f"   Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print(f"\n❌ FAILED TESTS:")
            for result in self.test_results:
                if not result['success']:
                    print(f"   • {result['test']}: {result['message']}")
        
        return passed_tests, failed_tests, self.test_results
    
    async def close(self):
        """Close the HTTP client"""
        await self.client.aclose()

async def main():
    """Main test runner"""
    tester = BackendTester()
    try:
        passed, failed, results = await tester.run_all_tests()
        
        # Save detailed results to file
        with open('/app/backend_test_results.json', 'w') as f:
            json.dump({
                'summary': {
                    'total_tests': len(results),
                    'passed': passed,
                    'failed': failed,
                    'success_rate': (passed/len(results))*100 if results else 0
                },
                'results': results,
                'timestamp': datetime.now().isoformat(),
                'api_base': API_BASE
            }, f, indent=2)
        
        print(f"\n📄 Detailed results saved to: /app/backend_test_results.json")
        
        # Return appropriate exit code
        return 0 if failed == 0 else 1
        
    except Exception as e:
        print(f"❌ Test runner failed: {str(e)}")
        return 1
    finally:
        await tester.close()

if __name__ == "__main__":
    exit_code = asyncio.run(main())
    sys.exit(exit_code)