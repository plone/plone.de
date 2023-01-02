import { defineMessages } from 'react-intl';

const messages = defineMessages({
  buttonText: {
    id: 'Button text',
    defaultMessage: 'Button text',
  },
});

export const SliderBlockSchemaEnhancer = ({ schema, intl }) => {
  schema.properties.slides.schema.fieldsets[0].fields = [
    ...schema.properties.slides.schema.fieldsets[0].fields,
    'buttonText',
  ];
  schema.properties.slides.schema.properties.buttonText = {
    title: intl.formatMessage(messages.buttonText),
  };
  schema.properties.align = {
    title: 'Align',
    widget: 'align',
    actions: ['center', 'full'],
    default: 'center',
  };
  schema.fieldsets[0].fields = [...schema.fieldsets[0].fields, ...['align']];
  return schema;
};
