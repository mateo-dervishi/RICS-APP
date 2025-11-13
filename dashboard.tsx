'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Target,
  BookOpen,
  Users,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  Bell,
  Search,
  Plus,
  ChevronDown,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Award,
  Briefcase,
  GraduationCap
} from 'lucide-react'

interface CompetencyData {
  name: string
  level: number
  required: number
  status: 'complete' | 'in-progress' | 'not-started'
  evidence: number
}

export default function Dashboard() {
  const [selectedView, setSelectedView] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')

  const competencies: CompetencyData[] = [
    { name: 'Ethics & Professional Practice', level: 3, required: 3, status: 'complete', evidence: 12 },
    { name: 'Client Care', level: 2, required: 2, status: 'complete', evidence: 8 },
    { name: 'Communication & Negotiation', level: 2, required: 2, status: 'in-progress', evidence: 6 },
    { name: 'Health & Safety', level: 1, required: 2, status: 'in-progress', evidence: 3 },
    { name: 'Accounting Principles', level: 1, required: 1, status: 'complete', evidence: 4 },
    { name: 'Business Planning', level: 0, required: 1, status: 'not-started', evidence: 0 }
  ]

  const upcomingTasks = [
    { title: 'Submit Q3 CPD Log', due: '2 days', type: 'cpd', priority: 'high' },
    { title: 'Case Study Draft Review', due: '5 days', type: 'document', priority: 'medium' },
    { title: 'Monthly Counsellor Meeting', due: '1 week', type: 'meeting', priority: 'medium' },
    { title: 'Ethics Module Completion', due: '2 weeks', type: 'training', priority: 'low' }
  ]

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Overview', value: 'overview' },
    { icon: Target, label: 'Competencies', value: 'competencies' },
    { icon: BookOpen, label: 'Experience Diary', value: 'diary' },
    { icon: FileText, label: 'Documents', value: 'documents' },
    { icon: Users, label: 'Mentorship', value: 'mentorship' },
    { icon: Calendar, label: 'Calendar', value: 'calendar' },
    { icon: BarChart3, label: 'Analytics', value: 'analytics' },
    { icon: Settings, label: 'Settings', value: 'settings' }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-64 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800"
      >
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg">RICS Journey</h1>
              <p className="text-xs text-gray-400">MRICS Pathway</p>
            </div>
          </div>

          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.value}
                  onClick={() => setSelectedView(item.value)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    selectedView === item.value
                      ? 'bg-purple-500/20 text-purple-300 border-l-2 border-purple-500'
                      : 'hover:bg-slate-800/50 text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full" />
            <div className="flex-1">
              <p className="text-sm font-medium">John Smith</p>
              <p className="text-xs text-gray-400">APC Candidate</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-slate-900/30 backdrop-blur-xl border-b border-slate-800 px-8 py-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search competencies, documents, CPD..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:border-purple-500 text-sm"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 hover:bg-slate-800/50 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium text-sm hover:from-purple-600 hover:to-pink-600 transition-all flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Quick Add</span>
              </button>
            </div>
          </div>
        </motion.header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Overall Progress', value: '73%', change: '+5%', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
              { label: 'Competencies', value: '15/22', change: '68%', icon: Target, color: 'from-blue-500 to-cyan-500' },
              { label: 'CPD Hours', value: '38/48', change: '79%', icon: Clock, color: 'from-green-500 to-emerald-500' },
              { label: 'Days to Assessment', value: '127', change: 'On track', icon: Calendar, color: 'from-orange-500 to-red-500' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg p-2`}>
                    <stat.icon className="w-full h-full text-white" />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <span className="text-xs text-green-400">{stat.change}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Competency Progress */}
            <div className="col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Competency Progress</h2>
                  <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                    View all →
                  </button>
                </div>

                <div className="space-y-4">
                  {competencies.map((competency, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          {competency.status === 'complete' && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                          {competency.status === 'in-progress' && <Clock className="w-5 h-5 text-yellow-400" />}
                          {competency.status === 'not-started' && <AlertCircle className="w-5 h-5 text-gray-400" />}
                          <span className="font-medium">{competency.name}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-400">{competency.evidence} evidence items</span>
                          <span className="text-sm font-medium">
                            Level {competency.level}/{competency.required}
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(competency.level / competency.required) * 100}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className={`h-full ${
                            competency.status === 'complete' ? 'bg-green-500' :
                            competency.status === 'in-progress' ? 'bg-yellow-500' :
                            'bg-gray-500'
                          }`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Upcoming Tasks */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Upcoming Tasks</h2>
                  <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                    View calendar →
                  </button>
                </div>

                <div className="space-y-3">
                  {upcomingTasks.map((task, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-3 bg-slate-800/30 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-all cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          task.priority === 'high' ? 'bg-red-400' :
                          task.priority === 'medium' ? 'bg-yellow-400' :
                          'bg-green-400'
                        }`} />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{task.title}</p>
                          <p className="text-xs text-gray-400 mt-1">Due in {task.due}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 mt-6"
              >
                <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full px-4 py-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left text-sm font-medium transition-colors">
                    + Add Experience Entry
                  </button>
                  <button className="w-full px-4 py-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left text-sm font-medium transition-colors">
                    + Log CPD Activity
                  </button>
                  <button className="w-full px-4 py-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left text-sm font-medium transition-colors">
                    + Schedule Meeting
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
