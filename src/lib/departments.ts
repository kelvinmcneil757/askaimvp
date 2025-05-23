export type DepartmentMetadata = {
  name: string
  accentColor: string
  faqs: string[]
  integrations: string[]
  events?: {
    name: string
    date: string
    category: string
    fileLink: string
  }[]
}

export const departments: Record<string, DepartmentMetadata> = {
  accounting: {
    name: 'Accounting',
    accentColor: '#4F46E5', // Indigo
    faqs: [
      'How do I process an expense report?',
      'What are the current tax rates for Q2?',
      'How do I reconcile bank statements?',
      'What are the new accounting standards for 2024?',
      'How do I handle foreign currency transactions?'
    ],
    integrations: [
      'QuickBooks',
      'Xero',
      'Sage',
      'NetSuite',
      'Bill.com'
    ]
  },
  hr: {
    name: 'HR',
    accentColor: '#EC4899', // Pink
    faqs: [
      'What is our parental leave policy?',
      'How do I update my benefits?',
      'What are the current PTO balances?',
      'How do I submit a time-off request?',
      'What is the process for performance reviews?'
    ],
    integrations: [
      'Workday',
      'BambooHR',
      'ADP',
      'Greenhouse',
      'Lattice'
    ]
  },
  'customer-support': {
    name: 'Customer Support',
    accentColor: '#10B981', // Emerald
    faqs: [
      'How do I handle a refund request?',
      'What is our SLA for response times?',
      'How do I escalate a customer issue?',
      'What are our current support metrics?',
      'How do I access customer history?'
    ],
    integrations: [
      'Zendesk',
      'Intercom',
      'Salesforce',
      'HubSpot',
      'Freshdesk'
    ]
  },
  'event-planning': {
    name: 'Event Planning',
    accentColor: '#F59E0B', // Amber
    faqs: [
      'How do I book a venue?',
      'What is the budget approval process?',
      'How do I track RSVPs?',
      'What are our preferred vendors?',
      'How do I create an event timeline?'
    ],
    integrations: [
      'Eventbrite',
      'Cvent',
      'Bizzabo',
      'Asana',
      'Slack'
    ],
    events: [
      {
        name: 'Annual Company Retreat',
        date: '2024-06-15',
        category: 'Internal',
        fileLink: '/events/retreat-2024.pdf'
      },
      {
        name: 'Product Launch Conference',
        date: '2024-07-20',
        category: 'External',
        fileLink: '/events/launch-2024.pdf'
      },
      {
        name: 'Team Building Workshop',
        date: '2024-05-01',
        category: 'Internal',
        fileLink: '/events/workshop-2024.pdf'
      },
      {
        name: 'Customer Success Summit',
        date: '2024-08-10',
        category: 'External',
        fileLink: '/events/summit-2024.pdf'
      }
    ]
  }
} 