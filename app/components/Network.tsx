'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, MessageSquare, Search, UserPlus, Calendar, Award, CheckCircle2, X, Plus, Send } from 'lucide-react'

interface Connection {
  id: string
  name: string
  level: string
  pathway: string
  location: string
  connected: boolean
  pending: boolean
}

interface StudyGroup {
  id: string
  name: string
  location: string
  pathway: string
  members: number
  description: string
  joined: boolean
}

interface ForumPost {
  id: string
  title: string
  content: string
  author: string
  answers: number
  pathway: string
  timeAgo: string
  upvotes: number
}

export default function Network() {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPathway, setSelectedPathway] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [showNewPost, setShowNewPost] = useState(false)
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
  
  const [connections, setConnections] = useState<Connection[]>([
    { id: '1', name: 'Sarah Johnson', level: 'MRICS', pathway: 'Building Surveying', location: 'London, UK', connected: false, pending: false },
    { id: '2', name: 'Michael Chen', level: 'FRICS', pathway: 'Quantity Surveying', location: 'Manchester, UK', connected: false, pending: false },
    { id: '3', name: 'Emma Williams', level: 'MRICS', pathway: 'Valuation', location: 'Birmingham, UK', connected: false, pending: false }
  ])

  const [myConnections, setMyConnections] = useState<Connection[]>([])

  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([
    { id: '1', name: 'London - Building Surveying', location: 'London', pathway: 'Building Surveying', members: 12, description: 'Monthly meetups for APC candidates', joined: false },
    { id: '2', name: 'Manchester - Quantity Surveying', location: 'Manchester', pathway: 'Quantity Surveying', members: 8, description: 'Weekly study sessions and mock interviews', joined: false },
    { id: '3', name: 'Online - General APC', location: 'Online', pathway: 'All Pathways', members: 45, description: 'Virtual study group for all pathways', joined: true }
  ])

  const [forumPosts, setForumPosts] = useState<ForumPost[]>([
    { id: '1', title: 'Question about Case Study requirements?', content: "I'm preparing my case study and need clarification on the word count and structure requirements. Can anyone share their experience?", author: 'John D.', answers: 5, pathway: 'Building Surveying', timeAgo: '2 hours ago', upvotes: 12 },
    { id: '2', title: 'Best resources for Ethics competency?', content: 'What are the best resources or courses to prepare for the Ethics competency assessment?', author: 'Sarah M.', answers: 8, pathway: 'Quantity Surveying', timeAgo: '5 hours ago', upvotes: 18 },
    { id: '3', title: 'CPD hours calculation question', content: 'How do I calculate CPD hours for informal learning activities?', author: 'Mike T.', answers: 3, pathway: 'Valuation', timeAgo: '1 day ago', upvotes: 7 }
  ])

  const handleConnect = (id: string) => {
    setConnections(prev => prev.map(conn => 
      conn.id === id ? { ...conn, pending: true } : conn
    ))
    setTimeout(() => {
      const connection = connections.find(c => c.id === id)
      if (connection) {
        setMyConnections(prev => [...prev, { ...connection, connected: true, pending: false }])
        setConnections(prev => prev.filter(c => c.id !== id))
      }
    }, 1000)
  }

  const handleJoinGroup = (id: string) => {
    setStudyGroups(prev => prev.map(group => 
      group.id === id ? { ...group, joined: true, members: group.members + 1 } : group
    ))
  }

  const handleLeaveGroup = (id: string) => {
    setStudyGroups(prev => prev.map(group => 
      group.id === id ? { ...group, joined: false, members: group.members - 1 } : group
    ))
  }

  const handleCreatePost = () => {
    if (newPostTitle && newPostContent) {
      const newPost: ForumPost = {
        id: Date.now().toString(),
        title: newPostTitle,
        content: newPostContent,
        author: 'You',
        answers: 0,
        pathway: 'General',
        timeAgo: 'just now',
        upvotes: 0
      }
      setForumPosts(prev => [newPost, ...prev])
      setNewPostTitle('')
      setNewPostContent('')
      setShowNewPost(false)
    }
  }

  const filteredConnections = connections.filter(conn => {
    const matchesSearch = conn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conn.pathway.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conn.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPathway = selectedPathway === 'all' || conn.pathway === selectedPathway
    const matchesLevel = selectedLevel === 'all' || conn.level === selectedLevel
    return matchesSearch && matchesPathway && matchesLevel
  })

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Users },
    { id: 'connect', name: 'Connect', icon: UserPlus },
    { id: 'groups', name: 'Study Groups', icon: Users },
    { id: 'forum', name: 'Forum', icon: MessageSquare },
    { id: 'events', name: 'Events', icon: Calendar }
  ]

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2 flex items-center">
          <Users className="w-8 h-8 mr-3 text-sky-400" />
          Professional Network
        </h2>
        <p className="text-gray-400">Connect with candidates, mentors, and professionals</p>
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
                  ? 'bg-sky-500/20 text-sky-400 border border-sky-500/50'
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
            <div className="bg-gradient-to-br from-sky-900/30 to-blue-900/30 backdrop-blur-sm border border-sky-500/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Build Your Professional Network</h3>
              <p className="text-gray-300 mb-6">
                Connect with other RICS candidates, find mentors, join study groups, and access
                professional resources.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <UserPlus className="w-6 h-6 text-sky-400 mb-2" />
                  <h4 className="font-semibold mb-2">Find Mentors</h4>
                  <p className="text-sm text-gray-400">Connect with MRICS/FRICS professionals</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <Users className="w-6 h-6 text-blue-400 mb-2" />
                  <h4 className="font-semibold mb-2">Study Groups</h4>
                  <p className="text-sm text-gray-400">Join local or online groups</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <MessageSquare className="w-6 h-6 text-purple-400 mb-2" />
                  <h4 className="font-semibold mb-2">Q&A Forum</h4>
                  <p className="text-sm text-gray-400">Ask questions, share experiences</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h4 className="font-semibold mb-4">Your Connections ({myConnections.length})</h4>
                {myConnections.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">No connections yet</p>
                    <button 
                      onClick={() => setActiveTab('connect')}
                      className="mt-4 px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg text-sm"
                    >
                      Start Connecting
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {myConnections.slice(0, 3).map(conn => (
                      <div key={conn.id} className="p-3 bg-slate-700/50 rounded-lg flex items-center space-x-3">
                        <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold">{conn.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{conn.name}</div>
                          <div className="text-xs text-gray-400">{conn.level} • {conn.pathway}</div>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      </div>
                    ))}
                    {myConnections.length > 3 && (
                      <button className="w-full text-sm text-sky-400 hover:text-sky-300">
                        View all {myConnections.length} connections →
                      </button>
                    )}
                  </div>
                )}
              </div>
              
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h4 className="font-semibold mb-4">Recent Activity</h4>
                {forumPosts.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">No recent activity</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {forumPosts.slice(0, 2).map(post => (
                      <div key={post.id} className="p-3 bg-slate-700/50 rounded-lg">
                        <div className="font-medium text-sm mb-1">{post.title}</div>
                        <div className="text-xs text-gray-400">{post.answers} answers • {post.timeAgo}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'connect' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Find Professionals</h3>
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, pathway, or location..."
                  className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-sky-500"
                />
              </div>
              <div className="flex space-x-2">
                <select 
                  value={selectedPathway}
                  onChange={(e) => setSelectedPathway(e.target.value)}
                  className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-sky-500"
                >
                  <option value="all">All Pathways</option>
                  <option value="Building Surveying">Building Surveying</option>
                  <option value="Quantity Surveying">Quantity Surveying</option>
                  <option value="Valuation">Valuation</option>
                  <option value="Project Management">Project Management</option>
                </select>
                <select 
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-sky-500"
                >
                  <option value="all">All Levels</option>
                  <option value="Student">Student</option>
                  <option value="AssocRICS">AssocRICS</option>
                  <option value="MRICS">MRICS</option>
                  <option value="FRICS">FRICS</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-3">
              {filteredConnections.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Users className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                  <p>No professionals found matching your criteria</p>
                </div>
              ) : (
                filteredConnections.map((conn) => (
                  <div key={conn.id} className="p-4 bg-slate-700/50 rounded-lg flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">{conn.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div>
                        <div className="font-semibold">{conn.name}</div>
                        <div className="text-sm text-gray-400">{conn.level} • {conn.pathway}</div>
                        <div className="text-xs text-gray-500">{conn.location}</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleConnect(conn.id)}
                      disabled={conn.pending}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        conn.pending 
                          ? 'bg-yellow-600 cursor-not-allowed' 
                          : 'bg-sky-600 hover:bg-sky-700'
                      }`}
                    >
                      {conn.pending ? 'Pending...' : 'Connect'}
                    </button>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'groups' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Study Groups</h3>
            <p className="text-gray-400 mb-6">Find or create study groups by location or pathway</p>
            
            <div className="space-y-3">
              {studyGroups.map((group) => (
                <div key={group.id} className="p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{group.name}</h4>
                    <span className="text-sm text-gray-400">{group.members} members</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{group.description}</p>
                  <div className="flex items-center space-x-2">
                    {group.joined ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-green-400">Joined</span>
                        <button 
                          onClick={() => handleLeaveGroup(group.id)}
                          className="ml-auto px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
                        >
                          Leave Group
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => handleJoinGroup(group.id)}
                        className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg text-sm"
                      >
                        Join Group
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              <button 
                onClick={() => setShowCreateGroup(true)}
                className="w-full p-4 border-2 border-dashed border-slate-600 rounded-lg text-gray-400 hover:border-sky-500 hover:text-sky-400 transition-all"
              >
                + Create New Study Group
              </button>
            </div>

            {showCreateGroup && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                onClick={() => setShowCreateGroup(false)}
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Create Study Group</h3>
                    <button onClick={() => setShowCreateGroup(false)}>
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Group name"
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                    />
                    <textarea
                      placeholder="Description"
                      rows={3}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                    />
                    <button className="w-full px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg font-semibold">
                      Create Group
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}

        {activeTab === 'forum' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold">Q&A Forum</h3>
                <p className="text-gray-400 text-sm">Ask questions and get answers from verified professionals</p>
              </div>
              <button
                onClick={() => setShowNewPost(true)}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg font-semibold flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>New Post</span>
              </button>
            </div>
            
            <div className="space-y-3">
              {forumPosts.map((post) => (
                <div key={post.id} className="p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{post.title}</h4>
                    <span className="text-xs text-gray-400">{post.timeAgo}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{post.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{post.answers} answers</span>
                      <span>{post.pathway}</span>
                      <span className="flex items-center space-x-1">
                        <Award className="w-4 h-4" />
                        <span>{post.upvotes}</span>
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">by {post.author}</div>
                  </div>
                </div>
              ))}
            </div>

            {showNewPost && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                onClick={() => setShowNewPost(false)}
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-2xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Create New Post</h3>
                    <button onClick={() => setShowNewPost(false)}>
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      placeholder="Post title"
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-sky-500"
                    />
                    <textarea
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      placeholder="Write your question or discussion topic..."
                      rows={6}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-sky-500"
                    />
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => setShowNewPost(false)}
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleCreatePost}
                        className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg font-semibold flex items-center space-x-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>Post</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}

        {activeTab === 'events' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
            <p className="text-gray-400 mb-6">RICS events, webinars, and networking opportunities</p>
            
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">RICS APC Preparation Webinar</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Jan 25, 2024</span>
                        </div>
                        <span>Online</span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg text-sm">
                      Register
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

