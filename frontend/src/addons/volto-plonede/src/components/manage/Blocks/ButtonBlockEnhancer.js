import { defineMessages } from 'react-intl';

const messages = defineMessages({
  backgroundColor: {
    id: 'Backgroundcolor',
    defaultMessage: 'Backgroundcolor',
  },
  newTab: {
    id: 'Open in new tab',
    defaultMessage: 'Open in new tab',
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
  schema.fieldsets[0].fields = [
    ...schema.fieldsets[0].fields,
    ...['backgroundColor'],
  ];

  return schema;
};
