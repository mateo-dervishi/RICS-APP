'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, FileText, Clock, Users, Award, CheckCircle2, Calendar, TrendingUp } from 'lucide-react'
import { membershipLevels } from '../data/pathways'

export default function MRICSRoutes() {
  const [activeRoute, setActiveRoute] = useState<string>('structured24')
  const [activeTab, setActiveTab] = useState('overview')

  const routes = Object.entries(membershipLevels.mrics.routes)

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Target },
    { id: 'training', name: 'Structured Training', icon: Clock },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'counsellor', name: 'Counsellor', icon: Users },
    { id: 'assessment', name: 'Final Assessment', icon: Award }
  ]

  const currentRoute = membershipLevels.mrics.routes[activeRoute as keyof typeof membershipLevels.mrics.routes]

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2 flex items-center">
          <Target className="w-8 h-8 mr-3 text-purple-400" />
          MRICS Routes
        </h2>
        <p className="text-gray-400">Multiple pathways to achieve MRICS chartered status</p>
      </div>

      {/* Route Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Select Your Route</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {routes.map(([key, route]) => (
            <button
              key={key}
              onClick={() => setActiveRoute(key)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                activeRoute === key
                  ? 'border-purple-500 bg-purple-500/20'
                  : 'border-slate-700 bg-slate-700/50 hover:border-slate-600'
              }`}
            >
              <div className="font-semibold mb-1">{route.name}</div>
              <div className="text-xs text-gray-400">{route.timeline}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Route Details */}
      {currentRoute && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">{currentRoute.name}</h3>
            <p className="text-gray-300 mb-6">Timeline: {currentRoute.timeline}</p>
            
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Requirements:</h4>
              <div className="space-y-2">
                {currentRoute.requirements.map((req, i) => (
                  <div key={i} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{req}</span>
                  </div>
                ))}
              </div>
            </div>
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
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
                      : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold mb-4">Route Overview</h3>
              <div className="space-y-4">
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Key Milestones</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <span>Enrollment and route selection</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span>Structured training period ({currentRoute.timeline})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-green-400" />
                      <span>Document preparation and submission</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-yellow-400" />
                      <span>Final assessment interview</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'training' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold mb-4">Structured Training</h3>
              <div className="space-y-4">
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Experience Requirements</h4>
                  <p className="text-sm text-gray-400 mb-3">
                    {activeRoute === 'structured24' ? '400+ days' : '200+ days'} of practical experience required
                  </p>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>
                
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <h4 className="font-semibold mb-2">CPD Requirements</h4>
                  <p className="text-sm text-gray-400 mb-3">
                    {activeRoute === 'structured24' ? '96 hours' : '48 hours'} minimum during training
                  </p>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'documents' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold mb-4">Required Documents</h3>
              <div className="space-y-3">
                {[
                  'Summary of Experience (1,500 + 3,000-4,000 words)',
                  'Case Study (3,000 words, <24 months old)',
                  'CPD Record (48-96 hours)',
                  'Experience Diary (400+ days)',
                  'Competency Evidence'
                ].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <span>{doc}</span>
                    </div>
                    <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm">
                      Start
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'counsellor' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold mb-4">Counsellor & Supervisor</h3>
              <p className="text-gray-400 mb-6">
                Your counsellor and supervisor will guide you through the structured training process
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Find a Counsellor</h4>
                  <p className="text-sm text-gray-400 mb-3">
                    Connect with an MRICS/FRICS professional to guide your journey
                  </p>
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm">
                    Browse Counsellors
                  </button>
                </div>
                
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Meeting Scheduler</h4>
                  <p className="text-sm text-gray-400 mb-3">
                    Schedule regular reviews with your counsellor
                  </p>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm">
                    Schedule Meeting
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'assessment' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold mb-4">Final Assessment Preparation</h3>
              <div className="space-y-4">
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Interview Preparation</h4>
                  <p className="text-sm text-gray-400 mb-3">
                    Practice with mock interviews and question banks
                  </p>
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm">
                    Start Practice
                  </button>
                </div>
                
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Readiness Checklist</h4>
                  <div className="space-y-2 mt-3">
                    {[
                      'All documents submitted',
                      'Competencies at required levels',
                      'CPD requirements met',
                      'Experience diary complete',
                      'Mock interviews completed'
                    ].map((item, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}

