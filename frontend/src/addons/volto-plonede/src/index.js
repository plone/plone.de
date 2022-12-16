import {
  HeroBlockSchemaEnhancer,
  ButtonBlockSchemaEnhancer,
} from 'volto-plonede/components';
import { defineMessages } from 'react-intl';

defineMessages({ Imprint: { id: 'Imprint', defaultMessage: 'Imprint' } });

const applyConfig = (config) => {
  config.settings = {
    ...config.settings,
    supportedLanguages: ['de', 'en'],
    defaultLanguage: 'de',
  };

  config.blocks.blocksConfig.hero = {
    ...config.blocks.blocksConfig.hero,
    schemaEnhancer: HeroBlockSchemaEnhancer,
  };

  config.blocks.blocksConfig.__button = {
    ...config.blocks.blocksConfig.__button,
    schemaEnhancer: ButtonBlockSchemaEnhancer,
  };

  config.blocks.requiredBlocks = [];
  config.settings = {
    ...config.settings,
    isMultilingual: false,
    supportedLanguages: ['de'],
    defaultLanguage: 'de',
  };

  delete config.blocks.blocksConfig.text;
  config.blocks.blocksConfig.__grid.gridAllowedBlocks = [
    ...config.blocks.blocksConfig.__grid.gridAllowedBlocks,
    '__button',
  ];
  return config;
};

export default applyConfig;
