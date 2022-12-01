// import { defineMessages } from 'react-intl';
// import { makeInlineElementPlugin } from '@plone/volto-slate/elementEditor';
// import TooltipElement from './TooltipElement';
// import { TooltipEditorSchema } from './schema';
// import { TOOLTIP } from './constants';
// import { withTooltip } from './extensions';
// import tooltipSVG from '@plone/volto/icons/help.svg';

// // import './tooltip.less';

// const messages = defineMessages({
//   edit: {
//     id: 'Edit tooltip',
//     defaultMessage: 'Edit tooltip',
//   },
//   delete: {
//     id: 'Remove tooltip',
//     defaultMessage: 'Remove tooltip',
//   },
// });

// export default function installTooltipPlugin(config) {
//   const opts = {
//     title: 'Tooltip',
//     pluginId: TOOLTIP,
//     elementType: TOOLTIP,
//     element: TooltipElement,
//     isInlineElement: true,
//     editSchema: TooltipEditorSchema,
//     extensions: [withTooltip],
//     hasValue: (formData) => !!formData,
//     toolbarButtonIcon: tooltipSVG,
//     messages,
//   };
//   const [installEditor] = makeInlineElementPlugin(opts);
//   config = installEditor(config);
//   return config;
// }
