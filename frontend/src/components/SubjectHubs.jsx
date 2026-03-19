import React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { subjects } from '../data/mockData';
import { Users, ExternalLink, BookOpen, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const SubjectHubs = () => {
  const handleWhatsAppClick = (link) => {
    window.open(link, '_blank');
  };

  const handleStartPractice = (subjectId) => {
    console.log('Starting practice for:', subjectId);
  };

  // Subject-specific accent colors
  const subjectAccents = {
    'Physics': { border: 'border-t-amber-500', icon: 'text-amber-400', glow: 'shadow-[0_0_20px_rgba(217,119,6,0.3)]' },
    'Chemistry': { border: 'border-t-emerald-500', icon: 'text-emerald-400', glow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]' },
    'Biology': { border: 'border-t-cyan-500', icon: 'text-cyan-400', glow: 'shadow-[0_0_20px_rgba(34,211,238,0.3)]' },
    'Astronomy': { border: 'border-t-purple-500', icon: 'text-purple-400', glow: 'shadow-[0_0_20px_rgba(168,85,247,0.3)]' },
    'Mathematics': { border: 'border-t-blue-500', icon: 'text-blue-400', glow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]' },
    'Computer Science': { border: 'border-t-indigo-500', icon: 'text-indigo-400', glow: 'shadow-[0_0_20px_rgba(99,102,241,0.3)]' },
  };

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
    <section id="subjects" className="py-20 relative">
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
            <BookOpen className="w-8 h-8 text-emerald-400" />
            <h2 className="heading-lg text-white">Subject Hubs</h2>
          </div>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto font-inter">
            Dive deep into specialized communities where passionate learners and experts 
            collaborate to master academic olympiad challenges.
          </p>
        </motion.div>

        {/* Subject Cards Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {subjects.map((subject) => {
            const accent = subjectAccents[subject.name] || subjectAccents['Physics'];
            return (
              <motion.div
                key={subject.id}
                className={`glass-panel-hover border-t-2 ${accent.border} overflow-hidden group`}
                variants={itemVariants}
              >
                <div className="p-8 space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center ${accent.icon} text-2xl group-hover:scale-110 transition-transform duration-300`}>
                        {subject.icon}
                      </div>
                      <div>
                        <h3 className="heading-sm text-white">{subject.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-slate-300">
                          <Users className="w-4 h-4" />
                          <span>{subject.memberCount.toLocaleString()} members</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={`bg-white/10 border border-white/20 text-slate-200 ${accent.icon}`}>
                      Active
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 leading-relaxed font-inter">
                    {subject.description}
                  </p>

                  {/* Topics */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-200 text-sm font-space-grotesk">Key Topics:</h4>
                    <div className="flex flex-wrap gap-2">
                      {subject.topics.map((topic, topicIndex) => (
                        <Badge 
                          key={topicIndex}
                          className="bg-white/5 text-slate-300 border border-white/10 text-xs hover:bg-white/10 transition-colors duration-200"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <Button 
                      onClick={() => handleWhatsAppClick(subject.whatsappLink)}
                      className={`flex-1 bg-gradient-to-r from-emerald-500 to-teal-400 text-white hover:shadow-glow-emerald transition-all duration-200 group`}
                    >
                      <span className="mr-2">💬</span>
                      Join WhatsApp
                      <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                    <Button 
                      onClick={() => handleStartPractice(subject.id)}
                      className="flex-1 btn-ghost-glass"
                    >
                      <Zap className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                      Practice
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Community Stats */}
        <motion.div 
          className="glass-panel p-8 lg:p-12"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-3">
              <div className="text-4xl font-bold font-space-grotesk text-gradient-emerald-aqua">6+</div>
              <div className="text-slate-300 font-inter">Active Hubs</div>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-bold font-space-grotesk text-gradient-emerald-aqua">6,753</div>
              <div className="text-slate-300 font-inter">Total Members</div>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-bold font-space-grotesk text-gradient-emerald-aqua">24/7</div>
              <div className="text-slate-300 font-inter">Community Support</div>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-bold font-space-grotesk text-gradient-emerald-aqua">100+</div>
              <div className="text-slate-300 font-inter">Daily Discussions</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SubjectHubs;
