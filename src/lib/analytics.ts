import { GA_TRACKING_ID, GA_DEBUG_MODE, GOOGLE_ADS_ID } from '../config/analytics';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_TRACKING_ID) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    debug_mode: GA_DEBUG_MODE,
    send_page_view: true
  });

  // Initialize Google Ads if ID is available
  if (GOOGLE_ADS_ID) {
    window.gtag('config', GOOGLE_ADS_ID);
  }
};

// Track Page Views
export const trackPageView = (url: string) => {
  if (!window.gtag) return;
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url
  });
};

// Track Events
export const trackEvent = (action: string, category: string, label: string, value?: number) => {
  if (!window.gtag) return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  });
};

// Track User Properties
export const setUserProperties = (properties: Record<string, any>) => {
  if (!window.gtag) return;
  window.gtag('set', 'user_properties', properties);
};

// Track Conversions
export const trackConversion = (conversionId: string, label: string, value?: number) => {
  if (!window.gtag) return;
  window.gtag('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/${conversionId}`,
    value: value,
    currency: 'USD',
    transaction_id: ''
  });
};

// Track Course Progress
export const trackCourseProgress = (courseId: string, progress: number) => {
  trackEvent('course_progress', 'Course', courseId, progress);
};

// Track Quiz Completion
export const trackQuizCompletion = (quizId: string, score: number) => {
  trackEvent('quiz_completion', 'Quiz', quizId, score);
};

// Track User Engagement
export const trackEngagement = (action: string, value?: number) => {
  trackEvent('engagement', 'User', action, value);
};