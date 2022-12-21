import { defineMessages } from 'react-intl';
import { SliderSchema } from '@kitconcept/volto-slider-block/components/schema';

const messages = defineMessages({
  buttonText: {
    id: 'Button text',
    defaultMessage: 'Button text',
  },
});

export const SliderBlockSchemaEnhancer = ({ formData, schema, intl }) => {
  schema.properties.slides.schema.fieldsets[0].fields.push('buttonText');
  schema.properties.slides.schema.properties.buttonText = {
    title: intl.formatMessage(messages.buttonText),
  };
  return SliderSchema({ schema, formData, intl });
};
