'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Award, FileText, CheckCircle2, Target, TrendingUp, Users } from 'lucide-react'
import { membershipLevels } from '../data/pathways'

export default function FRICSModule() {
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Award },
    { id: 'characteristics', name: 'Characteristics', icon: Target },
    { id: 'statements', name: 'Statements', icon: FileText },
    { id: 'evidence', name: 'Evidence', icon: CheckCircle2 },
    { id: 'application', name: 'Application', icon: TrendingUp }
  ]

  const characteristics = [
    { id: 'champion-1', category: 'Champion', name: 'Service to RICS', description: 'Significant contribution to RICS activities' },
    { id: 'champion-2', category: 'Champion', name: 'Recognition', description: 'Awarded honors or recognition' },
    { id: 'expert-1', category: 'Expert', name: 'Advanced Knowledge', description: 'Recognized expert in your field' },
    { id: 'expert-2', category: 'Expert', name: 'Additional Qualifications', description: 'Postgraduate qualifications or certifications' },
    { id: 'influencer-1', category: 'Influencer', name: 'Leadership', description: 'Senior leadership roles' },
    { id: 'influencer-2', category: 'Influencer', name: 'Management', description: 'People and resource management' },
    { id: 'role-model-1', category: 'Role Model', name: 'Exceeding Standards', description: 'Consistently exceed professional standards' },
    { id: 'role-model-2', category: 'Role Model', name: 'Mentoring', description: 'Significant mentoring contributions' }
  ]

  const toggleCharacteristic = (id: string) => {
    if (selectedCharacteristics.includes(id)) {
      setSelectedCharacteristics(selectedCharacteristics.filter(c => c !== id))
    } else if (selectedCharacteristics.length < 4) {
      setSelectedCharacteristics([...selectedCharacteristics, id])
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2 flex items-center">
          <Award className="w-8 h-8 mr-3 text-orange-400" />
          FRICS (Fellow) Module
        </h2>
        <p className="text-gray-400">Highest distinction level - demonstrate excellence in 4 characteristics</p>
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
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50'
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
            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 backdrop-blur-sm border border-orange-500/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">FRICS Fellowship</h3>
              <p className="text-gray-300 mb-6">
                Fellowship is the highest level of RICS membership, recognizing exceptional achievement
                and contribution to the profession. You must demonstrate excellence in 4 characteristics
                from 12 available options across 4 categories.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <CheckCircle2 className="w-6 h-6 text-green-400 mb-2" />
                  <h4 className="font-semibold mb-2">5+ Years MRICS</h4>
                  <p className="text-sm text-gray-400">Minimum requirement</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <Target className="w-6 h-6 text-orange-400 mb-2" />
                  <h4 className="font-semibold mb-2">4 Characteristics</h4>
                  <p className="text-sm text-gray-400">Choose from 12 options</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <FileText className="w-6 h-6 text-blue-400 mb-2" />
                  <h4 className="font-semibold mb-2">500 Words Each</h4>
                  <p className="text-sm text-gray-400">Statement per characteristic</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <Users className="w-6 h-6 text-purple-400 mb-2" />
                  <h4 className="font-semibold mb-2">Peer Review</h4>
                  <p className="text-sm text-gray-400">Assessment by peers</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Eligibility Check</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>5+ years as MRICS member</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Demonstrated excellence in profession</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Significant contributions to RICS or profession</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'characteristics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Select 4 Characteristics</h3>
                <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm">
                  {selectedCharacteristics.length} / 4 Selected
                </span>
              </div>
              
              <div className="space-y-4">
                {['Champion', 'Expert', 'Influencer', 'Role Model'].map((category) => (
                  <div key={category} className="p-4 bg-slate-700/50 rounded-lg">
                    <h4 className="font-semibold mb-3 text-lg">{category}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {characteristics
                        .filter(c => c.category === category)
                        .map((char) => {
                          const isSelected = selectedCharacteristics.includes(char.id)
                          const canSelect = selectedCharacteristics.length < 4 || isSelected
                          
                          return (
                            <button
                              key={char.id}
                              onClick={() => canSelect && toggleCharacteristic(char.id)}
                              disabled={!canSelect && !isSelected}
                              className={`p-4 rounded-lg border-2 text-left transition-all ${
                                isSelected
                                  ? 'border-orange-500 bg-orange-500/20'
                                  : canSelect
                                  ? 'border-slate-600 bg-slate-600/50 hover:border-slate-500'
                                  : 'border-slate-700 bg-slate-700/30 opacity-50 cursor-not-allowed'
                              }`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="font-semibold">{char.name}</div>
                                {isSelected && <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0" />}
                              </div>
                              <p className="text-sm text-gray-400">{char.description}</p>
                            </button>
                          )
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'statements' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4">500-Word Statements</h3>
            <p className="text-gray-400 mb-6">
              Write a 500-word statement for each selected characteristic demonstrating your excellence
            </p>
            
            {selectedCharacteristics.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Select characteristics first to write statements</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedCharacteristics.map((charId) => {
                  const char = characteristics.find(c => c.id === charId)
                  return (
                    <div key={charId} className="p-4 bg-slate-700/50 rounded-lg">
                      <h4 className="font-semibold mb-2">{char?.name}</h4>
                      <textarea
                        className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg mb-2"
                        rows={8}
                        placeholder="Write your 500-word statement here..."
                      />
                      <div className="text-xs text-gray-400 text-right">0 / 500 words</div>
                    </div>
                  )
                })}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'evidence' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Supporting Evidence</h3>
            <p className="text-gray-400 mb-6">
              Upload supporting documents and evidence for each characteristic
            </p>
            
            {selectedCharacteristics.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Select characteristics first to upload evidence</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedCharacteristics.map((charId) => {
                  const char = characteristics.find(c => c.id === charId)
                  return (
                    <div key={charId} className="p-4 bg-slate-700/50 rounded-lg">
                      <h4 className="font-semibold mb-3">{char?.name}</h4>
                      <div className="space-y-2">
                        <button className="w-full px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg text-sm text-left">
                          + Upload Evidence Document
                        </button>
                        <p className="text-xs text-gray-400">
                          Upload certificates, awards, publications, or other supporting documents
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'application' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Application Status</h3>
            
            <div className="space-y-4">
              <div className="p-6 bg-slate-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Application Progress</h4>
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
                    In Progress
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span>MRICS membership verified (5+ years)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedCharacteristics.length === 4 ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-500 rounded-full" />
                    )}
                    <span>4 characteristics selected ({selectedCharacteristics.length}/4)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-gray-500 rounded-full" />
                    <span>500-word statements completed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-gray-500 rounded-full" />
                    <span>Supporting evidence uploaded</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-gray-500 rounded-full" />
                    <span>Application submitted</span>
                  </div>
                </div>
                
                {selectedCharacteristics.length === 4 && (
                  <button className="w-full mt-6 px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded-lg font-semibold">
                    Submit Application
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

