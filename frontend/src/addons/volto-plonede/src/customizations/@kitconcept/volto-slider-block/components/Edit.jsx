import React from 'react';
import { withBlockExtensions } from '@plone/volto/helpers';
import View from './View';
import { SidebarPortal } from '@plone/volto/components';
import Sidebar from '@kitconcept/volto-slider-block/components/Sidebar';
import cx from 'classnames';

const SliderEdit = (props) => {
  const { onChangeBlock, block, selected, data } = props;

  const [slideIndex, setSlideIndex] = React.useState(0);

  return (
    <div
      className={cx('block slider', {
        selected: props.selected,
        alignCenter: props.data.align === 'center',
        'full-width': props.data.align === 'full',
      })}
    >
      <View
        {...props}
        isEditMode
        slideIndex={slideIndex}
        setSlideIndex={setSlideIndex}
      />
      <SidebarPortal selected={selected}>
        <Sidebar
          {...props}
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
          activeObject={slideIndex}
          setActiveObject={setSlideIndex}
        />
      </SidebarPortal>
    </div>
  );
};

export default withBlockExtensions(SliderEdit);
