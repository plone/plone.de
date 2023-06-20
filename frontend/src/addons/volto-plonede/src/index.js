import {
  ButtonBlockSchemaEnhancer,
  DefaultStylingSchemaEnhancer,
  HeadingBlockSchemaEnhancer,
  HeroBlockSchemaEnhancer,
  ImageBlockSchemaEnhancer,
  ListingBlockSchemaEnhancer,
  SliderBlockSchemaEnhancer,
  TeaserBlockSchemaEnhancer,
  EventTemplate,
} from 'volto-plonede/components';
import { defineMessages } from 'react-intl';
import { composeSchema } from '@plone/volto/helpers';
import { SeparatorStyleEnhancer } from '@kitconcept/volto-separator-block/components/schema.js';
import { gridTeaserDisableStylingSchema } from '@kitconcept/volto-blocks-grid/components/Teaser/schema';

// Quote Block
import quoteSVG from '@plone/volto/icons/quote.svg';
import QuoteBlockView from './components/manage/Blocks/volto-quote-block/View';
import QuoteBlockEdit from './components/manage/Blocks/volto-quote-block/Edit';

defineMessages({
  Imprint: { id: 'Imprint', defaultMessage: 'Imprint' },
  Accessibility: { id: 'Accessibility', defaultMessage: 'Accessibility' },
  Contact: { id: 'Contact', defineMessage: 'Contact' },
  'Site Map': { id: 'Site Map', defineMessage: 'Site Map' },
  'Button text': { id: 'Button text', defaultMessage: 'Button text' },
  EnableCookies: {
    id: 'Enable {module} cookies',
    defaultMessage: 'Enable {module} cookies',
    values: {
      module: <b>{module}</b>,
    },
  },
  CustomizePrivacySettings: {
    id: 'Customize your Privacy Settings',
    defaultMessage: 'Customize your Privacy Settings',
  },
  Or: {
    id: ', or ',
    defaultMessage: ', or ',
  },
});

const applyConfig = (config) => {
  config.settings = {
    ...config.settings,
    supportedLanguages: ['de', 'en'],
    defaultLanguage: 'de',
    navDepth: 2,
    matomoSiteId: '11',
    matomoUrlBase: 'https://stats.plone.de/',
  };

  //Button
  config.blocks.blocksConfig.__button = {
    ...config.blocks.blocksConfig.__button,
    schemaEnhancer: composeSchema(
      ButtonBlockSchemaEnhancer,
      DefaultStylingSchemaEnhancer,
    ),
  };

  //Image
  config.blocks.blocksConfig.image = {
    ...config.blocks.blocksConfig.image,
    schemaEnhancer: composeSchema(
      DefaultStylingSchemaEnhancer,
      ImageBlockSchemaEnhancer,
    ),
  };

  //Separator
  config.blocks.blocksConfig.separator = {
    ...config.blocks.blocksConfig.separator,
    schemaEnhancer: composeSchema(SeparatorStyleEnhancer),
  };

  //Heading
  config.blocks.blocksConfig.heading = {
    ...config.blocks.blocksConfig.heading,
    schemaEnhancer: composeSchema(
      HeadingBlockSchemaEnhancer,
      DefaultStylingSchemaEnhancer,
    ),
  };

  //Hero
  config.blocks.blocksConfig.hero = {
    ...config.blocks.blocksConfig.hero,
    schemaEnhancer: composeSchema(
      HeroBlockSchemaEnhancer,
      DefaultStylingSchemaEnhancer,
    ),
  };

  config.blocks.requiredBlocks = [];
  config.settings = {
    ...config.settings,
    isMultilingual: false,
    supportedLanguages: ['de'],
    defaultLanguage: 'de',
  };

  //Listing
  config.blocks.blocksConfig.listing = {
    ...config.blocks.blocksConfig.listing,
    schemaEnhancer: composeSchema(
      ListingBlockSchemaEnhancer,
      DefaultStylingSchemaEnhancer,
    ),
  };

  config.blocks.blocksConfig.listing.variations = [
    ...config.blocks.blocksConfig.listing.variations,
    {
      id: 'events',
      title: 'Events',
      template: EventTemplate,
    },
  ];

  // Quote
  config.blocks.blocksConfig.quote = {
    id: 'quote',
    title: 'Quote',
    icon: quoteSVG,
    group: 'text',
    view: QuoteBlockView,
    edit: QuoteBlockEdit,
    blockHasOwnFocusManagement: true,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
  };

  //Slider
  config.blocks.blocksConfig.slider = {
    ...config.blocks.blocksConfig.slider,
    schemaEnhancer: composeSchema(
      SliderBlockSchemaEnhancer,
      DefaultStylingSchemaEnhancer,
    ),
  };

  //TeaserGrid
  config.blocks.blocksConfig.teaserGrid = {
    ...config.blocks.blocksConfig.teaserGrid,
    schemaEnhancer: DefaultStylingSchemaEnhancer,
  };

  config.blocks.blocksConfig.__grid = {
    ...config.blocks.blocksConfig.__grid,
    //schemaEnhancer: ...,
    blocksConfig: {
      ...config.blocks.blocksConfig,
      teaser: {
        ...config.blocks.blocksConfig.teaser,
        schemaEnhancer: composeSchema(
          gridTeaserDisableStylingSchema,
          TeaserBlockSchemaEnhancer,
        ),
      },
    },
  };

  config.settings.DSGVOBanner.modules = ['youtube'];

  delete config.blocks.blocksConfig.text;
  delete config.blocks.blocksConfig.description;
  config.blocks.blocksConfig.__grid.gridAllowedBlocks = [
    ...config.blocks.blocksConfig.__grid.gridAllowedBlocks,
    '__button',
    'quote',
  ];

  return config;
};

export default applyConfig;
