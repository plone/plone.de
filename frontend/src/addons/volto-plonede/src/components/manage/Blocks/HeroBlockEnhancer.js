import { defineMessages } from 'react-intl';

const messages = defineMessages({
  backgroundColor: {
    id: 'Backgroundcolor',
    defaultMessage: 'Backgroundcolor',
  },
  buttonText: {
    id: 'Button text',
    defaultMessage: 'Button text',
  },
});

export const HeroBlockSchemaEnhancer = ({ formData, schema, intl }) => {
  schema.properties.align = {
    title: 'Align',
    widget: 'align',
    actions: ['left', 'right'],
  };

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

  schema.fieldsets[0].fields = [...schema.fieldsets[0].fields, 'buttonText'];

  schema.properties.buttonText = {
    title: intl.formatMessage(messages.buttonText),
  };
  schema.fieldsets[0].fields = [
    ...schema.fieldsets[0].fields,
    ...['align', 'backgroundColor'],
  ];
  return schema;
};
