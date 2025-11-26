'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Database, 
  Download, 
  Upload, 
  Trash2, 
  Moon, 
  Sun, 
  Palette,
  Save,
  AlertCircle,
  CheckCircle2,
  Mail,
  Lock,
  Globe,
  FileText,
  Shield
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import ProfilePicture from './ProfilePicture'

export default function Settings() {
  const { state, updateProfile, logout, updateProfilePicture } = useApp()
  const [activeTab, setActiveTab] = useState('profile')
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  
  const [profileSettings, setProfileSettings] = useState({
    name: state.auth.user?.name || 'John Smith',
    email: state.auth.user?.email || 'john.smith@example.com',
    phone: '',
    location: '',
    organization: '',
    bio: ''
  })

  const [preferences, setPreferences] = useState({
    theme: 'dark',
    language: 'en',
    dateFormat: 'DD/MM/YYYY',
    timezone: 'Europe/London',
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: true,
    milestoneReminders: true,
    deadlineWarnings: true
  })

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'preferences', name: 'Preferences', icon: Palette },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'data', name: 'Data Management', icon: Database },
    { id: 'security', name: 'Security', icon: Shield }
  ]

  const handleSave = async () => {
    setSaveStatus('saving')
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update profile in context
      updateProfile({
        specialization: profileSettings.organization
      })
      
      // Save to localStorage
      localStorage.setItem('rics-app-settings', JSON.stringify({
        profile: profileSettings,
        preferences
      }))
      
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
    } catch (error) {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 2000)
    }
  }

  const handleExportData = () => {
    const data = {
      profile: state.profile,
      competencies: state.competencies,
      experience: state.experience,
      cpd: state.cpd,
      documents: state.documents,
      timeline: state.timeline,
      exportedAt: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `rics-data-export-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        // In a real app, you'd validate and import this data
        alert('Data import functionality would be implemented here. This would update your app state with the imported data.')
      } catch (error) {
        alert('Invalid file format. Please import a valid JSON file.')
      }
    }
    reader.readAsText(file)
  }

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.removeItem('rics-app-state')
      localStorage.removeItem('rics-app-settings')
      alert('All data has been cleared. Please refresh the page.')
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2 flex items-center">
          <SettingsIcon className="w-8 h-8 mr-3 text-purple-400" />
          Settings
        </h2>
        <p className="text-gray-400">Manage your account settings and preferences</p>
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
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
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
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Profile Information
            </h3>
            
            {/* Profile Picture */}
            <div className="mb-6 pb-6 border-b border-slate-700">
              <label className="block text-sm font-medium mb-4">Profile Picture</label>
              <div className="flex items-center space-x-4">
                <ProfilePicture 
                  size="lg"
                  initialImage={state.auth.user?.profilePicture || null}
                  onImageChange={updateProfilePicture}
                />
                <div>
                  <p className="text-sm text-gray-400 mb-1">Click to upload or change your profile picture</p>
                  <p className="text-xs text-gray-500">Recommended: Square image, max 5MB</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profileSettings.name}
                    onChange={(e) => setProfileSettings({ ...profileSettings, name: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={profileSettings.email}
                    onChange={(e) => setProfileSettings({ ...profileSettings, email: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    value={profileSettings.phone}
                    onChange={(e) => setProfileSettings({ ...profileSettings, phone: e.target.value })}
                    placeholder="+44 20 1234 5678"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    value={profileSettings.location}
                    onChange={(e) => setProfileSettings({ ...profileSettings, location: e.target.value })}
                    placeholder="City, Country"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Organization</label>
                  <input
                    type="text"
                    value={profileSettings.organization}
                    onChange={(e) => setProfileSettings({ ...profileSettings, organization: e.target.value })}
                    placeholder="Company or Institution"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <textarea
                    value={profileSettings.bio}
                    onChange={(e) => setProfileSettings({ ...profileSettings, bio: e.target.value })}
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    Current Level: <span className="text-white capitalize">{state.profile.currentLevel || 'Not Set'}</span>
                  </div>
                  <button
                    onClick={handleSave}
                    disabled={saveStatus === 'saving'}
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold flex items-center space-x-2 disabled:opacity-50"
                  >
                    {saveStatus === 'saving' && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                    {saveStatus === 'saved' && <CheckCircle2 className="w-4 h-4" />}
                    {saveStatus === 'error' && <AlertCircle className="w-4 h-4" />}
                    {saveStatus === 'idle' && <Save className="w-4 h-4" />}
                    <span>{saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : saveStatus === 'error' ? 'Error' : 'Save Changes'}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Application Preferences
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-4">Theme</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPreferences({ ...preferences, theme: 'dark' })}
                    className={`p-4 rounded-lg border-2 flex items-center space-x-3 ${
                      preferences.theme === 'dark' ? 'border-purple-500 bg-purple-500/10' : 'border-slate-700'
                    }`}
                  >
                    <Moon className="w-5 h-5" />
                    <span>Dark</span>
                  </button>
                  <button
                    onClick={() => setPreferences({ ...preferences, theme: 'light' })}
                    className={`p-4 rounded-lg border-2 flex items-center space-x-3 ${
                      preferences.theme === 'light' ? 'border-purple-500 bg-purple-500/10' : 'border-slate-700'
                    }`}
                  >
                    <Sun className="w-5 h-5" />
                    <span>Light</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Language</label>
                  <select
                    value={preferences.language}
                    onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-purple-500"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Date Format</label>
                  <select
                    value={preferences.dateFormat}
                    onChange={(e) => setPreferences({ ...preferences, dateFormat: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-purple-500"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Timezone</label>
                  <select
                    value={preferences.timezone}
                    onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-purple-500"
                  >
                    <option value="Europe/London">Europe/London (GMT)</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                    <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
                    <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                    <option value="Asia/Singapore">Asia/Singapore (SGT)</option>
                    <option value="Australia/Sydney">Australia/Sydney (AEDT)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notification Settings
            </h3>
            
            <div className="space-y-4">
              {[
                { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
                { key: 'pushNotifications', label: 'Push Notifications', description: 'Receive browser push notifications' },
                { key: 'weeklyDigest', label: 'Weekly Digest', description: 'Get a weekly summary of your progress' },
                { key: 'milestoneReminders', label: 'Milestone Reminders', description: 'Reminders for important milestones' },
                { key: 'deadlineWarnings', label: 'Deadline Warnings', description: 'Warnings for upcoming deadlines' }
              ].map(({ key, label, description }) => (
                <div key={key} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                  <div>
                    <div className="font-medium">{label}</div>
                    <div className="text-sm text-gray-400">{description}</div>
                  </div>
                  <button
                    onClick={() => setPreferences({ ...preferences, [key]: !preferences[key as keyof typeof preferences] })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      preferences[key as keyof typeof preferences] ? 'bg-purple-500' : 'bg-slate-600'
                    }`}
                  >
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      preferences[key as keyof typeof preferences] ? 'translate-x-6' : ''
                    }`} />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-4 mt-6 border-t border-slate-700">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
              >
                Save Notification Settings
              </button>
            </div>
          </motion.div>
        )}

        {/* Data Management Tab */}
        {activeTab === 'data' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Data Management
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium flex items-center">
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        Download all your data as a JSON file
                      </div>
                    </div>
                    <button
                      onClick={handleExportData}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
                    >
                      Export
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium flex items-center">
                        <Upload className="w-4 h-4 mr-2" />
                        Import Data
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        Restore data from a previously exported JSON file
                      </div>
                    </div>
                    <label className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold cursor-pointer">
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportData}
                        className="hidden"
                      />
                      Import
                    </label>
                  </div>
                </div>

                <div className="p-4 bg-slate-700/50 rounded-lg border border-red-500/50">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium flex items-center text-red-400">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear All Data
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        Permanently delete all your data. This action cannot be undone.
                      </div>
                    </div>
                    <button
                      onClick={handleClearData}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
                    >
                      Clear Data
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h4 className="font-semibold mb-4">Data Statistics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">{Object.keys(state.competencies).length}</div>
                  <div className="text-sm text-gray-400">Competencies</div>
                </div>
                <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{state.experience.length}</div>
                  <div className="text-sm text-gray-400">Experience Entries</div>
                </div>
                <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">{state.cpd.length}</div>
                  <div className="text-sm text-gray-400">CPD Activities</div>
                </div>
                <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400">{state.documents.length}</div>
                  <div className="text-sm text-gray-400">Documents</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Security & Privacy
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-4 flex items-center">
                  <Lock className="w-4 h-4 mr-2" />
                  Password
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Current Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-purple-500"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-purple-500"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-purple-500"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold">
                    Update Password
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-700">
                <h4 className="font-semibold mb-4 flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy Settings
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div>
                      <div className="font-medium">Profile Visibility</div>
                      <div className="text-sm text-gray-400">Allow others to see your profile in the network</div>
                    </div>
                    <button className="relative w-12 h-6 rounded-full bg-purple-500 transition-colors">
                      <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full translate-x-6" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div>
                      <div className="font-medium">Data Sharing</div>
                      <div className="text-sm text-gray-400">Allow anonymous usage data to improve the app</div>
                    </div>
                    <button className="relative w-12 h-6 rounded-full bg-slate-600 transition-colors">
                      <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-700">
                <h4 className="font-semibold mb-4">Account Actions</h4>
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-left">
                    <div className="font-medium">Download Account Data</div>
                    <div className="text-sm text-gray-400">Get a copy of all your account data</div>
                  </button>
                  <button 
                    onClick={() => {
                      logout()
                      if (typeof window !== 'undefined') {
                        window.location.reload()
                      }
                    }}
                    className="w-full px-4 py-3 bg-orange-600/20 hover:bg-orange-600/30 border border-orange-500/50 rounded-lg text-left text-orange-400"
                  >
                    <div className="font-medium">Logout</div>
                    <div className="text-sm">Sign out of your account</div>
                  </button>
                  <button className="w-full px-4 py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 rounded-lg text-left text-red-400">
                    <div className="font-medium">Delete Account</div>
                    <div className="text-sm">Permanently delete your account and all data</div>
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

