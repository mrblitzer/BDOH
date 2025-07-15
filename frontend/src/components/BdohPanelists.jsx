import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Users, Award, BookOpen, Star, Linkedin, Twitter, Mail } from 'lucide-react';

const BdohPanelists = () => {
  const [panelists, setPanelists] = useState([
    {
      id: 1,
      name: "Dr. Rashida Khatun",
      title: "Chief Physics Panelist",
      expertise: ["Quantum Mechanics", "Astrophysics", "Olympiad Training"],
      bio: "PhD in Theoretical Physics from University of Dhaka. 15+ years of experience in olympiad training with 200+ students achieving international recognition.",
      achievements: ["Published 85+ research papers", "Trained 50+ International Olympiad medalists", "Former IMO jury member"],
      image: "https://images.unsplash.com/photo-1494790108755-2616c9e20f39?w=400&h=400&fit=crop&crop=face",
      social: {
        email: "rashida.khatun@bdoh.org",
        linkedin: "https://linkedin.com/in/rashida-khatun"
      }
    },
    {
      id: 2,
      name: "Prof. Aminul Islam",
      title: "Senior Chemistry Panelist",
      expertise: ["Organic Chemistry", "Chemical Olympiad", "Research Methodology"],
      bio: "Professor of Chemistry at Bangladesh University of Engineering and Technology. Leading expert in chemistry olympiad preparation.",
      achievements: ["40+ International publications", "Mentored 30+ Chemistry Olympiad winners", "UNESCO Science Education Award"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      social: {
        email: "aminul.islam@bdoh.org",
        twitter: "https://twitter.com/aminul_chem"
      }
    },
    {
      id: 3,
      name: "Dr. Fatema Begum",
      title: "Biology Olympiad Specialist",
      expertise: ["Molecular Biology", "Genetics", "Biotechnology"],
      bio: "Research Scientist and Biology Olympiad trainer with expertise in molecular biology and genetics. Passionate about nurturing young scientific minds.",
      achievements: ["Biotechnology Innovation Award", "Trained 25+ Biology Olympiad medalists", "Published 60+ research papers"],
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&crop=face",
      social: {
        email: "fatema.begum@bdoh.org",
        linkedin: "https://linkedin.com/in/fatema-begum"
      }
    },
    {
      id: 4,
      name: "Dr. Kamal Uddin",
      title: "Mathematics Olympiad Expert",
      expertise: ["Number Theory", "Combinatorics", "Problem Solving"],
      bio: "Former International Mathematical Olympiad contestant turned trainer. Specializes in advanced problem-solving techniques and mathematical reasoning.",
      achievements: ["IMO Bronze Medal", "Trained 40+ Math Olympiad winners", "Author of 10+ mathematical textbooks"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      social: {
        email: "kamal.uddin@bdoh.org",
        twitter: "https://twitter.com/kamal_math"
      }
    },
    {
      id: 5,
      name: "Dr. Nasir Ahmed",
      title: "Computer Science Panelist",
      expertise: ["Algorithms", "Data Structures", "Competitive Programming"],
      bio: "Software Engineer turned educator with deep expertise in algorithmic problem solving and competitive programming.",
      achievements: ["ACM ICPC World Finalist", "Google Code Jam Winner", "Mentored 35+ programming champions"],
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
      social: {
        email: "nasir.ahmed@bdoh.org",
        linkedin: "https://linkedin.com/in/nasir-ahmed-cs"
      }
    },
    {
      id: 6,
      name: "Dr. Salma Akter",
      title: "Astronomy & Physics Panelist",
      expertise: ["Astrophysics", "Stellar Evolution", "Observational Astronomy"],
      bio: "Astrophysicist and astronomy educator dedicated to inspiring the next generation of space scientists through olympiad training.",
      achievements: ["NASA Research Collaborator", "Discovered 3 minor planets", "Trained 20+ Astronomy Olympiad medalists"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      social: {
        email: "salma.akter@bdoh.org",
        twitter: "https://twitter.com/salma_astro"
      }
    }
  ]);

  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section id="panelists" className="py-20 relative overflow-hidden">
      {/* Highly Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-300 via-emerald-400 to-teal-500">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/30 via-purple-400/20 to-pink-500/30 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-yellow-300/20 via-orange-400/30 to-red-500/20 animate-pulse animation-delay-2000"></div>
        
        {/* Floating animated elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-30 animate-bounce animation-delay-1000"></div>
        <div className="absolute top-20 right-20 w-28 h-28 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-25 animate-pulse animation-delay-3000"></div>
        <div className="absolute bottom-20 left-20 w-36 h-36 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-20 animate-bounce animation-delay-4000"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full opacity-35 animate-pulse animation-delay-5000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Users className="w-8 h-8 text-white animate-pulse" />
            <h2 className="text-4xl font-bold text-white animate-fadeInUp">BDOH PANELISTS</h2>
          </div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fadeInUp animation-delay-500">
            Meet our distinguished panel of experts who guide and mentor students toward olympiad excellence. 
            Each panelist brings decades of experience and proven success in their respective fields.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {panelists.map((panelist, index) => (
            <Card 
              key={panelist.id}
              className={`bg-white/90 backdrop-blur-md border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:bg-white/95 group animate-fadeInUp`}
              style={{animationDelay: `${index * 200}ms`}}
              onMouseEnter={() => setHoveredCard(panelist.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src={panelist.image} 
                      alt={panelist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                  {panelist.name}
                </CardTitle>
                <p className="text-sm font-semibold text-green-600 group-hover:text-green-700">
                  {panelist.title}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {panelist.expertise.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex}
                      variant="outline"
                      className="text-xs bg-green-50 border-green-200 text-green-700 hover:bg-green-100 transition-colors duration-200"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed">
                  {panelist.bio}
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 text-sm flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    Key Achievements
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {panelist.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex space-x-2 pt-4 border-t border-gray-200">
                  {panelist.social.email && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 hover:bg-green-50 hover:border-green-300 group"
                    >
                      <Mail className="w-4 h-4 mr-1 group-hover:text-green-600" />
                      Contact
                    </Button>
                  )}
                  {panelist.social.linkedin && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="hover:bg-blue-50 hover:border-blue-300 group"
                    >
                      <Linkedin className="w-4 h-4 group-hover:text-blue-600" />
                    </Button>
                  )}
                  {panelist.social.twitter && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="hover:bg-blue-50 hover:border-blue-300 group"
                    >
                      <Twitter className="w-4 h-4 group-hover:text-blue-600" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="mt-16 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Our Panelists' Impact</h3>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-yellow-300 animate-pulse">200+</div>
              <div className="text-white/90">Students Trained</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-green-300 animate-pulse animation-delay-1000">150+</div>
              <div className="text-white/90">International Medals</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-300 animate-pulse animation-delay-2000">300+</div>
              <div className="text-white/90">Research Papers</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-300 animate-pulse animation-delay-3000">25+</div>
              <div className="text-white/90">Years Combined Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BdohPanelists;