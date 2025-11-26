# RICS Pathway Assistant

A comprehensive web application designed to assist candidates through their RICS (Royal Institution of Chartered Surveyors) qualification journey. This platform provides tools for tracking competencies, managing CPD activities, preparing assessments, and accessing official RICS guidance materials.

## 🎯 Overview

The RICS Pathway Assistant is a full-featured platform that helps users navigate their RICS qualification journey from student level through to Fellowship (FRICS). It provides personalized guidance, progress tracking, document management, and access to official RICS textbooks with annotation capabilities.

## ✨ Key Features

### 🔐 Authentication & User Management
- **Secure Login/Signup System**: User authentication with email and password
- **Profile Management**: Customizable user profiles with profile picture upload
- **Session Persistence**: Automatic session management with localStorage
- **User Settings**: Comprehensive settings panel for preferences and account management

### 📊 Dashboard & Navigation
- **Modern Sidebar Navigation**: Persistent sidebar with categorized menu items
- **Interactive Dashboard**: Real-time progress tracking with visual indicators
- **Quick Actions**: One-click access to common tasks
- **Recent Activity Feed**: Track your latest activities and updates
- **Upcoming Tasks**: Task management with priority indicators

### 🎓 Pathway Guidance
- **Pathway Advisor**: AI-powered advisor that recommends the best RICS pathway based on your profile
- **Student Module**: Resources and guidance for student members
- **Academic Assessment**: Tools for academic qualification assessment
- **AssocRICS Module**: Support for Associate RICS qualification
- **MRICS Routes**: Comprehensive guide to MRICS pathways (22 pathways available)
- **FRICS Module**: Fellowship application support with characteristic tracking

### 📚 RICS Knowledge Base
- **RICS Agent**: AI-powered Q&A assistant that answers questions using official RICS textbooks
- **Textbook Library**: Access to 20 official RICS guidance documents
- **PDF Viewer**: Full-featured PDF viewer with:
  - Free scrolling through pages
  - Page-by-page navigation
  - Zoom controls (50% - 200%)
  - Text highlighting with multiple colors
  - Note-taking with color-coded annotations
  - Persistent annotations (saved per textbook)
  - Sidebar for managing all notes and highlights

### 📝 Competency Tracking
- **Competency Tracker**: Track all mandatory and technical competencies
- **Level Assessment**: Record competency levels (Level 1, 2, 3)
- **Evidence Management**: Link evidence and examples to competencies
- **Progress Visualization**: Visual progress indicators for each competency

### 📖 Experience Diary
- **Project Logging**: Record project experiences with detailed information
- **Competency Linking**: Link experiences to specific competencies
- **Contract Details**: Track contract values, types, and project details
- **Lessons Learned**: Document key learnings from each project

### 🎓 CPD Tracker
- **Activity Logging**: Track formal and informal CPD activities
- **Hour Tracking**: Monitor CPD hours against requirements (20 for AssocRICS, 48 for MRICS)
- **Competency Links**: Link CPD activities to competencies
- **Certificate Management**: Store CPD certificates and documentation

### 📄 Document Management
- **Document Templates**: Pre-built templates for:
  - Summary of Experience (4,500-5,500 words)
  - Case Study (2,500-3,500 words)
  - CPD Record
  - Preliminary Review Document
  - FRICS Application
- **AI Writer**: AI-powered writing assistant for document creation
- **Word Count Tracking**: Automatic word count with validation
- **Document Export**: Export documents in multiple formats (TXT, DOCX)
- **Version Control**: Track document versions and changes

### 🎯 Assessment Preparation
- **Question Banks**: Comprehensive question banks by competency area
- **Mock Interviews**: Practice interview scenarios
- **Readiness Assessment**: Evaluate your preparation level
- **Progress Tracking**: Monitor your assessment readiness

### 💰 Financial Planning
- **Fee Calculator**: Calculate RICS membership and assessment fees
- **Cost Breakdown**: Detailed breakdown of all costs
- **Payment Planning**: Plan payments for assessments and memberships

### 👥 Network & Community
- **Professional Network**: Connect with other RICS candidates
- **Study Groups**: Join or create study groups by location or pathway
- **Q&A Forum**: Ask questions and get answers from verified professionals
- **Events**: View and register for RICS events and webinars

### 📈 Analytics & Reporting
- **Progress Analytics**: Comprehensive progress tracking across all areas
- **Visual Charts**: Graphical representation of your progress
- **Performance Metrics**: Track competencies, CPD, and experience progress
- **Timeline View**: Visual timeline of your RICS journey

### ⚙️ Settings & Preferences
- **Profile Settings**: Manage personal information and profile picture
- **Application Preferences**: Customize theme, language, date format, timezone
- **Notification Settings**: Configure email and push notifications
- **Data Management**: Export/import data, clear data, view statistics
- **Security Settings**: Password management and privacy controls

## 🛠️ Technology Stack

- **Framework**: Next.js 14.0.4 (React 18.2.0)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date Handling**: date-fns
- **State Management**: React Context API with localStorage persistence

## 📁 Project Structure

