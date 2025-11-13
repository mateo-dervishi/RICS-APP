'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Upload, CheckCircle2, FileText, GraduationCap, AlertCircle } from 'lucide-react'

export default function AcademicAssessment() {
  const [activeTab, setActiveTab] = useState('overview')
  const [documents, setDocuments] = useState<string[]>([])

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BookOpen },
    { id: 'application', name: 'Application', icon: FileText },
    { id: 'documents', name: 'Documents', icon: Upload },
    { id: 'status', name: 'Status', icon: CheckCircle2 },
    { id: 'pathways', name: 'Pathways', icon: GraduationCap }
  ]

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2 flex items-center">
          <BookOpen className="w-8 h-8 mr-3 text-green-400" />
          Academic Assessment Module
        </h2>
        <p className="text-gray-400">Degree accreditation verification and conversion pathways</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                  : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-sm border border-green-500/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Degree Accreditation Assessment</h3>
              <p className="text-gray-300 mb-6">
                Verify if your degree meets RICS accreditation standards. If not accredited, we'll help you
                find conversion courses and alternative pathways to professional membership.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <CheckCircle2 className="w-6 h-6 text-green-400 mb-2" />
                  <h4 className="font-semibold mb-2">Accreditation Check</h4>
                  <p className="text-sm text-gray-400">Verify your degree status</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <GraduationCap className="w-6 h-6 text-blue-400 mb-2" />
                  <h4 className="font-semibold mb-2">Conversion Courses</h4>
                  <p className="text-sm text-gray-400">Find accredited conversion programs</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <FileText className="w-6 h-6 text-purple-400 mb-2" />
                  <h4 className="font-semibold mb-2">Pathway Guidance</h4>
                  <p className="text-sm text-gray-400">Alternative routes to membership</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Assessment Process</h3>
              <div className="space-y-4">
                {[
                  { step: '1', title: 'Submit Application', desc: 'Complete degree assessment application form' },
                  { step: '2', title: 'Upload Documents', desc: 'Provide degree certificates and transcripts' },
                  { step: '3', title: 'Review Process', desc: 'RICS reviews your qualifications (4-6 weeks)' },
                  { step: '4', title: 'Receive Outcome', desc: 'Get accreditation status and recommendations' }
                ].map((item) => (
                  <div key={item.step} className="flex items-start space-x-4 p-4 bg-slate-700/50 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'application' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Degree Assessment Application</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Degree Type</label>
                  <select className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg">
                    <option>Bachelor's Degree</option>
                    <option>Master's Degree</option>
                    <option>PhD</option>
                    <option>Professional Qualification</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Field of Study</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                    placeholder="e.g., Civil Engineering"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">University/Institution</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                  placeholder="Enter institution name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Graduation Year</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                  placeholder="YYYY"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">Current RICS Status</label>
                <select className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg">
                  <option>Not a member</option>
                  <option>Student member</option>
                  <option>AssocRICS</option>
                  <option>Other professional body member</option>
                </select>
              </div>
              
              <button className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold">
                Submit Assessment Application
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'documents' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Required Documents</h3>
            <p className="text-gray-400 mb-6">Upload all required documents for assessment</p>
            
            <div className="space-y-4">
              {[
                { name: 'Degree Certificate', required: true, uploaded: false },
                { name: 'Academic Transcript', required: true, uploaded: false },
                { name: 'Course Syllabus (if available)', required: false, uploaded: false },
                { name: 'Professional Qualifications', required: false, uploaded: false }
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-semibold">{doc.name}</div>
                      {doc.required && (
                        <span className="text-xs text-red-400">Required</span>
                      )}
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded-lg text-sm">
                    {doc.uploaded ? 'Replace' : 'Upload'}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'status' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Assessment Status</h3>
            
            <div className="space-y-4">
              <div className="p-6 bg-slate-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Current Status</h4>
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
                    Pending Submission
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Complete your application and upload documents to begin the assessment process.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span>Application form completed</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-yellow-400" />
                    <span>Documents pending upload</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'pathways' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Conversion Pathways</h3>
              <p className="text-gray-400 mb-6">
                If your degree is not RICS-accredited, explore these alternative pathways:
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Conversion Courses</h4>
                  <p className="text-sm text-gray-400 mb-3">
                    RICS-accredited postgraduate conversion courses to bridge the gap
                  </p>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm">
                    Find Courses
                  </button>
                </div>
                
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Preliminary Review Route</h4>
                  <p className="text-sm text-gray-400 mb-3">
                    For non-RICS degree holders with 5+ years experience
                  </p>
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm">
                    Learn More
                  </button>
                </div>
                
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Postgraduate Study</h4>
                  <p className="text-sm text-gray-400 mb-3">
                    Consider RICS-accredited Master's programs
                  </p>
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm">
                    Explore Programs
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

