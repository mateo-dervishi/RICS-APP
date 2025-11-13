'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, BookOpen, Users, Target, Calendar, CheckCircle2, Award, Building, MessageSquare } from 'lucide-react'

export default function StudentModule() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', name: 'Overview', icon: GraduationCap },
    { id: 'enrollment', name: 'Enrollment', icon: BookOpen },
    { id: 'academic', name: 'Academic Progress', icon: Target },
    { id: 'matrics', name: 'Matrics Network', icon: Users },
    { id: 'placement', name: 'Placement Prep', icon: Calendar },
    { id: 'career', name: 'Career Guidance', icon: Building }
  ]

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2 flex items-center">
          <GraduationCap className="w-8 h-8 mr-3 text-blue-400" />
          Student Membership Module
        </h2>
        <p className="text-gray-400">Free RICS student membership and preparation tools</p>
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
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
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
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm border border-blue-500/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Free Student Membership</h3>
              <p className="text-gray-300 mb-6">
                As a student enrolled in a RICS-accredited degree, you're eligible for free RICS student membership.
                This gives you access to valuable resources and networks to kickstart your surveying career.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <CheckCircle2 className="w-6 h-6 text-green-400 mb-2" />
                  <h4 className="font-semibold mb-2">Free Membership</h4>
                  <p className="text-sm text-gray-400">No enrollment or annual fees</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <Users className="w-6 h-6 text-blue-400 mb-2" />
                  <h4 className="font-semibold mb-2">Matrics Network</h4>
                  <p className="text-sm text-gray-400">Connect with other students</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <BookOpen className="w-6 h-6 text-purple-400 mb-2" />
                  <h4 className="font-semibold mb-2">Academic Resources</h4>
                  <p className="text-sm text-gray-400">Access to RICS guidance</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <Target className="w-6 h-6 text-yellow-400 mb-2" />
                  <h4 className="font-semibold mb-2">Career Support</h4>
                  <p className="text-sm text-gray-400">Placement and job opportunities</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
              <div className="space-y-3">
                {[
                  { step: '1', title: 'Verify Your Degree', desc: 'Confirm your degree is RICS-accredited' },
                  { step: '2', title: 'Enroll as Student Member', desc: 'Complete free enrollment application' },
                  { step: '3', title: 'Join Matrics Network', desc: 'Connect with peers and professionals' },
                  { step: '4', title: 'Plan Your Placement Year', desc: 'Prepare for APC structured training' }
                ].map((item) => (
                  <div key={item.step} className="flex items-start space-x-4 p-4 bg-slate-700/50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold">
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

        {activeTab === 'enrollment' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Student Membership Enrollment</h3>
            <p className="text-gray-400 mb-6">Complete your free student membership application</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">University Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                  placeholder="Enter your university"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Degree Program</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                  placeholder="e.g., BSc Building Surveying"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Expected Graduation</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">RICS Accreditation Status</label>
                <select className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg">
                  <option>RICS Accredited</option>
                  <option>Pending Accreditation</option>
                  <option>Not Accredited</option>
                </select>
              </div>
              <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold">
                Submit Enrollment Application
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'academic' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Academic Progress Tracker</h3>
              <p className="text-gray-400 mb-6">Track your academic achievements and RICS-related coursework</p>
              
              <div className="space-y-4">
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Year 1 Progress</span>
                    <span className="text-blue-400">75%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h4 className="font-semibold mb-2">RICS-Related Modules</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>✓ Building Technology</li>
                      <li>✓ Construction Law</li>
                      <li>✓ Property Valuation</li>
                      <li>○ Professional Practice</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Assignment Help</h4>
                    <p className="text-sm text-gray-400 mb-3">Get guidance on surveying-related assignments</p>
                    <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm">
                      Request Help
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'matrics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Matrics Network</h3>
            <p className="text-gray-400 mb-6">
              Connect with other RICS students, share experiences, and find study groups
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-slate-700/50 rounded-lg text-center">
                <Users className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Find Study Groups</h4>
                <p className="text-sm text-gray-400 mb-4">Connect with students in your area</p>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm">
                  Browse Groups
                </button>
              </div>
              <div className="p-6 bg-slate-700/50 rounded-lg text-center">
                <MessageSquare className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Q&A Forum</h4>
                <p className="text-sm text-gray-400 mb-4">Ask questions to verified professionals</p>
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm">
                  Visit Forum
                </button>
              </div>
              <div className="p-6 bg-slate-700/50 rounded-lg text-center">
                <Award className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Success Stories</h4>
                <p className="text-sm text-gray-400 mb-4">Learn from others' journeys</p>
                <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm">
                  Read Stories
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'placement' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Placement Year Preparation</h3>
            <p className="text-gray-400 mb-6">Prepare for your placement year and APC structured training</p>
            
            <div className="space-y-4">
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <h4 className="font-semibold mb-3">Placement Checklist</h4>
                <div className="space-y-2">
                  {[
                    'Update CV with relevant coursework',
                    'Prepare for interviews',
                    'Research potential employers',
                    'Understand APC requirements',
                    'Set up experience diary system'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <h4 className="font-semibold mb-3">Employer Matching</h4>
                <p className="text-sm text-gray-400 mb-4">
                  Find employers offering APC structured training programs
                </p>
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm">
                  Browse Employers
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'career' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Career Guidance</h3>
            <p className="text-gray-400 mb-6">Explore career paths and progression opportunities</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-slate-700/50 rounded-lg">
                <Building className="w-8 h-8 text-blue-400 mb-3" />
                <h4 className="font-semibold mb-2">Career Pathways</h4>
                <p className="text-sm text-gray-400 mb-4">
                  Explore different surveying specializations and career routes
                </p>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm">
                  Explore
                </button>
              </div>
              <div className="p-6 bg-slate-700/50 rounded-lg">
                <Target className="w-8 h-8 text-purple-400 mb-3" />
                <h4 className="font-semibold mb-2">Job Board</h4>
                <p className="text-sm text-gray-400 mb-4">
                  Access RICS job board with placement and graduate opportunities
                </p>
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm">
                  View Jobs
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

