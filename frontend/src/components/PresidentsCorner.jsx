import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Quote, Crown, Star, Award, BookOpen, Users, Target, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const PresidentsCorner = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  const quotes = [
    {
      text: "Every great achievement begins with a dream and the courage to pursue it. At BDOH, we don't just teach olympiad problems - we nurture dreams and build the future leaders of Bangladesh.",
      category: "Vision"
    },
    {
      text: "Success in olympiads is not just about winning medals; it's about developing a mindset that embraces challenges, values learning, and never gives up in the face of adversity.",
      category: "Philosophy"
    },
    {
      text: "I believe that every student has the potential to excel. Our role is to provide the right guidance, create the right environment, and inspire them to reach beyond their limits.",
      category: "Belief"
    },
    {
      text: "The journey of a thousand miles begins with a single step. Your olympiad journey starts here, with us, and we'll be with you every step of the way to excellence.",
      category: "Motivation"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
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
    <section id="presidents-corner" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Crown className="w-8 h-8 text-emerald-400 animate-glow" />
            <h2 className="heading-lg text-white">PRESIDENT'S CORNER</h2>
          </div>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto font-inter">
            A personal message from our founder and president
          </p>
        </motion.div>

        <motion.div 
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* President's Photo and Info */}
            <motion.div 
              className="text-center lg:text-left"
              variants={itemVariants}
            >
              <div className="relative inline-block lg:w-full">
                {/* Gradient Ring */}
                <motion.div 
                  className="w-80 h-80 mx-auto lg:mx-0 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-400 p-1 shadow-glow-emerald"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-space-navy">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
                      alt="MD. Mehedi Hasin Anjum"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
                
                {/* Floating Elements */}
                <motion.div 
                  className="absolute -top-4 -right-4 w-16 h-16 glass-panel flex items-center justify-center shadow-glow-emerald"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Crown className="w-8 h-8 text-emerald-400" />
                </motion.div>
                <motion.div 
                  className="absolute -bottom-4 -left-4 w-12 h-12 glass-panel flex items-center justify-center shadow-glow-aqua"
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <Star className="w-6 h-6 text-cyan-400" />
                </motion.div>
              </div>
              
              <motion.div 
                className="mt-8 space-y-4"
                variants={itemVariants}
              >
                <h3 className="heading-md text-white font-space-grotesk">MD. MEHEDI HASIN ANJUM</h3>
                <p className="text-xl text-gradient-emerald-cyan font-space-grotesk">President & Founder</p>
                <p className="text-lg text-slate-300 font-inter">Bangladesh Olympiadians Hub</p>
                
                <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-4 pt-4">
                  <div className="glass-panel p-4 flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-emerald-400" />
                    <span className="text-slate-200 text-sm font-inter">Education Leader</span>
                  </div>
                  <div className="glass-panel p-4 flex items-center space-x-3">
                    <Users className="w-5 h-5 text-cyan-400" />
                    <span className="text-slate-200 text-sm font-inter">Youth Mentor</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Message and Achievements Section */}
            <motion.div 
              className="space-y-8"
              variants={containerVariants}
            >
              {/* Message Card */}
              <motion.div 
                className="glass-panel p-8"
                variants={itemVariants}
              >
                <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-white/10">
                  <Quote className="w-6 h-6 text-emerald-400" />
                  <h4 className="heading-sm text-white font-space-grotesk">Message from the President</h4>
                </div>
                
                <motion.div 
                  className="relative"
                  key={currentQuote}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute -left-2 -top-2 text-4xl text-emerald-400/20 font-serif">"</div>
                  <p className="text-base text-slate-300 leading-relaxed italic pl-6 font-inter">
                    {quotes[currentQuote].text}
                  </p>
                  <div className="absolute -right-2 -bottom-2 text-4xl text-emerald-400/20 font-serif">"</div>
                </motion.div>
                
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/10">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-slate-400 font-inter">Category: {quotes[currentQuote].category}</span>
                  </div>
                  <div className="flex space-x-2">
                    {quotes.map((_, index) => (
                      <motion.div
                        key={index}
                        className={`rounded-full transition-all duration-300 ${
                          index === currentQuote ? 'bg-emerald-400 w-8 h-2' : 'bg-white/20 w-2 h-2'
                        }`}
                        whileHover={{ scale: 1.2 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Achievements Card */}
              <motion.div 
                className="glass-panel p-8"
                variants={itemVariants}
              >
                <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-white/10">
                  <Award className="w-6 h-6 text-yellow-400" />
                  <h4 className="heading-sm text-white font-space-grotesk">Leadership & Achievements</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-3xl font-bold font-space-grotesk text-gradient-emerald-aqua">6000+</div>
                    <div className="text-sm text-slate-400 font-inter mt-2">Students Impacted</div>
                  </motion.div>
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-3xl font-bold font-space-grotesk text-gradient-emerald-aqua">50+</div>
                    <div className="text-sm text-slate-400 font-inter mt-2">International Medals</div>
                  </motion.div>
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-3xl font-bold font-space-grotesk text-gradient-emerald-aqua">8</div>
                    <div className="text-sm text-slate-400 font-inter mt-2">Years Leading</div>
                  </motion.div>
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-3xl font-bold font-space-grotesk text-gradient-emerald-aqua">100%</div>
                    <div className="text-sm text-slate-400 font-inter mt-2">Dedication</div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Call to Action */}
              <motion.div 
                variants={itemVariants}
              >
                <Button 
                  size="lg"
                  className="w-full btn-emerald-glow"
                >
                  Join Our Journey to Excellence
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PresidentsCorner;
