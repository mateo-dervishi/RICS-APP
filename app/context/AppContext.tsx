'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface UserProfile {
  currentLevel: 'student' | 'graduate' | 'assocrics' | 'mrics' | 'frics'
  selectedPathway?: string
  selectedRoute?: string
  degreeType?: 'rics-accredited' | 'non-rics' | 'none'
  yearsExperience?: number
  specialization?: string
}

interface CompetencyProgress {
  [key: string]: {
    level: number
    evidence: string[]
    lastUpdated: string
  }
}

interface ExperienceEntry {
  id: string
  date: string
  projectName: string
  client: string
  role: string
  description: string
  competencies: string[]
  contractValue?: number
  contractType?: string
  lessonsLearned?: string
}

interface CPDActivity {
  id: string
  date: string
  title: string
  type: 'formal' | 'informal'
  hours: number
  description: string
  competencyLink?: string
  certificate?: string
}

interface Document {
  id: string
  type: string
  name: string
  content: string
  wordCount: number
  status: 'draft' | 'in-review' | 'completed'
  lastModified: string
  version: number
}

interface TimelineMilestone {
  id: string
  date: string
  title: string
  status: 'completed' | 'current' | 'upcoming'
  description?: string
}

interface AppState {
  profile: UserProfile
  competencies: CompetencyProgress
  experience: ExperienceEntry[]
  cpd: CPDActivity[]
  documents: Document[]
  timeline: TimelineMilestone[]
  selectedCharacteristics?: string[]
  fellowshipStatements?: { [key: string]: string }
}

interface AppContextType {
  state: AppState
  updateProfile: (profile: Partial<UserProfile>) => void
  updateCompetency: (id: string, level: number, evidence?: string[]) => void
  addExperience: (entry: Omit<ExperienceEntry, 'id'>) => void
  updateExperience: (id: string, entry: Partial<ExperienceEntry>) => void
  deleteExperience: (id: string) => void
  addCPD: (activity: Omit<CPDActivity, 'id'>) => void
  updateCPD: (id: string, activity: Partial<CPDActivity>) => void
  deleteCPD: (id: string) => void
  createDocument: (type: string, name: string) => string
  updateDocument: (id: string, content: string) => void
  deleteDocument: (id: string) => void
  updateTimeline: (milestones: TimelineMilestone[]) => void
  selectCharacteristic: (id: string) => void
  updateFellowshipStatement: (charId: string, statement: string) => void
  getWordCount: (text: string) => number
  validateDocument: (docId: string) => { valid: boolean; errors: string[] }
  calculateProgress: () => {
    overall: number
    competencies: number
    cpd: number
    experience: number
  }
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const initialState: AppState = {
  profile: {
    currentLevel: 'student',
  },
  competencies: {},
  experience: [],
  cpd: [],
  documents: [],
  timeline: [],
  fellowshipStatements: {}
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('rics-app-state')
    if (saved) {
      try {
        setState(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load state:', e)
      }
    }
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('rics-app-state', JSON.stringify(state))
  }, [state])

  const updateProfile = (profile: Partial<UserProfile>) => {
    setState(prev => ({
      ...prev,
      profile: { ...prev.profile, ...profile }
    }))
  }

  const updateCompetency = (id: string, level: number, evidence: string[] = []) => {
    setState(prev => ({
      ...prev,
      competencies: {
        ...prev.competencies,
        [id]: {
          level,
          evidence: evidence.length > 0 ? evidence : prev.competencies[id]?.evidence || [],
          lastUpdated: new Date().toISOString()
        }
      }
    }))
  }

  const addExperience = (entry: Omit<ExperienceEntry, 'id'>) => {
    const newEntry: ExperienceEntry = {
      ...entry,
      id: Date.now().toString()
    }
    setState(prev => ({
      ...prev,
      experience: [...prev.experience, newEntry]
    }))
  }

