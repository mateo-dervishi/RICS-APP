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
import LoginGateway from './components/LoginGateway'
import AppLayout from './components/AppLayout'
import TextbookViewer from './components/TextbookViewer'
import { useApp } from './context/AppContext'

export default function Home() {
  const { state, login, signup } = useApp()
  const [currentView, setCurrentView] = useState<string>('dashboard')
  const [userProfile, setUserProfile] = useState({
    currentLevel: 'student',
    selectedPathway: undefined as string | undefined
  })

  // Listen for navigation events from components
  React.useEffect(() => {
    const handleNavigate = (event: CustomEvent) => {
      const view = event.detail
      if (view) {
        setCurrentView(view)
      }
    }

    window.addEventListener('navigateTo', handleNavigate as EventListener)
    return () => {
      window.removeEventListener('navigateTo', handleNavigate as EventListener)
    }
  }, [])

  // Show login gateway if not authenticated
  if (!state.auth.isAuthenticated) {
    return (
      <LoginGateway 
        onLogin={login}
        onSignup={signup}
      />
    )
  }

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
      case 'textbooks':
        return <TextbookViewer />
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

  // Use new AppLayout for all views
  return (
    <AppLayout currentView={currentView} onNavigate={setCurrentView}>
      {renderView()}
    </AppLayout>
  )
}
