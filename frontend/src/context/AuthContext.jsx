import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionToken, setSessionToken] = useState(null);

  useEffect(() => {
    // Check if user is coming back from auth
    const handleAuthRedirect = async () => {
      const hash = window.location.hash;
      if (hash.includes('session_id=')) {
        const sessionId = hash.split('session_id=')[1];
        if (sessionId) {
          await loginWithSessionId(sessionId);
          // Clear the hash from URL
          window.location.hash = '';
        }
      }
    };

    // Check for existing session
    const checkExistingSession = async () => {
      const token = localStorage.getItem('session_token');
      if (token) {
        setSessionToken(token);
        await fetchUserProfile(token);
      }
    };

    handleAuthRedirect();
    checkExistingSession();
    setLoading(false);
  }, []);

  const loginWithSessionId = async (sessionId) => {
    try {
      const response = await axios.post(`${API}/auth/login?session_id=${sessionId}`);
      const { user, session_token, expires_at } = response.data;
      
      setUser(user);
      setSessionToken(session_token);
      
      // Store session token in localStorage
      localStorage.setItem('session_token', session_token);
      localStorage.setItem('session_expires', expires_at);
      
      return { user, session_token };
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get(`${API}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      // Clear invalid session
      localStorage.removeItem('session_token');
      localStorage.removeItem('session_expires');
      setSessionToken(null);
      setUser(null);
    }
  };

  const logout = async () => {
    try {
      if (sessionToken) {
        await axios.post(`${API}/auth/logout`, {}, {
          headers: { Authorization: `Bearer ${sessionToken}` }
        });
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
      setSessionToken(null);
      localStorage.removeItem('session_token');
      localStorage.removeItem('session_expires');
    }
  };

  const isAdmin = () => {
    return user && user.role === 'admin';
  };

  const getAuthHeaders = () => {
    return sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {};
  };

  const value = {
    user,
    sessionToken,
    loading,
    isAdmin,
    getAuthHeaders,
    logout,
    loginWithSessionId
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};