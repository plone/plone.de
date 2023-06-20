import React from 'react';

import { SidebarPortal } from '@plone/volto/components';
import View from './View';

import QuoteSidebar from './Data';

const QuoteBlockEdit = (props) => {
  const { data, block, onChangeBlock, selected } = props;

  return (
    <>
      <View {...props} />
      <SidebarPortal selected={selected}>
        <QuoteSidebar data={data} block={block} onChangeBlock={onChangeBlock} />
      </SidebarPortal>
    </>
  );
};

export default QuoteBlockEdit;
