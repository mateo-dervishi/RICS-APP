'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, MessageSquare, Clock, CheckCircle2, TrendingUp, FileText, Video, Lightbulb } from 'lucide-react'
import { questionBanks, getAllQuestions, getRandomQuestions } from '../data/questionBanks'
import { useApp } from '../context/AppContext'

export default function AssessmentPrep() {
  const { state, calculateProgress } = useApp()
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null)
  const [practiceAnswers, setPracticeAnswers] = useState<{ [key: string]: string }>({})

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Target },
    { id: 'questions', name: 'Question Bank', icon: MessageSquare },
    { id: 'mock', name: 'Mock Interviews', icon: Video },
    { id: 'readiness', name: 'Readiness', icon: TrendingUp }
  ]

  const progress = calculateProgress()
  const questionsToShow = selectedCategory === 'all' 
    ? getAllQuestions() 
    : questionBanks[selectedCategory as keyof typeof questionBanks] || []

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2 flex items-center">
          <Target className="w-8 h-8 mr-3 text-violet-400" />
          Assessment Preparation Suite
        </h2>
        <p className="text-gray-400">Interview simulator, question banks, and readiness assessment</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-violet-500/20 text-violet-400 border border-violet-500/50'
                  : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-violet-900/30 to-purple-900/30 backdrop-blur-sm border border-violet-500/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Final Assessment Preparation</h3>
              <p className="text-gray-300 mb-6">
                Prepare for your final assessment interview with practice questions, mock interviews,
                and readiness assessments.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <MessageSquare className="w-6 h-6 text-violet-400 mb-2" />
                  <h4 className="font-semibold mb-2">Question Bank</h4>
                  <p className="text-sm text-gray-400">100+ practice questions</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <Video className="w-6 h-6 text-blue-400 mb-2" />
                  <h4 className="font-semibold mb-2">Mock Interviews</h4>
                  <p className="text-sm text-gray-400">AI-powered simulation</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <TrendingUp className="w-6 h-6 text-green-400 mb-2" />
                  <h4 className="font-semibold mb-2">Readiness Score</h4>
                  <p className="text-sm text-gray-400">Track your progress</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h4 className="font-semibold mb-4">Practice Progress</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Questions Answered</span>
                      <span>0 / 100</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-violet-500 h-2 rounded-full" style={{ width: '0%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Mock Interviews</span>
                      <span>0 / 5</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }} />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h4 className="font-semibold mb-4">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-left">
                    Start Practice Session
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-left">
                    Schedule Mock Interview
                  </button>
                  <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-left">
                    View Readiness Report
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'questions' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Category Filter */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-violet-500/20 text-violet-400 border border-violet-500/50'
                    : 'bg-slate-700 text-gray-400'
                }`}
              >
                All Questions
              </button>
              {Object.keys(questionBanks).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap capitalize ${
                    selectedCategory === cat
                      ? 'bg-violet-500/20 text-violet-400 border border-violet-500/50'
                      : 'bg-slate-700 text-gray-400'
                  }`}
                >
                  {cat.replace(/([A-Z])/g, ' $1').trim()}
                </button>
              ))}
            </div>

            {/* Questions List */}
            <div className="space-y-3">
              {questionsToShow.map((question, qIndex) => (
                <div
                  key={qIndex}
                  className="p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all cursor-pointer"
                  onClick={() => setSelectedQuestion(question)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-gray-300 font-medium mb-1">{question.question}</p>
                      <span className="text-xs text-gray-500">{question.category}</span>
                    </div>
                    <button className="ml-4 px-3 py-1 bg-violet-600 hover:bg-violet-700 rounded-lg text-sm whitespace-nowrap">
                      Practice
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Question Detail Modal */}
            {selectedQuestion && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-slate-800 border border-slate-700 rounded-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">Practice Question</h3>
                    <button
                      onClick={() => setSelectedQuestion(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3">{selectedQuestion.question}</h4>
                    <div className="p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-blue-400 mb-1">Tips</div>
                          <p className="text-sm text-gray-300">{selectedQuestion.tips}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Your Answer</label>
                    <textarea
                      value={practiceAnswers[selectedQuestion.question] || ''}
                      onChange={(e) => setPracticeAnswers({
                        ...practiceAnswers,
                        [selectedQuestion.question]: e.target.value
                      })}
                      className="w-full h-48 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                      placeholder="Write your answer here..."
                    />
                  </div>

                  <div className="flex space-x-3 mt-6">
                    <button
                      onClick={() => setSelectedQuestion(null)}
                      className="px-6 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg font-semibold"
                    >
                      Save Answer
                    </button>
                    <button
                      onClick={() => {
                        setPracticeAnswers({
                          ...practiceAnswers,
                          [selectedQuestion.question]: ''
                        })
                      }}
                      className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold"
                    >
                      Clear
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'mock' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Mock Interview Simulator</h3>
            <p className="text-gray-400 mb-6">
              Practice your assessment interview with AI-powered simulation
            </p>
            
            <div className="space-y-4">
              <div className="p-6 bg-slate-700/50 rounded-lg text-center">
                <Video className="w-16 h-16 text-violet-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Ready to Start?</h4>
                <p className="text-sm text-gray-400 mb-6">
                  The mock interview will simulate a real assessment scenario with timed questions
                </p>
                <button className="px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg font-semibold">
                  Start Mock Interview
                </button>
              </div>
              
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <h4 className="font-semibold mb-3">Previous Sessions</h4>
                <div className="text-sm text-gray-400">
                  No mock interviews completed yet. Start your first session above.
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'readiness' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Readiness Assessment</h3>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold">Overall Readiness</span>
                  <span className="text-3xl font-bold text-yellow-400">0%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-4">
                  <div className="bg-yellow-500 h-4 rounded-full" style={{ width: '0%' }} />
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { 
                    item: 'Documents Complete', 
                    status: state.documents.filter(d => d.status === 'completed').length > 0 
                  },
                  { 
                    item: 'Competencies at Required Levels', 
                    status: Object.values(state.competencies).filter(c => c.level >= 2).length >= 8 
                  },
                  { 
                    item: 'CPD Requirements Met', 
                    status: state.cpd.reduce((sum, a) => sum + a.hours, 0) >= (state.profile.currentLevel === 'mrics' ? 48 : 20)
                  },
                  { 
                    item: 'Experience Diary Complete', 
                    status: state.experience.length >= (state.profile.selectedRoute === 'structured24' ? 400 : 200)
                  },
                  { 
                    item: 'Practice Questions Completed', 
                    status: Object.keys(practiceAnswers).length >= 10 
                  },
                  { 
                    item: 'Mock Interviews Completed', 
                    status: false // TODO: Add mock interview tracking
                  }
                ].map((check, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
                    {check.status ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-500 rounded-full" />
                    )}
                    <span className={check.status ? 'text-gray-300' : 'text-gray-500'}>{check.item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold">Overall Readiness</span>
                  <span className="text-3xl font-bold text-yellow-400">
                    {Math.round(
                      ([
                        state.documents.filter(d => d.status === 'completed').length > 0,
                        Object.values(state.competencies).filter(c => c.level >= 2).length >= 8,
                        state.cpd.reduce((sum, a) => sum + a.hours, 0) >= (state.profile.currentLevel === 'mrics' ? 48 : 20),
                        state.experience.length >= (state.profile.selectedRoute === 'structured24' ? 400 : 200),
                        Object.keys(practiceAnswers).length >= 10
                      ].filter(Boolean).length / 5) * 100
                    )}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-4">
                  <div 
                    className="bg-yellow-500 h-4 rounded-full transition-all" 
                    style={{ 
                      width: `${Math.round(
                        ([
                          state.documents.filter(d => d.status === 'completed').length > 0,
                          Object.values(state.competencies).filter(c => c.level >= 2).length >= 8,
                          state.cpd.reduce((sum, a) => sum + a.hours, 0) >= (state.profile.currentLevel === 'mrics' ? 48 : 20),
                          state.experience.length >= (state.profile.selectedRoute === 'structured24' ? 400 : 200),
                          Object.keys(practiceAnswers).length >= 10
                        ].filter(Boolean).length / 5) * 100
                      )}%` 
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

