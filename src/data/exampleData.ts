// Example data for the LMS
export const exampleLearningPaths = {
  'dental-basics': {
    id: 'dental-basics',
    title: 'Dental Practice Fundamentals',
    description: 'Essential knowledge for dental professionals',
    category: 'Clinical',
    requiredFor: ['advanced-procedures'],
    prerequisites: [],
    modules: ['patient-care', 'sterilization-101', 'basic-procedures'],
    estimatedHours: 20,
    validityPeriod: 12,
    compliance: {
      required: true,
      renewalPeriod: 12,
      regulatoryBody: 'Dental Board'
    }
  },
  'advanced-procedures': {
    id: 'advanced-procedures',
    title: 'Advanced Dental Procedures',
    description: 'Advanced techniques and procedures',
    category: 'Clinical',
    requiredFor: [],
    prerequisites: ['dental-basics'],
    modules: ['complex-procedures', 'advanced-techniques'],
    certificationId: 'adv-cert-2024',
    estimatedHours: 40,
    validityPeriod: 24
  },
  'patient-management': {
    id: 'patient-management',
    title: 'Patient Management & Care',
    description: 'Best practices in patient care and communication',
    category: 'Patient Care',
    requiredFor: [],
    prerequisites: ['dental-basics'],
    modules: ['communication', 'patient-records', 'care-planning'],
    estimatedHours: 15,
    compliance: {
      required: true,
      renewalPeriod: 6,
      regulatoryBody: 'Healthcare Standards Board'
    }
  }
};

export const exampleCompliance = {
  'infection-control': {
    id: 'infection-control',
    title: 'Infection Control Standards',
    description: 'Essential infection control protocols',
    category: 'Safety',
    regulatoryBody: 'Health Department',
    frequency: 6,
    requiredCertifications: ['basic-safety'],
    mandatoryTraining: ['sterilization-procedures'],
    documents: [
      {
        id: 'protocol-2024',
        title: 'Infection Control Protocol 2024',
        type: 'pdf',
        url: '/docs/infection-control-2024.pdf',
        validUntil: '2024-12-31'
      }
    ],
    auditRequirements: {
      frequency: 3,
      lastAudit: '2024-01-15',
      nextAudit: '2024-04-15',
      auditor: 'Healthcare Compliance Ltd'
    }
  },
  'patient-safety': {
    id: 'patient-safety',
    title: 'Patient Safety Standards',
    description: 'Core patient safety requirements',
    category: 'Safety',
    regulatoryBody: 'Dental Board',
    frequency: 12,
    requiredCertifications: ['patient-care'],
    mandatoryTraining: ['emergency-response'],
    documents: [
      {
        id: 'safety-guidelines',
        title: 'Patient Safety Guidelines 2024',
        type: 'pdf',
        url: '/docs/safety-guidelines-2024.pdf',
        validUntil: '2024-12-31'
      }
    ]
  }
};

export const exampleProcedures = {
  'basic-cleaning': {
    id: 'basic-cleaning',
    title: 'Basic Dental Cleaning',
    category: 'Preventive',
    riskLevel: 'low',
    requiredCertifications: ['dental-hygiene'],
    steps: [
      {
        id: 'step-1',
        title: 'Patient Preparation',
        description: 'Prepare patient and review medical history',
        duration: 10,
        criticalPoints: ['Check allergies', 'Verify medications']
      },
      {
        id: 'step-2',
        title: 'Cleaning Procedure',
        description: 'Perform basic cleaning procedure',
        duration: 30,
        criticalPoints: ['Use appropriate pressure', 'Check for bleeding']
      }
    ],
    equipment: [
      {
        id: 'equip-1',
        name: 'Dental Scaler',
        quantity: 1,
        specifications: 'Ultrasonic scaler'
      }
    ],
    safetyProtocols: [
      'Wear PPE',
      'Sterilize equipment'
    ],
    contraindications: [
      'Active infection',
      'Severe bleeding disorder'
    ]
  }
};

export const exampleSchedule = {
  'training-session-1': {
    id: 'training-session-1',
    type: 'training',
    title: 'New Equipment Training',
    description: 'Training session for new dental equipment',
    startTime: '2024-03-20T09:00:00',
    endTime: '2024-03-20T12:00:00',
    attendees: ['staff-1', 'staff-2'],
    location: {
      type: 'physical',
      details: 'Training Room A'
    },
    reminders: [
      {
        type: 'email',
        beforeMinutes: 1440 // 24 hours
      },
      {
        type: 'notification',
        beforeMinutes: 60
      }
    ]
  }
};

export const exampleReports = {
  'compliance-q1-2024': {
    id: 'compliance-q1-2024',
    type: 'compliance',
    title: 'Q1 2024 Compliance Report',
    dateRange: {
      start: '2024-01-01',
      end: '2024-03-31'
    },
    filters: {
      department: 'Clinical',
      status: 'active'
    },
    data: {
      totalRequirements: 15,
      completedRequirements: 13,
      upcomingDeadlines: 2,
      complianceRate: 87
    },
    metadata: {
      generatedBy: 'admin',
      generatedAt: '2024-03-15T10:00:00',
      format: 'pdf'
    }
  },
  'training-q1-2024': {
    id: 'training-q1-2024',
    type: 'progress',
    title: 'Q1 2024 Training Progress',
    dateRange: {
      start: '2024-01-01',
      end: '2024-03-31'
    },
    filters: {
      department: 'All',
      trainingType: 'Required'
    },
    data: {
      totalStaff: 25,
      completedTraining: 22,
      inProgress: 3,
      averageScore: 92
    },
    metadata: {
      generatedBy: 'admin',
      generatedAt: '2024-03-15T11:00:00',
      format: 'pdf'
    }
  }
};