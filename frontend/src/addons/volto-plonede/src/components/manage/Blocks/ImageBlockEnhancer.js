import { defineMessages } from 'react-intl';

const messages = defineMessages({
  copyRight: {
    id: 'Copyright',
    defaultMessage: 'Copyright',
  },
});

export const ImageBlockSchemaEnhancer = ({ intl, formData, schema }) => {
  schema.properties.align.default = 'center';
  schema.properties.align.actions = ['left', 'right', 'center', 'wide', 'full'];
  schema.properties.size.default = 'l';
  schema.properties.size.disabled =
    formData.align === 'full' ||
    formData.align === 'wide' ||
    formData.align === 'center';

  schema.properties.copyRight = {
    title: intl.formatMessage(messages.copyRight),
  };

  schema.fieldsets[0].fields = [
    ...schema.fieldsets[0].fields,
    ...['copyRight'],
  ];

  return schema;
};
