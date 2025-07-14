import React, { useState } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, Users, Trophy, BookOpen, Zap } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home', icon: <Zap className="w-4 h-4" /> },
    { name: 'Subject Hubs', href: '#subjects', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Practice Arena', href: '#practice', icon: <Trophy className="w-4 h-4" /> },
    { name: 'Competitions', href: '#competitions', icon: <Trophy className="w-4 h-4" /> },
    { name: 'Community', href: '#community', icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-100 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">🏆</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                Bangladesh Olympiadians Hub
              </h1>
              <p className="text-xs text-gray-600">Excellence in Academic Olympiads</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors duration-200 group"
              >
                <span className="group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </span>
                <span className="font-medium">{item.name}</span>
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
            >
              Join Community
            </Button>
            <Button 
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Start Practice
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-white">
              <div className="flex flex-col space-y-6 mt-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 text-gray-700 hover:text-green-600 transition-colors duration-200 p-3 rounded-lg hover:bg-green-50"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    <span className="font-medium text-lg">{item.name}</span>
                  </a>
                ))}
                <div className="flex flex-col space-y-3 pt-6 border-t border-gray-200">
                  <Button 
                    variant="outline" 
                    className="border-green-200 text-green-700 hover:bg-green-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Join Community
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Start Practice
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;