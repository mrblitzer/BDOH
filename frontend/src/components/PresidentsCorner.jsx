import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Quote, Crown, Star, Award, BookOpen, Users, Target, Heart } from 'lucide-react';

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

  return (
    <section id="presidents-corner" className="py-20 relative overflow-hidden">
      {/* Highly Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/30 via-indigo-500/20 to-purple-600/30 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-yellow-400/20 via-orange-500/30 to-red-600/20 animate-pulse animation-delay-2000"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-16 left-16 w-24 h-24 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full opacity-40 animate-bounce animation-delay-1000"></div>
        <div className="absolute top-32 right-32 w-32 h-32 bg-gradient-to-br from-blue-300 to-purple-500 rounded-full opacity-30 animate-pulse animation-delay-3000"></div>
        <div className="absolute bottom-24 left-24 w-28 h-28 bg-gradient-to-br from-pink-300 to-red-400 rounded-full opacity-35 animate-bounce animation-delay-4000"></div>
        <div className="absolute bottom-16 right-16 w-20 h-20 bg-gradient-to-br from-indigo-300 to-purple-400 rounded-full opacity-40 animate-pulse animation-delay-5000"></div>
        
        {/* Animated Particles */}
        <div className="absolute top-20 left-1/4 w-3 h-3 bg-white rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-40 right-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-ping animation-delay-2000 opacity-70"></div>
        <div className="absolute bottom-32 left-1/3 w-4 h-4 bg-pink-300 rounded-full animate-ping animation-delay-3000 opacity-65"></div>
        <div className="absolute bottom-48 right-1/3 w-3 h-3 bg-blue-300 rounded-full animate-ping animation-delay-4000 opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Crown className="w-8 h-8 text-yellow-300 animate-pulse" />
            <h2 className="text-4xl font-bold text-white animate-fadeInUp">PRESIDENT'S CORNER</h2>
          </div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fadeInUp animation-delay-500">
            A personal message from our founder and president
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* President's Photo and Info */}
            <div className="text-center lg:text-left animate-fadeInUp animation-delay-1000">
              <div className="relative inline-block">
                <div className="w-80 h-80 rounded-full overflow-hidden shadow-2xl border-8 border-white/20 backdrop-blur-sm transform hover:scale-105 transition-transform duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
                    alt="MD. Mehedi Hasin Anjum"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Animated Elements around photo */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-80 animate-pulse flex items-center justify-center">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-70 animate-bounce flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div className="absolute top-1/2 -left-8 w-10 h-10 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-60 animate-pulse flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div className="absolute top-1/4 -right-8 w-14 h-14 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full opacity-65 animate-bounce flex items-center justify-center">
                  <Target className="w-7 h-7 text-white" />
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                <h3 className="text-3xl font-bold text-white">MD. MEHEDI HASIN ANJUM</h3>
                <p className="text-xl text-yellow-300 font-semibold">President & Founder</p>
                <p className="text-lg text-white/90">Bangladesh Olympiadians Hub</p>
                
                <div className="flex justify-center lg:justify-start space-x-4 pt-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-blue-300" />
                      <span className="text-white text-sm">Education Leader</span>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-green-300" />
                      <span className="text-white text-sm">Youth Mentor</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated Quotes Section */}
            <div className="space-y-8 animate-fadeInUp animation-delay-1500">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-white">
                    <Quote className="w-6 h-6 text-yellow-300" />
                    <span>Message from the President</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="relative">
                    <div className="absolute -left-4 -top-2 text-6xl text-yellow-300/30 font-serif">"</div>
                    <p className="text-lg text-white/90 leading-relaxed italic pl-8">
                      {quotes[currentQuote].text}
                    </p>
                    <div className="absolute -right-4 -bottom-2 text-6xl text-yellow-300/30 font-serif">"</div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-red-300" />
                      <span className="text-sm text-white/70">Category: {quotes[currentQuote].category}</span>
                    </div>
                    <div className="flex space-x-2">
                      {quotes.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentQuote ? 'bg-yellow-300 w-8' : 'bg-white/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* President's Achievements */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-white">
                    <Award className="w-6 h-6 text-yellow-300" />
                    <span>Leadership & Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-300 animate-pulse">6000+</div>
                      <div className="text-sm text-white/80">Students Impacted</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-300 animate-pulse animation-delay-1000">50+</div>
                      <div className="text-sm text-white/80">International Medals</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-300 animate-pulse animation-delay-2000">8</div>
                      <div className="text-sm text-white/80">Years Leading</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-300 animate-pulse animation-delay-3000">100%</div>
                      <div className="text-sm text-white/80">Dedication</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Call to Action */}
              <div className="text-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 animate-pulse"
                >
                  Join Our Journey to Excellence
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PresidentsCorner;