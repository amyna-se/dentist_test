// API Keys and Integration URLs
export const API_CONFIG = {
  // Authentication providers
  auth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id',
      redirectUri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/google/callback'
    },
    facebook: {
      appId: process.env.FACEBOOK_APP_ID || 'your-facebook-app-id',
      redirectUri: process.env.FACEBOOK_REDIRECT_URI || 'http://localhost:3000/auth/facebook/callback'
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID || 'your-discord-client-id',
      redirectUri: process.env.DISCORD_REDIRECT_URI || 'http://localhost:3000/auth/discord/callback'
    }
  },
  // Analytics
  analytics: {
    google: {
      trackingId: process.env.GA_TRACKING_ID || 'your-ga-tracking-id'
    }
  },
  // Social Media
  social: {
    instagram: {
      username: '@neurostep',
      profileUrl: 'https://instagram.com/neurostep'
    }
  },
  // OpenAI
  openai: {
    apiKey: process.env.OPENAI_API_KEY || 'your-openai-api-key',
    model: 'gpt-4'
  },
  // Email Service
  email: {
    service: 'sendgrid',
    apiKey: process.env.SENDGRID_API_KEY || 'your-sendgrid-api-key',
    fromEmail: 'carlpohl@protonmail.com',
    contactEmail: 'carl@amynna.se',
    templates: {
      welcome: 'd-welcome-template-id',
      verification: 'd-verification-template-id',
      resetPassword: 'd-reset-password-template-id'
    }
  }
};</content>