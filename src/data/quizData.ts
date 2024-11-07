export const quizData = {
  'autism-101': {
    title: 'Understanding Autism',
    description: 'Learn the fundamentals of autism spectrum disorder.',
    questions: [
      {
        id: 'a1',
        type: 'info' as const,
        message: 'Welcome to Understanding Autism! Let\'s start by learning about sensory processing.',
        emoji: '🧠'
      },
      {
        id: 'a2',
        type: 'multiple-choice' as const,
        question: 'Which of the following is a common characteristic of autism?',
        options: [
          'Difficulty with social communication',
          'Enhanced athletic ability',
          'Perfect musical pitch',
          'Improved social skills'
        ],
        correctAnswer: 'Difficulty with social communication',
        emoji: '👥'
      },
      {
        id: 'a3',
        type: 'multiple-choice' as const,
        question: 'What is stimming?',
        options: [
          'Repetitive self-soothing behaviors',
          'A type of medication',
          'A therapy technique',
          'A communication device'
        ],
        correctAnswer: 'Repetitive self-soothing behaviors',
        emoji: '🔄'
      },
      {
        id: 'a4',
        type: 'info' as const,
        message: 'Great progress! Now let\'s learn about communication patterns in autism.',
        emoji: '💭'
      },
      {
        id: 'a5',
        type: 'multiple-choice' as const,
        question: 'Which communication style is often associated with autism?',
        options: [
          'Direct and literal interpretation',
          'Heavy use of sarcasm',
          'Frequent use of metaphors',
          'Indirect communication'
        ],
        correctAnswer: 'Direct and literal interpretation',
        emoji: '🗣️'
      },
      {
        id: 'a6',
        type: 'text-input' as const,
        question: 'What is the term for difficulty in reading social cues and understanding others\' emotions?',
        correctAnswer: 'social blindness',
        placeholder: 'Enter the term...',
        caseSensitive: false,
        emoji: '👁️'
      },
      {
        id: 'a7',
        type: 'info' as const,
        message: 'You\'re doing great! Let\'s explore sensory sensitivities.',
        emoji: '👂'
      },
      {
        id: 'a8',
        type: 'multiple-choice' as const,
        question: 'Which sense is NOT commonly affected by sensory sensitivities in autism?',
        options: [
          'Gravity perception',
          'Sound sensitivity',
          'Light sensitivity',
          'Touch sensitivity'
        ],
        correctAnswer: 'Gravity perception',
        emoji: '🌟'
      },
      {
        id: 'a9',
        type: 'multiple-choice' as const,
        question: 'What is a common coping strategy for sensory overload?',
        options: [
          'Finding a quiet space',
          'Drinking caffeine',
          'Exercising intensely',
          'Socializing more'
        ],
        correctAnswer: 'Finding a quiet space',
        emoji: '🏃'
      },
      {
        id: 'a10',
        type: 'info' as const,
        message: 'Final section! Let\'s test your understanding of autism support.',
        emoji: '🤝'
      },
      {
        id: 'a11',
        type: 'multiple-choice' as const,
        question: 'What is the most important aspect of supporting someone with autism?',
        options: [
          'Understanding and accepting their unique needs',
          'Trying to cure their condition',
          'Making them act more "normal"',
          'Ignoring their differences'
        ],
        correctAnswer: 'Understanding and accepting their unique needs',
        emoji: '❤️'
      }
    ]
  },
  'adhd-basics': {
    title: 'ADHD Essentials',
    description: 'Learn about ADHD, its impacts, and effective management strategies.',
    questions: [
      {
        id: 'd1',
        type: 'info' as const,
        message: 'Welcome to ADHD Essentials! Let\'s start by understanding attention patterns.',
        emoji: '🎯'
      },
      {
        id: 'd2',
        type: 'multiple-choice' as const,
        question: 'What is hyperfocus in ADHD?',
        options: [
          'Intense concentration on interesting tasks',
          'Always being distracted',
          'Inability to focus',
          'Sleeping too much'
        ],
        correctAnswer: 'Intense concentration on interesting tasks',
        emoji: '🔍'
      },
      {
        id: 'd3',
        type: 'multiple-choice' as const,
        question: 'Which is a common ADHD trait?',
        options: [
          'Time blindness',
          'Perfect time management',
          'Always being early',
          'Disliking schedules'
        ],
        correctAnswer: 'Time blindness',
        emoji: '⏰'
      },
      {
        id: 'd4',
        type: 'info' as const,
        message: 'Great job! Now let\'s explore executive functioning.',
        emoji: '🧩'
      },
      {
        id: 'd5',
        type: 'multiple-choice' as const,
        question: 'What is executive functioning?',
        options: [
          'Mental skills for organizing and planning',
          'Physical exercise routine',
          'Medication management',
          'Social skills training'
        ],
        correctAnswer: 'Mental skills for organizing and planning',
        emoji: '📋'
      },
      {
        id: 'd6',
        type: 'text-input' as const,
        question: 'What is the term for getting easily distracted by unimportant stimuli?',
        correctAnswer: 'distractibility',
        placeholder: 'Enter the term...',
        caseSensitive: false,
        emoji: '🦋'
      },
      {
        id: 'd7',
        type: 'info' as const,
        message: 'You\'re doing great! Let\'s learn about ADHD management.',
        emoji: '⚡'
      },
      {
        id: 'd8',
        type: 'multiple-choice' as const,
        question: 'Which is NOT a recommended ADHD management strategy?',
        options: [
          'Avoiding all structure',
          'Using reminders',
          'Breaking tasks into chunks',
          'Regular exercise'
        ],
        correctAnswer: 'Avoiding all structure',
        emoji: '📝'
      },
      {
        id: 'd9',
        type: 'multiple-choice' as const,
        question: 'What is a common ADHD strength?',
        options: [
          'Creative problem-solving',
          'Perfect memory',
          'Always being organized',
          'Never getting distracted'
        ],
        correctAnswer: 'Creative problem-solving',
        emoji: '💡'
      },
      {
        id: 'd10',
        type: 'info' as const,
        message: 'Final section! Let\'s test your understanding of ADHD support.',
        emoji: '🤝'
      },
      {
        id: 'd11',
        type: 'multiple-choice' as const,
        question: 'What is the most helpful way to support someone with ADHD?',
        options: [
          'Understanding and accommodating their needs',
          'Constantly reminding them to focus',
          'Doing everything for them',
          'Ignoring their challenges'
        ],
        correctAnswer: 'Understanding and accommodating their needs',
        emoji: '❤️'
      }
    ]
  },
  'autism-relationships': {
    title: 'Autism & Relationships',
    description: 'Understanding relationships through the autism lens.',
    questions: [
      {
        id: 'ar1',
        type: 'info' as const,
        message: 'Welcome to Autism & Relationships! Let\'s explore how autism affects social connections.',
        emoji: '💕'
      },
      {
        id: 'ar2',
        type: 'multiple-choice' as const,
        question: 'How might autism affect emotional expression in relationships?',
        options: [
          'Different ways of showing affection',
          'Inability to feel emotions',
          'Always showing too much emotion',
          'Only expressing negative emotions'
        ],
        correctAnswer: 'Different ways of showing affection',
        emoji: '❤️'
      },
      {
        id: 'ar3',
        type: 'multiple-choice' as const,
        question: 'What is important for partners to understand about autistic communication?',
        options: [
          'Direct communication is preferred',
          'Always use metaphors',
          'Never ask direct questions',
          'Avoid clear instructions'
        ],
        correctAnswer: 'Direct communication is preferred',
        emoji: '🗣️'
      },
      {
        id: 'ar4',
        type: 'info' as const,
        message: 'Great progress! Let\'s discuss social boundaries and personal space.',
        emoji: '🤝'
      },
      {
        id: 'ar5',
        type: 'multiple-choice' as const,
        question: 'How can sensory sensitivities affect relationships?',
        options: [
          'May need different levels of physical contact',
          'Always avoid physical contact',
          'Never affects relationships',
          'Only affects work relationships'
        ],
        correctAnswer: 'May need different levels of physical contact',
        emoji: '👥'
      },
      {
        id: 'ar6',
        type: 'text-input' as const,
        question: 'What term describes the need for alone time to recharge after social interaction?',
        correctAnswer: 'social recharge',
        placeholder: 'Enter the term...',
        caseSensitive: false,
        emoji: '🔋'
      },
      {
        id: 'ar7',
        type: 'info' as const,
        message: 'Let\'s explore how to support an autistic partner or family member.',
        emoji: '🌟'
      },
      {
        id: 'ar8',
        type: 'multiple-choice' as const,
        question: 'What is a helpful way to support an autistic partner during social events?',
        options: [
          'Plan quiet breaks and escape routes',
          'Force them to socialize more',
          'Never attend social events',
          'Ignore their discomfort'
        ],
        correctAnswer: 'Plan quiet breaks and escape routes',
        emoji: '🎭'
      },
      {
        id: 'ar9',
        type: 'multiple-choice' as const,
        question: 'How can family members best support autistic relatives?',
        options: [
          'Learn about their specific needs and preferences',
          'Treat them exactly like everyone else',
          'Hide their diagnosis from others',
          'Make all decisions for them'
        ],
        correctAnswer: 'Learn about their specific needs and preferences',
        emoji: '👨‍👩‍👧‍👦'
      },
      {
        id: 'ar10',
        type: 'info' as const,
        message: 'Final section! Let\'s review relationship success strategies.',
        emoji: '🎯'
      },
      {
        id: 'ar11',
        type: 'multiple-choice' as const,
        question: 'What is key to maintaining healthy relationships with autistic individuals?',
        options: [
          'Open communication and mutual understanding',
          'Changing their behavior',
          'Keeping relationships casual',
          'Avoiding difficult conversations'
        ],
        correctAnswer: 'Open communication and mutual understanding',
        emoji: '🤝'
      }
    ]
  },
  'adhd-relationships': {
    title: 'ADHD & Relationships',
    description: 'Navigate relationships with ADHD awareness.',
    questions: [
      {
        id: 'dr1',
        type: 'info' as const,
        message: 'Welcome to ADHD & Relationships! Let\'s explore how ADHD impacts personal connections.',
        emoji: '💝'
      },
      {
        id: 'dr2',
        type: 'multiple-choice' as const,
        question: 'How might ADHD affect relationship dynamics?',
        options: [
          'Variable attention to partner\'s needs',
          'Complete inability to maintain relationships',
          'Perfect relationship management',
          'No effect on relationships'
        ],
        correctAnswer: 'Variable attention to partner\'s needs',
        emoji: '🤹'
      },
      {
        id: 'dr3',
        type: 'multiple-choice' as const,
        question: 'What is a common challenge in ADHD relationships?',
        options: [
          'Forgetting important dates or commitments',
          'Too much planning',
          'Over-organizing',
          'Excessive routine'
        ],
        correctAnswer: 'Forgetting important dates or commitments',
        emoji: '📅'
      },
      {
        id: 'dr4',
        type: 'info' as const,
        message: 'Let\'s discuss emotional regulation in relationships.',
        emoji: '🎭'
      },
      {
        id: 'dr5',
        type: 'multiple-choice' as const,
        question: 'How can emotional dysregulation affect relationships?',
        options: [
          'Intense emotional responses to situations',
          'No emotional responses',
          'Perfect emotional control',
          'Only positive emotions'
        ],
        correctAnswer: 'Intense emotional responses to situations',
        emoji: '🌊'
      },
      {
        id: 'dr6',
        type: 'text-input' as const,
        question: 'What term describes the tendency to interrupt or complete others\' sentences?',
        correctAnswer: 'conversational impulsivity',
        placeholder: 'Enter the term...',
        caseSensitive: false,
        emoji: '🗣️'
      },
      {
        id: 'dr7',
        type: 'info' as const,
        message: 'Great progress! Let\'s explore support strategies for partners.',
        emoji: '🤝'
      },
      {
        id: 'dr8',
        type: 'multiple-choice' as const,
        question: 'What can help manage shared responsibilities with ADHD?',
        options: [
          'Creating clear systems and reminders',
          'Avoiding all responsibilities',
          'Letting others do everything',
          'Working without breaks'
        ],
        correctAnswer: 'Creating clear systems and reminders',
        emoji: '📝'
      },
      {
        id: 'dr9',
        type: 'multiple-choice' as const,
        question: 'How can partners support someone with ADHD?',
        options: [
          'Collaborate on organization strategies',
          'Take control of everything',
          'Ignore the ADHD',
          'Avoid making plans'
        ],
        correctAnswer: 'Collaborate on organization strategies',
        emoji: '🤲'
      },
      {
        id: 'dr10',
        type: 'info' as const,
        message: 'Final section! Let\'s review relationship success strategies.',
        emoji: '🎯'
      },
      {
        id: 'dr11',
        type: 'multiple-choice' as const,
        question: 'What is essential for successful ADHD relationships?',
        options: [
          'Understanding, patience, and clear communication',
          'Strict rules and control',
          'Avoiding all challenges',
          'Keeping distance'
        ],
        correctAnswer: 'Understanding, patience, and clear communication',
        emoji: '❤️'
      }
    ]
  }
};