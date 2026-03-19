import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { subjects, testimonials } from '../data/mockData';
import { MessageCircle, Users, ExternalLink, Star, Quote, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const Community = () => {
  const handleJoinWhatsApp = (link) => {
    window.open(link, '_blank');
  };

  const handleJoinFacebook = () => {
    window.open('https://facebook.com/bangladeshOlympiadiansHub', '_blank');
  };

  const handleJoinYouTube = () => {
    window.open('https://youtube.com/bangladeshOlympiadiansHub', '_blank');
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
    <section id="community" className="py-20 relative">
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
            <Users className="w-8 h-8 text-emerald-400" />
            <h2 className="heading-lg text-white">Join Our Community</h2>
          </div>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto font-inter">
            Connect with thousands of passionate olympiadians across Bangladesh. 
            Share knowledge, ask questions, and grow together in our vibrant communities.
          </p>
        </motion.div>

        {/* Main Community Cards - 3 Column Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* WhatsApp Card */}
          <motion.div 
            className="glass-panel border-t-2 border-t-[#25D366] shadow-[0_0_20px_rgba(37,211,102,0.3)]"
            variants={itemVariants}
          >
            <div className="p-8 space-y-6">
              <div className="flex items-center space-x-3 pb-6 border-b border-white/10">
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
                <h3 className="heading-sm text-white font-space-grotesk">WhatsApp Communities</h3>
              </div>

              <p className="text-slate-300 leading-relaxed font-inter">
                Join our active WhatsApp groups for each subject. Get instant help, 
                share problems, and connect with fellow olympiadians 24/7.
              </p>

              <div className="space-y-3">
                {subjects.slice(0, 3).map((subject) => (
                  <motion.div 
                    key={subject.id}
                    className="flex items-center justify-between p-3 glass-panel hover:bg-white/10 transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{subject.icon}</div>
                      <div>
                        <h4 className="font-semibold text-white text-sm">{subject.name}</h4>
                        <p className="text-xs text-slate-400">{subject.memberCount} members</p>
                      </div>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => handleJoinWhatsApp(subject.whatsappLink)}
                      className="bg-[#25D366] hover:bg-[#20BA5C] text-white text-xs"
                    >
                      Join
                    </Button>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10">
                <Button 
                  className="w-full bg-gradient-to-r from-[#25D366] to-[#20BA5C] hover:from-[#20BA5C] hover:to-[#1aa84f] text-white font-semibold"
                  onClick={() => handleJoinWhatsApp('https://chat.whatsapp.com/main-hub')}
                >
                  💬 Join Main Community
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Facebook Card */}
          <motion.div 
            className="glass-panel border-t-2 border-t-[#1877F2] shadow-[0_0_20px_rgba(24,119,242,0.3)]"
            variants={itemVariants}
          >
            <div className="p-8 space-y-6">
              <div className="flex items-center space-x-3 pb-6 border-b border-white/10">
                <div className="text-2xl">📘</div>
                <h3 className="heading-sm text-white font-space-grotesk">Facebook Community</h3>
              </div>

              <p className="text-slate-300 leading-relaxed font-inter">
                Follow our official Facebook page for updates, announcements, 
                success stories, and exclusive content from the olympiad world.
              </p>

              <div className="glass-panel p-6 text-center space-y-4">
                <div className="text-5xl">👥</div>
                <div>
                  <h3 className="text-3xl font-bold font-space-grotesk text-[#1877F2]">12,000+</h3>
                  <p className="text-slate-400 text-sm font-inter">Facebook Followers</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-lg font-bold font-space-grotesk text-[#1877F2]">Daily</div>
                  <div className="text-slate-400 text-xs font-inter">Updates</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold font-space-grotesk text-[#1877F2]">Live</div>
                  <div className="text-slate-400 text-xs font-inter">Sessions</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold font-space-grotesk text-[#1877F2]">Success</div>
                  <div className="text-slate-400 text-xs font-inter">Stories</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold font-space-grotesk text-[#1877F2]">Expert</div>
                  <div className="text-slate-400 text-xs font-inter">Tips</div>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-[#1877F2] to-[#0a66c2] hover:from-[#0a66c2] hover:to-[#054399] text-white font-semibold"
                onClick={handleJoinFacebook}
              >
                📘 Follow Page
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* YouTube Card */}
          <motion.div 
            className="glass-panel border-t-2 border-t-[#FF0000] shadow-[0_0_20px_rgba(255,0,0,0.3)]"
            variants={itemVariants}
          >
            <div className="p-8 space-y-6">
              <div className="flex items-center space-x-3 pb-6 border-b border-white/10">
                <div className="text-2xl">📺</div>
                <h3 className="heading-sm text-white font-space-grotesk">YouTube Channel</h3>
              </div>

              <p className="text-slate-300 leading-relaxed font-inter">
                Subscribe to our YouTube channel for masterclass videos, 
                problem walkthroughs, and expert tips from olympiad champions.
              </p>

              <div className="glass-panel p-6 space-y-4">
                <div className="relative bg-black/40 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
                  <motion.div 
                    className="w-16 h-16 bg-[#FF0000] rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </motion.div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold font-space-grotesk text-[#FF0000]">100+</h3>
                  <p className="text-slate-400 text-sm font-inter">Masterclass Videos</p>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-[#FF0000] to-[#cc0000] hover:from-[#cc0000] hover:to-[#990000] text-white font-semibold"
                onClick={handleJoinYouTube}
              >
                📺 Subscribe Now
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Testimonials */}
        <motion.div 
          className="mb-16"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="heading-md text-center text-white mb-8 font-space-grotesk">What Our Community Says</h3>
          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
          >
            {testimonials.map((testimonial) => (
              <motion.div 
                key={testimonial.id} 
                className="glass-panel p-6"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Quote className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                    <p className="text-slate-300 leading-relaxed italic font-inter">{testimonial.text}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold text-white font-space-grotesk">{testimonial.name}</h4>
                      <p className="text-sm text-slate-400 font-inter">{testimonial.role}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Community Guidelines */}
        <motion.div 
          className="glass-panel p-8 lg:p-12"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="heading-md text-center text-white mb-12 font-space-grotesk">Community Guidelines</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 glass-panel rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow-emerald">
                <span className="text-2xl">🤝</span>
              </div>
              <h4 className="font-semibold text-white mb-2 font-space-grotesk">Be Respectful</h4>
              <p className="text-sm text-slate-400 font-inter">Treat all members with kindness and respect. We're all here to learn and grow together.</p>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 glass-panel rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow-aqua">
                <span className="text-2xl">🤲</span>
              </div>
              <h4 className="font-semibold text-white mb-2 font-space-grotesk">Share Knowledge</h4>
              <p className="text-sm text-slate-400 font-inter">Help others by sharing your knowledge and solutions. Together we can achieve more.</p>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 glass-panel rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow-yellow">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="font-semibold text-white mb-2 font-space-grotesk">Stay Focused</h4>
              <p className="text-sm text-slate-400 font-inter">Keep discussions relevant to academic olympiads and maintain a productive environment.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Community;
