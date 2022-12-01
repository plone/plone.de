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

export const ButtonBlockSchemaEnhancer = ({ formData, schema, intl }) => {
  const colors = [
    { name: 'transparent', label: 'Transparent' },
    { name: 'grey', label: 'Grey' },
    { name: 'plone-blue', label: 'Plone-blue' },
  ];
  schema.properties.backgroundColor = {
    widget: 'color_picker',
    title: intl.formatMessage(messages.backgroundColor),
    colors,
    default: 'grey',
  };
  schema.fieldsets[0].fields = [
    ...schema.fieldsets[0].fields,
    ...['backgroundColor'],
  ];
  return schema;
};
