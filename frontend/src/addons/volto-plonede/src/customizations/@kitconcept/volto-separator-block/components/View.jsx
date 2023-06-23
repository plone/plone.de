import React from 'react';
import cx from 'classnames';

const SeparatorView = (props) => {
  //eslint-disable-next-line
  const { className, data } = props;
  return (
    <div className="block separator">
      <div className={cx('inner-separator', className)}>
        <div className="line" />
      </div>
    </div>
  );
};

export default SeparatorView;
