import { defineMessages } from 'react-intl';

const messages = defineMessages({
  buttonColor: {
    id: 'Button color',
    defaultMessage: 'Button color',
  },
  buttonText: {
    id: 'Button text',
    defaultMessage: 'Button text',
  },
  showButton: {
    id: 'Show button',
    defaultMessage: 'Show button',
  },
  flagAlign: {
    id: 'Flag alginment',
    defaultMessage: 'Flag alignment',
  },
});

export const SliderBlockSchemaEnhancer = ({ schema, intl, formData }) => {
  schema.properties.slides.schema.properties.buttonText = {
    title: intl.formatMessage(messages.buttonText),
  };
  schema.properties.slides.schema.properties.flagAlign = {
    widget: 'inner_align',
    title: intl.formatMessage(messages.flagAlign),
    actions: ['left', 'right'],
    default: 'left',
  };
  schema.properties.slides.schema.fieldsets[0].fields = [
    ...schema.properties.slides.schema.fieldsets[0].fields,
    ...['buttonText', 'flagAlign'],
  ];
  //schema.fieldsets[0].fields = [...schema.fieldsets[0].fields, ...];
  return schema;
};
