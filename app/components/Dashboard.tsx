'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  Target,
  GraduationCap,
  Calendar,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus
} from 'lucide-react'
import { useApp } from '../context/AppContext'

interface DashboardProps {
  currentLevel: string
  selectedPathway?: string
  onNavigate?: (module: string) => void
}

export default function Dashboard({ currentLevel, selectedPathway, onNavigate }: DashboardProps) {
  const { state, calculateProgress } = useApp()
  const progress = calculateProgress()
  
  const handleModuleClick = (moduleId: string) => {
    if (onNavigate) {
      onNavigate(moduleId)
    }
  }

  // Quick actions
  const quickActions = [
    {
      id: 'competencies',
      title: 'Add Competency',
      description: 'Log a new competency achievement',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      action: () => handleModuleClick('competencies')
    },
    {
      id: 'experience',
      title: 'Log Experience',
      description: 'Record a new project experience',
      icon: Calendar,
      color: 'from-green-500 to-emerald-500',
      action: () => handleModuleClick('experience')
    },
    {
      id: 'cpd',
      title: 'Add CPD Activity',
      description: 'Track continuing professional development',
      icon: GraduationCap,
      color: 'from-purple-500 to-pink-500',
      action: () => handleModuleClick('cpd')
    },
    {
      id: 'documents',
      title: 'Create Document',
      description: 'Start a new assessment document',
      icon: Sparkles,
      color: 'from-orange-500 to-red-500',
      action: () => handleModuleClick('documents')
    }
  ]

  // Recent activity (mock data)
  const recentActivity = [
    {
      type: 'competency',
      title: 'Ethics & Professionalism',
      description: 'Updated to Level 2',
      time: '2 hours ago',
      icon: CheckCircle2,
      color: 'text-green-400'
    },
    {
      type: 'experience',
      title: 'New Experience Entry',
      description: 'Commercial Building Survey',
      time: '1 day ago',
      icon: Calendar,
      color: 'text-blue-400'
    },
    {
      type: 'cpd',
      title: 'CPD Activity Added',
      description: 'RICS Ethics Workshop - 4 hours',
      time: '2 days ago',
      icon: GraduationCap,
      color: 'text-purple-400'
    }
  ]

  // Upcoming tasks
  const upcomingTasks = [
    {
      title: 'Complete Competency Evidence',
      due: '3 days',
      priority: 'high',
      module: 'competencies'
    },
    {
      title: 'Submit Q1 CPD Log',
      due: '1 week',
      priority: 'medium',
      module: 'cpd'
    },
    {
      title: 'Review Case Study Draft',
      due: '2 weeks',
      priority: 'low',
      module: 'documents'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {state.auth.user?.name || 'User'}!
            </h1>
            <p className="text-gray-300">
              You're making great progress on your RICS journey. Keep it up!
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <div className="text-right">
              <div className="text-sm text-gray-400">Current Level</div>
              <div className="text-lg font-semibold capitalize">{currentLevel || 'Not Set'}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { 
            label: 'Overall Progress', 
            value: `${progress.overall}%`, 
            icon: TrendingUp, 
            color: 'from-purple-500 to-pink-500',
            progress: progress.overall
          },
          { 
            label: 'Competencies', 
            value: `${Object.values(state.competencies).filter(c => c.level >= 1).length}/11`, 
            icon: Target, 
            color: 'from-blue-500 to-cyan-500',
            progress: progress.competencies
          },
          { 
            label: 'CPD Hours', 
            value: `${state.cpd.reduce((sum, a) => sum + a.hours, 0)}/${state.profile.currentLevel === 'mrics' ? 48 : 20}`, 
            icon: GraduationCap, 
            color: 'from-green-500 to-emerald-500',
            progress: progress.cpd
          },
          { 
            label: 'Experience Days', 
            value: `${state.experience.length}/${state.profile.selectedRoute === 'structured24' ? 400 : 200}`, 
            icon: Calendar, 
            color: 'from-yellow-500 to-amber-500',
            progress: progress.experience
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all cursor-pointer group"
            onClick={() => {
              if (stat.label === 'Competencies') handleModuleClick('competencies')
              if (stat.label === 'CPD Hours') handleModuleClick('cpd')
              if (stat.label === 'Experience Days') handleModuleClick('experience')
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stat.progress}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className={`h-2 rounded-full bg-gradient-to-r ${stat.color}`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
          <button
            onClick={() => handleModuleClick('pathway-advisor')}
            className="text-sm text-purple-400 hover:text-purple-300 flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={action.action}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-5 hover:border-purple-500 transition-all text-left group"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold mb-1">{action.title}</h3>
                <p className="text-sm text-gray-400">{action.description}</p>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <button className="text-sm text-purple-400 hover:text-purple-300">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => {
                const Icon = activity.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm mb-1">{activity.title}</h3>
                      <p className="text-sm text-gray-400">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                )
              })
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Clock className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                <p>No recent activity</p>
                <p className="text-sm mt-2">Start tracking to see your progress here</p>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Upcoming Tasks</h2>
            <Plus className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {upcomingTasks.map((task, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 bg-slate-700/30 rounded-lg border-l-2 border-purple-500/50 hover:bg-slate-700/50 transition-colors cursor-pointer"
                onClick={() => handleModuleClick(task.module)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-sm">{task.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                    task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {task.priority}
                  </span>
                </div>
                <p className="text-xs text-gray-400">Due in {task.due}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Start with Pathway Advisor',
              description: 'Get personalized recommendations for your RICS journey',
              icon: Sparkles,
              color: 'text-purple-400',
              action: () => handleModuleClick('pathway-advisor')
            },
            {
              title: 'Set Your Pathway',
              description: 'Choose your specialization and membership level',
              icon: Target,
              color: 'text-blue-400',
              action: () => handleModuleClick('pathway-advisor')
            },
            {
              title: 'Track Your Progress',
              description: 'Log experience, competencies, and CPD activities',
              icon: TrendingUp,
              color: 'text-green-400',
              action: () => handleModuleClick('competencies')
            }
          ].map((item, index) => {
            const Icon = item.icon
            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={item.action}
                className="p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors text-left group"
              >
                <Icon className={`w-6 h-6 ${item.color} mb-2 group-hover:scale-110 transition-transform`} />
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
