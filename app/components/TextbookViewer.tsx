'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  FileText,
  Highlighter,
  StickyNote,
  Save,
  Trash2,
  Search,
  Download,
  Menu,
  Edit2,
  Plus
} from 'lucide-react'
import { ricsTextbooks, RICSTextbook, getTextbookById } from '../data/ricsTextbooks'

interface Note {
  id: string
  page: number
  x: number
  y: number
  text: string
  color: string
  createdAt: string
}

interface Highlight {
  id: string
  page: number
  text: string
  x: number
  y: number
  width: number
  height: number
  color: string
  createdAt: string
}

// Declare custom event type
declare global {
  interface WindowEventMap {
    openTextbook: CustomEvent<string>
  }
}

export default function TextbookViewer({ textbookId, onClose }: { textbookId?: string; onClose?: () => void }) {
  const [selectedTextbook, setSelectedTextbook] = useState<RICSTextbook | null>(
    textbookId ? getTextbookById(textbookId) || null : null
  )
  const [showLibrary, setShowLibrary] = useState(!textbookId)
  const [currentPage, setCurrentPage] = useState(1)
  const [zoom, setZoom] = useState(100)
  const [notes, setNotes] = useState<Note[]>([])
  const [highlights, setHighlights] = useState<Highlight[]>([])
  const [showNotes, setShowNotes] = useState(true)
  const [showHighlights, setShowHighlights] = useState(true)
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [isHighlighting, setIsHighlighting] = useState(false)
  const [selectedText, setSelectedText] = useState('')
  const [newNoteText, setNewNoteText] = useState('')
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
  const [highlightColor, setHighlightColor] = useState('yellow')
  const [noteColor, setNoteColor] = useState('yellow')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pdfContainerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const selectionRef = useRef<{ startX: number; startY: number; endX: number; endY: number } | null>(null)

  const colors = {
    yellow: 'bg-yellow-400/30 border-yellow-400',
    green: 'bg-green-400/30 border-green-400',
    blue: 'bg-blue-400/30 border-blue-400',
    pink: 'bg-pink-400/30 border-pink-400',
    purple: 'bg-purple-400/30 border-purple-400'
  }

  // Listen for openTextbook events from RICS Agent
  useEffect(() => {
    const handleOpenTextbook = (event: CustomEvent) => {
      const id = event.detail
      const textbook = getTextbookById(id)
      if (textbook) {
        setSelectedTextbook(textbook)
        setShowLibrary(false)
      }
    }

    window.addEventListener('openTextbook', handleOpenTextbook)
    return () => {
      window.removeEventListener('openTextbook', handleOpenTextbook)
    }
  }, [])

  // Load notes and highlights from localStorage
  useEffect(() => {
    if (selectedTextbook) {
      const savedNotes = localStorage.getItem(`textbook-notes-${selectedTextbook.id}`)
      const savedHighlights = localStorage.getItem(`textbook-highlights-${selectedTextbook.id}`)
      if (savedNotes) {
        try {
          setNotes(JSON.parse(savedNotes))
        } catch (e) {
          console.error('Failed to load notes:', e)
        }
      }
      if (savedHighlights) {
        try {
          setHighlights(JSON.parse(savedHighlights))
        } catch (e) {
          console.error('Failed to load highlights:', e)
        }
      }
    }
  }, [selectedTextbook])

  // Save notes and highlights to localStorage
  const saveAnnotations = () => {
    if (selectedTextbook) {
      localStorage.setItem(`textbook-notes-${selectedTextbook.id}`, JSON.stringify(notes))
      localStorage.setItem(`textbook-highlights-${selectedTextbook.id}`, JSON.stringify(highlights))
    }
  }

  useEffect(() => {
    saveAnnotations()
  }, [notes, highlights, selectedTextbook])

  const handleTextbookSelect = (textbook: RICSTextbook) => {
    setSelectedTextbook(textbook)
    setShowLibrary(false)
    setCurrentPage(1)
  }

  // Improved highlighting with mouse selection
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isHighlighting) return
    const rect = pdfContainerRef.current?.getBoundingClientRect()
    if (rect) {
      selectionRef.current = {
        startX: e.clientX - rect.left,
        startY: e.clientY - rect.top,
        endX: e.clientX - rect.left,
        endY: e.clientY - rect.top
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isHighlighting || !selectionRef.current) return
    const rect = pdfContainerRef.current?.getBoundingClientRect()
    if (rect) {
      selectionRef.current.endX = e.clientX - rect.left
      selectionRef.current.endY = e.clientY - rect.top
    }
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isHighlighting || !selectionRef.current) return
    
    const selection = window.getSelection()
    const text = selection?.toString().trim() || ''
    
    if (text && selectionRef.current) {
      const { startX, startY, endX, endY } = selectionRef.current
      const x = Math.min(startX, endX)
      const y = Math.min(startY, endY)
      const width = Math.abs(endX - startX)
      const height = Math.abs(endY - startY)

      if (width > 10 && height > 10) {
        const highlight: Highlight = {
          id: Date.now().toString(),
          page: currentPage,
          text: text,
          x: x / (zoom / 100),
          y: y / (zoom / 100),
          width: width / (zoom / 100),
          height: height / (zoom / 100),
          color: highlightColor,
          createdAt: new Date().toISOString()
        }
        setHighlights([...highlights, highlight])
        setIsHighlighting(false)
      }
    }
    
    selectionRef.current = null
    if (selection) selection.removeAllRanges()
  }

  const addNote = () => {
    if (!selectedTextbook || !newNoteText.trim()) return
    
    const note: Note = {
      id: Date.now().toString(),
      page: currentPage,
      x: 0,
      y: 0,
      text: newNoteText.trim(),
      color: noteColor,
      createdAt: new Date().toISOString()
    }
    setNotes([...notes, note])
    setNewNoteText('')
    setIsAddingNote(false)
  }

  const updateNote = (id: string, text: string) => {
    setNotes(notes.map(n => n.id === id ? { ...n, text } : n))
    setEditingNoteId(null)
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id))
  }

  const deleteHighlight = (id: string) => {
    setHighlights(highlights.filter(h => h.id !== id))
  }

  const getPdfPath = (filename: string) => {
    return `/RICS FILES/${encodeURIComponent(filename)}`
  }

  const currentPageNotes = notes.filter(n => n.page === currentPage)
  const currentPageHighlights = highlights.filter(h => h.page === currentPage)
  const allPagesWithAnnotations = Array.from(new Set([...notes, ...highlights].map(a => a.page))).sort((a, b) => a - b)

  if (showLibrary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center">
                <BookOpen className="w-8 h-8 mr-3 text-purple-400" />
                RICS Textbook Library
              </h1>
              <p className="text-gray-400">Browse and read official RICS guidance documents</p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ricsTextbooks.map((textbook) => (
              <motion.button
                key={textbook.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => handleTextbookSelect(textbook)}
                className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-purple-500 transition-all text-left group"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1 group-hover:text-purple-400 transition-colors">
                      {textbook.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">{textbook.edition}</p>
                    <p className="text-xs text-gray-500">{textbook.category}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!selectedTextbook) return null

  return (
    <div className="h-screen flex flex-col bg-slate-950">
      {/* Toolbar */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowLibrary(true)}
              className="p-2 hover:bg-slate-800 rounded-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="font-semibold">{selectedTextbook.title}</h2>
              <p className="text-xs text-gray-400">{selectedTextbook.edition}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Page Navigation */}
            <div className="flex items-center space-x-2 px-3 py-1 bg-slate-800 rounded-lg">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-1 hover:bg-slate-700 rounded disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm px-2">
                Page {currentPage}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="p-1 hover:bg-slate-700 rounded"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-2 px-3 py-1 bg-slate-800 rounded-lg">
              <button
                onClick={() => setZoom(Math.max(50, zoom - 10))}
                className="p-1 hover:bg-slate-700 rounded"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-sm px-2">{zoom}%</span>
              <button
                onClick={() => setZoom(Math.min(200, zoom + 10))}
                className="p-1 hover:bg-slate-700 rounded"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Annotation Tools */}
            <div className="flex items-center space-x-2 px-3 py-1 bg-slate-800 rounded-lg">
              <button
                onClick={() => {
                  setIsHighlighting(!isHighlighting)
                  setIsAddingNote(false)
                }}
                className={`p-1 rounded ${isHighlighting ? 'bg-purple-600' : 'hover:bg-slate-700'}`}
                title="Highlight"
              >
                <Highlighter className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setIsAddingNote(!isAddingNote)
                  setIsHighlighting(false)
                }}
                className={`p-1 rounded ${isAddingNote ? 'bg-purple-600' : 'hover:bg-slate-700'}`}
                title="Add Note"
              >
                <StickyNote className="w-4 h-4" />
              </button>
            </div>

            {/* Toggle Sidebar */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-800 rounded-lg"
              title="Toggle Notes Panel"
            >
              <Menu className="w-5 h-5" />
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex">
        {/* PDF Viewer */}
        <div 
          className={`flex-1 overflow-hidden relative transition-all ${sidebarOpen ? 'mr-80' : ''}`}
          ref={pdfContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div className="h-full overflow-auto bg-slate-900">
            <div
              className="p-8"
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
            >
              {/* PDF Display */}
              <div className="bg-white shadow-2xl mx-auto" style={{ maxWidth: '800px', minHeight: '1200px' }}>
                <iframe
                  ref={iframeRef}
                  src={`${getPdfPath(selectedTextbook.filename)}#page=${currentPage}&zoom=${zoom}`}
                  className="w-full"
                  style={{ height: '1200px', border: 'none', minHeight: '1200px' }}
                  title={selectedTextbook.title}
                />
              </div>

              {/* Selection Rectangle for Highlighting */}
              {isHighlighting && selectionRef.current && (
                <div
                  className="absolute border-2 border-purple-500 bg-purple-500/20 pointer-events-none"
                  style={{
                    left: Math.min(selectionRef.current.startX, selectionRef.current.endX),
                    top: Math.min(selectionRef.current.startY, selectionRef.current.endY),
                    width: Math.abs(selectionRef.current.endX - selectionRef.current.startX),
                    height: Math.abs(selectionRef.current.endY - selectionRef.current.startY),
                  }}
                />
              )}

              {/* Highlights Overlay */}
              {showHighlights && currentPageHighlights.map((highlight) => (
                <div
                  key={highlight.id}
                  className={`absolute border-2 ${colors[highlight.color as keyof typeof colors]} pointer-events-auto cursor-pointer`}
                  style={{
                    left: highlight.x * (zoom / 100),
                    top: highlight.y * (zoom / 100),
                    width: highlight.width * (zoom / 100),
                    height: highlight.height * (zoom / 100),
                  }}
                  onDoubleClick={() => deleteHighlight(highlight.id)}
                  title={highlight.text}
                >
                  <button
                    onClick={() => deleteHighlight(highlight.id)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-10"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}

              {/* Notes Overlay */}
              {showNotes && currentPageNotes.map((note) => (
                <div
                  key={note.id}
                  className="absolute pointer-events-auto"
                  style={{
                    left: note.x * (zoom / 100),
                    top: note.y * (zoom / 100),
                  }}
                >
                  <div className={`w-64 p-3 rounded-lg border-2 ${colors[note.color as keyof typeof colors]} bg-slate-900 shadow-lg`}>
                    <div className="flex items-start justify-between mb-2">
                      <StickyNote className={`w-4 h-4 ${note.color === 'yellow' ? 'text-yellow-400' : note.color === 'green' ? 'text-green-400' : note.color === 'blue' ? 'text-blue-400' : note.color === 'pink' ? 'text-pink-400' : 'text-purple-400'}`} />
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="p-1 hover:bg-slate-800 rounded"
                      >
                        <Trash2 className="w-3 h-3 text-red-400" />
                      </button>
                    </div>
                    <p className="text-sm text-white">{note.text}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notes Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-80 bg-slate-900/95 backdrop-blur-xl border-l border-slate-800 flex flex-col absolute right-0 top-0 bottom-0 z-10"
            >
              <div className="p-4 border-b border-slate-800 flex-shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center">
                    <StickyNote className="w-4 h-4 mr-2" />
                    Notes & Highlights
                  </h3>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1 hover:bg-slate-800 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Color Picker */}
                {(isHighlighting || isAddingNote) && (
                  <div className="mb-4">
                    <div className="text-xs text-gray-400 mb-2">Color:</div>
                    <div className="flex items-center space-x-2">
                      {Object.keys(colors).map((color) => (
                        <button
                          key={color}
                          onClick={() => {
                            if (isHighlighting) setHighlightColor(color)
                            if (isAddingNote) setNoteColor(color)
                          }}
                          className={`w-8 h-8 rounded ${colors[color as keyof typeof colors]} border-2 ${
                            (isHighlighting && highlightColor === color) || (isAddingNote && noteColor === color)
                              ? 'border-white scale-110'
                              : 'border-transparent'
                          } transition-all`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Note Input */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-300">Quick Note</label>
                    <button
                      onClick={() => {
                        setIsAddingNote(!isAddingNote)
                        setIsHighlighting(false)
                      }}
                      className="text-xs text-purple-400 hover:text-purple-300"
                    >
                      {isAddingNote ? 'Cancel' : 'New'}
                    </button>
                  </div>
                  {isAddingNote ? (
                    <div className="space-y-2">
                      <textarea
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        placeholder="Write your note here..."
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-purple-500 text-white text-sm resize-none"
                        rows={4}
                        autoFocus
                      />
                      <button
                        onClick={addNote}
                        disabled={!newNoteText.trim()}
                        className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-medium"
                      >
                        Save Note
                      </button>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500 p-2 bg-slate-800/50 rounded">
                      Click "New" to add a note for this page
                    </div>
                  )}
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Current Page Annotations */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center justify-between">
                    <span>Page {currentPage}</span>
                    <span className="text-xs text-gray-500">
                      {currentPageNotes.length + currentPageHighlights.length} items
                    </span>
                  </h4>
                  {currentPageNotes.length === 0 && currentPageHighlights.length === 0 ? (
                    <div className="text-sm text-gray-500 text-center py-4">
                      No annotations on this page
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {currentPageNotes.map((note) => (
                        <div
                          key={note.id}
                          className={`p-3 rounded-lg border ${colors[note.color as keyof typeof colors]} bg-slate-800/50`}
                        >
                          {editingNoteId === note.id ? (
                            <div className="space-y-2">
                              <textarea
                                value={note.text}
                                onChange={(e) => updateNote(note.id, e.target.value)}
                                className="w-full px-2 py-1 bg-slate-700 border border-slate-600 rounded text-sm text-white resize-none"
                                rows={3}
                                autoFocus
                              />
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => updateNote(note.id, note.text)}
                                  className="flex-1 px-2 py-1 bg-green-600 hover:bg-green-700 rounded text-xs"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingNoteId(null)}
                                  className="flex-1 px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-start justify-between mb-2">
                                <p className="text-sm text-white flex-1">{note.text}</p>
                                <button
                                  onClick={() => setEditingNoteId(note.id)}
                                  className="ml-2 p-1 hover:bg-slate-700 rounded"
                                  title="Edit"
                                >
                                  <Edit2 className="w-3 h-3 text-gray-400" />
                                </button>
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <p className="text-xs text-gray-400">
                                  {new Date(note.createdAt).toLocaleDateString()}
                                </p>
                                <button
                                  onClick={() => deleteNote(note.id)}
                                  className="text-xs text-red-400 hover:text-red-300"
                                >
                                  Delete
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                      {currentPageHighlights.map((highlight) => (
                        <div
                          key={highlight.id}
                          className={`p-3 rounded-lg border ${colors[highlight.color as keyof typeof colors]} bg-slate-800/50`}
                        >
                          <p className="text-sm text-white italic mb-2">"{highlight.text}"</p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-400">
                              {new Date(highlight.createdAt).toLocaleDateString()}
                            </p>
                            <button
                              onClick={() => deleteHighlight(highlight.id)}
                              className="text-xs text-red-400 hover:text-red-300"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* All Pages Navigation */}
                {allPagesWithAnnotations.length > 0 && (
                  <div className="pt-4 border-t border-slate-800">
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">All Pages with Annotations</h4>
                    <div className="space-y-1 max-h-64 overflow-y-auto">
                      {allPagesWithAnnotations.map((page) => {
                        const pageNotes = notes.filter(n => n.page === page).length
                        const pageHighlights = highlights.filter(h => h.page === page).length
                        const total = pageNotes + pageHighlights
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                              currentPage === page
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
                                : 'bg-slate-800/50 text-gray-400 hover:bg-slate-800 border border-transparent'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Page {page}</span>
                              <span className="text-xs opacity-75">({total})</span>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
