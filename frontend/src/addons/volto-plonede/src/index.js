const applyConfig = (config) => {
  config.settings.DSGVOBanner.modules = ['youtube', 'google'];
  config.settings = {
    ...config.settings,
    supportedLanguages: ['de', 'en'],
    defaultLanguage: 'de',
    navDepth: 2,
    matomoSiteId: '11',
    matomoUrlBase: 'https://stats.plone.de/',
  };
  return config;
};

export default applyConfig;
