export const TeaserBlockSchemaEnhancer = ({ schema }) => {
  schema.properties.align = {
    title: 'Object-fit',
    widget: 'align',
    actions: ['center', 'full'],
    default: 'full',
  };
  schema.fieldsets[0].fields = [...schema.fieldsets[0].fields, ...['align']];
  return schema;
};
