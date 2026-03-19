import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Sparkles, Users, Trophy, BookOpen, Zap, Star, Flame, Beaker, Dna } from 'lucide-react';
import { motion } from 'framer-motion';
import { stats } from '../data/mockData';

const Hero = () => {
  const [animatedStats, setAnimatedStats] = useState({
    totalMembers: 0,
    totalProblems: 0,
    completedCompetitions: 0,
    successRate: 0
  });

  const statItems = [
    { key: 'totalMembers', label: 'Active Members', icon: <Users className="w-5 h-5" />, color: 'text-emerald-400' },
    { key: 'totalProblems', label: 'Practice Problems', icon: <BookOpen className="w-5 h-5" />, color: 'text-cyan-400' },
    { key: 'completedCompetitions', label: 'Competitions Held', icon: <Trophy className="w-5 h-5" />, color: 'text-yellow-400' },
    { key: 'successRate', label: 'Success Rate', icon: <Zap className="w-5 h-5" />, color: 'text-emerald-400', suffix: '%' }
  ];

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section id="home" className="relative min-h-screen pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left Column - Content */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <div className="space-y-6">
              {/* Subtitle */}
              <motion.div 
                className="flex items-center space-x-3"
                variants={itemVariants}
              >
                <Sparkles className="w-5 h-5 text-cyan-400 animate-glow" />
                <span className="text-slate-300 font-inter">✨ Welcome to Excellence.</span>
              </motion.div>
              
              {/* Headline */}
              <motion.h1 
                className="heading-xl leading-tight"
                variants={itemVariants}
              >
                Master <span className="text-gradient-emerald-aqua">Academic Olympiads</span>
              </motion.h1>
              
              {/* Description */}
              <motion.p 
                className="text-lg text-slate-300 leading-relaxed font-inter"
                variants={itemVariants}
              >
                Join Bangladesh's premier platform for academic olympiad preparation. Practice problems, 
                compete with peers, and connect with expert mentors in our vibrant communities.
              </motion.p>
              
              {/* Founder Card */}
              <motion.div 
                className="glass-panel p-6 flex items-center space-x-4"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-400 flex items-center justify-center flex-shrink-0 shadow-glow-emerald">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-300">Founded by</p>
                  <p className="text-lg font-bold text-gradient-emerald-cyan">
                    MD. MEHEDI HASIN ANJUM
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Button 
                size="lg" 
                className="btn-emerald-glow group"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
              <Button 
                size="lg"
                className="btn-ghost-glass"
              >
                Explore Subjects
              </Button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4"
              variants={containerVariants}
            >
              {statItems.map((item) => (
                <motion.div
                  key={item.key}
                  className="glass-panel-hover p-4"
                  variants={itemVariants}
                >
                  <div className="flex flex-col space-y-2">
                    <div className={`${item.color}`}>
                      {item.icon}
                    </div>
                    <p className="text-2xl font-bold font-space-grotesk text-white">
                      {animatedStats[item.key]}{item.suffix || ''}
                    </p>
                    <p className="text-xs text-slate-400">{item.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - 3D Showcase */}
          <motion.div 
            className="relative h-96 lg:h-[500px]"
            variants={itemVariants}
          >
            {/* Glass Panel Container */}
            <motion.div 
              className="glass-panel h-full flex flex-col items-center justify-center space-y-8 p-8"
              whileHover={{ scale: 1.02 }}
            >
              {/* 3D Trophy Placeholder with Float Animation */}
              <motion.div
                className="w-32 h-32 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-400/20 flex items-center justify-center shadow-glow-emerald"
                animate={{ y: [-20, 20, -20] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Trophy className="w-16 h-16 text-emerald-400" />
              </motion.div>

              {/* Text */}
              <div className="text-center space-y-2">
                <p className="text-xl font-space-grotesk font-bold text-white">Excellence Awaits</p>
                <p className="text-sm text-slate-300">Join thousands of successful olympiadians</p>
              </div>

              {/* Icon Pills */}
              <div className="flex justify-center space-x-4">
                <motion.div 
                  className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                >
                  <Flame className="w-6 h-6 text-yellow-400" />
                </motion.div>
                <motion.div 
                  className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                >
                  <Beaker className="w-6 h-6 text-emerald-400" />
                </motion.div>
                <motion.div 
                  className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                >
                  <Dna className="w-6 h-6 text-cyan-400" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
