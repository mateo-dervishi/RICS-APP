// All 22 MRICS Pathways and 13 AssocRICS Pathways
export const pathways = {
  mrics: [
    { id: 'building-surveying', name: 'Building Surveying', sectors: ['residential', 'commercial'] },
    { id: 'quantity-surveying', name: 'Quantity Surveying & Construction', sectors: ['construction'] },
    { id: 'commercial-real-estate', name: 'Commercial Real Estate', sectors: ['commercial'] },
    { id: 'valuation', name: 'Valuation', sectors: ['residential', 'commercial'] },
    { id: 'project-management', name: 'Project Management', sectors: ['construction', 'commercial'] },
    { id: 'planning-development', name: 'Planning & Development', sectors: ['planning'] },
    { id: 'corporate-real-estate', name: 'Corporate Real Estate', sectors: ['commercial'] },
    { id: 'environmental-surveying', name: 'Environmental Surveying', sectors: ['environmental'] },
    { id: 'building-control', name: 'Building Control', sectors: ['construction'] },
    { id: 'facilities-management', name: 'Facilities Management', sectors: ['commercial'] },
    { id: 'rural', name: 'Rural', sectors: ['rural'] },
    { id: 'residential-surveying', name: 'Residential Surveying', sectors: ['residential'] },
    { id: 'infrastructure', name: 'Infrastructure', sectors: ['infrastructure'] },
    { id: 'minerals-waste', name: 'Minerals & Waste', sectors: ['environmental'] },
    { id: 'hydrographic', name: 'Hydrographic Surveying', sectors: ['marine'] },
    { id: 'management-consultancy', name: 'Management Consultancy', sectors: ['commercial'] },
    { id: 'machinery-business-assets', name: 'Machinery & Business Assets', sectors: ['commercial'] },
    { id: 'arts-antiques', name: 'Arts & Antiques', sectors: ['specialist'] },
    { id: 'forensic-surveying', name: 'Forensic Surveying', sectors: ['specialist'] },
    { id: 'geomatics', name: 'Geomatics', sectors: ['technical'] },
    { id: 'property-management', name: 'Property Management', sectors: ['commercial', 'residential'] },
    { id: 'dispute-resolution', name: 'Dispute Resolution', sectors: ['legal'] }
  ],
  assocrics: [
    { id: 'building-surveying', name: 'Building Surveying' },
    { id: 'quantity-surveying', name: 'Quantity Surveying' },
    { id: 'commercial-real-estate', name: 'Commercial Real Estate' },
    { id: 'valuation', name: 'Valuation' },
    { id: 'project-management', name: 'Project Management' },
    { id: 'planning-development', name: 'Planning & Development' },
    { id: 'corporate-real-estate', name: 'Corporate Real Estate' },
    { id: 'environmental-surveying', name: 'Environmental Surveying' },
    { id: 'building-control', name: 'Building Control' },
    { id: 'facilities-management', name: 'Facilities Management' },
    { id: 'rural', name: 'Rural' },
    { id: 'residential-surveying', name: 'Residential Surveying' },
    { id: 'infrastructure', name: 'Infrastructure' }
  ]
}

export const membershipLevels = {
  student: {
    name: 'Student Membership',
    description: 'Free membership for those currently studying',
    requirements: ['Currently enrolled in RICS-accredited degree'],
    benefits: ['Free membership', 'Access to Matrics network', 'Career guidance', 'Placement year preparation']
  },
  academic: {
    name: 'Academic Assessment',
    description: 'For degree accreditation verification',
    requirements: ['Degree assessment application', 'Document verification'],
    benefits: ['Accreditation status', 'Conversion course recommendations']
  },
  assocrics: {
    name: 'AssocRICS',
    description: 'Entry-level professional qualification',
    requirements: ['1-4 years experience', '13 sector pathway', '20 hours CPD annually'],
    benefits: ['Professional recognition', 'Progression to MRICS']
  },
  mrics: {
    name: 'MRICS (Chartered Member)',
    description: 'Full professional qualification',
    routes: {
      structured24: {
        name: '24 Month Structured Training',
        requirements: ['RICS accredited degree', '<5 years experience', '400+ days practical', '96 hours CPD'],
        timeline: '24 months'
      },
      structured12: {
        name: '12 Month Structured Training',
        requirements: ['RICS accredited degree', '5-10 years experience', '200+ days practical', '48 hours CPD'],
        timeline: '12 months'
      },
      preliminary: {
        name: 'Preliminary Review',
        requirements: ['Non-RICS degree', '5+ years experience', 'Preliminary review submission'],
        timeline: '4-6 months + final assessment'
      },
      directEntry: {
        name: 'Direct Entry',
        requirements: ['RICS degree', '10+ years experience'],
        timeline: 'Fast-track to final assessment'
      },
      seniorProfessional: {
        name: 'Senior Professional Assessment',
        requirements: ['Leadership role', 'Management responsibilities', 'Strategic impact'],
        timeline: 'Adapted assessment process'
      },
      specialist: {
        name: 'Specialist Assessment',
        requirements: ['Recognized authority', 'Expert knowledge', 'Published work'],
        timeline: 'Specialist evaluation'
      },
      academic: {
        name: 'Academic Assessment',
        requirements: ['3+ years academic experience', 'Teaching portfolio', 'Research output'],
        timeline: 'Academic evaluation'
      }
    }
  },
  frics: {
    name: 'FRICS (Fellow)',
    description: 'Highest distinction level',
    requirements: ['5+ years MRICS', '4 characteristics from 12', '500-word statements', 'Supporting evidence'],
    characteristics: [
      { id: 'champion', category: 'Champion', name: 'Service to RICS' },
      { id: 'expert', category: 'Expert', name: 'Advanced Knowledge' },
      { id: 'influencer', category: 'Influencer', name: 'Leadership' },
      { id: 'role-model', category: 'Role Model', name: 'Exceeding Standards' }
    ]
  }
}

export const fees = {
  enrollment: {
    student: 0,
    assocrics: 502,
    mrics: 599
  },
  assessment: {
    assocrics: 350,
    mrics: 450,
    preliminary: 350,
    final: 450
  },
  annual: {
    student: 0,
    assocrics: 161,
    mrics: 299,
    frics: 399
  },
  cpd: {
    average: 50 // per hour average
  }
}

