export const HeadingBlockSchemaEnhancer = ({ schema }) => {
  schema.properties.align = {
    title: 'Align',
    widget: 'align',
    actions: ['left', 'center', 'right'],
    default: 'center',
  };
  schema.fieldsets[0].fields = [...schema.fieldsets[0].fields, ...['align']];
  return schema;
};
