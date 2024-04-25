export const environment = {
  production: false,
  matomoConfig: {
    scriptUrl: '//cdn.matomo.cloud/ngx.matomo.cloud/matomo.js',
    trackers: [
      {
        trackerUrl: 'https://adminpanel.matomo.cloud/',
        siteId: 1,
      },
    ],
    skipTrackingInitialPageView: false,
    requireConsent: true,
    routeTracking: {
      enable: true,
    },
    trackLinks: true,
  },
};
