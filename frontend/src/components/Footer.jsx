import React from 'react';
import { Button } from './ui/button';
import { Mail, Phone, MapPin, Facebook, MessageCircle, ExternalLink, Trophy, Users, BookOpen, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const handleContactClick = (type) => {
    switch(type) {
      case 'email':
        window.location.href = 'mailto:info@bangladeshOlympiadiansHub.org';
        break;
      case 'phone':
        window.location.href = 'tel:+8801700000000';
        break;
      case 'whatsapp':
        window.open('https://wa.me/8801700000000', '_blank');
        break;
      case 'facebook':
        window.open('https://facebook.com/bangladeshOlympiadiansHub', '_blank');
        break;
      case 'youtube':
        window.open('https://youtube.com/bangladeshOlympiadiansHub', '_blank');
        break;
      default:
        break;
    }
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
    <footer className="bg-space-navy border-t border-white/10">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <motion.div 
            className="space-y-6"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-400 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-space-grotesk text-gradient-emerald-aqua">BDOH</h3>
                <p className="text-xs text-slate-400 font-inter">Excellence in Olympiads</p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed font-inter text-sm">
              Empowering young minds across Bangladesh to excel in academic olympiads through 
              comprehensive training, practice problems, and vibrant community support.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-slate-400 font-inter">
                <Users className="w-4 h-4" />
                <span>6,753+ Active Members</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-400 font-inter">
                <BookOpen className="w-4 h-4" />
                <span>2,847+ Practice Problems</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-400 font-inter">
                <Trophy className="w-4 h-4" />
                <span>45+ Competitions Held</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="space-y-6"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-white font-space-grotesk">Quick Links</h4>
            <div className="space-y-3">
              {[
                { name: 'Subject Hubs', href: '#subjects' },
                { name: 'Practice Arena', href: '#practice' },
                { name: 'Competitions', href: '#competitions' },
                { name: 'Community', href: '#community' },
                { name: 'Success Stories', href: '#achievements' }
              ].map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="block text-slate-300 hover:text-emerald-400 transition-colors duration-200 font-inter text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Subject Hubs */}
          <motion.div 
            className="space-y-6"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-white font-space-grotesk">Subject Hubs</h4>
            <div className="space-y-3">
              {[
                { name: 'Physics Hub', icon: '⚡' },
                { name: 'Chemistry Hub', icon: '🧪' },
                { name: 'Biology Hub', icon: '🧬' },
                { name: 'Mathematics Hub', icon: '📐' },
                { name: 'Astronomy Hub', icon: '🌌' },
                { name: 'Computer Science Hub', icon: '💻' }
              ].map((hub) => (
                <div key={hub.name} className="flex items-center space-x-2">
                  <span className="text-lg">{hub.icon}</span>
                  <span className="text-slate-300 hover:text-emerald-400 cursor-pointer transition-colors duration-200 font-inter text-sm">
                    {hub.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact & Social */}
          <motion.div 
            className="space-y-6"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-white font-space-grotesk">Get Connected</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-400" />
                <a 
                  href="mailto:info@bangladeshOlympiadiansHub.org"
                  className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 font-inter text-sm"
                >
                  info@bdOlympiadHub.org
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-cyan-400" />
                <a 
                  href="tel:+8801700000000"
                  className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 font-inter text-sm"
                >
                  +880 1700 000 000
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <span className="text-slate-300 font-inter text-sm">Dhaka, Bangladesh</span>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="font-semibold text-white text-sm font-space-grotesk">Join Our Communities</h5>
              <div className="space-y-2">
                <Button 
                  onClick={() => handleContactClick('whatsapp')}
                  className="w-full bg-[#25D366] hover:bg-[#20BA5C] text-white justify-start text-xs"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </Button>
                <Button 
                  onClick={() => handleContactClick('facebook')}
                  className="w-full bg-[#1877F2] hover:bg-[#0a66c2] text-white justify-start text-xs"
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </Button>
                <Button 
                  onClick={() => handleContactClick('youtube')}
                  className="w-full bg-[#FF0000] hover:bg-[#cc0000] text-white justify-start text-xs"
                >
                  <Youtube className="w-4 h-4 mr-2" />
                  YouTube
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div 
          className="mt-16 pt-8 border-t border-white/10"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="glass-panel p-8">
            <div className="text-center text-white space-y-4">
              <h3 className="heading-md font-space-grotesk">Stay Updated!</h3>
              <p className="text-base text-slate-300 font-inter">
                Get the latest olympiad news, competition updates, and exclusive content
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-inter"
                />
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-400 text-white hover:shadow-glow-emerald px-6 py-3 font-semibold">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-space-navy/50 border-t border-white/10 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-slate-400 text-sm font-inter">
              © 2025 Bangladesh Olympiadians Hub. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors duration-200 font-inter">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors duration-200 font-inter">
                Terms of Service
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors duration-200 font-inter">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
