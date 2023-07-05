import {
  ButtonBlockSchemaEnhancer,
  DefaultStylingSchemaEnhancer,
  HeadingBlockSchemaEnhancer,
  HeroBlockSchemaEnhancer,
  ImageBlockSchemaEnhancer,
  ListingBlockSchemaEnhancer,
  SliderBlockSchemaEnhancer,
  TeaserBlockSchemaEnhancer,
  VideoBlockSchemaEnhancer,
  EventTemplate,
} from 'volto-plonede/components';
import { defineMessages } from 'react-intl';
import { composeSchema, getPreviousNextBlock } from '@plone/volto/helpers';
import { SeparatorStyleEnhancer } from '@kitconcept/volto-separator-block/components/schema.js';
import { gridTeaserDisableStylingSchema } from '@kitconcept/volto-blocks-grid/components/Teaser/schema';
import cx from 'classnames';

/* Quote  Block */
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

  /* Button  Block */
  config.blocks.blocksConfig.__button = {
    ...config.blocks.blocksConfig.__button,
    schemaEnhancer: composeSchema(
      ButtonBlockSchemaEnhancer,
      DefaultStylingSchemaEnhancer,
    ),
  };

  /* Image  Block */
  config.blocks.blocksConfig.image = {
    ...config.blocks.blocksConfig.image,
    schemaEnhancer: composeSchema(
      ImageBlockSchemaEnhancer,
      DefaultStylingSchemaEnhancer,
    ),
  };

  /* Separator  Block */
  config.blocks.blocksConfig.separator = {
    ...config.blocks.blocksConfig.separator,
    schemaEnhancer: composeSchema(
      DefaultStylingSchemaEnhancer,
      SeparatorStyleEnhancer,
    ),
  };

  /* Heading  Block */
  config.blocks.blocksConfig.heading = {
    ...config.blocks.blocksConfig.heading,
    schemaEnhancer: composeSchema(
      HeadingBlockSchemaEnhancer,
      DefaultStylingSchemaEnhancer,
    ),
  };

  /* Hero  Block */
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

  /* Listing  Block */
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

  /* Quote  Block */
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

  /* Slider  Block */
  config.blocks.blocksConfig.slider = {
    ...config.blocks.blocksConfig.slider,
    schemaEnhancer: composeSchema(
      SliderBlockSchemaEnhancer,
      DefaultStylingSchemaEnhancer,
    ),
  };

  /* Teaser/Image  Grid  Block */
  config.blocks.blocksConfig.teaserGrid = {
    ...config.blocks.blocksConfig.teaserGrid,
    schemaEnhancer: DefaultStylingSchemaEnhancer,
  };

  config.blocks.blocksConfig.imagesGrid = {
    ...config.blocks.blocksConfig.imagesGrid,
    schemaEnhancer: DefaultStylingSchemaEnhancer,
  };

  const EnhancedSlateViewComponent = config.blocks.blocksConfig.slate.view;
  config.blocks.blocksConfig.__grid = {
    ...config.blocks.blocksConfig.__grid,
    schemaEnhancer: DefaultStylingSchemaEnhancer,
    blocksConfig: {
      ...config.blocks.blocksConfig,
      slate: {
        ...config.blocks.blocksConfig.slate,
        // Slate in grids must have an extra wrapper with the `slate` className
        view: (props) => {
          return (
            <div className="block slate">
              <EnhancedSlateViewComponent {...props} />
            </div>
          );
        },
      },
      teaser: {
        ...config.blocks.blocksConfig.teaser,
        schemaEnhancer: composeSchema(
          gridTeaserDisableStylingSchema,
          TeaserBlockSchemaEnhancer,
          DefaultStylingSchemaEnhancer,
        ),
      },
    },
  };

  /* Video  Block */
  config.blocks.blocksConfig.video = {
    ...config.blocks.blocksConfig.video,
    schemaEnhancer: composeSchema(
      VideoBlockSchemaEnhancer,
      DefaultStylingSchemaEnhancer,
    ),
  };

  config.blocks.blocksConfig.introduction = {
    ...config.blocks.blocksConfig.introduction,
    schemaEnhancer: composeSchema(DefaultStylingSchemaEnhancer),
  };

  /* Slate  Block */
  config.blocks.blocksConfig.slate = {
    ...config.blocks.blocksConfig.slate,
    schemaEnhancer: composeSchema(DefaultStylingSchemaEnhancer),
    // Slate in grids must have an extra wrapper with the `slate` className
    view: (props) => {
      const { className } = props;
      return (
        <div className={cx('block slate', className)}>
          <EnhancedSlateViewComponent {...props} />
        </div>
      );
    },
  };

  // Register custom StyleWrapper ClassNames
  config.settings.styleClassNameExtenders = [
    ({ block, content, data, classNames }) => {
      let styles = [];
      const [previousBlock, nextBlock] = getPreviousNextBlock({
        content,
        block,
      });

      // Inject a class depending of which type is the next block
      if (nextBlock?.['@type']) {
        styles.push(`next--is--${nextBlock['@type']}`);
      }

      // Inject a class depending if previous is the same type of block
      if (data?.['@type'] === previousBlock?.['@type']) {
        styles.push('previous--is--same--block-type');
      }

      // Inject a class depending if next is the same type of block
      if (data?.['@type'] === nextBlock?.['@type']) {
        styles.push('next--is--same--block-type');
      }

      // Inject a class depending if it's the first of block type
      if (data?.['@type'] !== previousBlock?.['@type']) {
        styles.push('is--first--of--block-type');
      }

      // Inject a class depending if it's the last of block type
      if (data?.['@type'] !== nextBlock?.['@type']) {
        styles.push('is--last--of--block-type');
      }

      // Given a StyleWrapper defined `backgroundColor` style
      const previousColor =
        previousBlock?.styles?.backgroundColor ?? 'transparent';
      const currentColor = data?.styles?.backgroundColor ?? 'transparent';
      const nextColor = nextBlock?.styles?.backgroundColor ?? 'transparent';

      // Inject a class depending if the previous block has the same `backgroundColor`
      if (currentColor === previousColor) {
        styles.push('previous--has--same--backgroundColor');
      } else if (currentColor !== previousColor) {
        styles.push('previous--has--different--backgroundColor');
      }

      // Inject a class depending if the next block has the same `backgroundColor`
      if (currentColor === nextColor) {
        styles.push('next--has--same--backgroundColor');
      } else if (currentColor !== nextColor) {
        styles.push('next--has--different--backgroundColor');
      }

      return [...classNames, ...styles];
    },
  ];

  config.settings.DSGVOBanner.modules = ['youtube', 'google'];

  delete config.blocks.blocksConfig.text;
  config.blocks.blocksConfig.__grid.gridAllowedBlocks = [
    ...config.blocks.blocksConfig.__grid.gridAllowedBlocks,
    '__button',
    'quote',
  ];

  return config;
};

export default applyConfig;
