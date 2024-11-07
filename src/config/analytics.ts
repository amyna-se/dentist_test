// Google Analytics Configuration
export const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || 'G-Z2L82HBZ2Z';
export const GA_DEBUG_MODE = import.meta.env.DEV;

// Google Ads Configuration
export const GOOGLE_ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID || 'AW-123456789';
export const GOOGLE_ADS_CONVERSION_ID = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID || '987654321';

// SEO Configuration
export const DEFAULT_SEO = {
  title: 'NeuroStep - Innovative Learning Platform',
  description: 'Learn about Autism and ADHD through interactive courses on NeuroStep',
  canonical: 'https://neurostep.se',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://neurostep.se',
    site_name: 'NeuroStep',
    title: 'NeuroStep - Innovative Learning Platform',
    description: 'Learn about Autism and ADHD through interactive courses on NeuroStep',
    images: [
      {
        url: 'https://neurostep.se/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NeuroStep'
      }
    ]
  },
  twitter: {
    handle: '@neurostep',
    site: '@neurostep',
    cardType: 'summary_large_image'
  }
};