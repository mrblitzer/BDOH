import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowRight, Sparkles, Users, Trophy, BookOpen, Zap } from 'lucide-react';
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
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-green-600">
                <Sparkles className="w-6 h-6 animate-pulse" />
                <span className="text-lg font-semibold">Welcome to Excellence</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Master
                <span className="bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent"> Academic </span>
                Olympiads
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Join Bangladesh's premier platform for academic olympiad preparation. Practice problems, 
                compete with peers, and connect with expert mentors in our vibrant WhatsApp communities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 transition-all duration-300"
              >
                Explore Subjects
              </Button>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
              {statItems.map((item, index) => (
                <Card 
                  key={item.key}
                  className={`p-4 bg-white/50 backdrop-blur-sm border-0 shadow-lg transition-all duration-500 transform hover:scale-105 ${
                    currentStat === index ? 'ring-2 ring-green-400 shadow-xl' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`${item.color} opacity-80`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {animatedStats[item.key]}{item.suffix || ''}
                      </p>
                      <p className="text-sm text-gray-600">{item.label}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Content - Interactive Animation */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px]">
              {/* Main Illustration */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700"></div>
              <div className="absolute inset-4 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
                    <Trophy className="w-12 h-12 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900">Excellence Awaits</h3>
                    <p className="text-gray-600">Join thousands of successful olympiadians</p>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-green-600 font-bold">⚡</span>
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center animate-pulse animation-delay-1000">
                      <span className="text-emerald-600 font-bold">🧪</span>
                    </div>
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center animate-pulse animation-delay-2000">
                      <span className="text-teal-600 font-bold">🧬</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-green-400 rounded-full opacity-60 animate-ping"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-emerald-400 rounded-full opacity-40 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;