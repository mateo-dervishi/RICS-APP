// Mandatory Competencies (all pathways)
export const mandatoryCompetencies = [
  { id: 'ethics', name: 'Ethics, Rules of Conduct and professionalism', requiredLevel: 3 },
  { id: 'client-care', name: 'Client care', requiredLevel: 2 },
  { id: 'communication', name: 'Communication and negotiation', requiredLevel: 2 },
  { id: 'health-safety', name: 'Health and safety', requiredLevel: 2 },
  { id: 'accounting', name: 'Accounting principles', requiredLevel: 1 },
  { id: 'business-planning', name: 'Business planning', requiredLevel: 1 },
  { id: 'conflict-avoidance', name: 'Conflict avoidance', requiredLevel: 1 },
  { id: 'data-management', name: 'Data management', requiredLevel: 1 },
  { id: 'diversity', name: 'Diversity and inclusion', requiredLevel: 1 },
  { id: 'inclusive-environments', name: 'Inclusive environments', requiredLevel: 1 },
  { id: 'sustainability', name: 'Sustainability', requiredLevel: 1 }
]

// Core Competencies (pathway-specific examples)
export const coreCompetencies = {
  'building-surveying': [
    { id: 'building-pathology', name: 'Building Pathology', requiredLevel: 3 },
    { id: 'construction-technology', name: 'Construction Technology', requiredLevel: 3 },
    { id: 'inspection', name: 'Inspection', requiredLevel: 3 },
    { id: 'legal-regulatory', name: 'Legal/Regulatory Compliance', requiredLevel: 2 }
  ],
  'quantity-surveying': [
    { id: 'cost-planning', name: 'Cost Planning', requiredLevel: 3 },
    { id: 'procurement', name: 'Procurement', requiredLevel: 3 },
    { id: 'contract-practice', name: 'Contract Practice', requiredLevel: 3 },
    { id: 'commercial-management', name: 'Commercial Management', requiredLevel: 2 }
  ],
  'valuation': [
    { id: 'valuation-methodology', name: 'Valuation Methodology', requiredLevel: 3 },
    { id: 'valuation-standards', name: 'Valuation Standards', requiredLevel: 3 },
    { id: 'market-analysis', name: 'Market Analysis', requiredLevel: 2 }
  ]
}

// Competency Levels
export const competencyLevels = {
  1: {
    name: 'Knowledge and Understanding',
    description: 'Demonstrate knowledge and understanding of the competency',
    examples: ['Attended training', 'Read relevant guidance', 'Can explain concepts']
  },
  2: {
    name: 'Application of Knowledge',
    description: 'Apply knowledge in practical situations',
    examples: ['Used in projects', 'Worked under supervision', 'Applied in practice']
  },
  3: {
    name: 'Reasoned Advice and Depth',
    description: 'Provide reasoned advice independently with depth',
    examples: ['Independent advice', 'Complex situations', 'Strategic input']
  }
}

