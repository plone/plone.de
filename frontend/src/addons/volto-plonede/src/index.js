import {
  ButtonBlockSchemaEnhancer,
  DefaultStylingSchemaEnhancer,
  HeadingBlockSchemaEnhancer,
  HeroBlockSchemaEnhancer,
  ListingBlockSchemaEnhancer,
  SliderBlockSchemaEnhancer,
  EventTemplate,
} from 'volto-plonede/components';
import { defineMessages } from 'react-intl';
import { composeSchema } from '@plone/volto/helpers';

defineMessages({
  Imprint: { id: 'Imprint', defaultMessage: 'Imprint' },
  Accessibility: { id: 'Accessibility', defaultMessage: 'Accessibility' },
  Contact: { id: 'Contact', defineMessage: 'Contact' },
  'Site Map': { id: 'Site Map', defineMessage: 'Site Map' },
  'Button text': { id: 'Button text', defaultMessage: 'Button text' },
});

const applyConfig = (config) => {
  config.settings = {
    ...config.settings,
    supportedLanguages: ['de', 'en'],
    defaultLanguage: 'de',
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

  //Button
  config.blocks.blocksConfig.__button = {
    ...config.blocks.blocksConfig.__button,
    schemaEnhancer: composeSchema(
      ButtonBlockSchemaEnhancer,
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

  //Slider
  config.blocks.blocksConfig.slider = {
    ...config.blocks.blocksConfig.slider,
    schemaEnhancer: composeSchema(
      SliderBlockSchemaEnhancer,
      DefaultStylingSchemaEnhancer,
    ),
  };

  delete config.blocks.blocksConfig.text;
  config.blocks.blocksConfig.__grid.gridAllowedBlocks = [
    ...config.blocks.blocksConfig.__grid.gridAllowedBlocks,
    '__button',
  ];

  return config;
};

export default applyConfig;