```
RICS pathway assistant/
├── app/
│   ├── components/          # React components
│   │   ├── AppLayout.tsx   # Main layout with sidebar
│   │   ├── Dashboard.tsx    # Dashboard component
│   │   ├── RICSAgent.tsx   # AI Q&A assistant
│   │   ├── TextbookViewer.tsx # PDF viewer with annotations
│   │   └── ...             # Other feature components
│   ├── context/
│   │   └── AppContext.tsx  # Global state management
│   ├── data/
│   │   ├── pathways.ts     # Pathway definitions
│   │   ├── competencies.ts # Competency data
│   │   ├── questionBanks.ts # Assessment questions
│   │   └── ricsTextbooks.ts # Textbook metadata
│   ├── utils/
│   │   ├── documentExport.ts # Document export utilities
│   │   └── pdfProcessor.ts   # PDF processing utilities
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page component
├── public/
│   └── RICS FILES/         # PDF textbooks (20 files)
└── package.json            # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mateo-dervishi/RICS-APP.git
cd RICS-APP
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## 📖 Usage Guide

### First Time Setup

1. **Create an Account**: Sign up with your email and password
2. **Set Your Profile**: Upload a profile picture and complete your profile
3. **Use Pathway Advisor**: Get personalized recommendations for your RICS journey
4. **Set Your Pathway**: Choose your specialization and membership level

### Daily Usage

1. **Track Progress**: Use the Dashboard to monitor your overall progress
2. **Log Activities**: 
   - Add competencies as you achieve them
   - Log project experiences in the Experience Diary
   - Record CPD activities
3. **Prepare Documents**: Use document templates and AI Writer for assessment documents
4. **Study**: Access RICS textbooks, make notes, and highlight important sections
5. **Ask Questions**: Use the RICS Agent to get answers from official guidance

### Key Workflows

#### Tracking Competencies
1. Navigate to Competencies
2. Select a competency
3. Set your achievement level (1, 2, or 3)
4. Add evidence and examples
5. Save your progress

#### Logging Experience
1. Go to Experience Diary
2. Click "Add Experience Entry"
3. Fill in project details
4. Link to relevant competencies
5. Add lessons learned
6. Save the entry

#### Using RICS Textbooks
1. Navigate to Textbooks
2. Browse the library or search for a specific textbook
3. Click to open a textbook
4. Use toolbar to:
   - Navigate pages
   - Zoom in/out
   - Highlight text
   - Add notes
5. All annotations are automatically saved

## 🎨 Features in Detail

### RICS Agent
- Ask questions about RICS practices and procedures
- Get answers based on official RICS textbooks
- View source citations for each answer
- Click sources to open textbooks directly

### PDF Viewer
- **Viewing**: Scroll freely through PDF pages
- **Navigation**: Jump to specific pages
- **Zoom**: Adjust zoom level for better readability
- **Highlights**: Select text and highlight with colors
- **Notes**: Add sticky notes anywhere on the page
- **Persistence**: All annotations saved automatically

### Document Center
- **Templates**: Pre-formatted templates for all RICS documents
- **AI Writer**: Get AI assistance for writing competency statements
- **Word Count**: Automatic tracking with RICS requirements validation
- **Export**: Download documents in various formats

## 🔒 Data & Privacy

- All data is stored locally in your browser (localStorage)
- No data is sent to external servers
- You can export your data at any time
- Data can be cleared from Settings

## 🗺️ Roadmap & Future Enhancements

- [ ] Cloud sync for data across devices
- [ ] Advanced PDF text extraction and search
- [ ] Vector embeddings for semantic textbook search
- [ ] Integration with RICS official APIs
- [ ] Mobile app version
- [ ] Collaborative features for study groups
- [ ] Advanced analytics and insights
- [ ] Integration with calendar systems
- [ ] Email reminders and notifications

## 📝 Available RICS Textbooks

The platform includes access to 20 official RICS guidance documents:

1. Acceleration (2nd Edition, 2024)
2. Change Control and Management (2024)
3. Cost Analysis and Benchmarking (2nd Edition)
4. Damages for Delay to Completion (2nd Edition)
5. Defects and Rectifications (2nd Edition)
6. Defining Completion of Construction Works (1st Edition)
7. Developing a Construction Procurement Strategy
8. eTendering (2nd Edition)
9. Extensions of Time
10. Final Account Procedures (1st Edition)
11. Fluctuations (1st Edition)
12. Management of Risk (1st Edition)
13. Quantity Surveying and Construction
14. Retention (1st Edition)
15. Subcontracting (1st Edition)
16. Tendering Strategies (1st Edition)
17. Termination of Contract, Corporate Recovery and Insolvency (1st Edition)
18. Valuing Change (1st Edition)
19. Value Management and Value Engineering (1st Edition)
20. Employer's Agent - Design and Build (1st Edition)
21. RIBA Plan of Work Template (2020)

## 🤝 Contributing

This is a private project, but suggestions and feedback are welcome!

## 📄 License

Private project - All rights reserved

## 👤 Author

Mateo Dervishi

## 🙏 Acknowledgments

- RICS for providing official guidance documents
- Next.js and React communities
- All open-source contributors whose libraries made this possible

---

**Note**: This application is designed to assist with RICS qualification preparation. Always refer to official RICS guidance and consult with your counselor or mentor for official requirements and advice.

