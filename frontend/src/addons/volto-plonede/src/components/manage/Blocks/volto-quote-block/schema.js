import { defineMessages } from 'react-intl';

const messages = defineMessages({
  quote: {
    id: 'Quote',
    defaultMessage: 'Quote',
  },
  image: {
    id: 'Image',
    defaultMessage: 'Image',
  },
  quoteText: {
    id: 'Quote-text',
    defaultMessage: 'Quote-text',
  },
  quotedPerson: {
    id: 'Quoted person',
    defaultMessage: 'Quoted person',
  },
  name: {
    id: 'Name',
    defaultMessage: 'Name',
  },
  position: {
    id: 'Position',
    defaultMessage: 'Position',
  },
  backgroundColor: {
    id: 'Background color',
    defaultMessage: 'Background color',
  },
  imageAlignment: {
    id: 'Image Alignment',
    defaultMessage: 'Image Alignment',
  },
});
export const Schema = (props) => {
  const { intl } = props;
  const colors = [
    { name: 'white', label: 'White' },
    { name: 'lightGrey', label: 'Light grey' },
  ];
  return {
    block: intl.formatMessage(messages.quote),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['image', 'text', 'backgroundColor', 'align'],
      },
      {
        id: 'person',
        title: intl.formatMessage(messages.quotedPerson),
        fields: ['person', 'position'],
      },
    ],
    properties: {
      image: {
        title: intl.formatMessage(messages.image),
        widget: 'object_browser',
        mode: 'image',
        selectedItemAttrs: [],
      },
      text: {
        title: intl.formatMessage(messages.quoteText),
        widget: 'textarea',
      },
      person: { title: intl.formatMessage(messages.name) },
      position: { title: intl.formatMessage(messages.position) },
      backgroundColor: {
        title: intl.formatMessage(messages.backgroundColor),
        widget: 'color_picker',
        colors,
        default: 'lightGrey',
      },
      align: {
        title: intl.formatMessage(messages.imageAlignment),
        widget: 'quoteAlign',
      },
    },
    required: [],
  };
};
