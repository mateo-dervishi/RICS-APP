'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Upload, Edit, CheckCircle2, Clock, Sparkles } from 'lucide-react'

export default function DocumentsCenter() {
  const [activeTab, setActiveTab] = useState('templates')
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null)

  const tabs = [
    { id: 'templates', name: 'Templates', icon: FileText },
    { id: 'my-documents', name: 'My Documents', icon: FileText },
    { id: 'writer', name: 'AI Writer', icon: Sparkles }
  ]

  const templates = [
    {
      id: 'summary',
      name: 'Summary of Experience',
      description: '1,500 words (mandatory) + 3,000-4,000 words (technical)',
      sections: ['Mandatory competencies', 'Technical competencies', 'Evidence of Level 1, 2, and 3 achievement'],
      wordCount: '4,500-5,500 words'
    },
    {
      id: 'case-study',
      name: 'Case Study',
      description: '3,000 words, project from last 24 months',
      sections: ['Project overview', 'Key competencies demonstrated', 'Problem-solving', 'Lessons learned'],
      wordCount: '3,000 words'
    },
    {
      id: 'cpd-record',
      name: 'CPD Record',
      description: 'Annual CPD activities and hours',
      sections: ['Formal activities', 'Informal activities', 'Competency links', 'Reflective statements'],
      wordCount: 'Variable'
    },
    {
      id: 'preliminary',
      name: 'Preliminary Review Document',
      description: 'For non-RICS degree holders',
      sections: ['Qualification details', 'Experience summary', 'Competency mapping'],
      wordCount: 'Variable'
    },
    {
      id: 'fellowship',
      name: 'FRICS Application',
      description: '4 characteristics with 500-word statements',
      sections: ['Characteristic statements', 'Supporting evidence', 'Peer references'],
      wordCount: '2,000 words + evidence'
    }
  ]

  const myDocuments = [
    { id: '1', name: 'Summary of Experience v1', type: 'summary', status: 'draft', lastModified: '2024-01-15' },
    { id: '2', name: 'Case Study - Office Refurb', type: 'case-study', status: 'in-review', lastModified: '2024-01-10' },
    { id: '3', name: 'CPD Record 2023', type: 'cpd-record', status: 'completed', lastModified: '2023-12-31' }
  ]

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2 flex items-center">
          <FileText className="w-8 h-8 mr-3 text-rose-400" />
          Document Preparation Center
        </h2>
        <p className="text-gray-400">Templates, AI writing assistance, and document management</p>
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
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50'
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
        {activeTab === 'templates' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-rose-500 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                    <p className="text-gray-400 mb-3">{template.description}</p>
                    <div className="mb-3">
                      <span className="text-sm text-gray-400">Word Count: </span>
                      <span className="text-sm font-semibold">{template.wordCount}</span>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Sections:</h4>
                      <ul className="space-y-1">
                        {template.sections.map((section, i) => (
                          <li key={i} className="text-sm text-gray-400 flex items-center space-x-2">
                            <CheckCircle2 className="w-3 h-3 text-green-400" />
                            <span>{section}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 rounded-lg">
                    <Download className="w-4 h-4" />
                    <span>Download Template</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg">
                    <Edit className="w-4 h-4" />
                    <span>Start Writing</span>
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'my-documents' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {myDocuments.length === 0 ? (
              <div className="text-center py-12 bg-slate-800/50 border border-slate-700 rounded-xl">
                <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No documents yet</p>
                <p className="text-sm text-gray-500 mt-2">Start by downloading a template</p>
              </div>
            ) : (
              myDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold">{doc.name}</h3>
                        <span className={`px-2 py-1 rounded text-xs ${
                          doc.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          doc.status === 'in-review' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {doc.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>Modified: {new Date(doc.lastModified).toLocaleDateString()}</span>
                        </div>
                        <span className="capitalize">{doc.type.replace('-', ' ')}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}

        {activeTab === 'writer' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Sparkles className="w-6 h-6 mr-2 text-purple-400" />
              AI Writing Assistant
            </h3>
            <p className="text-gray-400 mb-6">
              Get AI-powered assistance for writing competency statements, experience descriptions, and more
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Document Type</label>
                <select className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg">
                  <option>Summary of Experience</option>
                  <option>Case Study</option>
                  <option>Competency Statement</option>
                  <option>CPD Reflective Statement</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2">What would you like help with?</label>
                <textarea
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                  rows={6}
                  placeholder="Describe what you need help writing..."
                />
              </div>
              
              <button className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold flex items-center justify-center">
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Content
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

