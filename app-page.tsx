'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronRight, 
  CheckCircle2, 
  Users, 
  Target, 
  TrendingUp, 
  BookOpen,
  Award,
  BarChart3,
  Calendar,
  FileText,
  Sparkles,
  Brain,
  Zap,
  Shield,
  ArrowRight,
  Clock,
  Building,
  GraduationCap,
  Briefcase
} from 'lucide-react'

export default function RicsLandingPage() {
  const [routeConfidence, setRouteConfidence] = useState(0)
  const [selectedPathway, setSelectedPathway] = useState('apc')
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setRouteConfidence(84)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const pathways = [
    { id: 'student', name: 'Student', icon: GraduationCap, color: 'from-blue-500 to-cyan-500' },
    { id: 'assocrics', name: 'AssocRICS', icon: Briefcase, color: 'from-green-500 to-emerald-500' },
    { id: 'apc', name: 'MRICS (APC)', icon: Target, color: 'from-purple-500 to-pink-500' },
    { id: 'senior', name: 'Senior Professional', icon: Building, color: 'from-orange-500 to-red-500' },
    { id: 'frics', name: 'Fellowship', icon: Award, color: 'from-yellow-500 to-amber-500' }
  ]

  const features = [
    {
      icon: Brain,
      title: 'AI Pathway Advisor',
      description: 'Get personalized route recommendations based on your qualifications and experience',
      color: 'bg-gradient-to-br from-purple-500 to-pink-500'
    },
    {
      icon: FileText,
      title: 'Smart Document Builder',
      description: 'AI-powered templates and writing assistance for all RICS submissions',
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Counsellor Network',
      description: 'Connect with MRICS/FRICS mentors and collaborate on your journey',
      color: 'bg-gradient-to-br from-green-500 to-emerald-500'
    },
    {
      icon: BarChart3,
      title: 'Progress Analytics',
      description: 'Real-time tracking of competencies, CPD hours, and assessment readiness',
      color: 'bg-gradient-to-br from-orange-500 to-red-500'
    }
  ]

  const stats = [
    { value: '12,400+', label: 'Candidates Coached', trend: '+23%' },
    { value: '27.4', label: 'Months to MRICS', trend: '-15%' },
    { value: '89%', label: 'Pass Rate', trend: '+12%' },
    { value: '4.9/5', label: 'User Rating', trend: 'Top Rated' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <Shield className="h-8 w-8 text-purple-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            RICS Journey OS
          </span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-6"
        >
          <button className="text-gray-300 hover:text-white transition-colors">Features</button>
          <button className="text-gray-300 hover:text-white transition-colors">Pricing</button>
          <button className="text-gray-300 hover:text-white transition-colors">Resources</button>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105">
            Get Started
          </button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-6 inline-flex items-center px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
            <Sparkles className="h-4 w-4 text-purple-400 mr-2" />
            <span className="text-sm text-purple-300">AI-Powered RICS Career Management</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Plan, evidence, and gain
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              RICS status
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Map every competency, capture APC diaries, collaborate with counsellors, and unlock Fellowship tooling — 
            all inside a single Supabase-connected platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-lg flex items-center justify-center group"
            >
              Launch Pathway Advisor
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-lg font-semibold text-lg border border-white/20 hover:bg-white/20 transition-colors"
            >
              See candidate workspace
            </motion.button>
          </div>
        </motion.div>

        {/* Pathway Selector */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-20"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Choose Your RICS Pathway</h2>
            <p className="text-gray-400">Select your current position to see personalized insights</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {pathways.map((pathway) => {
              const Icon = pathway.icon
              return (
                <motion.button
                  key={pathway.id}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPathway(pathway.id)}
                  className={`px-6 py-4 rounded-xl border-2 transition-all ${
                    selectedPathway === pathway.id
                      ? 'border-purple-400 bg-purple-500/20'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${pathway.color} p-2.5 mb-2 mx-auto`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <span className="text-sm font-semibold">{pathway.name}</span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Live Workspace Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-20 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl border border-gray-700 p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Live workspace preview</h3>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-400">Real-time sync</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Route Confidence */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Route confidence</span>
                  <span className="text-2xl font-bold text-purple-400">{routeConfidence}%</span>
                </div>
                <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${routeConfidence}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Based on experience, accreditation, leadership data.
                </p>
              </div>

              {/* Diary Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Diary progress</span>
                  <span className="font-semibold">412 / 400 days</span>
                </div>
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm">Signed off by counsellor</span>
                </div>
              </div>

              {/* CPD Hours */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">CPD hours</span>
                  <span className="font-semibold">38 / 48 hrs</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full w-[79%] bg-gradient-to-r from-blue-500 to-cyan-500" />
                </div>
                <p className="text-sm text-gray-500 mt-2">Auto-linked to competencies</p>
              </div>
            </div>

            {/* Upcoming Milestones */}
            <div>
              <h4 className="text-gray-400 mb-4">Upcoming milestones</h4>
              <div className="space-y-3">
                {[
                  { icon: FileText, text: 'Submit preliminary review', time: '14 days', color: 'text-yellow-400' },
                  { icon: Users, text: 'Final assessment mock interview', time: '32 days', color: 'text-blue-400' },
                  { icon: Award, text: 'Fellowship characteristic workshop', time: '6 wks', color: 'text-purple-400' }
                ].map((milestone, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700"
                  >
                    <milestone.icon className={`h-5 w-5 ${milestone.color}`} />
                    <span className="flex-1 text-sm">{milestone.text}</span>
                    <span className="text-xs text-gray-500">{milestone.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-32 grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                whileHover={{ y: -10, scale: 1.02 }}
                onHoverStart={() => setHoveredFeature(index)}
                onHoverEnd={() => setHoveredFeature(null)}
                className="relative group"
              >
                <div className={`absolute inset-0 ${feature.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity`} />
                <div className="relative p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-all">
                  <div className={`w-12 h-12 rounded-lg ${feature.color} p-2.5 mb-4`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-32 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Proven Results</h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Join thousands of professionals who've accelerated their RICS journey with our platform
          </p>
          
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="relative group"
              >
                <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm mb-2">{stat.label}</div>
                  <div className="inline-flex items-center px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                    <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
                    <span className="text-xs text-green-400">{stat.trend}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-32 text-center"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl opacity-30" />
            <div className="relative bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-xl rounded-3xl border border-purple-500/20 p-12">
              <Zap className="h-12 w-12 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">
                Start Your RICS Journey Today
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Get instant access to AI-powered tools, expert guidance, and a supportive community
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-lg flex items-center justify-center group"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <button className="px-8 py-4 text-gray-300 hover:text-white transition-colors">
                  Schedule Demo
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-6">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
