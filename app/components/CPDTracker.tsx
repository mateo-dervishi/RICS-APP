'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Clock, GraduationCap, BookOpen, Users, FileText, Calendar, TrendingUp, Edit, Trash2 } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function CPDTracker() {
  const { state, addCPD, updateCPD, deleteCPD, calculateProgress } = useApp()
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const activities = state.cpd
  const targetHours = state.profile.currentLevel === 'mrics' ? 48 : 20
  const totalHours = activities.reduce((sum, activity) => sum + activity.hours, 0)
  const formalHours = activities.filter(a => a.type === 'formal').reduce((sum, a) => sum + a.hours, 0)
  const informalHours = activities.filter(a => a.type === 'informal').reduce((sum, a) => sum + a.hours, 0)
  const progress = Math.min((totalHours / targetHours) * 100, 100)

  const handleAddActivity = (activity: any) => {
    addCPD(activity)
    setShowAddForm(false)
  }

  const handleUpdateActivity = (id: string, activity: any) => {
    updateCPD(id, activity)
    setEditingId(null)
  }

  const handleDeleteActivity = (id: string) => {
    if (confirm('Are you sure you want to delete this CPD activity?')) {
      deleteCPD(id)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">CPD Tracker</h2>
        <p className="text-gray-400">Track your Continuing Professional Development activities</p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Total Hours</span>
            <span className="text-2xl font-bold text-purple-400">{totalHours}</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm text-gray-400 mt-2">{totalHours} / {targetHours} hours</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Formal</span>
            <span className="text-2xl font-bold text-blue-400">{formalHours}</span>
          </div>
          <div className="text-sm text-gray-400">Courses, seminars</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Informal</span>
            <span className="text-2xl font-bold text-green-400">{informalHours}</span>
          </div>
          <div className="text-sm text-gray-400">Reading, research</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Remaining</span>
            <span className={`text-2xl font-bold ${targetHours - totalHours > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
              {Math.max(0, targetHours - totalHours)}
            </span>
          </div>
          <div className="text-sm text-gray-400">Hours needed</div>
        </div>
      </div>

      {/* Add Activity Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
        >
          <Plus className="w-5 h-5" />
          <span>Add CPD Activity</span>
        </button>
      </div>

      {/* Activities List */}
      <div className="space-y-3">
        {activities.length === 0 ? (
          <div className="text-center py-12 bg-slate-800/50 border border-slate-700 rounded-xl">
            <GraduationCap className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No CPD activities logged yet</p>
            <p className="text-sm text-gray-500 mt-2">Click "Add CPD Activity" to get started</p>
          </div>
        ) : (
          activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {activity.type === 'formal' ? (
                      <GraduationCap className="w-5 h-5 text-blue-400" />
                    ) : (
                      <BookOpen className="w-5 h-5 text-green-400" />
                    )}
                    <h3 className="text-lg font-semibold">{activity.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${
                      activity.type === 'formal' 
                        ? 'bg-blue-500/20 text-blue-400' 
                        : 'bg-green-500/20 text-green-400'
                    }`}>
                      {activity.type}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-3">{activity.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(activity.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{activity.hours} hours</span>
                    </div>
                      {activity.competencyLink && (
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4" />
                          <span>Linked to competency</span>
                        </div>
                      )}
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => setEditingId(activity.id)}
                      className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteActivity(activity.id)}
                      className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add Activity Form Modal */}
      {showAddForm && (
        <CPDActivityForm
          onSave={handleAddActivity}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Edit Activity Form Modal */}
      {editingId && (
        <CPDActivityForm
          activity={activities.find(a => a.id === editingId)}
          onSave={(activity) => handleUpdateActivity(editingId, activity)}
          onCancel={() => setEditingId(null)}
        />
      )}
    </div>
  )
}

function CPDActivityForm({ 
  activity, 
  onSave, 
  onCancel 
}: { 
  activity?: any
  onSave: (activity: any) => void
  onCancel: () => void 
}) {
  const [formData, setFormData] = useState({
    date: activity?.date || new Date().toISOString().split('T')[0],
    title: activity?.title || '',
    type: (activity?.type || 'formal') as 'formal' | 'informal',
    hours: activity?.hours || 1,
    description: activity?.description || '',
    competencyLink: activity?.competencyLink || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      date: formData.date,
      title: formData.title,
      type: formData.type,
      hours: formData.hours,
      description: formData.description,
      competencyLink: formData.competencyLink || undefined
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-800 border border-slate-700 rounded-xl p-8 max-w-2xl w-full"
      >
        <h3 className="text-2xl font-bold mb-6">Add CPD Activity</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Activity Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'formal' | 'informal' })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg"
              >
                <option value="formal">Formal (Courses, Seminars)</option>
                <option value="informal">Informal (Reading, Research)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Hours</label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                required
              />
            </div>
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

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
            >
              Save Activity
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

