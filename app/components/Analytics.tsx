'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Target, Clock, Award, CheckCircle2 } from 'lucide-react'

export default function Analytics() {
  const [timeframe, setTimeframe] = useState('all')

  const stats = {
    overallProgress: 0,
    competencies: { completed: 0, total: 11, percentage: 0 },
    cpd: { hours: 0, target: 48, percentage: 0 },
    experience: { days: 0, target: 400, percentage: 0 },
    documents: { completed: 0, total: 5 },
    assessments: { passed: 0, total: 0 }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2 flex items-center">
          <BarChart3 className="w-8 h-8 mr-3 text-fuchsia-400" />
          Analytics & Progress
        </h2>
        <p className="text-gray-400">Track your progress and performance metrics</p>
      </div>

      {/* Timeframe Selector */}
      <div className="mb-6">
        <div className="flex space-x-2">
          {['week', 'month', 'year', 'all'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-2 rounded-lg capitalize ${
                timeframe === tf
                  ? 'bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/50'
                  : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Overall Progress</span>
            <TrendingUp className="w-5 h-5 text-fuchsia-400" />
          </div>
          <div className="text-3xl font-bold text-fuchsia-400">{stats.overallProgress}%</div>
          <div className="w-full bg-slate-700 rounded-full h-2 mt-3">
            <div className="bg-fuchsia-500 h-2 rounded-full" style={{ width: `${stats.overallProgress}%` }} />
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Competencies</span>
            <Target className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-blue-400">
            {stats.competencies.completed}/{stats.competencies.total}
          </div>
          <div className="text-sm text-gray-400 mt-1">{stats.competencies.percentage}% complete</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">CPD Hours</span>
            <Clock className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-green-400">
            {stats.cpd.hours}/{stats.cpd.target}
          </div>
          <div className="text-sm text-gray-400 mt-1">{stats.cpd.percentage}% complete</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Experience Days</span>
            <Award className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="text-3xl font-bold text-yellow-400">
            {stats.experience.days}/{stats.experience.target}
          </div>
          <div className="text-sm text-gray-400 mt-1">{stats.experience.percentage}% complete</div>
        </div>
      </div>

      {/* Detailed Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Competency Progress</h3>
          <div className="space-y-3">
            {['Ethics', 'Client Care', 'Communication', 'Health & Safety'].map((comp, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">{comp}</span>
                  <span className="text-gray-400">0%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Activity Timeline</h3>
          <div className="space-y-3">
            <div className="text-center py-12 text-gray-400">
              <BarChart3 className="w-12 h-12 mx-auto mb-3 text-gray-600" />
              <p>No activity data yet</p>
              <p className="text-sm mt-2">Start tracking to see your progress</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Document Status</h3>
          <div className="space-y-3">
            {[
              'Summary of Experience',
              'Case Study',
              'CPD Record',
              'Preliminary Review',
              'FRICS Application'
            ].map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <span className="text-sm">{doc}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full" />
                  <span className="text-xs text-gray-400">Not Started</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Achievements</h3>
          <div className="space-y-3">
            <div className="text-center py-12 text-gray-400">
              <Award className="w-12 h-12 mx-auto mb-3 text-gray-600" />
              <p>No achievements yet</p>
              <p className="text-sm mt-2">Complete milestones to unlock achievements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

