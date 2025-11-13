'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Calendar, Briefcase, Target, FileText, TrendingUp, Edit, Trash2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { mandatoryCompetencies } from '../data/competencies'

export default function ExperienceDiary() {
  const { state, addExperience, updateExperience, deleteExperience, calculateProgress } = useApp()
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [filterCompetency, setFilterCompetency] = useState<string>('')

  const entries = state.experience
  const progressData = calculateProgress()
  const targetDays = state.profile.selectedRoute === 'structured24' ? 400 : 200
  const totalDays = entries.length
  const progress = Math.min((totalDays / targetDays) * 100, 100)

  const handleAddEntry = (entry: any) => {
    addExperience(entry)
    setShowAddForm(false)
  }

  const handleUpdateEntry = (id: string, entry: any) => {
    updateExperience(id, entry)
    setEditingId(null)
  }

  const handleDeleteEntry = (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      deleteExperience(id)
    }
  }

  const filteredEntries = filterCompetency
    ? entries.filter(e => e.competencies && e.competencies.some(c => c.toLowerCase().includes(filterCompetency.toLowerCase())))
    : entries

  const competencyOptions = mandatoryCompetencies.map(c => c.name)

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Experience Diary</h2>
        <p className="text-gray-400">Log your practical experience and link to competencies</p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Experience Days</span>
            <span className="text-2xl font-bold text-purple-400">{totalDays}</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm text-gray-400 mt-2">{totalDays} / {targetDays} days</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Projects</span>
            <span className="text-2xl font-bold text-blue-400">{new Set(entries.map(e => e.projectName)).size}</span>
          </div>
          <div className="text-sm text-gray-400">Unique projects</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Competencies</span>
            <span className="text-2xl font-bold text-green-400">
              {new Set(entries.flatMap(e => e.competencies)).size}
            </span>
          </div>
          <div className="text-sm text-gray-400">Linked competencies</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
        >
          <Plus className="w-5 h-5" />
          <span>Add Experience Entry</span>
        </button>

        <select
          value={filterCompetency}
          onChange={(e) => setFilterCompetency(e.target.value)}
          className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg"
        >
          <option value="">All Competencies</option>
          {competencyOptions.map(comp => (
            <option key={comp} value={comp}>{comp}</option>
          ))}
        </select>
      </div>

      {/* Entries List */}
      <div className="space-y-3">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12 bg-slate-800/50 border border-slate-700 rounded-xl">
            <Briefcase className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No experience entries yet</p>
            <p className="text-sm text-gray-500 mt-2">Click "Add Experience Entry" to get started</p>
          </div>
        ) : (
          filteredEntries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Briefcase className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-semibold">{entry.projectName}</h3>
                    {entry.contractValue && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                        £{entry.contractValue.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="text-gray-400 mb-3">{entry.description}</div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(entry.date).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Client: </span>
                      <span>{entry.client}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Role: </span>
                      <span>{entry.role}</span>
                    </div>
                  </div>
                  {entry.competencies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {entry.competencies.map((comp, i) => (
                        <span key={i} className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                          {comp}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add Entry Form Modal */}
      {showAddForm && (
        <ExperienceEntryForm
          onSave={handleAddEntry}
          onCancel={() => setShowAddForm(false)}
          competencyOptions={competencyOptions}
        />
      )}
    </div>
  )
}

function ExperienceEntryForm({ 
  entry, 
  onSave, 
  onCancel,
  competencyOptions 
}: { 
  entry?: any
  onSave: (entry: any) => void
  onCancel: () => void
  competencyOptions: string[]
}) {
  const [formData, setFormData] = useState({
    date: entry?.date || new Date().toISOString().split('T')[0],
    projectName: entry?.projectName || '',
    client: entry?.client || '',
    role: entry?.role || '',
    description: entry?.description || '',
    competencies: entry?.competencies || [] as string[],
    contractValue: entry?.contractValue?.toString() || '',
    contractType: entry?.contractType || '',
    lessonsLearned: entry?.lessonsLearned || ''
  })

  const toggleCompetency = (comp: string) => {
    setFormData({
      ...formData,
      competencies: formData.competencies.includes(comp)
        ? formData.competencies.filter(c => c !== comp)
        : [...formData.competencies, comp]
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      date: formData.date,
      projectName: formData.projectName,
      client: formData.client,
      role: formData.role,
      description: formData.description,
      competencies: formData.competencies,
      contractValue: formData.contractValue ? parseFloat(formData.contractValue) : undefined,
      contractType: formData.contractType || undefined,
      lessonsLearned: formData.lessonsLearned || undefined
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-800 border border-slate-700 rounded-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <h3 className="text-2xl font-bold mb-6">Add Experience Entry</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Project Name</label>
              <input
                type="text"
                value={formData.projectName}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Client</label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Your Role</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Competencies Demonstrated</label>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {competencyOptions.map((comp) => (
                <button
                  key={comp}
                  type="button"
                  onClick={() => toggleCompetency(comp)}
                  className={`px-3 py-1 rounded-lg border-2 transition-all text-sm ${
                    formData.competencies.includes(comp)
                      ? 'border-purple-500 bg-purple-500/20 text-purple-400'
                      : 'border-slate-600 bg-slate-700 text-gray-400'
                  }`}
                >
                  {comp}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Contract Value (£)</label>
              <input
                type="number"
                value={formData.contractValue}
                onChange={(e) => setFormData({ ...formData, contractValue: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Contract Type</label>
              <input
                type="text"
                value={formData.contractType}
                onChange={(e) => setFormData({ ...formData, contractType: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Lessons Learned</label>
            <textarea
              value={formData.lessonsLearned}
              onChange={(e) => setFormData({ ...formData, lessonsLearned: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg"
              rows={3}
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
            >
              Save Entry
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

