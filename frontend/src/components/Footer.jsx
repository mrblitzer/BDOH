import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Mail, Phone, MapPin, Facebook, MessageCircle, ExternalLink, Trophy, Users, BookOpen } from 'lucide-react';

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
      default:
        break;
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Bangladesh Olympiadians Hub</h3>
                <p className="text-sm text-gray-400">Excellence in Academic Olympiads</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Empowering young minds across Bangladesh to excel in academic olympiads through 
              comprehensive training, practice problems, and vibrant community support.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Users className="w-4 h-4" />
                <span>6,753+ Active Members</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <BookOpen className="w-4 h-4" />
                <span>2,847+ Practice Problems</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Trophy className="w-4 h-4" />
                <span>45+ Competitions Held</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
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
                  className="block text-gray-300 hover:text-green-400 transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Subject Hubs */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Subject Hubs</h4>
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
                  <span className="text-gray-300 hover:text-green-400 cursor-pointer transition-colors duration-200">
                    {hub.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Get Connected</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-400" />
                <a 
                  href="mailto:info@bangladeshOlympiadiansHub.org"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                >
                  info@bdOlympiadHub.org
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-400" />
                <a 
                  href="tel:+8801700000000"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                >
                  +880 1700 000 000
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">Dhaka, Bangladesh</span>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="font-semibold text-white">Join Our Communities</h5>
              <div className="space-y-2">
                <Button 
                  onClick={() => handleContactClick('whatsapp')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white justify-start"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Communities
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </Button>
                <Button 
                  onClick={() => handleContactClick('facebook')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-start"
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook Page
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 pt-8 border-t border-gray-700">
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 border-0">
            <CardContent className="p-8">
              <div className="text-center text-white space-y-4">
                <h3 className="text-2xl font-bold">Stay Updated!</h3>
                <p className="text-lg opacity-90">
                  Get the latest olympiad news, competition updates, and exclusive content
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <Button className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3">
                    Subscribe
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © 2025 Bangladesh Olympiadians Hub. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors duration-200">
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