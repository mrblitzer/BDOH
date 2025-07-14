import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { practiceProblems } from '../data/mockData';
import { CheckCircle, XCircle, Trophy, Clock, Star, Target, Brain, BookOpen } from 'lucide-react';

const PracticeArena = () => {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedProblems, setCompletedProblems] = useState(new Set());

  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800'
  };

  const subjectColors = {
    physics: 'from-green-400 to-emerald-600',
    chemistry: 'from-emerald-400 to-green-600',
    biology: 'from-green-500 to-teal-600',
    mathematics: 'from-green-600 to-emerald-700'
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === selectedProblem.correctAnswer;
    setShowResult(true);
    
    if (isCorrect) {
      setScore(prev => prev + selectedProblem.points);
      setCompletedProblems(prev => new Set([...prev, selectedProblem.id]));
    }
  };

  const handleNextProblem = () => {
    setSelectedProblem(null);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleStartProblem = (problem) => {
    setSelectedProblem(problem);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (selectedProblem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-4xl mx-auto shadow-xl">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Brain className="w-6 h-6" />
                  <CardTitle className="text-xl">{selectedProblem.title}</CardTitle>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={`${difficultyColors[selectedProblem.difficulty]} text-sm`}>
                    {selectedProblem.difficulty}
                  </Badge>
                  <div className="flex items-center space-x-1 text-sm">
                    <Star className="w-4 h-4" />
                    <span>{selectedProblem.points} pts</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Question */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-4">Problem:</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedProblem.question}</p>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Choose your answer:</h4>
                  {selectedProblem.options.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => !showResult && handleAnswerSelect(index)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        showResult
                          ? index === selectedProblem.correctAnswer
                            ? 'border-green-500 bg-green-50'
                            : index === selectedAnswer && selectedAnswer !== selectedProblem.correctAnswer
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 bg-gray-50'
                          : selectedAnswer === index
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          showResult
                            ? index === selectedProblem.correctAnswer
                              ? 'border-green-500 bg-green-500'
                              : index === selectedAnswer && selectedAnswer !== selectedProblem.correctAnswer
                              ? 'border-red-500 bg-red-500'
                              : 'border-gray-300'
                            : selectedAnswer === index
                            ? 'border-green-500 bg-green-500'
                            : 'border-gray-300'
                        }`}>
                          {showResult && index === selectedProblem.correctAnswer && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                          {showResult && index === selectedAnswer && selectedAnswer !== selectedProblem.correctAnswer && (
                            <XCircle className="w-4 h-4 text-white" />
                          )}
                          {selectedAnswer === index && !showResult && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="text-gray-800">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Result */}
                {showResult && (
                  <div className={`p-6 rounded-xl ${
                    selectedAnswer === selectedProblem.correctAnswer
                      ? 'bg-green-50 border-2 border-green-200'
                      : 'bg-red-50 border-2 border-red-200'
                  }`}>
                    <div className="flex items-center space-x-3 mb-4">
                      {selectedAnswer === selectedProblem.correctAnswer ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600" />
                      )}
                      <h4 className={`font-semibold ${
                        selectedAnswer === selectedProblem.correctAnswer
                          ? 'text-green-800'
                          : 'text-red-800'
                      }`}>
                        {selectedAnswer === selectedProblem.correctAnswer ? 'Correct!' : 'Incorrect!'}
                      </h4>
                    </div>
                    <p className="text-gray-700">{selectedProblem.explanation}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between pt-6">
                  <Button 
                    variant="outline"
                    onClick={handleNextProblem}
                    className="border-green-200 text-green-700 hover:bg-green-50"
                  >
                    Back to Problems
                  </Button>
                  
                  {!showResult ? (
                    <Button 
                      onClick={handleSubmitAnswer}
                      disabled={selectedAnswer === null}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white disabled:opacity-50"
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleNextProblem}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                    >
                      Next Problem
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <section id="practice" className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Target className="w-8 h-8 text-green-600" />
            <h2 className="text-4xl font-bold text-gray-900">Practice Arena</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Challenge yourself with carefully curated problems from past olympiads. 
            Get instant feedback and detailed explanations to accelerate your learning.
          </p>
        </div>

        {/* Score Display */}
        <div className="max-w-md mx-auto mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Trophy className="w-6 h-6 text-green-600" />
                  <span className="font-semibold text-gray-900">Your Score</span>
                </div>
                <div className="text-2xl font-bold text-green-600">{score}</div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                {completedProblems.size} problems completed
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practiceProblems.map((problem) => (
            <Card 
              key={problem.id}
              className={`shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer bg-white/80 backdrop-blur-sm border-0 ${
                completedProblems.has(problem.id) ? 'ring-2 ring-green-400' : ''
              }`}
              onClick={() => handleStartProblem(problem)}
            >
              <CardHeader className={`bg-gradient-to-r ${subjectColors[problem.subject]} text-white`}>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{problem.title}</CardTitle>
                  {completedProblems.has(problem.id) && (
                    <CheckCircle className="w-5 h-5 text-white" />
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className={`${difficultyColors[problem.difficulty]} text-sm`}>
                      {problem.difficulty}
                    </Badge>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Star className="w-4 h-4" />
                      <span>{problem.points} points</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                    {problem.question}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>~5 min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span className="capitalize">{problem.subject}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200 group-hover:scale-105"
                  >
                    {completedProblems.has(problem.id) ? 'Review Problem' : 'Start Problem'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline"
            className="border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 transition-all duration-200 px-8"
          >
            Load More Problems
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PracticeArena;