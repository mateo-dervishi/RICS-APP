'use client'

import React, { useState } from 'react'
import Dashboard from './components/Dashboard'
import PathwayAdvisor from './components/PathwayAdvisor'
import CompetencyTracker from './components/CompetencyTracker'
import CPDTracker from './components/CPDTracker'
import ExperienceDiary from './components/ExperienceDiary'
import FinancialPlanner from './components/FinancialPlanner'
import StudentModule from './components/StudentModule'
import AcademicAssessment from './components/AcademicAssessment'
import AssocRICSModule from './components/AssocRICSModule'
import MRICSRoutes from './components/MRICSRoutes'
import FRICSModule from './components/FRICSModule'
import DocumentsCenter from './components/DocumentsCenter'
import AssessmentPrep from './components/AssessmentPrep'
import Network from './components/Network'
import Analytics from './components/Analytics'
import Settings from './components/Settings'
import RICSAgent from './components/RICSAgent'

export default function Home() {
  const [currentView, setCurrentView] = useState<string>('dashboard')
  const [userProfile, setUserProfile] = useState({
    currentLevel: 'student',
    selectedPathway: undefined as string | undefined
  })

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard
            currentLevel={userProfile.currentLevel}
            selectedPathway={userProfile.selectedPathway}
            onNavigate={setCurrentView}
          />
        )
      case 'pathway-advisor':
        return <PathwayAdvisor />
      case 'student':
        return <StudentModule />
      case 'academic':
        return <AcademicAssessment />
      case 'assocrics':
        return <AssocRICSModule />
      case 'mrics':
        return <MRICSRoutes />
      case 'frics':
        return <FRICSModule />
      case 'competencies':
        return <CompetencyTracker />
      case 'experience':
        return <ExperienceDiary />
      case 'cpd':
        return <CPDTracker />
      case 'documents':
        return <DocumentsCenter />
      case 'assessment':
        return <AssessmentPrep />
      case 'financial':
        return <FinancialPlanner />
      case 'network':
        return <Network />
      case 'analytics':
        return <Analytics />
      case 'settings':
        return <Settings />
      case 'rics-agent':
        return <RICSAgent />
      default:
        return (
          <Dashboard
            currentLevel={userProfile.currentLevel}
            selectedPathway={userProfile.selectedPathway}
            onNavigate={setCurrentView}
          />
        )
    }
  }

  // If we're on a specific module view, render it with back button
  if (currentView !== 'dashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <span>←</span>
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
        {renderView()}
      </div>
    )
  }

  // Otherwise render the dashboard which handles its own navigation
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {renderView()}
    </div>
  )
}
