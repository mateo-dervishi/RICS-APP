'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, PoundSterling, TrendingUp, Calendar, Award } from 'lucide-react'
import { fees, membershipLevels } from '../data/pathways'

export default function FinancialPlanner() {
  const [selectedLevel, setSelectedLevel] = useState<string>('mrics')
  const [selectedRoute, setSelectedRoute] = useState<string>('structured24')
  const [cpdHours, setCpdHours] = useState(48)

  const calculateTotalCost = () => {
    let total = 0
    let breakdown: { label: string; amount: number }[] = []

    if (selectedLevel === 'student') {
      total = fees.enrollment.student
      breakdown.push({ label: 'Student Membership', amount: fees.enrollment.student })
    } else if (selectedLevel === 'assocrics') {
      total = fees.enrollment.assocrics + fees.assessment.assocrics + fees.annual.assocrics
      breakdown.push(
        { label: 'Enrollment Fee', amount: fees.enrollment.assocrics },
        { label: 'Assessment Fee', amount: fees.assessment.assocrics },
        { label: 'Annual Subscription (Year 1)', amount: fees.annual.assocrics }
      )
    } else if (selectedLevel === 'mrics') {
      const route = membershipLevels.mrics.routes[selectedRoute as keyof typeof membershipLevels.mrics.routes]
      if (route) {
        if (selectedRoute === 'preliminary') {
          total = fees.enrollment.mrics + fees.assessment.preliminary + fees.assessment.final + fees.annual.mrics
          breakdown.push(
            { label: 'Enrollment Fee', amount: fees.enrollment.mrics },
            { label: 'Preliminary Review', amount: fees.assessment.preliminary },
            { label: 'Final Assessment', amount: fees.assessment.final },
            { label: 'Annual Subscription (Year 1)', amount: fees.annual.mrics }
          )
        } else {
          total = fees.enrollment.mrics + fees.assessment.mrics + fees.annual.mrics
          breakdown.push(
            { label: 'Enrollment Fee', amount: fees.enrollment.mrics },
            { label: 'Assessment Fee', amount: fees.assessment.mrics },
            { label: 'Annual Subscription (Year 1)', amount: fees.annual.mrics }
          )
        }
      }
    } else if (selectedLevel === 'frics') {
      total = fees.annual.frics
      breakdown.push({ label: 'FRICS Annual Subscription', amount: fees.annual.frics })
    }

    // Add CPD costs
    const cpdCost = cpdHours * fees.cpd.average
    total += cpdCost
    breakdown.push({ label: `CPD Activities (${cpdHours} hours)`, amount: cpdCost })

    return { total, breakdown }
  }

  const { total, breakdown } = calculateTotalCost()

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Financial Planning</h2>
        <p className="text-gray-400">Calculate costs for your RICS journey</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Configuration</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Membership Level</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                >
                  <option value="student">Student</option>
                  <option value="assocrics">AssocRICS</option>
                  <option value="mrics">MRICS</option>
                  <option value="frics">FRICS</option>
                </select>
              </div>

              {selectedLevel === 'mrics' && (
                <div>
                  <label className="block text-sm font-semibold mb-2">Route</label>
                  <select
                    value={selectedRoute}
                    onChange={(e) => setSelectedRoute(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                  >
                    {Object.entries(membershipLevels.mrics.routes).map(([key, route]) => (
                      <option key={key} value={key}>{route.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold mb-2">CPD Hours Required</label>
                <input
                  type="number"
                  value={cpdHours}
                  onChange={(e) => setCpdHours(parseInt(e.target.value))}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          {/* Total Cost */}
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold mb-2">Total Estimated Cost</h3>
                <p className="text-gray-400">First year costs</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-purple-400">£{total.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Cost Breakdown</h3>
            <div className="space-y-3">
              {breakdown.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg"
                >
                  <span className="text-gray-300">{item.label}</span>
                  <span className="font-semibold">£{item.amount.toLocaleString()}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Additional Considerations</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start space-x-2">
                <TrendingUp className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white mb-1">Annual Subscriptions</div>
                  <div>Remember to budget for ongoing annual subscriptions after your first year</div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Calendar className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white mb-1">Timeline</div>
                  <div>Costs may be spread over multiple years depending on your route</div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Award className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white mb-1">Employer Support</div>
                  <div>Many employers offer financial support for professional qualifications</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

