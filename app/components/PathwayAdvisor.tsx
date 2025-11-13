'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  Building, 
  CheckCircle2, 
  ArrowRight,
  Calculator,
  Clock,
  TrendingUp,
  Sparkles
} from 'lucide-react'
import { membershipLevels, fees } from '../data/pathways'
import { useApp } from '../context/AppContext'

export default function PathwayAdvisor() {
  const { state, updateProfile } = useApp()
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState<Partial<any>>({
    currentLevel: state.profile.currentLevel,
    degreeType: state.profile.degreeType,
    yearsExperience: state.profile.yearsExperience,
    specialization: state.profile.specialization
  })
  const [recommendations, setRecommendations] = useState<any[]>([])

  const handleAnswer = (question: string, answer: any) => {
    const updatedProfile = { ...profile, [question]: answer }
    setProfile(updatedProfile)
    updateProfile({ [question]: answer })
    
    if (step < 4) {
      setStep(step + 1)
    } else {
      calculateRecommendations(updatedProfile)
    }
  }

  const calculateRecommendations = (userProfile: Partial<any>) => {
    const recs: any[] = []
    const { degreeType, yearsExperience, currentLevel } = userProfile

    // Student pathway
    if (currentLevel === 'student' || !yearsExperience) {
      recs.push({
        level: 'student',
        name: 'Student Membership',
        confidence: 100,
        timeline: 'Immediate',
        cost: fees.enrollment.student,
        description: 'Free membership while studying'
      })
    }

    // AssocRICS pathway
    if (yearsExperience && yearsExperience < 5 && degreeType !== 'none') {
      recs.push({
        level: 'assocrics',
        name: 'AssocRICS',
        confidence: 85,
        timeline: `${5 - (yearsExperience || 0)} years`,
        cost: fees.enrollment.assocrics + fees.assessment.assocrics,
        description: 'Entry-level professional qualification'
      })
    }

    // MRICS pathways
    if (degreeType === 'rics-accredited') {
      if (yearsExperience && yearsExperience < 5) {
        recs.push({
          level: 'mrics',
          route: 'structured24',
          name: 'MRICS - 24 Month Structured Training',
          confidence: 90,
          timeline: '24 months',
          cost: fees.enrollment.mrics + fees.assessment.mrics,
          description: 'Structured training route for recent graduates'
        })
      } else if (yearsExperience && yearsExperience >= 5 && yearsExperience < 10) {
        recs.push({
          level: 'mrics',
          route: 'structured12',
          name: 'MRICS - 12 Month Structured Training',
          confidence: 95,
          timeline: '12 months',
          cost: fees.enrollment.mrics + fees.assessment.mrics,
          description: 'Accelerated route for experienced professionals'
        })
      } else if (yearsExperience && yearsExperience >= 10) {
        recs.push({
          level: 'mrics',
          route: 'directEntry',
          name: 'MRICS - Direct Entry',
          confidence: 85,
          timeline: 'Fast-track',
          cost: fees.enrollment.mrics + fees.assessment.mrics,
          description: 'Direct to final assessment for highly experienced'
        })
      }
    } else if (degreeType === 'non-rics' && yearsExperience && yearsExperience >= 5) {
      recs.push({
        level: 'mrics',
        route: 'preliminary',
        name: 'MRICS - Preliminary Review',
        confidence: 80,
        timeline: '4-6 months + final assessment',
        cost: fees.enrollment.mrics + fees.assessment.preliminary + fees.assessment.final,
        description: 'For non-RICS degree holders with experience'
      })
    }

    // FRICS pathway
    if (currentLevel === 'mrics' && yearsExperience && yearsExperience >= 5) {
      recs.push({
        level: 'frics',
        name: 'FRICS - Fellowship',
        confidence: 70,
        timeline: '6-12 months',
        cost: fees.annual.frics,
        description: 'Highest distinction level'
      })
    }

    setRecommendations(recs.sort((a, b) => b.confidence - a.confidence))
    setStep(5)
  }

  const reset = () => {
    setStep(1)
    setProfile({})
    setRecommendations([])
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8">
        <div className="flex items-center mb-6">
          <Sparkles className="w-8 h-8 text-yellow-400 mr-3" />
          <h2 className="text-3xl font-bold">Intelligent Pathway Advisor</h2>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= s ? 'bg-purple-500' : 'bg-slate-700'
              }`}>
                {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
              </div>
              {s < 5 && (
                <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-purple-500' : 'bg-slate-700'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Current Level */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold mb-4">What is your current status?</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: 'student', label: 'Student', icon: GraduationCap },
                { value: 'graduate', label: 'Graduate', icon: Briefcase },
                { value: 'assocrics', label: 'AssocRICS', icon: Award },
                { value: 'mrics', label: 'MRICS', icon: Building }
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => handleAnswer('currentLevel', value)}
                  className="p-6 bg-slate-800/50 rounded-lg border-2 border-slate-700 hover:border-purple-500 transition-all flex flex-col items-center"
                >
                  <Icon className="w-8 h-8 mb-2" />
                  <span className="font-semibold">{label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Degree Type */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold mb-4">What type of degree do you have?</h3>
            <div className="space-y-3">
              {[
                { value: 'rics-accredited', label: 'RICS Accredited Degree', desc: 'Degree recognized by RICS' },
                { value: 'non-rics', label: 'Non-RICS Degree', desc: 'Degree in related field' },
                { value: 'none', label: 'No Degree', desc: 'Professional qualification or experience only' }
              ].map(({ value, label, desc }) => (
                <button
                  key={value}
                  onClick={() => handleAnswer('degreeType', value)}
                  className="w-full p-4 bg-slate-800/50 rounded-lg border-2 border-slate-700 hover:border-purple-500 transition-all text-left"
                >
                  <div className="font-semibold">{label}</div>
                  <div className="text-sm text-gray-400">{desc}</div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Years of Experience */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold mb-4">How many years of relevant experience do you have?</h3>
            <div className="grid grid-cols-4 gap-3">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map((years) => (
                <button
                  key={years}
                  onClick={() => handleAnswer('yearsExperience', years)}
                  className="p-4 bg-slate-800/50 rounded-lg border-2 border-slate-700 hover:border-purple-500 transition-all"
                >
                  {years === 0 ? '<1' : years === 15 ? '10+' : years === 20 ? '15+' : years}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 4: Specialization */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold mb-4">What is your area of specialization? (Optional)</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Building Surveying', 'Quantity Surveying', 'Valuation', 'Project Management', 'Planning', 'Other'].map((spec) => (
                <button
                  key={spec}
                  onClick={() => handleAnswer('specialization', spec)}
                  className="p-4 bg-slate-800/50 rounded-lg border-2 border-slate-700 hover:border-purple-500 transition-all"
                >
                  {spec}
                </button>
              ))}
            </div>
            <button
              onClick={() => calculateRecommendations(profile)}
              className="w-full mt-4 p-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
            >
              Skip & Get Recommendations
            </button>
          </motion.div>
        )}

        {/* Step 5: Recommendations */}
        {step === 5 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold">Recommended Pathways</h3>
              <button
                onClick={reset}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
              >
                Start Over
              </button>
            </div>

            {recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-slate-800/50 rounded-lg border border-slate-700 mb-4"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-semibold mb-2">{rec.name}</h4>
                    <p className="text-gray-400">{rec.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-400">{rec.confidence}%</div>
                    <div className="text-sm text-gray-400">Confidence</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-sm text-gray-400">Timeline</div>
                      <div className="font-semibold">{rec.timeline}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calculator className="w-5 h-5 text-green-400" />
                    <div>
                      <div className="text-sm text-gray-400">Est. Cost</div>
                      <div className="font-semibold">£{rec.cost.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-yellow-400" />
                    <div>
                      <div className="text-sm text-gray-400">Success Rate</div>
                      <div className="font-semibold">High</div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    updateProfile({
                      currentLevel: rec.level === 'student' ? 'student' :
                                   rec.level === 'assocrics' ? 'assocrics' :
                                   rec.level === 'mrics' ? 'mrics' : 'frics',
                      selectedRoute: rec.route,
                      selectedPathway: rec.pathway
                    })
                    alert('Pathway selected! Your profile has been updated.')
                  }}
                  className="w-full mt-4 p-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold flex items-center justify-center"
                >
                  Select This Pathway <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

