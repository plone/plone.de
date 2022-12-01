import React from 'react';
import { Popup } from 'semantic-ui-react';

const TooltipElement = (props) => {
  const { attributes, children, element } = props;
  const { data = {} } = element;

  return (
    <Popup
      position={data.tooltip_position}
      trigger={
        <span className={'single-tooltip'} {...attributes}>
          {children}
        </span>
      }
    >
      {data.tooltip_text}
    </Popup>
  );
};

export default TooltipElement;
