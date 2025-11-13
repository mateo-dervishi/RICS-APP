'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, AlertCircle, Target, TrendingUp, FileText } from 'lucide-react'
import { mandatoryCompetencies, competencyLevels } from '../data/competencies'

interface CompetencyProgress {
  [key: string]: {
    level: number
    evidence: string[]
    lastUpdated: string
  }
}

export default function CompetencyTracker() {
  const [competencies, setCompetencies] = useState<CompetencyProgress>({})
  const [selectedCompetency, setSelectedCompetency] = useState<string | null>(null)

  const updateCompetencyLevel = (id: string, level: number) => {
    setCompetencies(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        level,
        lastUpdated: new Date().toISOString()
      }
    }))
  }

  const getProgress = () => {
    const total = mandatoryCompetencies.length
    const completed = Object.values(competencies).filter(c => c.level >= 1).length
    return { completed, total, percentage: Math.round((completed / total) * 100) }
  }

  const progress = getProgress()

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Competency Framework</h2>
        <p className="text-gray-400">Track your progress across all mandatory competencies</p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Overall Progress</span>
            <span className="text-2xl font-bold text-purple-400">{progress.percentage}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <div className="text-sm text-gray-400 mt-2">{progress.completed} of {progress.total} competencies started</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Level 3 Achieved</span>
            <span className="text-2xl font-bold text-green-400">
              {Object.values(competencies).filter(c => c.level >= 3).length}
            </span>
          </div>
          <div className="text-sm text-gray-400">Ready for assessment</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Needs Attention</span>
            <span className="text-2xl font-bold text-yellow-400">
              {mandatoryCompetencies.filter(c => !competencies[c.id] || competencies[c.id].level < c.requiredLevel).length}
            </span>
          </div>
          <div className="text-sm text-gray-400">Below required level</div>
        </div>
      </div>

      {/* Competencies List */}
      <div className="space-y-3">
        {mandatoryCompetencies.map((competency, index) => {
          const progress = competencies[competency.id]
          const currentLevel = progress?.level || 0
          const meetsRequirement = currentLevel >= competency.requiredLevel

          return (
            <motion.div
              key={competency.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-purple-500 transition-all cursor-pointer"
              onClick={() => setSelectedCompetency(competency.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">{competency.name}</h3>
                    {meetsRequirement ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-400" />
                    )}
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <div>
                      <span className="text-sm text-gray-400">Required Level: </span>
                      <span className="font-semibold text-purple-400">Level {competency.requiredLevel}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-400">Current Level: </span>
                      <span className={`font-semibold ${meetsRequirement ? 'text-green-400' : 'text-yellow-400'}`}>
                        {currentLevel > 0 ? `Level ${currentLevel}` : 'Not Started'}
                      </span>
                    </div>
                  </div>

                  {/* Level Indicators */}
                  <div className="flex space-x-2 mb-4">
                    {[1, 2, 3].map((level) => (
                      <button
                        key={level}
                        onClick={(e) => {
                          e.stopPropagation()
                          updateCompetencyLevel(competency.id, level)
                        }}
                        className={`px-4 py-2 rounded-lg border-2 transition-all ${
                          currentLevel >= level
                            ? 'border-green-500 bg-green-500/20 text-green-400'
                            : 'border-slate-700 bg-slate-700/50 text-gray-400 hover:border-slate-600'
                        }`}
                      >
                        Level {level}
                      </button>
                    ))}
                  </div>

                  {/* Level Description */}
                  {currentLevel > 0 && (
                    <div className="mt-4 p-4 bg-slate-700/50 rounded-lg">
                      <div className="text-sm font-semibold mb-2">
                        {competencyLevels[currentLevel as keyof typeof competencyLevels].name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {competencyLevels[currentLevel as keyof typeof competencyLevels].description}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Competency Detail Modal */}
      {selectedCompetency && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 border border-slate-700 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">
                {mandatoryCompetencies.find(c => c.id === selectedCompetency)?.name}
              </h3>
              <button
                onClick={() => setSelectedCompetency(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            {/* Add detailed view here */}
          </motion.div>
        </div>
      )}
    </div>
  )
}

