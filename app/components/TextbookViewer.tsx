'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
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
  Menu,
  Edit2,
  Plus,
  Loader,
  Maximize2,
  Minimize2
} from 'lucide-react'
import { ricsTextbooks, RICSTextbook, getTextbookById } from '../data/ricsTextbooks'

// Configure PDF.js worker - use local worker file
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
}

interface Note {
  id: string
  page: number
  title: string
  content: string
  color: string
  createdAt: string
  updatedAt: string
}

interface Highlight {
  id: string
  page: number
  text: string
  rects: Array<{ x: number; y: number; width: number; height: number }>
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
  const [numPages, setNumPages] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [zoom, setZoom] = useState(100)
  const [notes, setNotes] = useState<Note[]>([])
  const [highlights, setHighlights] = useState<Highlight[]>([])
  const [showNotes, setShowNotes] = useState(true)
  const [showHighlights, setShowHighlights] = useState(true)
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [isHighlighting, setIsHighlighting] = useState(false)
  const [selectedText, setSelectedText] = useState('')
  const [newNoteTitle, setNewNoteTitle] = useState('')
  const [newNoteContent, setNewNoteContent] = useState('')
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
  const [highlightColor, setHighlightColor] = useState('yellow')
  const [noteColor, setNoteColor] = useState('yellow')
  const [showTextbookTab, setShowTextbookTab] = useState(true)
  const [showNotesTab, setShowNotesTab] = useState(true)
  const [loading, setLoading] = useState(false)
  const [pdfError, setPdfError] = useState<string | null>(null)
  const pdfContainerRef = useRef<HTMLDivElement>(null)
  const pageRefs = useRef<(HTMLDivElement | null)[]>([])
  const selectionRef = useRef<{ startX: number; startY: number; endX: number; endY: number; text: string } | null>(null)

