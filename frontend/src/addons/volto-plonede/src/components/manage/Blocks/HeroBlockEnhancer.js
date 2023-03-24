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

  //Backgroundcolor
  backgroundColor: {
    id: 'Backgroundcolor',
    defaultMessage: 'Backgroundcolor',
  },
  showButton: {
    id: 'Show Button',
    defineMessage: 'Show Button',
  },
});

export const HeroBlockSchemaEnhancer = ({ schema, formData, intl }) => {
  //Alignment
  schema.properties.align = {
    title: 'Align',
    widget: 'align',
    actions: ['left', 'right'],
    default: 'left',
  };

  //Backgroundcolor
  const backgroundColors = [
    { name: 'transparent', label: 'Transparent' },
    { name: 'grey', label: 'Grey' },
    { name: 'plone-blue', label: 'Plone-blue' },
  ];
  schema.properties.backgroundColor = {
    widget: 'color_picker',
    title: intl.formatMessage(messages.backgroundColor),
    colors: backgroundColors,
    default: 'grey',
  };

  //Button
  schema.properties.showButton = {
    type: 'boolean',
    default: false,
    title: intl.formatMessage(messages.showButton),
  };

  const buttonColors = [
    { name: 'white', label: 'White' },
    { name: 'blue', label: 'Blue' },
  ];
  schema.properties.buttonColor = {
    widget: 'color_picker',
    title: intl.formatMessage(messages.buttonColor),
    colors: buttonColors,
    default: 'blue',
  };
  schema.properties.buttonText = {
    title: intl.formatMessage(messages.buttonText),
  };

  schema.fieldsets[0].fields = ['align', 'backgroundColor'];

  schema.fieldsets = [
    ...schema.fieldsets,
    {
      id: 'button',
      title: 'button',
      fields: [
        ...(formData.showButton
          ? ['showButton', 'linkHref', 'buttonText', 'buttonColor']
          : ['showButton']),
      ],
    },
  ];

  return schema;
};
