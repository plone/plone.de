export const HeadingBlockSchemaEnhancer = ({ schema }) => {
  schema.properties.align = {
    title: 'Align',
    widget: 'align',
    actions: ['left', 'center', 'right'],
    default: 'left',
  };
  schema.fieldsets[0].fields = [...schema.fieldsets[0].fields, ...['align']];
  return schema;
};
