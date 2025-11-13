'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, MessageSquare, Clock, CheckCircle2, TrendingUp, FileText, Video } from 'lucide-react'

export default function AssessmentPrep() {
  const [activeTab, setActiveTab] = useState('overview')
  const [mockScore, setMockScore] = useState(0)

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Target },
    { id: 'questions', name: 'Question Bank', icon: MessageSquare },
    { id: 'mock', name: 'Mock Interviews', icon: Video },
    { id: 'readiness', name: 'Readiness', icon: TrendingUp }
  ]

  const questionCategories = [
    {
      category: 'Ethics & Professionalism',
      questions: [
        'Describe a situation where you had to make an ethical decision',
        'How do you ensure compliance with RICS Rules of Conduct?',
        'What would you do if asked to act unethically?'
      ]
    },
    {
      category: 'Technical Competencies',
      questions: [
        'Explain your approach to [competency]',
        'Describe a project where you demonstrated Level 3 competency',
        'How do you stay current with technical developments?'
      ]
    },
    {
      category: 'Client Care',
      questions: [
        'How do you manage client expectations?',
        'Describe a challenging client situation',
        'What is your approach to client communication?'
      ]
    }
  ]

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
            {questionCategories.map((category, catIndex) => (
              <div key={catIndex} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
                <div className="space-y-3">
                  {category.questions.map((question, qIndex) => (
                    <div
                      key={qIndex}
                      className="p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <p className="text-gray-300">{question}</p>
                        <button className="ml-4 px-3 py-1 bg-violet-600 hover:bg-violet-700 rounded-lg text-sm whitespace-nowrap">
                          Practice
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
                  { item: 'Documents Complete', status: false },
                  { item: 'Competencies at Required Levels', status: false },
                  { item: 'CPD Requirements Met', status: false },
                  { item: 'Experience Diary Complete', status: false },
                  { item: 'Practice Questions Completed', status: false },
                  { item: 'Mock Interviews Completed', status: false }
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
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

