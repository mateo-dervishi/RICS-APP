'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, AlertCircle, Target, TrendingUp, FileText, Link, X } from 'lucide-react'
import { mandatoryCompetencies, competencyLevels } from '../data/competencies'
import { useApp } from '../context/AppContext'

export default function CompetencyTracker() {
  const { state, updateCompetency } = useApp()
  const [selectedCompetency, setSelectedCompetency] = useState<string | null>(null)
  const [newEvidence, setNewEvidence] = useState('')
  const competencies = state.competencies

  const updateCompetencyLevel = (id: string, level: number) => {
    updateCompetency(id, level, competencies[id]?.evidence || [])
  }

  const addEvidence = (id: string) => {
    if (newEvidence.trim()) {
      const currentEvidence = competencies[id]?.evidence || []
      updateCompetency(id, competencies[id]?.level || 0, [...currentEvidence, newEvidence.trim()])
      setNewEvidence('')
    }
  }

  const removeEvidence = (id: string, index: number) => {
    const currentEvidence = competencies[id]?.evidence || []
    updateCompetency(id, competencies[id]?.level || 0, currentEvidence.filter((_, i) => i !== index))
  }

  const linkExperience = (compId: string) => {
    const availableProjects = state.experience.filter(exp => 
      exp.competencies && exp.competencies.some(c => c.toLowerCase().includes(compId.split('-')[0]))
    )
    if (availableProjects.length > 0) {
      const project = availableProjects[0]
      const evidenceText = `${project.projectName} - ${project.description.substring(0, 100)}...`
      const currentEvidence = competencies[compId]?.evidence || []
      if (!currentEvidence.includes(evidenceText)) {
        updateCompetency(compId, competencies[compId]?.level || 0, [...currentEvidence, evidenceText])
      }
    }
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

                  {/* Evidence Preview */}
                  {progress?.evidence && progress.evidence.length > 0 && (
                    <div className="mt-4">
                      <div className="text-sm font-semibold mb-2 text-gray-400">Linked Evidence ({progress.evidence.length}):</div>
                      <div className="flex flex-wrap gap-2">
                        {progress.evidence.slice(0, 2).map((ev, i) => (
                          <span key={i} className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                            {ev.substring(0, 30)}...
                          </span>
                        ))}
                        {progress.evidence.length > 2 && (
                          <span className="px-2 py-1 bg-slate-700 text-gray-400 rounded text-xs">
                            +{progress.evidence.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

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
            className="bg-slate-800 border border-slate-700 rounded-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">
                {mandatoryCompetencies.find(c => c.id === selectedCompetency)?.name}
              </h3>
              <button
                onClick={() => {
                  setSelectedCompetency(null)
                  setNewEvidence('')
                }}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Evidence Management */}
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3">Evidence & Examples</h4>
                
                {/* Existing Evidence */}
                {competencies[selectedCompetency]?.evidence && competencies[selectedCompetency].evidence.length > 0 ? (
                  <div className="space-y-2 mb-4">
                    {competencies[selectedCompetency].evidence.map((ev, i) => (
                      <div key={i} className="flex items-start justify-between p-3 bg-slate-700/50 rounded-lg">
                        <span className="text-sm flex-1">{ev}</span>
                        <button
                          onClick={() => removeEvidence(selectedCompetency, i)}
                          className="ml-2 p-1 hover:bg-slate-600 rounded"
                        >
                          <X className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 mb-4">No evidence linked yet</p>
                )}

                {/* Add Evidence */}
                <div className="flex space-x-2 mb-4">
                  <input
                    type="text"
                    value={newEvidence}
                    onChange={(e) => setNewEvidence(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addEvidence(selectedCompetency)}
                    placeholder="Add evidence or example..."
                    className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                  />
                  <button
                    onClick={() => addEvidence(selectedCompetency)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
                  >
                    Add
                  </button>
                </div>

                {/* Link from Experience */}
                {state.experience.length > 0 && (
                  <button
                    onClick={() => linkExperience(selectedCompetency)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm"
                  >
                    <Link className="w-4 h-4" />
                    <span>Link from Experience Diary</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

