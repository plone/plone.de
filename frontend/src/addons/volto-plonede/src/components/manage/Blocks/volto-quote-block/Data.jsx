import React from 'react';
import { BlockDataForm } from '@plone/volto/components';

import { Schema } from './schema';
import { useIntl, defineMessages } from 'react-intl';

const messages = defineMessages({
  Quote: {
    id: 'Quote',
    defaultMessage: 'Quote',
  },
});

const QuoteBlockData = (props) => {
  const { data, block, onChangeBlock } = props;

  const intl = useIntl();

  React.useEffect(() => {
    onChangeBlock(block, {
      ...data,
      backgroundColor: data.backgroundColor || '#d5dde2',
      person: data.person,
      position: data.position,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <BlockDataForm
      schema={Schema({ ...props, intl })}
      title={intl.formatMessage(messages.Quote)}
      onChangeField={(id, value) => {
        onChangeBlock(block, {
          ...data,
          [id]: value,
        });
      }}
      formData={data}
      fieldIndex={data.index}
      basic
      unwrapped
      block={block}
    />
  );
};

export default QuoteBlockData;
