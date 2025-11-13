'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Target, FileText, TrendingUp, Award, CheckCircle2, Clock } from 'lucide-react'
import { pathways } from '../data/pathways'

export default function AssocRICSModule() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedPathway, setSelectedPathway] = useState('building-surveying')
  const [experienceYears, setExperienceYears] = useState(1)
  const [cpdHours, setCpdHours] = useState(0)

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Briefcase },
    { id: 'pathway', name: 'Pathway Selection', icon: Target },
    { id: 'experience', name: 'Experience Tracker', icon: Clock },
    { id: 'competencies', name: 'Competencies', icon: CheckCircle2 },
    { id: 'assessment', name: 'Assessment Prep', icon: FileText },
    { id: 'progression', name: 'Progression to MRICS', icon: TrendingUp }
  ]

  const targetHours = 20 // Annual CPD requirement for AssocRICS
  const progress = Math.min((cpdHours / targetHours) * 100, 100)

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2 flex items-center">
          <Briefcase className="w-8 h-8 mr-3 text-yellow-400" />
          AssocRICS Module
        </h2>
        <p className="text-gray-400">Entry-level professional qualification pathway</p>
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
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
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
            <div className="bg-gradient-to-br from-yellow-900/30 to-amber-900/30 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">AssocRICS Qualification</h3>
              <p className="text-gray-300 mb-6">
                AssocRICS is the entry-level professional qualification, perfect for those with 1-4 years
                of experience. Choose from 13 sector pathways and progress towards full MRICS status.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <Clock className="w-6 h-6 text-yellow-400 mb-2" />
                  <h4 className="font-semibold mb-2">1-4 Years Experience</h4>
                  <p className="text-sm text-gray-400">Based on qualifications</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <Target className="w-6 h-6 text-blue-400 mb-2" />
                  <h4 className="font-semibold mb-2">13 Sector Pathways</h4>
                  <p className="text-sm text-gray-400">Choose your specialization</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <TrendingUp className="w-6 h-6 text-green-400 mb-2" />
                  <h4 className="font-semibold mb-2">Progression Route</h4>
                  <p className="text-sm text-gray-400">Pathway to MRICS</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Experience</span>
                  <span className="text-2xl font-bold text-yellow-400">{experienceYears} years</span>
                </div>
                <div className="text-sm text-gray-400">Target: 1-4 years</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">CPD Hours</span>
                  <span className="text-2xl font-bold text-green-400">{cpdHours}/{targetHours}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Selected Pathway</span>
                  <span className="text-lg font-bold text-blue-400 capitalize">
                    {pathways.assocrics.find(p => p.id === selectedPathway)?.name || 'Not Selected'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'pathway' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Select Your Sector Pathway</h3>
            <p className="text-gray-400 mb-6">Choose from 13 AssocRICS sector pathways</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pathways.assocrics.map((pathway) => (
                <button
                  key={pathway.id}
                  onClick={() => setSelectedPathway(pathway.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedPathway === pathway.id
                      ? 'border-yellow-500 bg-yellow-500/20'
                      : 'border-slate-700 bg-slate-700/50 hover:border-slate-600'
                  }`}
                >
                  <div className="font-semibold">{pathway.name}</div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'experience' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Experience Requirement Tracker</h3>
            <p className="text-gray-400 mb-6">
              Track your experience progress. Requirements vary based on your qualifications:
            </p>
            
            <div className="space-y-4">
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">Years of Experience</h4>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(parseInt(e.target.value) || 0)}
                      className="w-20 px-3 py-1 bg-slate-600 border border-slate-500 rounded-lg text-center"
                    />
                    <span>years</span>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  {experienceYears < 1 && 'You need at least 1 year of experience'}
                  {experienceYears >= 1 && experienceYears < 4 && 'You meet the minimum requirement!'}
                  {experienceYears >= 4 && 'You exceed the requirement - consider MRICS route'}
                </div>
              </div>
              
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <h4 className="font-semibold mb-3">Experience Categories</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span>Relevant work experience in your chosen sector</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span>Practical application of surveying principles</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span>Professional development activities</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'competencies' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Competency Development</h3>
            <p className="text-gray-400 mb-6">
              Develop competencies at appropriate levels for AssocRICS assessment
            </p>
            
            <div className="space-y-3">
              {[
                'Ethics and Professionalism',
                'Client Care',
                'Communication',
                'Health and Safety',
                'Technical Competencies (Pathway-specific)'
              ].map((comp, i) => (
                <div key={i} className="p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{comp}</span>
                    <div className="flex space-x-2">
                      {[1, 2].map((level) => (
                        <button
                          key={level}
                          className="px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded text-sm"
                        >
                          Level {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'assessment' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Assessment Preparation</h3>
            <p className="text-gray-400 mb-6">Prepare for your AssocRICS direct entry assessment</p>
            
            <div className="space-y-4">
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <h4 className="font-semibold mb-2">Portfolio Builder</h4>
                <p className="text-sm text-gray-400 mb-3">
                  Compile evidence of your work experience and competencies
                </p>
                <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm">
                  Start Building Portfolio
                </button>
              </div>
              
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <h4 className="font-semibold mb-2">Assessment Format</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Portfolio submission</li>
                  <li>• Professional interview</li>
                  <li>• Competency demonstration</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'progression' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Progression to MRICS</h3>
            <p className="text-gray-400 mb-6">
              Plan your pathway from AssocRICS to full MRICS chartered status
            </p>
            
            <div className="space-y-4">
              <div className="p-6 bg-gradient-to-r from-yellow-500/20 to-purple-500/20 border border-yellow-500/30 rounded-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <Award className="w-8 h-8 text-yellow-400" />
                  <div>
                    <h4 className="font-semibold text-lg">AssocRICS → MRICS</h4>
                    <p className="text-sm text-gray-400">Your progression pathway</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span>Continue gaining experience (aim for 5+ years total)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span>Develop competencies to Level 3</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span>Consider structured training route (12/24 months)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span>Prepare for MRICS final assessment</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

