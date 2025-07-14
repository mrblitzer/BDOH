import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { subjects, testimonials } from '../data/mockData';
import { MessageCircle, Users, ExternalLink, Star, Quote } from 'lucide-react';

const Community = () => {
  const handleJoinWhatsApp = (link) => {
    window.open(link, '_blank');
  };

  const handleJoinFacebook = () => {
    window.open('https://facebook.com/bangladeshOlympiadiansHub', '_blank');
  };

  return (
    <section id="community" className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Users className="w-8 h-8 text-green-600" />
            <h2 className="text-4xl font-bold text-gray-900">Join Our Community</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with thousands of passionate olympiadians across Bangladesh. 
            Share knowledge, ask questions, and grow together in our vibrant communities.
          </p>
        </div>

        {/* Main Community Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* WhatsApp Communities */}
          <Card className="shadow-xl bg-white/90 backdrop-blur-sm border-0">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-6 h-6" />
                <CardTitle className="text-xl">WhatsApp Communities</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Join our active WhatsApp groups for each subject. Get instant help, 
                  share problems, and connect with fellow olympiadians 24/7.
                </p>
                
                <div className="space-y-3">
                  {subjects.slice(0, 4).map((subject) => (
                    <div 
                      key={subject.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{subject.icon}</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{subject.name}</h4>
                          <p className="text-sm text-gray-600">{subject.memberCount} members</p>
                        </div>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => handleJoinWhatsApp(subject.whatsappLink)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Join
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <Button 
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                    onClick={() => handleJoinWhatsApp('https://chat.whatsapp.com/main-hub')}
                  >
                    💬 Join Main WhatsApp Community
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Facebook Page */}
          <Card className="shadow-xl bg-white/90 backdrop-blur-sm border-0">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">📘</div>
                <CardTitle className="text-xl">Facebook Community</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Follow our official Facebook page for updates, announcements, 
                  success stories, and exclusive content from the olympiad world.
                </p>
                
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
                  <div className="text-center space-y-4">
                    <div className="text-6xl">👥</div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">12,000+</h3>
                      <p className="text-gray-600">Facebook Followers</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">Daily</div>
                    <div className="text-gray-600">Updates</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">Live</div>
                    <div className="text-gray-600">Sessions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">Success</div>
                    <div className="text-gray-600">Stories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">Expert</div>
                    <div className="text-gray-600">Tips</div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                  onClick={handleJoinFacebook}
                >
                  📘 Follow Our Facebook Page
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">What Our Community Says</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="shadow-lg bg-white/90 backdrop-blur-sm border-0">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-1">
                      <Quote className="w-5 h-5 text-green-500 mt-1" />
                      <p className="text-gray-700 leading-relaxed italic">{testimonial.text}</p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                      <div className="ml-auto flex items-center space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Community Guidelines</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Be Respectful</h4>
              <p className="text-sm text-gray-600">Treat all members with kindness and respect. We're all here to learn and grow together.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤲</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Share Knowledge</h4>
              <p className="text-sm text-gray-600">Help others by sharing your knowledge and solutions. Together we can achieve more.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Stay Focused</h4>
              <p className="text-sm text-gray-600">Keep discussions relevant to academic olympiads and maintain a productive environment.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;