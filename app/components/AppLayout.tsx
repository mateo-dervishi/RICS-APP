'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Sparkles,
  GraduationCap,
  BookOpen,
  Briefcase,
  Target,
  Award,
  ClipboardList,
  FileText,
  Calculator,
  Users,
  BarChart3,
  Settings,
  Menu,
  X,
  ChevronRight,
  Home
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import ProfilePicture from './ProfilePicture'

interface AppLayoutProps {
  children: React.ReactNode
  currentView: string
  onNavigate: (view: string) => void
}

interface NavItem {
  id: string
  label: string
  icon: any
  color: string
  category?: string
  badge?: number
}

export default function AppLayout({ children, currentView, onNavigate }: AppLayoutProps) {
  const { state, calculateProgress, updateProfilePicture, logout } = useApp()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const progress = calculateProgress()

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'text-purple-400', category: 'main' },
    { id: 'rics-agent', label: 'RICS Agent', icon: Sparkles, color: 'text-indigo-400', category: 'main', badge: 1 },
    { id: 'pathway-advisor', label: 'Pathway Advisor', icon: Target, color: 'text-pink-400', category: 'main' },
    
    { id: 'student', label: 'Student', icon: GraduationCap, color: 'text-blue-400', category: 'pathways' },
    { id: 'academic', label: 'Academic', icon: BookOpen, color: 'text-green-400', category: 'pathways' },
    { id: 'assocrics', label: 'AssocRICS', icon: Briefcase, color: 'text-yellow-400', category: 'pathways' },
    { id: 'mrics', label: 'MRICS Routes', icon: Target, color: 'text-purple-400', category: 'pathways' },
    { id: 'frics', label: 'FRICS', icon: Award, color: 'text-orange-400', category: 'pathways' },
    
    { id: 'competencies', label: 'Competencies', icon: ClipboardList, color: 'text-indigo-400', category: 'tracking' },
    { id: 'experience', label: 'Experience', icon: BookOpen, color: 'text-teal-400', category: 'tracking' },
    { id: 'cpd', label: 'CPD Tracker', icon: GraduationCap, color: 'text-emerald-400', category: 'tracking' },
    { id: 'documents', label: 'Documents', icon: FileText, color: 'text-rose-400', category: 'tracking' },
    
    { id: 'assessment', label: 'Assessment Prep', icon: Target, color: 'text-violet-400', category: 'preparation' },
    { id: 'financial', label: 'Financial Planning', icon: Calculator, color: 'text-amber-400', category: 'preparation' },
    
    { id: 'network', label: 'Network', icon: Users, color: 'text-sky-400', category: 'community' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'text-fuchsia-400', category: 'community' },
    { id: 'textbooks', label: 'Textbooks', icon: BookOpen, color: 'text-amber-400', category: 'main' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'text-gray-400', category: 'main' },
  ]

  const categories = {
    main: 'Main',
    pathways: 'Pathways',
    tracking: 'Tracking',
    preparation: 'Preparation',
    community: 'Community'
  }

  const groupedNavItems = Object.entries(categories).map(([key, label]) => ({
    category: label,
    items: navItems.filter(item => item.category === key)
  }))

  const isActive = (id: string) => currentView === id

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 rounded-lg border border-slate-700"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || mobileMenuOpen) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`
              fixed lg:sticky top-0 h-screen w-72 bg-slate-900/95 backdrop-blur-xl border-r border-slate-800 
              z-40 overflow-y-auto flex flex-col
              ${mobileMenuOpen ? 'block' : 'hidden lg:flex'}
            `}
          >
            {/* Sidebar Header */}
            <div className="p-6 border-b border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="font-bold text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      RICS Platform
                    </h1>
                    <p className="text-xs text-gray-400">Journey Tracker</p>
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-1 hover:bg-slate-800 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* User Profile Section */}
              <div className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg">
                <ProfilePicture
                  size="sm"
                  initialImage={state.auth.user?.profilePicture || null}
                  onImageChange={updateProfilePicture}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{state.auth.user?.name || 'User'}</p>
                  <p className="text-xs text-gray-400 truncate">{state.auth.user?.email || ''}</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="p-2 bg-slate-800/50 rounded-lg">
                  <div className="text-xs text-gray-400">Progress</div>
                  <div className="text-lg font-bold text-purple-400">{progress.overall}%</div>
                </div>
                <div className="p-2 bg-slate-800/50 rounded-lg">
                  <div className="text-xs text-gray-400">Level</div>
                  <div className="text-lg font-bold text-blue-400 capitalize">{state.profile.currentLevel || 'Student'}</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
              {groupedNavItems.map((group, groupIndex) => (
                <div key={group.category}>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                    {group.category}
                  </h3>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon
                      const active = isActive(item.id)
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            onNavigate(item.id)
                            setMobileMenuOpen(false)
                          }}
                          className={`
                            w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all group
                            ${active
                              ? 'bg-purple-500/20 text-purple-300 border-l-2 border-purple-500'
                              : 'text-gray-400 hover:bg-slate-800/50 hover:text-white'
                            }
                          `}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className={`w-5 h-5 ${active ? item.color : 'text-gray-500 group-hover:text-purple-400'}`} />
                            <span className="text-sm font-medium">{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                              {item.badge}
                            </span>
                          )}
                          {active && <ChevronRight className="w-4 h-4" />}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-slate-800">
              <button
                onClick={() => {
                  logout()
                  if (typeof window !== 'undefined') {
                    window.location.reload()
                  }
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 text-gray-400 hover:bg-slate-800/50 hover:text-red-400 rounded-lg transition-all"
              >
                <X className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {!sidebarOpen && (
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="hidden lg:block p-2 hover:bg-slate-800 rounded-lg"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                )}
                <div>
                  <h2 className="text-xl font-semibold">
                    {navItems.find(item => item.id === currentView)?.label || 'Dashboard'}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {currentView === 'dashboard' 
                      ? 'Overview of your RICS journey'
                      : 'Manage your RICS pathway progress'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Progress Indicator */}
                <div className="hidden md:flex items-center space-x-3 px-4 py-2 bg-slate-800/50 rounded-lg">
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Overall Progress</div>
                    <div className="text-sm font-semibold text-purple-400">{progress.overall}%</div>
                  </div>
                  <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                      style={{ width: `${progress.overall}%` }}
                    />
                  </div>
                </div>

                {/* Profile Picture */}
                <div className="hidden md:block">
                  <ProfilePicture
                    size="sm"
                    initialImage={state.auth.user?.profilePicture || null}
                    onImageChange={updateProfilePicture}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}

