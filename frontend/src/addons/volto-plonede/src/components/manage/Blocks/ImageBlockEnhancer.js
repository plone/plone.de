export const ImageBlockSchemaEnhancer = ({ formData, schema }) => {
  schema.properties.align.default = 'center';
  schema.properties.align.actions = ['left', 'right', 'center', 'wide', 'full'];
  schema.properties.size.default = 'l';
  schema.properties.size.disabled =
    formData.align === 'full' ||
    formData.align === 'wide' ||
    formData.align === 'center';

  return schema;
};
