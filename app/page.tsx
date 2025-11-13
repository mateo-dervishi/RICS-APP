'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Target,
  FileText,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  Download,
  Upload,
  Brain,
  Sparkles,
  BarChart3,
  Award,
  GraduationCap,
  Briefcase,
  Building,
  Info,
  Calculator,
  ClipboardList,
  FolderOpen,
  MessageSquare,
  TrendingUp,
  Plus,
  Users
} from 'lucide-react'

// RICS Requirements Data
const ricsRequirements = {
  routes: {
    structured24: {
      name: "24 Month Structured Training",
      requirements: [
        "RICS accredited degree",
        "Less than 5 years experience",
        "24 months structured training",
        "400+ days practical experience",
        "96 hours CPD minimum"
      ]
    },
    structured12: {
      name: "12 Month Structured Training",
      requirements: [
        "RICS accredited degree",
        "5-10 years experience",
        "12 months structured training",
        "200+ days practical experience",
        "48 hours CPD minimum"
      ]
    },
    preliminary: {
      name: "Preliminary Review",
      requirements: [
        "Non-RICS degree or professional qualification",
        "5+ years experience",
        "Preliminary review submission",
        "Final assessment after approval",
        "48 hours CPD minimum"
      ]
    }
  },
  documents: {
    summary: {
      name: "Summary of Experience",
      wordCount: "1,500 words (mandatory) + 3,000-4,000 words (technical)",
      sections: [
        "Mandatory competencies",
        "Technical competencies",
        "Evidence of Level 1, 2, and 3 achievement"
      ]
    },
    caseStudy: {
      name: "Case Study",
      wordCount: "3,000 words",
      requirements: [
        "Project from last 24 months",
        "Demonstrate key competencies",
        "Show problem-solving abilities",
        "Include lessons learned"
      ]
    },
    cpd: {
      name: "CPD Record",
      requirements: [
        "48 hours minimum per year",
        "Mix of formal and informal",
        "Linked to competencies",
        "Reflective statements"
      ]
    }
  },
  competencies: {
    mandatory: [
      { name: "Ethics, Rules of Conduct and professionalism", level: 3 },
      { name: "Client care", level: 2 },
      { name: "Communication and negotiation", level: 2 },
      { name: "Health and safety", level: 2 },
      { name: "Accounting principles", level: 1 },
      { name: "Business planning", level: 1 },
      { name: "Conflict avoidance", level: 1 },
      { name: "Data management", level: 1 },
      { name: "Diversity and inclusion", level: 1 },
      { name: "Inclusive environments", level: 1 },
      { name: "Sustainability", level: 1 }
    ]
  }
}

