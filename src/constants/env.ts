const config = process.env;

export const ENV = {
  ENVIRONMENT: config.REACT_APP_ENV,
  IS_DEV: config.REACT_APP_ENV === 'dev',
  IS_TEST: config.REACT_APP_ENV === 'test',
  IS_QA: config.REACT_APP_ENV === 'qa',
  IS_PROD: config.REACT_APP_ENV === 'stg' || config.REACT_APP_ENV === 'prd',
  API: {
    URL: config.REACT_APP_FREEDOM_API_URL,
    SECURITY_URL: config.REACT_APP_SECURITY_API_URL,
    MAX_RETRIES: 3,
    RETRY_TIMEOUT: 1000,
  },
  GOOGLE_API: {
    MAPS_API_KEY: config.REACT_APP_MAPS_API_KEY,
    PLACES_API_KEY: config.REACT_APP_PLACES_API_KEY,
  },
  STRIPE_API: {
    API_KEY: config.REACT_APP_STRIPE_API_KEY,
  },
  GOOGLE_TAG_MANAGER: {
    gtmId: 'GTM-KBP9BRT',
  },
  TOAST_DELAY: Number(config.REACT_APP_TOAST_DELAY),
};
