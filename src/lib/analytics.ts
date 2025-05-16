import posthog from 'posthog-js';

export function initAnalytics() {
  if (process.env.NODE_ENV === 'production' && process.env.POSTHOG_KEY) {
    posthog.init(process.env.POSTHOG_KEY, {
      api_host: process.env.POSTHOG_HOST || 'https://app.posthog.com',
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') {
          // Add development mode flag
          posthog.identify('development');
        }
      },
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: true,
      disable_session_recording: true, // Disable session recording for privacy
      respect_dnt: true, // Respect Do Not Track
    });
  }
}

export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (process.env.NODE_ENV === 'production' && process.env.POSTHOG_KEY) {
    posthog.capture(eventName, {
      ...properties,
      environment: process.env.NODE_ENV,
    });
  }
}

export function identifyUser(userId: string, traits?: Record<string, any>) {
  if (process.env.NODE_ENV === 'production' && process.env.POSTHOG_KEY) {
    posthog.identify(userId, {
      ...traits,
      environment: process.env.NODE_ENV,
    });
  }
}

export function resetUser() {
  if (process.env.NODE_ENV === 'production' && process.env.POSTHOG_KEY) {
    posthog.reset();
  }
} 