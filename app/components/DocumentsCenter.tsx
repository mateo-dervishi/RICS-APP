'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Upload, Edit, CheckCircle2, Clock, Sparkles, AlertCircle, X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { exportDocument, generateSummaryDocument, generateCaseStudyTemplate } from '../utils/documentExport'

export default function DocumentsCenter() {
  const { state, createDocument, updateDocument, deleteDocument, getWordCount, validateDocument } = useApp()
  const [activeTab, setActiveTab] = useState('templates')
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null)
  const [editingContent, setEditingContent] = useState('')
  const [aiDocumentType, setAiDocumentType] = useState('summary')
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiGeneratedContent, setAiGeneratedContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

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

  const myDocuments = state.documents

  const handleCreateDocument = (type: string, name: string) => {
    const docId = createDocument(type, name)
    setSelectedDoc(docId)
    setEditingContent(state.documents.find(d => d.id === docId)?.content || '')
    setActiveTab('my-documents')
  }

  const handleSaveDocument = (id: string) => {
    updateDocument(id, editingContent)
    setSelectedDoc(null)
    setEditingContent('')
  }

  const handleExportDocument = (doc: any, format: 'txt' | 'docx' = 'txt') => {
    if (doc.type === 'summary') {
      const content = generateSummaryDocument(state)
      exportDocument(content, doc.name, format)
    } else {
      exportDocument(doc.content, doc.name, format)
    }
  }

  const handleDeleteDoc = (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      deleteDocument(id)
      if (selectedDoc === id) {
        setSelectedDoc(null)
        setEditingContent('')
      }
    }
  }

  const selectedDocument = selectedDoc ? myDocuments.find(d => d.id === selectedDoc) : null
  const validation = selectedDocument ? validateDocument(selectedDocument.id) : { valid: true, errors: [] }

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
                  <button 
                    onClick={() => handleCreateDocument(template.id, `${template.name} - ${new Date().toLocaleDateString()}`)}
                    className="flex items-center space-x-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Create Document</span>
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
                      <button 
                        onClick={() => {
                          setSelectedDoc(doc.id)
                          setEditingContent(doc.content)
                        }}
                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleExportDocument(doc)}
                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteDoc(doc.id)}
                        className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg"
                      >
                        <X className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}

        {/* Document Editor */}
        {selectedDocument && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold">{selectedDocument.name}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                    <span>Words: {getWordCount(editingContent)}</span>
                    {selectedDocument.type === 'summary' && (
                      <span className={getWordCount(editingContent) >= 4500 && getWordCount(editingContent) <= 5500 ? 'text-green-400' : 'text-yellow-400'}>
                        Target: 4,500-5,500
                      </span>
                    )}
                    {selectedDocument.type === 'case-study' && (
                      <span className={getWordCount(editingContent) >= 2500 && getWordCount(editingContent) <= 3500 ? 'text-green-400' : 'text-yellow-400'}>
                        Target: 2,500-3,500
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedDoc(null)
                    setEditingContent('')
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {!validation.valid && (
                <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <h4 className="font-semibold text-red-400">Validation Errors</h4>
                  </div>
                  <ul className="list-disc list-inside text-sm text-red-300">
                    {validation.errors.map((error, i) => (
                      <li key={i}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <textarea
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                className="w-full h-96 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg font-mono text-sm"
                placeholder="Start writing your document..."
              />

              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => handleSaveDocument(selectedDocument.id)}
                  className="px-6 py-2 bg-rose-600 hover:bg-rose-700 rounded-lg font-semibold"
                >
                  Save
                </button>
                <button
                  onClick={() => handleExportDocument(selectedDocument, 'txt')}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export TXT</span>
                </button>
                <button
                  onClick={() => handleExportDocument(selectedDocument, 'docx')}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export DOC</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'writer' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
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
                  <select 
                    value={aiDocumentType}
                    onChange={(e) => setAiDocumentType(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-purple-500"
                  >
                    <option value="summary">Summary of Experience</option>
                    <option value="case-study">Case Study</option>
                    <option value="competency">Competency Statement</option>
                    <option value="cpd">CPD Reflective Statement</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">What would you like help with?</label>
                  <textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-purple-500"
                    rows={6}
                    placeholder="Describe what you need help writing... (e.g., 'Write a competency statement for Ethics demonstrating Level 2 achievement with examples from my project work')"
                  />
                </div>
                
                <button 
                  onClick={async () => {
                    if (!aiPrompt.trim()) {
                      alert('Please enter a description of what you need help with')
                      return
                    }
                    setIsGenerating(true)
                    // Simulate AI generation
                    await new Promise(resolve => setTimeout(resolve, 2000))
                    
                    // Generate sample content based on document type
                    let generated = ''
                    if (aiDocumentType === 'summary') {
                      generated = `Based on your request, here's a draft for your Summary of Experience:\n\n[Your content would be generated here based on your prompt and existing data]\n\nThis is a template that would be populated with AI-generated content relevant to your specific requirements. The AI would analyze your experience entries, competencies, and the details you provided to create personalized content.`
                    } else if (aiDocumentType === 'case-study') {
                      generated = `Case Study Draft:\n\n[AI-generated case study content based on your project experience and prompt]\n\nThe AI would structure this according to RICS requirements, incorporating your project details, competencies demonstrated, and lessons learned.`
                    } else if (aiDocumentType === 'competency') {
                      generated = `Competency Statement:\n\n[AI-generated competency statement demonstrating the required levels]\n\nThis would be tailored to show Level 1, 2, and 3 achievement with specific examples from your experience diary.`
                    } else {
                      generated = `CPD Reflective Statement:\n\n[AI-generated reflective statement]\n\nThis would reflect on your CPD activities and demonstrate learning outcomes.`
                    }
                    
                    setAiGeneratedContent(generated)
                    setIsGenerating(false)
                  }}
                  disabled={isGenerating}
                  className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      <span>Generate Content</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {aiGeneratedContent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Generated Content</h4>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        const docId = createDocument(aiDocumentType, `AI Generated ${aiDocumentType}`)
                        updateDocument(docId, aiGeneratedContent)
                        setAiGeneratedContent('')
                        setAiPrompt('')
                        setActiveTab('my-documents')
                        setSelectedDoc(docId)
                      }}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold text-sm"
                    >
                      Save as Document
                    </button>
                    <button
                      onClick={() => setAiGeneratedContent('')}
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono">
                    {aiGeneratedContent}
                  </pre>
                </div>
                <div className="mt-4 text-xs text-gray-500 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>This is a demonstration. In a production environment, this would use actual AI to generate personalized content based on your data.</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

