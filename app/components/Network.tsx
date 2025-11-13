'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, MessageSquare, Search, UserPlus, Calendar, Award } from 'lucide-react'

export default function Network() {
  const [activeTab, setActiveTab] = useState('overview')

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
                <h4 className="font-semibold mb-4">Your Connections</h4>
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">No connections yet</p>
                  <button className="mt-4 px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg text-sm">
                    Start Connecting
                  </button>
                </div>
              </div>
              
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h4 className="font-semibold mb-4">Recent Activity</h4>
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">No recent activity</p>
                </div>
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
                  placeholder="Search by name, pathway, or location..."
                  className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                />
              </div>
              <div className="flex space-x-2">
                <select className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg">
                  <option>All Pathways</option>
                  <option>Building Surveying</option>
                  <option>Quantity Surveying</option>
                </select>
                <select className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg">
                  <option>All Levels</option>
                  <option>Student</option>
                  <option>AssocRICS</option>
                  <option>MRICS</option>
                  <option>FRICS</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 bg-slate-700/50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-slate-600 rounded-full" />
                    <div>
                      <div className="font-semibold">Professional {i}</div>
                      <div className="text-sm text-gray-400">MRICS • Building Surveying</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg text-sm">
                    Connect
                  </button>
                </div>
              ))}
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
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">London - Building Surveying</h4>
                  <span className="text-sm text-gray-400">12 members</span>
                </div>
                <p className="text-sm text-gray-400 mb-3">Monthly meetups for APC candidates</p>
                <button className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg text-sm">
                  Join Group
                </button>
              </div>
              
              <button className="w-full p-4 border-2 border-dashed border-slate-600 rounded-lg text-gray-400 hover:border-sky-500 hover:text-sky-400 transition-all">
                + Create New Study Group
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'forum' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Q&A Forum</h3>
            <p className="text-gray-400 mb-6">Ask questions and get answers from verified professionals</p>
            
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">Question about Case Study requirements?</h4>
                    <span className="text-xs text-gray-400">2 hours ago</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    I'm preparing my case study and need clarification on...
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>5 answers</span>
                    <span>Building Surveying</span>
                  </div>
                </div>
              ))}
            </div>
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

