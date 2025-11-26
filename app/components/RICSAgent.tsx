'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageSquare, 
  Send, 
  BookOpen, 
  Search, 
  Sparkles, 
  FileText,
  X,
  Loader,
  BookMarked,
  TrendingUp
} from 'lucide-react'
import { ricsTextbooks, searchTextbooks, RICSTextbook } from '../data/ricsTextbooks'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: RICSTextbook[]
  timestamp: Date
}

export default function RICSAgent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your RICS Knowledge Assistant. I can help answer questions about RICS practices, procedures, and guidance from the official RICS textbooks. What would you like to know?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showTextbooks, setShowTextbooks] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const findRelevantTextbooks = (query: string): RICSTextbook[] => {
    const lowerQuery = query.toLowerCase()
    const relevant = ricsTextbooks.filter(book => {
      const matchesTitle = book.title.toLowerCase().includes(lowerQuery)
      const matchesDescription = book.description.toLowerCase().includes(lowerQuery)
      const matchesTopics = book.topics.some(topic => topic.toLowerCase().includes(lowerQuery))
      const matchesCategory = book.category.toLowerCase().includes(lowerQuery)
      
      return matchesTitle || matchesDescription || matchesTopics || matchesCategory
    })
    
    // Return top 3 most relevant
    return relevant.slice(0, 3)
  }

  const generateResponse = async (userQuery: string): Promise<{ content: string; sources: RICSTextbook[] }> => {
    // Find relevant textbooks
    const relevantTextbooks = findRelevantTextbooks(userQuery)
    
    // Simulate AI processing (in production, this would call an actual AI API with PDF context)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Generate contextual response based on query
    let content = ''
    const sources = relevantTextbooks
    
    const lowerQuery = userQuery.toLowerCase()
    
    if (lowerQuery.includes('extension') || lowerQuery.includes('time') || lowerQuery.includes('delay')) {
      content = `Based on the RICS guidance on **Extensions of Time** and related topics:\n\n` +
        `Extensions of time are formal adjustments to the contract completion date, typically granted when delays occur due to:\n\n` +
        `• **Relevant Events**: Events that entitle the contractor to an extension (e.g., variations, adverse weather, force majeure)\n` +
        `• **Assessment Process**: The contract administrator must assess delays fairly and in accordance with the contract terms\n` +
        `• **Documentation**: Proper records must be maintained, including delay notices and impact assessments\n\n` +
        `The **Damages for Delay to Completion** guidance provides detailed procedures for handling liquidated damages and delay claims. ` +
        `The **Acceleration** guidance covers scenarios where works need to be accelerated to recover delays.\n\n` +
        `Would you like more specific information about any aspect of extensions of time?`
    } else if (lowerQuery.includes('variation') || lowerQuery.includes('change') || lowerQuery.includes('change order')) {
      content = `Based on RICS guidance on **Change Control and Management** and **Valuing Change**:\n\n` +
        `Variations (changes) to construction contracts involve:\n\n` +
        `• **Change Control Process**: Formal procedures for requesting, approving, and implementing changes\n` +
        `• **Valuation Methods**: Changes can be valued using contract rates, fair rates, or cost-plus methods\n` +
        `• **Time Implications**: Variations may entitle contractors to extensions of time\n` +
        `• **Documentation**: All changes must be properly documented and agreed\n\n` +
        `The **Change Control and Management** guidance provides comprehensive procedures, while **Valuing Change** covers ` +
        `the various methods for assessing the cost and time implications of variations.\n\n` +
        `What specific aspect of variations would you like to explore further?`
    } else if (lowerQuery.includes('cost') || lowerQuery.includes('valuation') || lowerQuery.includes('price')) {
      content = `Based on RICS guidance on **Cost Management** and related topics:\n\n` +
        `Cost management in construction involves several key areas:\n\n` +
        `• **Cost Analysis and Benchmarking**: Methods for analyzing costs and comparing against industry benchmarks\n` +
        `• **Valuation**: Regular valuations of work completed, including variations and adjustments\n` +
        `• **Final Account**: Procedures for preparing and agreeing final accounts\n` +
        `• **Fluctuations**: Handling price changes and inflation adjustments\n\n` +
        `The **Cost Analysis and Benchmarking** guidance provides techniques for cost analysis, while **Final Account Procedures** ` +
        `covers the process of finalizing project costs. **Fluctuations** guidance addresses price adjustment mechanisms.\n\n` +
        `Which cost management topic would you like more detail on?`
    } else if (lowerQuery.includes('procurement') || lowerQuery.includes('tender') || lowerQuery.includes('bidding')) {
      content = `Based on RICS guidance on **Procurement** and **Tendering**:\n\n` +
        `Construction procurement involves:\n\n` +
        `• **Procurement Strategy**: Developing appropriate procurement routes and contract strategies\n` +
        `• **Tendering**: Competitive tendering processes, including eTendering systems\n` +
        `• **Tender Evaluation**: Assessing bids on quality, price, and other criteria\n` +
        `• **Contract Award**: Procedures for awarding contracts\n\n` +
        `The **Developing a Construction Procurement Strategy** guidance provides frameworks for procurement planning, ` +
        `while **Tendering Strategies** covers best practices. **eTendering** guidance addresses digital procurement systems.\n\n` +
        `What aspect of procurement would you like to explore?`
    } else if (lowerQuery.includes('defect') || lowerQuery.includes('snag') || lowerQuery.includes('rectification')) {
      content = `Based on RICS guidance on **Defects and Rectifications**:\n\n` +
        `Managing defects involves:\n\n` +
        `• **Identification**: Systematic identification and documentation of defects\n` +
        `• **Categorization**: Classifying defects by severity and impact\n` +
        `• **Rectification**: Procedures for correcting defects, including who bears the cost\n` +
        `• **Completion**: Ensuring all defects are addressed before final completion\n\n` +
        `The **Defects and Rectifications** guidance provides comprehensive procedures for defect management throughout ` +
        `the construction process and during the defects liability period.\n\n` +
        `Do you have questions about specific defect management procedures?`
    } else if (lowerQuery.includes('risk') || lowerQuery.includes('uncertainty')) {
      content = `Based on RICS guidance on **Risk Management**:\n\n` +
        `Risk management in construction involves:\n\n` +
        `• **Risk Identification**: Systematic identification of project risks\n` +
        `• **Risk Assessment**: Evaluating the probability and impact of risks\n` +
        `• **Risk Mitigation**: Developing strategies to reduce or eliminate risks\n` +
        `• **Risk Allocation**: Assigning risks to appropriate parties through contract terms\n\n` +
        `The **Management of Risk** guidance provides comprehensive frameworks for risk management throughout the project lifecycle.\n\n` +
        `What specific risk management topic would you like to explore?`
    } else {
      content = `I can help you with questions about RICS practices and procedures. Based on your query, I've identified some relevant RICS guidance documents that may contain the information you're looking for.\n\n` +
        `The RICS library covers topics including:\n\n` +
        `• Contract administration (extensions of time, variations, change control)\n` +
        `• Cost management (valuation, final accounts, cost analysis)\n` +
        `• Procurement (tendering, procurement strategy, eTendering)\n` +
        `• Project management (completion, defects, risk management)\n` +
        `• Legal matters (termination, damages, insolvency)\n\n` +
        `Could you provide more specific details about what you'd like to know? I can then direct you to the most relevant RICS guidance.`
    }
    
    return { content, sources }
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await generateResponse(input)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        sources: response.sources,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your question. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const filteredTextbooks = searchQuery 
    ? searchTextbooks(searchQuery)
    : ricsTextbooks

  return (
    <div className="max-w-6xl mx-auto p-6 h-[calc(100vh-120px)] flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold mb-2 flex items-center">
              <Sparkles className="w-8 h-8 mr-3 text-purple-400" />
              RICS Knowledge Assistant
            </h2>
            <p className="text-gray-400">
              Ask questions about RICS practices, procedures, and guidance from official RICS textbooks
            </p>
          </div>
          <button
            onClick={() => setShowTextbooks(!showTextbooks)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center space-x-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>View Textbooks ({ricsTextbooks.length})</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Textbooks Sidebar */}
        {showTextbooks && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="w-80 bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center">
                <BookMarked className="w-4 h-4 mr-2" />
                RICS Textbooks
              </h3>
              <button onClick={() => setShowTextbooks(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search textbooks..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
              {filteredTextbooks.map((book) => (
                <div
                  key={book.id}
                  className="p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
                  onClick={() => {
                    setInput(`Tell me about ${book.title}`)
                    setShowTextbooks(false)
                  }}
                >
                  <div className="font-medium text-sm mb-1">{book.title}</div>
                  <div className="text-xs text-gray-400 mb-1">{book.edition}</div>
                  <div className="text-xs text-purple-400">{book.category}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-700 text-gray-100'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-600">
                      <div className="text-xs font-semibold mb-2 flex items-center">
                        <FileText className="w-3 h-3 mr-1" />
                        Relevant Sources:
                      </div>
                      <div className="space-y-1">
                        {message.sources.map((source) => (
                          <div key={source.id} className="text-xs opacity-80">
                            • {source.title} ({source.edition})
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="text-xs opacity-60 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-700 rounded-lg p-4 flex items-center space-x-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-700 p-4">
            <div className="flex items-end space-x-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask a question about RICS practices, procedures, or guidance..."
                rows={3}
                className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-purple-500 resize-none"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send</span>
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500 flex items-center space-x-4">
              <span>Press Enter to send</span>
              <span>•</span>
              <span>Based on {ricsTextbooks.length} RICS textbooks</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Suggestions */}
      <div className="mt-4">
        <div className="text-sm text-gray-400 mb-2">Quick questions:</div>
        <div className="flex flex-wrap gap-2">
          {[
            'What is an extension of time?',
            'How do I value variations?',
            'What are liquidated damages?',
            'How to manage defects?'
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInput(suggestion)}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm border border-slate-700"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

