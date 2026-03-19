import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { practiceProblems } from '../data/mockData';
import { CheckCircle, XCircle, Trophy, Clock, Star, Target, Brain, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const PracticeArena = () => {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedProblems, setCompletedProblems] = useState(new Set());

  const difficultyColors = {
    Easy: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    Medium: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    Hard: 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
  };

  const subjectAccents = {
    physics: { border: 'border-t-amber-500', glow: 'shadow-[0_0_20px_rgba(217,119,6,0.3)]' },
    chemistry: { border: 'border-t-emerald-500', glow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]' },
    biology: { border: 'border-t-cyan-500', glow: 'shadow-[0_0_20px_rgba(34,211,238,0.3)]' },
    mathematics: { border: 'border-t-blue-500', glow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]' },
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
    const accent = subjectAccents[selectedProblem.subject] || subjectAccents.physics;
    
    return (
      <div className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4 py-8 relative z-10">
          <motion.div 
            className={`glass-panel max-w-4xl mx-auto border-t-2 ${accent.border} ${accent.glow}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-8 space-y-8">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div className="flex items-center space-x-3">
                  <Brain className="w-6 h-6 text-cyan-400" />
                  <h2 className="heading-md text-white">{selectedProblem.title}</h2>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge className={difficultyColors[selectedProblem.difficulty]}>
                    {selectedProblem.difficulty}
                  </Badge>
                  <div className="flex items-center space-x-1 text-yellow-400 font-space-grotesk">
                    <Star className="w-4 h-4" />
                    <span>{selectedProblem.points} pts</span>
                  </div>
                </div>
              </div>

              {/* Question */}
              <div className="glass-panel p-6">
                <h3 className="font-space-grotesk font-bold text-slate-200 mb-4">Problem:</h3>
                <p className="text-slate-300 leading-relaxed font-inter">{selectedProblem.question}</p>
              </div>

              {/* Options */}
              <div className="space-y-4">
                <h4 className="font-space-grotesk font-bold text-slate-200">Choose your answer:</h4>
                {selectedProblem.options.map((option, index) => (
                  <motion.div
                    key={index}
                    onClick={() => !showResult && handleAnswerSelect(index)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      showResult
                        ? index === selectedProblem.correctAnswer
                          ? 'border-emerald-500/50 bg-emerald-500/10'
                          : index === selectedAnswer && selectedAnswer !== selectedProblem.correctAnswer
                          ? 'border-rose-500/50 bg-rose-500/10'
                          : 'border-white/10 bg-white/5'
                        : selectedAnswer === index
                        ? 'border-cyan-500/50 bg-cyan-500/10'
                        : 'border-white/10 hover:border-cyan-500/30 hover:bg-white/5'
                    }`}
                    whileHover={{ scale: !showResult ? 1.02 : 1 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        showResult
                          ? index === selectedProblem.correctAnswer
                            ? 'border-emerald-500 bg-emerald-500'
                            : index === selectedAnswer && selectedAnswer !== selectedProblem.correctAnswer
                            ? 'border-rose-500 bg-rose-500'
                            : 'border-white/30'
                          : selectedAnswer === index
                          ? 'border-cyan-500 bg-cyan-500'
                          : 'border-white/30'
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
                      <span className="text-slate-200 font-inter">{option}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Result */}
              {showResult && (
                <motion.div 
                  className={`glass-panel p-6 border-l-4 ${
                    selectedAnswer === selectedProblem.correctAnswer
                      ? 'border-l-emerald-500'
                      : 'border-l-rose-500'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    {selectedAnswer === selectedProblem.correctAnswer ? (
                      <CheckCircle className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <XCircle className="w-6 h-6 text-rose-400" />
                    )}
                    <h4 className={`font-space-grotesk font-bold ${
                      selectedAnswer === selectedProblem.correctAnswer
                        ? 'text-emerald-300'
                        : 'text-rose-300'
                    }`}>
                      {selectedAnswer === selectedProblem.correctAnswer ? 'Correct!' : 'Incorrect!'}
                    </h4>
                  </div>
                  <p className="text-slate-300 font-inter">{selectedProblem.explanation}</p>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between pt-6 border-t border-white/10">
                <Button 
                  onClick={handleNextProblem}
                  className="btn-ghost-glass"
                >
                  Back to Problems
                </Button>
                
                {!showResult ? (
                  <Button 
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className="btn-emerald-glow disabled:opacity-50"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button 
                    onClick={handleNextProblem}
                    className="btn-emerald-glow"
                  >
                    Next Problem
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

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
    <section id="practice" className="py-20 relative">
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
            <Target className="w-8 h-8 text-emerald-400" />
            <h2 className="heading-lg text-white">Practice Arena</h2>
          </div>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto font-inter">
            Challenge yourself with carefully curated problems from past olympiads. 
            Get instant feedback and detailed explanations to accelerate your learning.
          </p>
        </motion.div>

        {/* Score Dashboard HUD */}
        <motion.div 
          className="max-w-2xl mx-auto mb-12"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="glass-panel p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Trophy className="w-8 h-8 text-emerald-400" />
                <div>
                  <p className="text-sm text-slate-300 font-inter">Your Score</p>
                  <p className="text-4xl font-bold font-space-grotesk text-gradient-emerald-aqua">{score}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-300 font-inter">{completedProblems.size} problems completed</p>
                <p className="text-2xl font-bold font-space-grotesk text-cyan-400">{Math.round((completedProblems.size / practiceProblems.length) * 100)}%</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Problems Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {practiceProblems.map((problem) => {
            const accent = subjectAccents[problem.subject] || subjectAccents.physics;
            return (
              <motion.div
                key={problem.id}
                className={`glass-panel-hover border-t-2 ${accent.border} ${accent.glow} cursor-pointer`}
                variants={itemVariants}
                onClick={() => handleStartProblem(problem)}
              >
                <div className="p-6 space-y-4 h-full flex flex-col">
                  <div className="flex items-center justify-between">
                    <h3 className="heading-sm text-white">{problem.title}</h3>
                    {completedProblems.has(problem.id) && (
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge className={difficultyColors[problem.difficulty]}>
                      {problem.difficulty}
                    </Badge>
                    <div className="flex items-center space-x-1 text-yellow-400 text-sm font-space-grotesk">
                      <Star className="w-4 h-4" />
                      <span>{problem.points} points</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 font-inter flex-grow">
                    {problem.question}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-xs text-slate-400 border-t border-white/10 pt-4">
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
                    className="w-full btn-emerald-glow mt-4"
                  >
                    {completedProblems.has(problem.id) ? 'Review Problem' : 'Start Problem'}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Load More Button */}
        <motion.div 
          className="text-center"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Button 
            className="btn-ghost-glass"
          >
            Load More Problems
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PracticeArena;
