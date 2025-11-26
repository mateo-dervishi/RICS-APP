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
  Menu
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

export default function TextbookViewer({ textbookId, onClose }: { textbookId?: string; onClose?: () => void }) {
  const [selectedTextbook, setSelectedTextbook] = useState<RICSTextbook | null>(
    textbookId ? getTextbookById(textbookId) || null : null
  )

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
  const [noteText, setNoteText] = useState('')
  const [notePosition, setNotePosition] = useState({ x: 0, y: 0 })
  const [highlightColor, setHighlightColor] = useState('yellow')
  const [noteColor, setNoteColor] = useState('yellow')
  const pdfContainerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const colors = {
    yellow: 'bg-yellow-400/30 border-yellow-400',
    green: 'bg-green-400/30 border-green-400',
    blue: 'bg-blue-400/30 border-blue-400',
    pink: 'bg-pink-400/30 border-pink-400',
    purple: 'bg-purple-400/30 border-purple-400'
  }

  // Load notes and highlights from localStorage
  useEffect(() => {
    if (selectedTextbook) {
      const savedNotes = localStorage.getItem(`textbook-notes-${selectedTextbook.id}`)
      const savedHighlights = localStorage.getItem(`textbook-highlights-${selectedTextbook.id}`)
      if (savedNotes) setNotes(JSON.parse(savedNotes))
      if (savedHighlights) setHighlights(JSON.parse(savedHighlights))
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
  }, [notes, highlights])

  const handleTextbookSelect = (textbook: RICSTextbook) => {
    setSelectedTextbook(textbook)
    setShowLibrary(false)
    setCurrentPage(1)
    setNotes([])
    setHighlights([])
  }

  const handleTextSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim()) {
      setSelectedText(selection.toString().trim())
      if (isHighlighting) {
        addHighlight(selection.toString().trim())
      }
    }
  }

  const addHighlight = (text: string) => {
    if (!text || !selectedTextbook) return
    
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    const containerRect = pdfContainerRef.current?.getBoundingClientRect()

    if (containerRect) {
      const highlight: Highlight = {
        id: Date.now().toString(),
        page: currentPage,
        text: text,
        x: rect.left - containerRect.left,
        y: rect.top - containerRect.top,
        width: rect.width,
        height: rect.height,
        color: highlightColor,
        createdAt: new Date().toISOString()
      }
      setHighlights([...highlights, highlight])
      setIsHighlighting(false)
      selection.removeAllRanges()
    }
  }

  const addNote = (x: number, y: number) => {
    if (!selectedTextbook) return
    
    const note: Note = {
      id: Date.now().toString(),
      page: currentPage,
      x,
      y,
      text: noteText || 'New note',
      color: noteColor,
      createdAt: new Date().toISOString()
    }
    setNotes([...notes, note])
    setIsAddingNote(false)
    setNoteText('')
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id))
  }

  const deleteHighlight = (id: string) => {
    setHighlights(highlights.filter(h => h.id !== id))
  }

  const getPdfPath = (filename: string) => {
    // In Next.js, files in public folder are served from root
    return `/RICS FILES/${encodeURIComponent(filename)}`
  }

  const currentPageNotes = notes.filter(n => n.page === currentPage)
  const currentPageHighlights = highlights.filter(h => h.page === currentPage)

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
      <div className="bg-slate-900 border-b border-slate-800 p-4">
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

            {/* Toggle Annotations */}
            <div className="flex items-center space-x-2 px-3 py-1 bg-slate-800 rounded-lg">
              <button
                onClick={() => setShowHighlights(!showHighlights)}
                className={`p-1 rounded ${showHighlights ? 'bg-green-600' : 'hover:bg-slate-700'}`}
                title="Toggle Highlights"
              >
                <Highlighter className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowNotes(!showNotes)}
                className={`p-1 rounded ${showNotes ? 'bg-blue-600' : 'hover:bg-slate-700'}`}
                title="Toggle Notes"
              >
                <StickyNote className="w-4 h-4" />
              </button>
            </div>

            {/* Color Picker */}
            {(isHighlighting || isAddingNote) && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-slate-800 rounded-lg">
                {Object.keys(colors).map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      if (isHighlighting) setHighlightColor(color)
                      if (isAddingNote) setNoteColor(color)
                    }}
                    className={`w-6 h-6 rounded ${colors[color as keyof typeof colors]} border-2 ${
                      (isHighlighting && highlightColor === color) || (isAddingNote && noteColor === color)
                        ? 'border-white'
                        : 'border-transparent'
                    }`}
                  />
                ))}
              </div>
            )}

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

      {/* PDF Viewer */}
      <div className="flex-1 overflow-hidden relative" ref={pdfContainerRef}>
        <div className="h-full overflow-auto bg-slate-900">
          <div
            className="p-8"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
            onMouseUp={handleTextSelection}
            onDoubleClick={(e) => {
              if (isAddingNote) {
                const rect = pdfContainerRef.current?.getBoundingClientRect()
                if (rect) {
                  setNotePosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                  })
                }
              }
            }}
          >
            {/* PDF Display */}
            <div className="bg-white shadow-2xl mx-auto" style={{ maxWidth: '800px' }}>
              <iframe
                ref={iframeRef}
                src={`${getPdfPath(selectedTextbook.filename)}#page=${currentPage}`}
                className="w-full"
                style={{ height: '1200px', border: 'none' }}
                title={selectedTextbook.title}
              />
            </div>

            {/* Highlights Overlay */}
            {showHighlights && currentPageHighlights.map((highlight) => (
              <div
                key={highlight.id}
                className={`absolute border-2 ${colors[highlight.color as keyof typeof colors]}`}
                style={{
                  left: highlight.x,
                  top: highlight.y,
                  width: highlight.width,
                  height: highlight.height,
                  pointerEvents: 'none'
                }}
              >
                <button
                  onClick={() => deleteHighlight(highlight.id)}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                  style={{ pointerEvents: 'auto' }}
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}

            {/* Notes Overlay */}
            {showNotes && currentPageNotes.map((note) => (
              <div
                key={note.id}
                className="absolute"
                style={{
                  left: note.x,
                  top: note.y
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

      {/* Note Input Modal */}
      <AnimatePresence>
        {isAddingNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setIsAddingNote(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md"
            >
              <h3 className="text-lg font-semibold mb-4">Add Note</h3>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Enter your note..."
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-purple-500 text-white mb-4"
                rows={4}
                autoFocus
              />
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {Object.keys(colors).map((color) => (
                    <button
                      key={color}
                      onClick={() => setNoteColor(color)}
                      className={`w-8 h-8 rounded ${colors[color as keyof typeof colors]} border-2 ${
                        noteColor === color ? 'border-white' : 'border-transparent'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsAddingNote(false)}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (pdfContainerRef.current) {
                        const rect = pdfContainerRef.current.getBoundingClientRect()
                        addNote(rect.width / 2, rect.height / 2)
                      }
                    }}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
                  >
                    Add Note
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notes Sidebar */}
      <div className="absolute right-0 top-0 bottom-0 w-80 bg-slate-900/95 backdrop-blur-xl border-l border-slate-800 overflow-y-auto p-4">
        <h3 className="font-semibold mb-4 flex items-center">
          <StickyNote className="w-4 h-4 mr-2" />
          Notes & Highlights
        </h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-400 mb-2">Page {currentPage}</h4>
            {currentPageNotes.length === 0 && currentPageHighlights.length === 0 ? (
              <p className="text-sm text-gray-500">No annotations on this page</p>
            ) : (
              <>
                {currentPageNotes.map((note) => (
                  <div
                    key={note.id}
                    className={`p-3 rounded-lg mb-2 border ${colors[note.color as keyof typeof colors]}`}
                  >
                    <p className="text-sm text-white">{note.text}</p>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="mt-2 text-xs text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                {currentPageHighlights.map((highlight) => (
                  <div
                    key={highlight.id}
                    className={`p-3 rounded-lg mb-2 border ${colors[highlight.color as keyof typeof colors]}`}
                  >
                    <p className="text-sm text-white italic">"{highlight.text}"</p>
                    <button
                      onClick={() => deleteHighlight(highlight.id)}
                      className="mt-2 text-xs text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="pt-4 border-t border-slate-800">
            <h4 className="text-sm font-semibold text-gray-400 mb-2">All Pages</h4>
            <div className="space-y-2">
              {Array.from(new Set([...notes, ...highlights].map(a => a.page))).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    currentPage === page
                      ? 'bg-purple-500/20 text-purple-300'
                      : 'bg-slate-800/50 text-gray-400 hover:bg-slate-800'
                  }`}
                >
                  Page {page} ({notes.filter(n => n.page === page).length + highlights.filter(h => h.page === page).length} annotations)
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

