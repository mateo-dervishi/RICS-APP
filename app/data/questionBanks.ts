export const questionBanks = {
  ethics: [
    {
      question: "Describe a situation where you had to make an ethical decision in your professional practice.",
      category: "Ethics & Professionalism",
      tips: "Focus on RICS Rules of Conduct, demonstrate your understanding of ethical principles, and show how you resolved the situation."
    },
    {
      question: "How do you ensure compliance with RICS Rules of Conduct in your daily work?",
      category: "Ethics & Professionalism",
      tips: "Provide specific examples of how you apply the rules, reference continuing professional development, and demonstrate awareness of updates."
    },
    {
      question: "What would you do if a client asked you to act in a way that conflicts with RICS ethical standards?",
      category: "Ethics & Professionalism",
      tips: "Show your understanding of professional boundaries, demonstrate how you would communicate concerns, and explain your decision-making process."
    },
    {
      question: "Give an example of how you have demonstrated professional integrity.",
      category: "Ethics & Professionalism",
      tips: "Use a real example, show the impact of your actions, and demonstrate adherence to professional standards."
    }
  ],
  clientCare: [
    {
      question: "How do you manage client expectations throughout a project?",
      category: "Client Care",
      tips: "Discuss communication strategies, setting clear objectives, regular updates, and managing scope changes."
    },
    {
      question: "Describe a challenging client situation and how you resolved it.",
      category: "Client Care",
      tips: "Show problem-solving skills, communication abilities, and focus on positive outcomes."
    },
    {
      question: "What is your approach to client communication?",
      category: "Client Care",
      tips: "Discuss different communication methods, frequency, documentation, and adapting to client needs."
    },
    {
      question: "How do you ensure client satisfaction?",
      category: "Client Care",
      tips: "Discuss quality assurance, feedback mechanisms, and continuous improvement."
    }
  ],
  communication: [
    {
      question: "Describe a situation where effective communication was critical to project success.",
      category: "Communication & Negotiation",
      tips: "Show different communication methods used, stakeholders involved, and the impact of your communication."
    },
    {
      question: "Give an example of a successful negotiation you conducted.",
      category: "Communication & Negotiation",
      tips: "Explain the context, your approach, techniques used, and the outcome achieved."
    },
    {
      question: "How do you adapt your communication style for different audiences?",
      category: "Communication & Negotiation",
      tips: "Provide examples of different stakeholders and how you tailored your approach."
    }
  ],
  technical: [
    {
      question: "Explain your approach to [specific competency].",
      category: "Technical Competencies",
      tips: "Demonstrate knowledge, application, and provide project examples showing Level 3 achievement."
    },
    {
      question: "Describe a project where you demonstrated Level 3 competency in [competency].",
      category: "Technical Competencies",
      tips: "Show independent working, complex problem-solving, and reasoned advice given."
    },
    {
      question: "How do you stay current with technical developments in your field?",
      category: "Technical Competencies",
      tips: "Discuss CPD activities, professional networks, publications, and training."
    },
    {
      question: "What technical challenges have you overcome in recent projects?",
      category: "Technical Competencies",
      tips: "Show problem-solving process, technical knowledge applied, and lessons learned."
    }
  ],
  general: [
    {
      question: "Why do you want to become MRICS?",
      category: "General",
      tips: "Show commitment to the profession, career goals, and understanding of what MRICS represents."
    },
    {
      question: "How has your structured training prepared you for this assessment?",
      category: "General",
      tips: "Reference specific experiences, competencies developed, and learning outcomes."
    },
    {
      question: "What are your career aspirations?",
      category: "General",
      tips: "Show long-term thinking, professional development plans, and contribution to the profession."
    },
    {
      question: "How do you plan to contribute to the surveying profession?",
      category: "General",
      tips: "Discuss mentoring, knowledge sharing, professional activities, and RICS involvement."
    }
  ]
}

export function getQuestionsByCategory(category: string) {
  return questionBanks[category as keyof typeof questionBanks] || []
}

export function getAllQuestions() {
  return Object.values(questionBanks).flat()
}

export function getRandomQuestions(count: number = 5) {
  const all = getAllQuestions()
  const shuffled = [...all].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

