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
    id: 'Background color',
    defaultMessage: 'Background color',
  },
  showButton: {
    id: 'Show button',
    defineMessage: 'Show button',
  },
  buttonSettings: {
    id: 'Button settings',
    defineMessage: 'Button settings',
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

  schema.fieldsets[0].fields = ['align'];

  schema.fieldsets = [
    ...schema.fieldsets,
    {
      id: 'button settings',
      title: intl.formatMessage(messages.buttonSettings),
      fields: [
        ...(formData.showButton
          ? ['showButton', 'linkHref', 'buttonText', 'buttonColor']
          : ['showButton']),
      ],
    },
  ];

  return schema;
};
