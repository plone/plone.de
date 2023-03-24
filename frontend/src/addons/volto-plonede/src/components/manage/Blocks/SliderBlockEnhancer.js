import { defineMessages } from 'react-intl';

const messages = defineMessages({
  //Button
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
});

export const SliderBlockSchemaEnhancer = ({ schema, intl, formData }) => {
  //Slides
  //Button
  const buttonColors = [
    { name: 'white', label: 'White' },
    { name: 'blue', label: 'Blue' },
  ];
  schema.properties.slides.schema.properties.buttonColor = {
    widget: 'color_picker',
    title: intl.formatMessage(messages.buttonColor),
    colors: buttonColors,
    default: 'blue',
  };
  schema.properties.slides.schema.properties.buttonText = {
    title: intl.formatMessage(messages.buttonText),
  };
  schema.properties.slides.schema.fieldsets[0].fields = [
    ...schema.properties.slides.schema.fieldsets[0].fields,
    ...['buttonText', 'buttonColor'],
  ];

  //Slider
  //Alignment
  schema.properties.align = {
    title: 'Align',
    widget: 'align',
    actions: ['center', 'full'],
    default: 'center',
  };
  schema.fieldsets[0].fields = [...schema.fieldsets[0].fields, ...['align']];

  return schema;
};
