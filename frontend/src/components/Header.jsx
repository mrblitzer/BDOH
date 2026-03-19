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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0E17]/70 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">🏆</span>
            </div>
            <div>
              <h1 className="text-xl font-bold font-space-grotesk text-gradient-emerald-aqua">
                Bangladesh Olympiadians Hub
              </h1>
              <p className="text-xs text-slate-300">Excellence in Academic Olympiads</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-white hover:text-cyan-400 transition-colors duration-200 group font-medium"
              >
                <span className="group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              className="btn-ghost-glass"
            >
              Join Community
            </Button>
            <Button 
              className="btn-emerald-glow"
            >
              Start Practice
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden text-white" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-space-navy border-l border-white/10">
              <div className="flex flex-col space-y-6 mt-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 text-white hover:text-cyan-400 transition-colors duration-200 p-3 rounded-lg hover:bg-white/5 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    <span className="text-lg">{item.name}</span>
                  </a>
                ))}
                <div className="flex flex-col space-x-3 pt-6 border-t border-white/10">
                  <Button 
                    className="btn-ghost-glass w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Join Community
                  </Button>
                  <Button 
                    className="btn-emerald-glow w-full mt-3"
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
