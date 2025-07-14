import React from 'react';
import { Button } from '../ui/button';
import { LogIn } from 'lucide-react';

const LoginButton = ({ className = "", size = "default" }) => {
  const handleLogin = () => {
    // Get current URL for redirect
    const currentUrl = window.location.href;
    
    // Redirect to Emergent Auth with current URL as redirect parameter
    const authUrl = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(currentUrl)}`;
    window.location.href = authUrl;
  };

  return (
    <Button 
      onClick={handleLogin}
      className={`${className} bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200`}
      size={size}
    >
      <LogIn className="w-4 h-4 mr-2" />
      Login with Google
    </Button>
  );
};

export default LoginButton;