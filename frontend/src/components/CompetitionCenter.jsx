import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { competitions } from '../data/mockData';
import { Calendar, Clock, Users, Trophy, Shield, Play, Eye, CheckCircle } from 'lucide-react';

const CompetitionCenter = () => {
  const [selectedCompetition, setSelectedCompetition] = useState(null);

  const statusColors = {
    upcoming: 'bg-blue-100 text-blue-800',
    live: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800'
  };

  const statusIcons = {
    upcoming: <Calendar className="w-4 h-4" />,
    live: <Play className="w-4 h-4" />,
    completed: <CheckCircle className="w-4 h-4" />
  };

  const handleJoinCompetition = (competition) => {
    if (competition.status === 'live') {
      setSelectedCompetition(competition);
      // In real app, this would redirect to exam interface
      console.log('Joining competition:', competition.id);
    }
  };

  const handleViewResults = (competition) => {
    console.log('Viewing results for:', competition.id);
  };

  return (
    <section id="competitions" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Trophy className="w-8 h-8 text-green-600" />
            <h2 className="text-4xl font-bold text-gray-900">Competition Center</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compete in secure, proctored online exams designed to simulate real olympiad conditions. 
            Test your skills against peers from across Bangladesh.
          </p>
        </div>

        {/* Anti-Cheat Features */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 mb-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Shield className="w-8 h-8 text-green-600" />
              <h3 className="text-2xl font-bold text-gray-900">Secure Exam Environment</h3>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our competition platform ensures fair play with advanced anti-cheat measures
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Browser Monitoring</h4>
              <p className="text-sm text-gray-600">Tab switching detection and prevention</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-emerald-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Time Tracking</h4>
              <p className="text-sm text-gray-600">Precise timing with auto-submission</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-teal-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Secure Interface</h4>
              <p className="text-sm text-gray-600">Copy-paste prevention and secure environment</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Live Monitoring</h4>
              <p className="text-sm text-gray-600">Real-time exam supervision</p>
            </div>
          </div>
        </div>

        {/* Competitions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {competitions.map((competition) => (
            <Card 
              key={competition.id}
              className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group bg-white border-0"
            >
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{competition.title}</CardTitle>
                  <div className="flex items-center space-x-1">
                    {statusIcons[competition.status]}
                    <Badge className={`${statusColors[competition.status]} text-xs`}>
                      {competition.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{competition.duration} min</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-gray-500" />
                      <span>{competition.questions} questions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span>{competition.participants} participants</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>{new Date(competition.startDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Prize</h4>
                    <p className="text-sm text-gray-700">{competition.prize}</p>
                  </div>
                  
                  <div className="space-y-2">
                    {competition.status === 'upcoming' && (
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                        disabled
                      >
                        Register Soon
                      </Button>
                    )}
                    {competition.status === 'live' && (
                      <Button 
                        onClick={() => handleJoinCompetition(competition)}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200 group-hover:scale-105"
                      >
                        Join Competition
                      </Button>
                    )}
                    {competition.status === 'completed' && (
                      <Button 
                        variant="outline"
                        onClick={() => handleViewResults(competition)}
                        className="w-full border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300"
                      >
                        View Results
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Registration CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Compete?</h3>
            <p className="text-xl mb-8 opacity-90">
              Join our upcoming competitions and showcase your olympiad skills
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                View Schedule
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600 transition-all duration-200"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitionCenter;