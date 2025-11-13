'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Target,
  FileText,
  BookOpen,
  GraduationCap,
  Calendar,
  Brain,
  Users,
  Award,
  Briefcase,
  Building,
  Sparkles,
  Calculator,
  ClipboardList,
  TrendingUp,
  Settings
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

  const modules = [
    { id: 'pathway-advisor', name: 'Pathway Advisor', icon: Sparkles, color: 'from-purple-500 to-pink-500' },
    { id: 'student', name: 'Student Module', icon: GraduationCap, color: 'from-blue-500 to-cyan-500' },
    { id: 'academic', name: 'Academic Assessment', icon: BookOpen, color: 'from-green-500 to-emerald-500' },
    { id: 'assocrics', name: 'AssocRICS', icon: Briefcase, color: 'from-yellow-500 to-amber-500' },
    { id: 'mrics', name: 'MRICS Routes', icon: Target, color: 'from-purple-500 to-pink-500' },
    { id: 'frics', name: 'FRICS', icon: Award, color: 'from-orange-500 to-red-500' },
    { id: 'competencies', name: 'Competencies', icon: ClipboardList, color: 'from-indigo-500 to-purple-500' },
    { id: 'experience', name: 'Experience Diary', icon: BookOpen, color: 'from-teal-500 to-cyan-500' },
    { id: 'cpd', name: 'CPD Tracker', icon: GraduationCap, color: 'from-emerald-500 to-green-500' },
    { id: 'documents', name: 'Documents', icon: FileText, color: 'from-rose-500 to-pink-500' },
    { id: 'assessment', name: 'Assessment Prep', icon: Target, color: 'from-violet-500 to-purple-500' },
    { id: 'financial', name: 'Financial Planning', icon: Calculator, color: 'from-amber-500 to-yellow-500' },
    { id: 'network', name: 'Network', icon: Users, color: 'from-sky-500 to-blue-500' },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, color: 'from-fuchsia-500 to-pink-500' }
  ]


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                RICS Pathway Platform
              </h1>
              <p className="text-gray-400 mt-1">Your comprehensive journey to RICS qualification</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-400">Current Level</div>
                <div className="font-semibold capitalize">{currentLevel || 'Not Set'}</div>
              </div>
              <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { 
              label: 'Overall Progress', 
              value: `${progress.overall}%`, 
              icon: TrendingUp, 
              color: 'text-purple-400',
              progress: progress.overall
            },
            { 
              label: 'Competencies', 
              value: `${Object.values(state.competencies).filter(c => c.level >= 1).length}/11`, 
              icon: Target, 
              color: 'text-blue-400',
              progress: progress.competencies
            },
            { 
              label: 'CPD Hours', 
              value: `${state.cpd.reduce((sum, a) => sum + a.hours, 0)}/${state.profile.currentLevel === 'mrics' ? 48 : 20}`, 
              icon: GraduationCap, 
              color: 'text-green-400',
              progress: progress.cpd
            },
            { 
              label: 'Experience Days', 
              value: `${state.experience.length}/${state.profile.selectedRoute === 'structured24' ? 400 : 200}`, 
              icon: Calendar, 
              color: 'text-yellow-400',
              progress: progress.experience
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                <div className="text-2xl font-bold">{stat.value}</div>
              </div>
              <div className="text-sm text-gray-400 mb-2">{stat.label}</div>
              {stat.progress !== undefined && (
                <div className="w-full bg-slate-700 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full transition-all ${
                      stat.color.includes('purple') ? 'bg-purple-500' :
                      stat.color.includes('blue') ? 'bg-blue-500' :
                      stat.color.includes('green') ? 'bg-green-500' :
                      'bg-yellow-500'
                    }`}
                    style={{ width: `${stat.progress}%` }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Module Grid */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Modules & Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {modules.map((module, index) => (
              <motion.button
                key={module.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleModuleClick(module.id)}
                className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-purple-500 transition-all text-left"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <module.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-1">{module.name}</h3>
                <p className="text-sm text-gray-400">Click to explore</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Getting Started</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <div>
                <div className="font-semibold">Start with Pathway Advisor</div>
                <div className="text-sm text-gray-400">Get personalized recommendations for your RICS journey</div>
              </div>
              <button
                onClick={() => handleModuleClick('pathway-advisor')}
                className="ml-auto px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
              >
                Start
              </button>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
              <Target className="w-5 h-5 text-blue-400" />
              <div>
                <div className="font-semibold">Set Your Pathway</div>
                <div className="text-sm text-gray-400">Choose your specialization and membership level</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
              <BookOpen className="w-5 h-5 text-green-400" />
              <div>
                <div className="font-semibold">Track Your Progress</div>
                <div className="text-sm text-gray-400">Log experience, competencies, and CPD activities</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