export default function PersonalRicsTracker() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedRoute, setSelectedRoute] = useState('structured24')
  const [competencyProgress, setCompetencyProgress] = useState<Record<string, number>>({})
  const [cpdHours, setCpdHours] = useState(0)
  const [experienceDays, setExperienceDays] = useState(0)
  
  // Calculate overall progress
  const calculateProgress = () => {
    const totalCompetencies = ricsRequirements.competencies.mandatory.length
    const completedCompetencies = Object.values(competencyProgress).filter(level => level >= 1).length
    const competencyPercentage = (completedCompetencies / totalCompetencies) * 100
    
    const cpdTarget = selectedRoute === 'structured24' ? 96 : 48
    const cpdPercentage = Math.min((cpdHours / cpdTarget) * 100, 100)
    
    const experienceTarget = selectedRoute === 'structured24' ? 400 : 200
    const experiencePercentage = Math.min((experienceDays / experienceTarget) * 100, 100)
    
    return Math.round((competencyPercentage + cpdPercentage + experiencePercentage) / 3)
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'requirements', name: 'Requirements Checker', icon: ClipboardList },
    { id: 'competencies', name: 'Competencies', icon: Target },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'experience', name: 'Experience Diary', icon: BookOpen },
    { id: 'cpd', name: 'CPD Tracker', icon: GraduationCap },
    { id: 'assistant', name: 'AI Assistant', icon: Brain },
    { id: 'timeline', name: 'Timeline', icon: Calendar }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">My RICS Journey</h1>
                <p className="text-xs text-gray-400">Personal Qualification Tracker</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">Overall Progress</p>
                <p className="text-2xl font-bold text-purple-400">{calculateProgress()}%</p>
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all">
                <Download className="w-4 h-4 inline mr-2" />
                Export Progress
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-1 overflow-x-auto pb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-400'
                      : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <Target className="w-8 h-8 text-purple-400" />
                  <span className="text-2xl font-bold">3/11</span>
                </div>
                <p className="text-sm text-gray-400">Competencies Complete</p>
                <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full w-[27%] bg-purple-500" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <Clock className="w-8 h-8 text-blue-400" />
                  <span className="text-2xl font-bold">{cpdHours}/48</span>
                </div>
                <p className="text-sm text-gray-400">CPD Hours This Year</p>
                <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full w-[79%] bg-blue-500" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="w-8 h-8 text-green-400" />
                  <span className="text-2xl font-bold">{experienceDays}</span>
                </div>
                <p className="text-sm text-gray-400">Experience Days</p>
                <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full w-[65%] bg-green-500" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <FileText className="w-8 h-8 text-orange-400" />
                  <span className="text-2xl font-bold">0/3</span>
                </div>
                <p className="text-sm text-gray-400">Documents Ready</p>
                <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full w-[0%] bg-orange-500" />
                </div>
              </motion.div>
            </div>

            {/* Current Route Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8"
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-yellow-400" />
                Your RICS Pathway
              </h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {Object.entries(ricsRequirements.routes).map(([key, route]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedRoute(key)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedRoute === key
                        ? 'border-purple-400 bg-purple-500/20'
                        : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                    }`}
                  >
                    <h3 className="font-semibold mb-2">{route.name}</h3>
                    <p className="text-xs text-gray-400">{route.requirements[0]}</p>
                  </button>
                ))}
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-purple-300 mb-3">Requirements for {ricsRequirements.routes[selectedRoute as keyof typeof ricsRequirements.routes].name}:</h3>
                {ricsRequirements.routes[selectedRoute as keyof typeof ricsRequirements.routes].requirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm">{req}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Next Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6"
            >
              <h2 className="text-xl font-bold mb-4">Recommended Next Steps</h2>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <BookOpen className="w-5 h-5 text-blue-400" />
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="font-medium mb-1">Start Experience Diary</h3>
                  <p className="text-sm text-gray-400">Begin logging your daily work experience</p>
                </button>
                
                <button className="p-4 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <Target className="w-5 h-5 text-purple-400" />
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="font-medium mb-1">Map Competencies</h3>
                  <p className="text-sm text-gray-400">Link your experience to RICS competencies</p>
                </button>
                
                <button className="p-4 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <GraduationCap className="w-5 h-5 text-green-400" />
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="font-medium mb-1">Log CPD Activity</h3>
                  <p className="text-sm text-gray-400">Record your professional development hours</p>
                </button>
                
                <button className="p-4 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <FileText className="w-5 h-5 text-orange-400" />
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="font-medium mb-1">Draft Case Study</h3>
                  <p className="text-sm text-gray-400">Start documenting a recent project</p>
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'requirements' && (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <ClipboardList className="w-6 h-6 mr-2" />
                RICS Documentation Checklist
              </h2>
              
              {/* Document Requirements */}
              <div className="space-y-6">
                {Object.entries(ricsRequirements.documents).map(([key, doc]) => (
                  <div key={key} className="border border-slate-700 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-purple-300">{doc.name}</h3>
                        {'wordCount' in doc && (
                          <p className="text-sm text-gray-400 mt-1">Word count: {doc.wordCount}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-sm hover:bg-purple-500/30 transition-colors">
                          <Upload className="w-4 h-4 inline mr-1" />
                          Upload
                        </button>
                        <button className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-sm hover:bg-blue-500/30 transition-colors">
                          <FileText className="w-4 h-4 inline mr-1" />
                          Template
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {'sections' in doc && doc.sections ? (
                        doc.sections.map((section, index) => (
                          <div key={index} className="flex items-center space-x-3 p-2 bg-slate-800/50 rounded">
                            <AlertCircle className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm">{section}</span>
                          </div>
                        ))
                      ) : (
                        'requirements' in doc && doc.requirements ? (
                          doc.requirements.map((req, index) => (
                            <div key={index} className="flex items-center space-x-3 p-2 bg-slate-800/50 rounded">
                              <AlertCircle className="w-4 h-4 text-yellow-400" />
                              <span className="text-sm">{req}</span>
                            </div>
                          ))
                        ) : null
                      )}
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full w-[0%] bg-purple-500" />
                        </div>
                        <span className="text-sm text-gray-400">Not started</span>
                      </div>
                      <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                        View guidance →
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Requirements */}
              <div className="mt-8 p-6 bg-blue-900/20 border border-blue-500/20 rounded-lg">
                <h3 className="font-semibold text-blue-300 mb-3 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Additional Requirements
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-400 mt-0.5">•</span>
                    <span>Complete RICS Ethics Module online assessment</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-400 mt-0.5">•</span>
                    <span>Counsellor final sign-off on all competencies</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-400 mt-0.5">•</span>
                    <span>Supervisor confirmation of experience</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-400 mt-0.5">•</span>
                    <span>Payment of assessment fees (£500-£600)</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'competencies' && (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <Target className="w-6 h-6 mr-2" />
                  Mandatory Competencies
                </h2>
                <button className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-sm hover:bg-purple-500/30 transition-colors">
                  <Plus className="w-4 h-4 inline mr-1" />
                  Add Evidence
                </button>
              </div>

              <div className="space-y-4">
                {ricsRequirements.competencies.mandatory.map((comp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 bg-slate-800/50 rounded-lg border border-slate-700"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-8 rounded-full ${
                          competencyProgress[comp.name] >= comp.level ? 'bg-green-500' :
                          competencyProgress[comp.name] > 0 ? 'bg-yellow-500' :
                          'bg-gray-600'
                        }`} />
                        <div>
                          <h3 className="font-medium">{comp.name}</h3>
                          <p className="text-xs text-gray-400 mt-1">Required: Level {comp.level}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <select 
                          className="bg-slate-700 border border-slate-600 rounded px-3 py-1 text-sm"
                          value={competencyProgress[comp.name] || 0}
                          onChange={(e) => setCompetencyProgress({
                            ...competencyProgress,
                            [comp.name]: parseInt(e.target.value)
                          })}
                        >
                          <option value="0">Not Started</option>
                          <option value="1">Level 1</option>
                          <option value="2">Level 2</option>
                          <option value="3">Level 3</option>
                        </select>
                        <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                          View guidance →
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 ${
                              competencyProgress[comp.name] >= comp.level ? 'bg-green-500' :
                              competencyProgress[comp.name] > 0 ? 'bg-yellow-500' :
                              'bg-gray-600'
                            }`}
                            style={{ width: `${((competencyProgress[comp.name] || 0) / comp.level) * 100}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">
                        {competencyProgress[comp.name] || 0} / {comp.level}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-green-900/20 border border-green-500/20 rounded-lg">
                <p className="text-sm text-green-300">
                  <Info className="w-4 h-4 inline mr-2" />
                  Remember: Level 1 = Knowledge, Level 2 = Application, Level 3 = Advice & Evaluation
                </p>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'assistant' && (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Brain className="w-6 h-6 mr-2 text-purple-400" />
                AI RICS Assistant
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <button className="p-4 bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/20 rounded-lg hover:from-purple-900/40 hover:to-pink-900/40 transition-all">
                  <MessageSquare className="w-6 h-6 text-purple-400 mb-2" />
                  <h3 className="font-medium mb-1">Competency Advisor</h3>
                  <p className="text-xs text-gray-400">Get guidance on demonstrating competencies</p>
                </button>

                <button className="p-4 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/20 rounded-lg hover:from-blue-900/40 hover:to-cyan-900/40 transition-all">
                  <FileText className="w-6 h-6 text-blue-400 mb-2" />
                  <h3 className="font-medium mb-1">Document Review</h3>
                  <p className="text-xs text-gray-400">Check your submissions against RICS criteria</p>
                </button>

                <button className="p-4 bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/20 rounded-lg hover:from-green-900/40 hover:to-emerald-900/40 transition-all">
                  <Calculator className="w-6 h-6 text-green-400 mb-2" />
                  <h3 className="font-medium mb-1">Experience Calculator</h3>
                  <p className="text-xs text-gray-400">Map your experience to competency levels</p>
                </button>

                <button className="p-4 bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-500/20 rounded-lg hover:from-orange-900/40 hover:to-red-900/40 transition-all">
                  <ClipboardList className="w-6 h-6 text-orange-400 mb-2" />
                  <h3 className="font-medium mb-1">Interview Prep</h3>
                  <p className="text-xs text-gray-400">Practice questions and mock scenarios</p>
                </button>
              </div>

              <div className="border-t border-slate-700 pt-6">
                <h3 className="font-medium mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left text-sm transition-all">
                    → Generate Summary of Experience template for my pathway
                  </button>
                  <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left text-sm transition-all">
                    → Analyze my experience against competency requirements
                  </button>
                  <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left text-sm transition-all">
                    → Create CPD plan for next 6 months
                  </button>
                  <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left text-sm transition-all">
                    → Review case study structure and word count
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <BookOpen className="w-6 h-6 mr-2" />
                  Experience Diary
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="text-sm">
                    <span className="text-gray-400">Total days logged: </span>
                    <span className="font-semibold">{experienceDays}</span>
                  </div>
                  <button 
                    onClick={() => setExperienceDays(experienceDays + 1)}
                    className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-sm hover:bg-purple-500/30 transition-colors"
                  >
                    <Plus className="w-4 h-4 inline mr-1" />
                    Add Entry
                  </button>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-6">
                <h3 className="font-medium mb-4">Quick Entry Form</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Date</label>
                    <input type="date" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Project/Task</label>
                    <input type="text" placeholder="e.g., Site valuation for commercial property" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Description</label>
                    <textarea placeholder="Describe your activities and responsibilities..." className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 h-32" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Competencies Demonstrated</label>
                    <select multiple className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 h-24">
                      {ricsRequirements.competencies.mandatory.map((comp, index) => (
                        <option key={index} value={comp.name}>{comp.name}</option>
                      ))}
                    </select>
                  </div>
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all">
                    Save Entry
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'cpd' && (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <GraduationCap className="w-6 h-6 mr-2" />
                  CPD Tracker
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="text-sm">
                    <span className="text-gray-400">Hours completed: </span>
                    <span className="font-semibold text-green-400">{cpdHours}/48</span>
                  </div>
                  <button 
                    onClick={() => setCpdHours(Math.min(cpdHours + 2, 96))}
                    className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-sm hover:bg-green-500/30 transition-colors"
                  >
                    <Plus className="w-4 h-4 inline mr-1" />
                    Log CPD
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-800/50 rounded-lg p-6">
                  <h3 className="font-medium mb-4">Add CPD Activity</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Activity Type</label>
                      <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2">
                        <option>Formal - Course/Seminar</option>
                        <option>Formal - Conference</option>
                        <option>Informal - Reading</option>
                        <option>Informal - Research</option>
                        <option>Informal - Mentoring</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Title</label>
                      <input type="text" placeholder="e.g., RICS Valuation Standards Update" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Hours</label>
                      <input type="number" min="0.5" step="0.5" placeholder="2" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Learning Outcomes</label>
                      <textarea placeholder="What did you learn?" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 h-24" />
                    </div>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all">
                      Save CPD Activity
                    </button>
                  </div>
                </div>

                <div>
                  <div className="bg-slate-800/50 rounded-lg p-6 mb-4">
                    <h3 className="font-medium mb-4">CPD Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Formal CPD</span>
                        <span className="font-semibold">24 hours</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Informal CPD</span>
                        <span className="font-semibold">14 hours</span>
                      </div>
                      <div className="border-t border-slate-700 pt-3 flex justify-between">
                        <span className="text-gray-400">Total</span>
                        <span className="font-bold text-lg text-green-400">{cpdHours} hours</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-lg p-4">
                    <p className="text-sm text-yellow-300">
                      <Info className="w-4 h-4 inline mr-2" />
                      Remember: You need minimum 48 hours CPD per year, with at least 50% being formal learning.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-2" />
                Your APC Timeline
              </h2>

              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500" />
                
                <div className="space-y-6">
                  {[
                    { date: 'Today', title: 'Start Journey', status: 'current', icon: GraduationCap },
                    { date: 'Month 3', title: 'First Counsellor Review', status: 'upcoming', icon: Users },
                    { date: 'Month 6', title: '25% Competencies Complete', status: 'upcoming', icon: Target },
                    { date: 'Month 12', title: 'Mid-point Review', status: 'upcoming', icon: ClipboardList },
                    { date: 'Month 18', title: 'Draft Documents', status: 'upcoming', icon: FileText },
                    { date: 'Month 22', title: 'Final Submission', status: 'upcoming', icon: Upload },
                    { date: 'Month 24', title: 'Assessment Interview', status: 'upcoming', icon: Award }
                  ].map((milestone, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative flex items-center"
                    >
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        milestone.status === 'current' ? 'bg-purple-500' :
                        'bg-slate-800 border-2 border-slate-700'
                      }`}>
                        <milestone.icon className="w-8 h-8" />
                      </div>
                      <div className="ml-6 flex-1 p-4 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{milestone.title}</h3>
                            <p className="text-sm text-gray-400">{milestone.date}</p>
                          </div>
                          {milestone.status === 'current' && (
                            <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs">
                              Current
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  )
}
