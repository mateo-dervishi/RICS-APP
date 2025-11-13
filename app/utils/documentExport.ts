export function exportDocument(content: string, filename: string, format: 'docx' | 'pdf' | 'txt' = 'txt') {
  if (format === 'txt') {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } else if (format === 'docx') {
    // For DOCX, we'll create a simple HTML version that can be opened in Word
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; padding: 40px; }
          h1 { color: #333; }
          h2 { color: #555; margin-top: 30px; }
          p { margin: 10px 0; }
        </style>
      </head>
      <body>
        ${content.split('\n').map(line => {
          if (line.trim().startsWith('#') || line.trim().toUpperCase() === line.trim() && line.length > 0) {
            return `<h2>${line}</h2>`
          }
          return `<p>${line}</p>`
        }).join('')}
      </body>
      </html>
    `
    const blob = new Blob([htmlContent], { type: 'application/msword' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}.doc`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
}

export function generateSummaryDocument(state: any): string {
  const { experience, competencies, cpd } = state
  
  let doc = `SUMMARY OF EXPERIENCE\n`
  doc += `Generated: ${new Date().toLocaleDateString()}\n\n`
  
  doc += `MANDATORY COMPETENCIES\n\n`
  
  const mandatory = [
    'Ethics, Rules of Conduct and Professionalism',
    'Client Care',
    'Communication and Negotiation',
    'Health and Safety',
    'Accounting Principles',
    'Business Planning',
    'Conflict Avoidance',
    'Data Management',
    'Diversity and Inclusion',
    'Inclusive Environments',
    'Sustainability'
  ]
  
  mandatory.forEach((comp, i) => {
    const progress = competencies[comp.toLowerCase().replace(/\s+/g, '-')] || { level: 0 }
    doc += `${i + 1}. ${comp}\n`
    doc += `Level Achieved: ${progress.level}\n`
    if (progress.evidence && progress.evidence.length > 0) {
      doc += `Evidence:\n`
      progress.evidence.forEach((ev: string) => {
        doc += `  - ${ev}\n`
      })
    }
    doc += `\n`
  })
  
  doc += `\nEXPERIENCE SUMMARY\n\n`
  doc += `Total Projects: ${experience.length}\n`
  doc += `Total Days: ${experience.length}\n\n`
  
  experience.forEach((exp: any, i: number) => {
    doc += `Project ${i + 1}: ${exp.projectName}\n`
    doc += `Client: ${exp.client}\n`
    doc += `Date: ${new Date(exp.date).toLocaleDateString()}\n`
    doc += `Role: ${exp.role}\n`
    doc += `Description: ${exp.description}\n`
    if (exp.competencies && exp.competencies.length > 0) {
      doc += `Competencies: ${exp.competencies.join(', ')}\n`
    }
    doc += `\n`
  })
  
  doc += `\nCPD ACTIVITIES\n\n`
  doc += `Total Hours: ${cpd.reduce((sum: number, a: any) => sum + a.hours, 0)}\n\n`
  
  cpd.forEach((activity: any) => {
    doc += `${activity.date} - ${activity.title} (${activity.hours} hours)\n`
    doc += `Type: ${activity.type}\n`
    doc += `Description: ${activity.description}\n\n`
  })
  
  return doc
}

export function generateCaseStudyTemplate(project: any): string {
  return `CASE STUDY: ${project.projectName || '[PROJECT NAME]'}

EXECUTIVE SUMMARY
[Brief overview of the project - approximately 200 words]

PROJECT BACKGROUND
Client: ${project.client || '[CLIENT NAME]'}
Location: [LOCATION]
Project Type: ${project.contractType || '[PROJECT TYPE]'}
Contract Value: ${project.contractValue ? `£${project.contractValue.toLocaleString()}` : '[VALUE]'}
Your Role: ${project.role || '[YOUR ROLE]'}
Date: ${project.date ? new Date(project.date).toLocaleDateString() : '[DATE]'}

[Provide background information - approximately 300 words]

KEY CHALLENGES
[Describe the main problems or issues encountered - approximately 500 words]

COMPETENCIES DEMONSTRATED
This project demonstrated the following competencies:
${project.competencies ? project.competencies.map((c: string) => `- ${c}`).join('\n') : '- [List competencies]'}

[For each competency, provide specific examples from this project - approximately 1000 words]

PROBLEM-SOLVING APPROACH
[Describe how you identified and addressed challenges - approximately 500 words]

OUTCOMES AND RESULTS
[Describe project outcomes and your specific contribution - approximately 300 words]

LESSONS LEARNED
[Reflect on what you learned and how it improved your practice - approximately 200 words]

${project.lessonsLearned || '[Add lessons learned]'}`
}