  const updateExperience = (id: string, entry: Partial<ExperienceEntry>) => {
    setState(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === id ? { ...e, ...entry } : e)
    }))
  }

  const deleteExperience = (id: string) => {
    setState(prev => ({
      ...prev,
      experience: prev.experience.filter(e => e.id !== id)
    }))
  }

  const addCPD = (activity: Omit<CPDActivity, 'id'>) => {
    const newActivity: CPDActivity = {
      ...activity,
      id: Date.now().toString()
    }
    setState(prev => ({
      ...prev,
      cpd: [...prev.cpd, newActivity]
    }))
  }

  const updateCPD = (id: string, activity: Partial<CPDActivity>) => {
    setState(prev => ({
      ...prev,
      cpd: prev.cpd.map(a => a.id === id ? { ...a, ...activity } : a)
    }))
  }

  const deleteCPD = (id: string) => {
    setState(prev => ({
      ...prev,
      cpd: prev.cpd.filter(a => a.id !== id)
    }))
  }

  const createDocument = (type: string, name: string): string => {
    const template = getDocumentTemplate(type)
    const newDoc: Document = {
      id: Date.now().toString(),
      type,
      name,
      content: template,
      wordCount: getWordCount(template),
      status: 'draft',
      lastModified: new Date().toISOString(),
      version: 1
    }
    setState(prev => ({
      ...prev,
      documents: [...prev.documents, newDoc]
    }))
    return newDoc.id
  }

  const updateDocument = (id: string, content: string) => {
    setState(prev => ({
      ...prev,
      documents: prev.documents.map(doc => 
        doc.id === id 
          ? { 
              ...doc, 
              content, 
              wordCount: getWordCount(content),
              lastModified: new Date().toISOString(),
              version: doc.version + 1
            }
          : doc
      )
    }))
  }

  const deleteDocument = (id: string) => {
    setState(prev => ({
      ...prev,
      documents: prev.documents.filter(d => d.id !== id)
    }))
  }

  const updateTimeline = (milestones: TimelineMilestone[]) => {
    setState(prev => ({
      ...prev,
      timeline: milestones
    }))
  }

  const selectCharacteristic = (id: string) => {
    setState(prev => {
      const current = prev.selectedCharacteristics || []
      const updated = current.includes(id)
        ? current.filter(c => c !== id)
        : current.length < 4 ? [...current, id] : current
      return { ...prev, selectedCharacteristics: updated }
    })
  }

  const updateFellowshipStatement = (charId: string, statement: string) => {
    setState(prev => ({
      ...prev,
      fellowshipStatements: {
        ...prev.fellowshipStatements,
        [charId]: statement
      }
    }))
  }

  const getWordCount = (text: string): number => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length
  }

  const validateDocument = (docId: string): { valid: boolean; errors: string[] } => {
    const doc = state.documents.find(d => d.id === docId)
    if (!doc) return { valid: false, errors: ['Document not found'] }

    const errors: string[] = []
    const wordCount = getWordCount(doc.content)

    switch (doc.type) {
      case 'summary':
        if (wordCount < 4500) errors.push(`Minimum 4,500 words required (current: ${wordCount})`)
        if (wordCount > 5500) errors.push(`Maximum 5,500 words (current: ${wordCount})`)
        break
      case 'case-study':
        if (wordCount < 2500) errors.push(`Minimum 2,500 words required (current: ${wordCount})`)
        if (wordCount > 3500) errors.push(`Maximum 3,500 words (current: ${wordCount})`)
        break
      case 'fellowship':
        const statements = Object.values(state.fellowshipStatements || {})
        statements.forEach((stmt, i) => {
          const count = getWordCount(stmt)
          if (count < 400) errors.push(`Characteristic ${i + 1}: Minimum 400 words (current: ${count})`)
          if (count > 600) errors.push(`Characteristic ${i + 1}: Maximum 600 words (current: ${count})`)
        })
        break
    }

    return { valid: errors.length === 0, errors }
  }

  const calculateProgress = () => {
    const mandatoryCount = 11
    const completedCompetencies = Object.values(state.competencies).filter(c => c.level >= 1).length
    const competencyProgress = (completedCompetencies / mandatoryCount) * 100

    const targetHours = state.profile.currentLevel === 'mrics' ? 48 : 20
    const totalCPDHours = state.cpd.reduce((sum, a) => sum + a.hours, 0)
    const cpdProgress = Math.min((totalCPDHours / targetHours) * 100, 100)

    const targetDays = state.profile.selectedRoute === 'structured24' ? 400 : 200
    const totalDays = state.experience.length
    const experienceProgress = Math.min((totalDays / targetDays) * 100, 100)

    const overall = Math.round((competencyProgress + cpdProgress + experienceProgress) / 3)

    return {
      overall,
      competencies: Math.round(competencyProgress),
      cpd: Math.round(cpdProgress),
      experience: Math.round(experienceProgress)
    }
  }

  const getDocumentTemplate = (type: string): string => {
    const templates: { [key: string]: string } = {
      'summary': `SUMMARY OF EXPERIENCE

MANDATORY COMPETENCIES

1. Ethics, Rules of Conduct and Professionalism
[Describe your understanding and application of RICS ethics and professional standards. Provide examples demonstrating Level 1, 2, and 3 achievement.]

2. Client Care
[Explain how you have demonstrated client care principles. Include specific examples.]

3. Communication and Negotiation
[Detail your communication skills and negotiation experience.]

TECHNICAL COMPETENCIES

[Select and describe your technical competencies relevant to your pathway. For each competency, demonstrate Level 1, 2, and 3 achievement with specific project examples.]

CONCLUSION

[Summarize your overall experience and readiness for assessment.]`,
      'case-study': `CASE STUDY: [PROJECT NAME]

EXECUTIVE SUMMARY
[Brief overview of the project - 200 words]

PROJECT BACKGROUND
[Client, location, project type, contract value, your role - 300 words]

KEY CHALLENGES
[Main problems or issues encountered - 500 words]

COMPETENCIES DEMONSTRATED
[Specific competencies shown through this project - 1000 words]

PROBLEM-SOLVING APPROACH
[How you addressed challenges - 500 words]

OUTCOMES AND RESULTS
[Project outcomes and your contribution - 300 words]

LESSONS LEARNED
[What you learned and how it improved your practice - 200 words]`,
      'cpd-record': `CPD RECORD - [YEAR]

FORMAL ACTIVITIES
[Date] - [Activity Name] - [Hours] - [Description] - [Competency Link]

INFORMAL ACTIVITIES
[Date] - [Activity Name] - [Hours] - [Description] - [Competency Link]

REFLECTIVE STATEMENTS
[For each activity, provide a brief reflection on what you learned and how it applies to your practice]

TOTAL HOURS: [Total]`
    }
    return templates[type] || ''
  }

  return (
    <AppContext.Provider
      value={{
        state,
        updateProfile,
        updateCompetency,
        addExperience,
        updateExperience,
        deleteExperience,
        addCPD,
        updateCPD,
        deleteCPD,
        createDocument,
        updateDocument,
        deleteDocument,
        updateTimeline,
        selectCharacteristic,
        updateFellowshipStatement,
        getWordCount,
        validateDocument,
        calculateProgress
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