  const colors = {
    yellow: { bg: 'bg-yellow-400/30', border: 'border-yellow-400', text: 'text-yellow-400' },
    green: { bg: 'bg-green-400/30', border: 'border-green-400', text: 'text-green-400' },
    blue: { bg: 'bg-blue-400/30', border: 'border-blue-400', text: 'text-blue-400' },
    pink: { bg: 'bg-pink-400/30', border: 'border-pink-400', text: 'text-pink-400' },
    purple: { bg: 'bg-purple-400/30', border: 'border-purple-400', text: 'text-purple-400' }
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
    setLoading(true)
    setPdfError(null)
  }

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setLoading(false)
    setPdfError(null)
  }

  const onDocumentLoadError = (error: Error) => {
    console.error('Error loading PDF:', error)
    setLoading(false)
    setPdfError(`Failed to load PDF: ${error.message}`)
  }

  // Handle text selection for highlighting
  const handleTextSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim()) {
      setSelectedText(selection.toString().trim())
    } else {
      setSelectedText('')
    }
  }

  // Handle mouse events for highlighting
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isHighlighting) return
    const rect = pdfContainerRef.current?.getBoundingClientRect()
    if (rect) {
      selectionRef.current = {
        startX: e.clientX - rect.left,
        startY: e.clientY - rect.top,
        endX: e.clientX - rect.left,
        endY: e.clientY - rect.top,
        text: ''
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
        // Get the page element to calculate relative position
        const pageElement = pageRefs.current[currentPage - 1]
        const pageRect = pageElement?.getBoundingClientRect()
        const containerRect = pdfContainerRef.current?.getBoundingClientRect()
        
        if (pageRect && containerRect) {
          const relativeX = (x - (pageRect.left - containerRect.left)) / (zoom / 100)
          const relativeY = (y - (pageRect.top - containerRect.top)) / (zoom / 100)
          const relativeWidth = width / (zoom / 100)
          const relativeHeight = height / (zoom / 100)

          const highlight: Highlight = {
            id: Date.now().toString(),
            page: currentPage,
            text: text,
            rects: [{
              x: relativeX,
              y: relativeY,
              width: relativeWidth,
              height: relativeHeight
            }],
            color: highlightColor,
            createdAt: new Date().toISOString()
          }
          setHighlights([...highlights, highlight])
          setIsHighlighting(false)
        }
      }
    }
    
    selectionRef.current = null
    if (selection) selection.removeAllRanges()
    setSelectedText('')
  }

  const addNote = () => {
    if (!selectedTextbook || !newNoteTitle.trim() || !newNoteContent.trim()) return
    
    const note: Note = {
      id: Date.now().toString(),
      page: currentPage,
      title: newNoteTitle.trim(),
      content: newNoteContent.trim(),
      color: noteColor,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setNotes([...notes, note])
    setNewNoteTitle('')
    setNewNoteContent('')
    setIsAddingNote(false)
  }

  const updateNote = (id: string, title: string, content: string) => {
    setNotes(notes.map(n => n.id === id ? { ...n, title, content, updatedAt: new Date().toISOString() } : n))
    setEditingNoteId(null)
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id))
  }

  const deleteHighlight = (id: string) => {
    setHighlights(highlights.filter(h => h.id !== id))
  }

  const getPdfPath = (filename: string) => {
    // Ensure proper path encoding
    return `/RICS FILES/${filename}`
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
            {/* Tab Toggles */}
            <div className="flex items-center space-x-2 px-3 py-1 bg-slate-800 rounded-lg">
              {!showTextbookTab && (
                <button
                  onClick={() => setShowTextbookTab(true)}
                  className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm font-medium flex items-center space-x-1"
                  title="Show Textbook"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Textbook</span>
                </button>
              )}
              {!showNotesTab && (
                <button
                  onClick={() => setShowNotesTab(true)}
                  className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm font-medium flex items-center space-x-1"
                  title="Show Notes"
                >
                  <StickyNote className="w-4 h-4" />
                  <span>Notes</span>
                </button>
              )}
            </div>

            {/* Page Navigation */}
            {showTextbookTab && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-slate-800 rounded-lg">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-1 hover:bg-slate-700 rounded disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm px-2">
                  Page {currentPage} {numPages && `of ${numPages}`}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(numPages || 1, currentPage + 1))}
                  disabled={currentPage >= (numPages || 1)}
                  className="p-1 hover:bg-slate-700 rounded disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Zoom Controls */}
            {showTextbookTab && (
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
            )}

            {/* Annotation Tools */}
            {showTextbookTab && (
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

      {/* Main Content Area with Tabs */}
      <div className="flex-1 overflow-hidden flex">
        {/* Textbook Tab */}
        {showTextbookTab && (
          <motion.div
            initial={{ width: showNotesTab ? '50%' : '100%' }}
            animate={{ width: showNotesTab ? '50%' : '100%' }}
            transition={{ duration: 0.3 }}
            className="flex flex-col border-r border-slate-800"
          >
            {/* Tab Header */}
            <div className="bg-slate-900/50 border-b border-slate-800 p-2 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium">Textbook</span>
              </div>
              <button
                onClick={() => setShowTextbookTab(false)}
                className="p-1 hover:bg-slate-800 rounded"
                title="Close Textbook Tab"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* PDF Viewer */}
            <div 
              className="flex-1 overflow-hidden relative"
              ref={pdfContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={() => {
                if (isHighlighting) {
                  selectionRef.current = null
                }
              }}
            >
              <div className="h-full overflow-auto bg-slate-900 p-8">
                {loading && (
                  <div className="flex items-center justify-center h-full">
                    <Loader className="w-8 h-8 animate-spin text-purple-400" />
                  </div>
                )}
                {pdfError && (
                  <div className="flex flex-col items-center justify-center h-full text-red-400">
                    <p className="mb-4">{pdfError}</p>
                    <button
                      onClick={() => {
                        setPdfError(null)
                        setLoading(true)
                      }}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
                    >
                      Retry
                    </button>
                  </div>
                )}
                {selectedTextbook && !pdfError && (
                  <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
                    <Document
                      file={getPdfPath(selectedTextbook.filename)}
                      onLoadSuccess={onDocumentLoadSuccess}
                      onLoadError={onDocumentLoadError}
                      loading={
                        <div className="flex items-center justify-center py-20">
                          <Loader className="w-8 h-8 animate-spin text-purple-400" />
                        </div>
                      }
                      error={
                        <div className="text-red-400 text-center py-20">
                          Failed to load PDF. Please check the file path.
                        </div>
                      }
                      options={{
                        cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
                        cMapPacked: true,
                      }}
                    >
                      {numPages && Array.from(new Array(numPages), (el, index) => (
                        <div
                          key={`page_${index + 1}`}
                          ref={el => { pageRefs.current[index] = el }}
                          className="mb-4 relative"
                          onMouseUp={handleTextSelection}
                        >
                          <Page
                            pageNumber={index + 1}
                            scale={zoom / 100}
                            renderTextLayer={true}
                            renderAnnotationLayer={true}
                            className="shadow-2xl"
                          />
                          
                          {/* Highlights Overlay */}
                          {showHighlights && highlights
                            .filter(h => h.page === index + 1)
                            .map((highlight) => (
                              <div key={highlight.id} className="absolute inset-0 pointer-events-none">
                                {highlight.rects.map((rect, rectIndex) => (
                                  <div
                                    key={rectIndex}
                                    className={`absolute ${colors[highlight.color as keyof typeof colors].bg} ${colors[highlight.color as keyof typeof colors].border} border-2 cursor-pointer`}
                                    style={{
                                      left: `${rect.x}px`,
                                      top: `${rect.y}px`,
                                      width: `${rect.width}px`,
                                      height: `${rect.height}px`,
                                    }}
                                    onDoubleClick={() => deleteHighlight(highlight.id)}
                                    title={highlight.text}
                                  />
                                ))}
                              </div>
                            ))}
                        </div>
                      ))}
                    </Document>
                  </div>
                )}

                {/* Selection Rectangle for Highlighting */}
                {isHighlighting && selectionRef.current && (
                  <div
                    className="absolute border-2 border-purple-500 bg-purple-500/20 pointer-events-none z-50"
                    style={{
                      left: Math.min(selectionRef.current.startX, selectionRef.current.endX),
                      top: Math.min(selectionRef.current.startY, selectionRef.current.endY),
                      width: Math.abs(selectionRef.current.endX - selectionRef.current.startX),
                      height: Math.abs(selectionRef.current.endY - selectionRef.current.startY),
                    }}
                  />
                )}

                {/* Highlight Selected Text Button */}
                {selectedText && isHighlighting && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed z-50 bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl"
                    style={{
                      top: selectionRef.current ? `${Math.min(selectionRef.current.startY, selectionRef.current.endY) - 50}px` : '50%',
                      left: selectionRef.current ? `${Math.min(selectionRef.current.startX, selectionRef.current.endX)}px` : '50%',
                    }}
                  >
                    <button
                      onClick={() => {
                        if (selectedText && selectionRef.current) {
                          const { startX, startY, endX, endY } = selectionRef.current
                          const x = Math.min(startX, endX)
                          const y = Math.min(startY, endY)
                          const width = Math.abs(endX - startX)
                          const height = Math.abs(endY - startY)

                          const pageElement = pageRefs.current[currentPage - 1]
                          const pageRect = pageElement?.getBoundingClientRect()
                          const containerRect = pdfContainerRef.current?.getBoundingClientRect()
                          
                          if (pageRect && containerRect) {
                            const relativeX = (x - (pageRect.left - containerRect.left)) / (zoom / 100)
                            const relativeY = (y - (pageRect.top - containerRect.top)) / (zoom / 100)
                            const relativeWidth = width / (zoom / 100)
                            const relativeHeight = height / (zoom / 100)

                            const highlight: Highlight = {
                              id: Date.now().toString(),
                              page: currentPage,
                              text: selectedText,
                              rects: [{
                                x: relativeX,
                                y: relativeY,
                                width: relativeWidth,
                                height: relativeHeight
                              }],
                              color: highlightColor,
                              createdAt: new Date().toISOString()
                            }
                            setHighlights([...highlights, highlight])
                            setIsHighlighting(false)
                            setSelectedText('')
                            window.getSelection()?.removeAllRanges()
                          }
                        }
                      }}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium flex items-center space-x-2"
                    >
                      <Highlighter className="w-4 h-4" />
                      <span>Highlight</span>
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Notes Tab */}
        {showNotesTab && (
          <motion.div
            initial={{ width: showTextbookTab ? '50%' : '100%' }}
            animate={{ width: showTextbookTab ? '50%' : '100%' }}
            transition={{ duration: 0.3 }}
            className="flex flex-col bg-slate-900/95 backdrop-blur-xl"
          >
            {/* Tab Header */}
            <div className="bg-slate-900/50 border-b border-slate-800 p-2 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <StickyNote className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium">Notes & Highlights</span>
              </div>
              <button
                onClick={() => setShowNotesTab(false)}
                className="p-1 hover:bg-slate-800 rounded"
                title="Close Notes Tab"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Notes Content */}
            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="p-4 border-b border-slate-800 flex-shrink-0">
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
                          className={`w-8 h-8 rounded ${colors[color as keyof typeof colors].bg} ${colors[color as keyof typeof colors].border} border-2 ${
                            (isHighlighting && highlightColor === color) || (isAddingNote && noteColor === color)
                              ? 'border-white scale-110'
                              : 'border-transparent'
                          } transition-all`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Note Input Form */}
                {isAddingNote && (
                  <div className="mb-4 space-y-3">
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Note Title</label>
                      <input
                        type="text"
                        value={newNoteTitle}
                        onChange={(e) => setNewNoteTitle(e.target.value)}
                        placeholder="Enter note title..."
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-purple-500 text-white text-sm"
                        autoFocus
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Note Content</label>
                      <textarea
                        value={newNoteContent}
                        onChange={(e) => setNewNoteContent(e.target.value)}
                        placeholder="Write your note here..."
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-purple-500 text-white text-sm resize-none"
                        rows={6}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setIsAddingNote(false)
                          setNewNoteTitle('')
                          setNewNoteContent('')
                        }}
                        className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={addNote}
                        disabled={!newNoteTitle.trim() || !newNoteContent.trim()}
                        className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-medium"
                      >
                        Save Note
                      </button>
                    </div>
                  </div>
                )}

                {!isAddingNote && (
                  <button
                    onClick={() => {
                      setIsAddingNote(true)
                      setIsHighlighting(false)
                    }}
                    className="w-full px-3 py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/50 rounded-lg text-sm font-medium flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Note</span>
                  </button>
                )}
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
                    <div className="space-y-3">
                      {currentPageNotes.map((note) => (
                        <div
                          key={note.id}
                          className={`p-4 rounded-lg border ${colors[note.color as keyof typeof colors].border} bg-slate-800/50`}
                        >
                          {editingNoteId === note.id ? (
                            <div className="space-y-3">
                              <input
                                type="text"
                                value={note.title}
                                onChange={(e) => {
                                  const updatedNote = { ...note, title: e.target.value }
                                  setNotes(notes.map(n => n.id === note.id ? updatedNote : n))
                                }}
                                className="w-full px-2 py-1 bg-slate-700 border border-slate-600 rounded text-sm text-white font-semibold"
                                placeholder="Note title"
                              />
                              <textarea
                                value={note.content}
                                onChange={(e) => {
                                  const updatedNote = { ...note, content: e.target.value }
                                  setNotes(notes.map(n => n.id === note.id ? updatedNote : n))
                                }}
                                className="w-full px-2 py-1 bg-slate-700 border border-slate-600 rounded text-sm text-white resize-none"
                                rows={6}
                                placeholder="Note content"
                              />
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => {
                                    const noteToUpdate = notes.find(n => n.id === note.id)
                                    if (noteToUpdate) {
                                      updateNote(noteToUpdate.id, noteToUpdate.title, noteToUpdate.content)
                                    }
                                  }}
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
                                <h5 className="text-sm font-semibold text-white flex-1">{note.title}</h5>
                                <button
                                  onClick={() => setEditingNoteId(note.id)}
                                  className="ml-2 p-1 hover:bg-slate-700 rounded"
                                  title="Edit"
                                >
                                  <Edit2 className="w-3 h-3 text-gray-400" />
                                </button>
                              </div>
                              <p className="text-sm text-gray-300 whitespace-pre-wrap mb-2">{note.content}</p>
                              <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-700">
                                <p className="text-xs text-gray-400">
                                  {new Date(note.createdAt).toLocaleDateString()}
                                  {note.updatedAt !== note.createdAt && ' (edited)'}
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
                          className={`p-3 rounded-lg border ${colors[highlight.color as keyof typeof colors].border} bg-slate-800/50`}
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
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
