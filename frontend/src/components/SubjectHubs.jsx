import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { subjects } from '../data/mockData';
import { Users, ExternalLink, BookOpen, Zap } from 'lucide-react';

const SubjectHubs = () => {
  const handleWhatsAppClick = (link) => {
    window.open(link, '_blank');
  };

  const handleStartPractice = (subjectId) => {
    // Navigate to practice section for specific subject
    console.log('Starting practice for:', subjectId);
  };

  return (
    <section id="subjects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <BookOpen className="w-8 h-8 text-green-600" />
            <h2 className="text-4xl font-bold text-gray-900">Subject Hubs</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dive deep into specialized communities where passionate learners and experts 
            collaborate to master academic olympiad challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subject, index) => (
            <Card 
              key={subject.id}
              className={`${subject.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group overflow-hidden`}
            >
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${subject.color} rounded-xl flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {subject.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{subject.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{subject.memberCount.toLocaleString()} members</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-white/60 text-gray-700">
                      Active
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed">
                    {subject.description}
                  </p>

                  {/* Topics */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-sm">Key Topics:</h4>
                    <div className="flex flex-wrap gap-2">
                      {subject.topics.map((topic, topicIndex) => (
                        <Badge 
                          key={topicIndex}
                          variant="outline"
                          className="text-xs bg-white/80 border-green-200 text-green-700 hover:bg-green-50 transition-colors duration-200"
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
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all duration-200 group"
                    >
                      <span className="mr-2">💬</span>
                      Join WhatsApp
                      <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleStartPractice(subject.id)}
                      className="flex-1 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 transition-all duration-200 group"
                    >
                      <Zap className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                      Practice
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community Stats */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">6+</div>
              <div className="text-gray-600">Active Hubs</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-emerald-600">6,753</div>
              <div className="text-gray-600">Total Members</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-teal-600">24/7</div>
              <div className="text-gray-600">Community Support</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-700">100+</div>
              <div className="text-gray-600">Daily Discussions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubjectHubs;