export interface RICSTextbook {
  id: string
  filename: string
  title: string
  edition: string
  category: string
  topics: string[]
  description: string
}

export const ricsTextbooks: RICSTextbook[] = [
  {
    id: 'acceleration',
    filename: 'Acceleration_2nd-ed_2024.pdf',
    title: 'Acceleration',
    edition: '2nd Edition (2024)',
    category: 'Project Management',
    topics: ['Acceleration', 'Time Management', 'Project Delivery', 'Contract Administration'],
    description: 'Guidance on acceleration of construction works, including acceleration instructions, costs, and time implications.'
  },
  {
    id: 'change-control',
    filename: 'Change-control-and-management-2024.pdf',
    title: 'Change Control and Management',
    edition: '2024',
    category: 'Contract Administration',
    topics: ['Change Management', 'Variations', 'Contract Changes', 'Cost Control'],
    description: 'Comprehensive guide to managing changes in construction contracts, including procedures and documentation.'
  },
  {
    id: 'cost-analysis',
    filename: 'Cost-analysis-and-benchmarking_2nd-edition.pdf',
    title: 'Cost Analysis and Benchmarking',
    edition: '2nd Edition',
    category: 'Cost Management',
    topics: ['Cost Analysis', 'Benchmarking', 'Cost Planning', 'Financial Management'],
    description: 'Methods and techniques for cost analysis and benchmarking in construction projects.'
  },
  {
    id: 'damages-delay',
    filename: 'Damages-for-delay-to-completion-2nd-edition.pdf',
    title: 'Damages for Delay to Completion',
    edition: '2nd Edition',
    category: 'Legal & Claims',
    topics: ['Liquidated Damages', 'Delay Claims', 'Completion', 'Contract Breach'],
    description: 'Guidance on liquidated damages, delay claims, and completion issues in construction contracts.'
  },
  {
    id: 'defects',
    filename: 'Defects-and-Rectifications_2nd-Edition.pdf',
    title: 'Defects and Rectifications',
    edition: '2nd Edition',
    category: 'Quality Management',
    topics: ['Defects', 'Snagging', 'Rectification', 'Quality Control'],
    description: 'Procedures for identifying, documenting, and rectifying defects in construction works.'
  },
  {
    id: 'completion',
    filename: 'Defining-completion-of-construction-works_1st-edition.pdf',
    title: 'Defining Completion of Construction Works',
    edition: '1st Edition',
    category: 'Project Management',
    topics: ['Practical Completion', 'Completion', 'Handover', 'Project Closure'],
    description: 'Guidance on defining and achieving completion of construction works.'
  },
  {
    id: 'procurement',
    filename: 'Developing-a-construction-procurement-strategy.pdf',
    title: 'Developing a Construction Procurement Strategy',
    edition: 'Latest',
    category: 'Procurement',
    topics: ['Procurement', 'Tendering', 'Contract Strategy', 'Project Delivery'],
    description: 'Framework for developing effective construction procurement strategies.'
  },
  {
    id: 'etendering',
    filename: 'etendering_2nd_edition_rics.pdf',
    title: 'eTendering',
    edition: '2nd Edition',
    category: 'Procurement',
    topics: ['eTendering', 'Digital Procurement', 'Tender Management', 'Technology'],
    description: 'Guidance on electronic tendering processes and digital procurement systems.'
  },
  {
    id: 'extensions-time',
    filename: 'Extensions-of-time-web_rebrand.pdf',
    title: 'Extensions of Time',
    edition: 'Latest',
    category: 'Contract Administration',
    topics: ['Extensions of Time', 'Delay Analysis', 'Time Claims', 'Programme Management'],
    description: 'Procedures for assessing and granting extensions of time in construction contracts.'
  },
  {
    id: 'final-account',
    filename: 'final_account_procedures_1st_edition_rics.pdf',
    title: 'Final Account Procedures',
    edition: '1st Edition',
    category: 'Cost Management',
    topics: ['Final Account', 'Valuation', 'Cost Reconciliation', 'Contract Closure'],
    description: 'Procedures for preparing and agreeing final accounts in construction contracts.'
  },
  {
    id: 'fluctuations',
    filename: 'Fluctuations_first-edition.pdf',
    title: 'Fluctuations',
    edition: '1st Edition',
    category: 'Cost Management',
    topics: ['Price Fluctuations', 'Cost Escalation', 'Inflation', 'Price Adjustment'],
    description: 'Guidance on handling price fluctuations and cost escalation in construction contracts.'
  },
  {
    id: 'risk-management',
    filename: 'Management-of-risk_1st-edition_120325.pdf',
    title: 'Management of Risk',
    edition: '1st Edition',
    category: 'Risk Management',
    topics: ['Risk Management', 'Risk Assessment', 'Risk Mitigation', 'Project Risk'],
    description: 'Comprehensive framework for identifying, assessing, and managing risks in construction projects.'
  },
  {
    id: 'qs-construction',
    filename: 'qs_and_construction (4).pdf',
    title: 'Quantity Surveying and Construction',
    edition: 'Latest',
    category: 'Quantity Surveying',
    topics: ['Quantity Surveying', 'Measurement', 'Valuation', 'Construction'],
    description: 'Core principles and practices of quantity surveying in construction.'
  },
  {
    id: 'retention',
    filename: 'retention_1st_edition_rics.pdf',
    title: 'Retention',
    edition: '1st Edition',
    category: 'Contract Administration',
    topics: ['Retention', 'Payment', 'Security', 'Contract Terms'],
    description: 'Guidance on retention monies, release procedures, and security in construction contracts.'
  },
  {
    id: 'subcontracting',
    filename: 'subcontracting_1st_edition.pdf',
    title: 'Subcontracting',
    edition: '1st Edition',
    category: 'Contract Administration',
    topics: ['Subcontracting', 'Supply Chain', 'Contract Management', 'Procurement'],
    description: 'Best practices for managing subcontractors and supply chain relationships.'
  },
  {
    id: 'tendering',
    filename: 'tendering_strategies_1st_edition_rics.pdf',
    title: 'Tendering Strategies',
    edition: '1st Edition',
    category: 'Procurement',
    topics: ['Tendering', 'Bidding', 'Procurement Strategy', 'Competitive Tendering'],
    description: 'Strategies and best practices for effective tendering processes.'
  },
  {
    id: 'termination',
    filename: 'termination_of_contract_corporate_recovery_and_insolvency_1st_edition_rics.pdf',
    title: 'Termination of Contract, Corporate Recovery and Insolvency',
    edition: '1st Edition',
    category: 'Legal & Claims',
    topics: ['Termination', 'Insolvency', 'Contract Breach', 'Legal Issues'],
    description: 'Guidance on contract termination, insolvency procedures, and corporate recovery.'
  },
  {
    id: 'valuing-change',
    filename: 'Valuing-change_1st-edition_120325.pdf',
    title: 'Valuing Change',
    edition: '1st Edition',
    category: 'Cost Management',
    topics: ['Valuation', 'Variations', 'Change Orders', 'Cost Assessment'],
    description: 'Methods for valuing changes and variations in construction contracts.'
  },
  {
    id: 'value-management',
    filename: 'value_management_and_value_engineering_1st_edition_rics.pdf',
    title: 'Value Management and Value Engineering',
    edition: '1st Edition',
    category: 'Value Management',
    topics: ['Value Management', 'Value Engineering', 'Cost Optimization', 'Value Analysis'],
    description: 'Techniques for value management and value engineering in construction projects.'
  },
  {
    id: 'employers-agent',
    filename: 'employers_agent_design_and_build_1st_edition.pdf',
    title: "Employer's Agent - Design and Build",
    edition: '1st Edition',
    category: 'Project Management',
    topics: ["Employer's Agent", 'Design and Build', 'Project Management', 'Contract Administration'],
    description: "Role and responsibilities of the employer's agent in design and build contracts."
  },
  {
    id: 'riba-plan',
    filename: '2020RIBAPlanofWorktemplatepdf.pdf',
    title: 'RIBA Plan of Work Template',
    edition: '2020',
    category: 'Project Management',
    topics: ['RIBA Plan of Work', 'Project Stages', 'Work Stages', 'Project Planning'],
    description: 'Template and guidance for the RIBA Plan of Work stages in construction projects.'
  }
]

export const getTextbookById = (id: string): RICSTextbook | undefined => {
  return ricsTextbooks.find(book => book.id === id)
}

export const searchTextbooks = (query: string): RICSTextbook[] => {
  const lowerQuery = query.toLowerCase()
  return ricsTextbooks.filter(book => 
    book.title.toLowerCase().includes(lowerQuery) ||
    book.description.toLowerCase().includes(lowerQuery) ||
    book.topics.some(topic => topic.toLowerCase().includes(lowerQuery)) ||
    book.category.toLowerCase().includes(lowerQuery)
  )
}

export const getTextbooksByCategory = (category: string): RICSTextbook[] => {
  return ricsTextbooks.filter(book => book.category === category)
}

export const getAllCategories = (): string[] => {
  return Array.from(new Set(ricsTextbooks.map(book => book.category)))
}

