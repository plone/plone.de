import {
  HeroBlockSchemaEnhancer,
  ButtonBlockSchemaEnhancer,
} from 'volto-plonede/components';
import installTooltipPlugin from '../../../editor/plugins/TooltipPlugin';
import { TOOLTIP } from '../../../editor/plugins/TooltipPlugin/constants';

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
  // config.settings.slate.toolbarButtons = [
  //   ...(config.settings.slate.toolbarButtons || []),
  //   TOOLTIP,
  // ];
  // config.settings.slate.expandedToolbarButtons = [
  //   ...(config.settings.slate.expandedToolbarButtons || []),
  //   TOOLTIP,
  // ];
  // config = installTooltipPlugin(config);
  return config;
};

export default applyConfig;
