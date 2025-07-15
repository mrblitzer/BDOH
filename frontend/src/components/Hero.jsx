import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowRight, Sparkles, Users, Trophy, BookOpen, Zap, Star } from 'lucide-react';
import { stats } from '../data/mockData';

const Hero = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({
    totalMembers: 0,
    totalProblems: 0,
    completedCompetitions: 0,
    successRate: 0
  });

  const statItems = [
    { key: 'totalMembers', label: 'Active Members', icon: <Users className="w-5 h-5" />, color: 'text-green-600' },
    { key: 'totalProblems', label: 'Practice Problems', icon: <BookOpen className="w-5 h-5" />, color: 'text-emerald-600' },
    { key: 'completedCompetitions', label: 'Competitions Held', icon: <Trophy className="w-5 h-5" />, color: 'text-teal-600' },
    { key: 'successRate', label: 'Success Rate', icon: <Zap className="w-5 h-5" />, color: 'text-green-700', suffix: '%' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat(prev => (prev + 1) % statItems.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animateStats = () => {
      Object.keys(stats).forEach(key => {
        const target = stats[key];
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setAnimatedStats(prev => ({
            ...prev,
            [key]: Math.floor(current)
          }));
        }, 50);
      });
    };

    animateStats();
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Highly Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600">
        {/* Animated Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-tr from-green-300/30 via-emerald-400/20 to-teal-500/30 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-yellow-300/20 via-green-400/30 to-blue-500/20 animate-pulse animation-delay-2000"></div>
        
        {/* Floating Animated Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-40 animate-bounce animation-delay-1000"></div>
        <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-30 animate-pulse animation-delay-3000"></div>
        <div className="absolute bottom-20 left-20 w-36 h-36 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-35 animate-bounce animation-delay-4000"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full opacity-40 animate-pulse animation-delay-5000"></div>
        
        {/* Animated Geometric Shapes */}
        <div className="absolute top-32 left-1/4 w-16 h-16 bg-gradient-to-br from-green-300 to-emerald-500 transform rotate-45 animate-spin-slow opacity-50"></div>
        <div className="absolute top-64 right-1/3 w-20 h-20 bg-gradient-to-br from-yellow-300 to-orange-500 transform rotate-12 animate-bounce opacity-40"></div>
        <div className="absolute bottom-32 left-1/3 w-24 h-24 bg-gradient-to-br from-blue-300 to-teal-500 transform rotate-45 animate-pulse opacity-45"></div>
        
        {/* Animated Particle Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-16 left-16 w-2 h-2 bg-white rounded-full animate-ping opacity-60"></div>
          <div className="absolute top-32 right-32 w-3 h-3 bg-yellow-300 rounded-full animate-ping animation-delay-2000 opacity-70"></div>
          <div className="absolute bottom-48 left-48 w-2 h-2 bg-pink-300 rounded-full animate-ping animation-delay-3000 opacity-65"></div>
          <div className="absolute bottom-24 right-24 w-3 h-3 bg-blue-300 rounded-full animate-ping animation-delay-4000 opacity-60"></div>
        </div>
        
        {/* Animated Wave Effects */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-green-600/40 to-transparent animate-pulse"></div>
        <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-b from-emerald-500/30 to-transparent animate-pulse animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-white animate-fadeInUp">
                <Sparkles className="w-6 h-6 animate-pulse" />
                <span className="text-lg font-semibold">Welcome to Excellence</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight animate-fadeInUp animation-delay-500">
                Master
                <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent animate-pulse"> Academic </span>
                Olympiads
              </h1>
              
              <p className="text-xl text-white/90 leading-relaxed animate-fadeInUp animation-delay-1000">
                Join Bangladesh's premier platform for academic olympiad preparation. Practice problems, 
                compete with peers, and connect with expert mentors in our vibrant WhatsApp communities.
              </p>
              
              {/* Founder Section */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 animate-fadeInUp animation-delay-1500">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Founded by</h3>
                    <p className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                      MD. MEHEDI HASIN ANJUM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp animation-delay-2000">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 animate-pulse group"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
              >
                Explore Subjects
              </Button>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8 animate-fadeInUp animation-delay-2500">
              {statItems.map((item, index) => (
                <Card 
                  key={item.key}
                  className={`p-4 bg-white/20 backdrop-blur-md border-white/30 shadow-2xl transition-all duration-500 transform hover:scale-105 hover:bg-white/30 ${
                    currentStat === index ? 'ring-2 ring-yellow-400 shadow-3xl animate-pulse' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`${item.color} opacity-80 animate-pulse`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white animate-pulse">
                        {animatedStats[item.key]}{item.suffix || ''}
                      </p>
                      <p className="text-sm text-white/80">{item.label}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Content - Interactive Animation */}
          <div className="relative animate-fadeInUp animation-delay-1000">
            <div className="relative w-full h-96 lg:h-[500px]">
              {/* Main Illustration with enhanced animations */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700 animate-pulse"></div>
              <div className="absolute inset-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce">
                    <Trophy className="w-12 h-12 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900">Excellence Awaits</h3>
                    <p className="text-gray-600">Join thousands of successful olympiadians</p>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-green-600 font-bold text-2xl">⚡</span>
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center animate-pulse animation-delay-1000">
                      <span className="text-emerald-600 font-bold text-2xl">🧪</span>
                    </div>
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center animate-pulse animation-delay-2000">
                      <span className="text-teal-600 font-bold text-2xl">🧬</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-80 animate-ping"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute top-1/2 -left-8 w-16 h-16 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-70 animate-bounce"></div>
            <div className="absolute top-1/4 -right-8 w-18 h-18 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full opacity-60 animate-pulse animation-delay-3000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;