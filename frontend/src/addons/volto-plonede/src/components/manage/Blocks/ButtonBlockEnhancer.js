import { defineMessages } from 'react-intl';

const messages = defineMessages({
  backgroundColor: {
    id: 'Background color',
    defaultMessage: 'Background color',
  },
  newTab: {
    id: 'Open in new tab',
    defaultMessage: 'Open in new tab',
  },
  outerAlign: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
});
export const ButtonBlockSchemaEnhancer = ({ schema, intl }) => {
  //Color
  const colors = [
    { name: 'white', label: 'White' },
    { name: 'blue', label: 'Blue' },
  ];
  schema.properties.backgroundColor = {
    widget: 'color_picker',
    title: intl.formatMessage(messages.backgroundColor),
    colors,
    default: 'blue',
  };
  schema.properties.outerAlign = {
    widget: 'align',
    title: intl.formatMessage(messages.outerAlign),
    actions: ['center', 'wide'],
    default: 'wide',
  };

  const arr = schema.fieldsets[0].fields;
  arr.splice(2, 0, 'outerAlign');
  arr.push('backgroundColor');
  schema.fieldsets[0].fields = arr;

  return schema;
};
