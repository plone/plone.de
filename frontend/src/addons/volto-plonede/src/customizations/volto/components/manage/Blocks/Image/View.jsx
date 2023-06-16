/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/**
 * View image block.
 * @module components/manage/Blocks/Image/View
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { UniversalLink } from '@plone/volto/components';
import cx from 'classnames';
import { withBlockExtensions } from '@plone/volto/helpers';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';
import { useIntl, defineMessages } from 'react-intl';
//import { CopyRightSVG } from './copyright-symbol.svg';

const messages = defineMessages({
  copyRight: {
    id: 'Copyright',
    defaultMessage: 'Copyright',
  },
});

/**
 * View image block class.
 * @class View
 * @extends Component
 */
export const View = ({ data, detached }) => {
  const href = data?.href?.[0]?.['@id'] || '';
  const intl = useIntl();

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div
      className={cx(
        'block image align',
        {
          center: !Boolean(data.align),
          detached,
        },
        data.align,
      )}
    >
      {data.url && (
        <>
          {(() => {
            const image = (
              <figure
                className={cx('figure stage-figure', {
                  large: data.size === 'l',
                  medium: data.size === 'm',
                  small: data.size === 's',
                })}
              >
                <div className="figure-media">
                  <img
                    src={
                      isInternalURL(data.url)
                        ? // Backwards compat in the case that the block is storing the full server URL
                          (() => {
                            if (data.size === 'l')
                              return `${flattenToAppURL(
                                data.url,
                              )}/@@images/image`;
                            if (data.size === 'm')
                              return `${flattenToAppURL(
                                data.url,
                              )}/@@images/image/preview`;
                            if (data.size === 's')
                              return `${flattenToAppURL(
                                data.url,
                              )}/@@images/image/mini`;
                            return `${flattenToAppURL(
                              data.url,
                            )}/@@images/image`;
                          })()
                        : data.url
                    }
                    alt={data.alt || ''}
                    loading="lazy"
                  />
                </div>
                <figcaption className="figure-caption">
                  <button
                    className="figure-copyright"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  ></button>
                  {isHovering && (
                    <div className="copyright-popup">
                      {data.copyRight || intl.formatMessage(messages.copyRight)}
                    </div>
                  )}
                </figcaption>
              </figure>
            );
            if (href) {
              return (
                <UniversalLink
                  href={href}
                  openLinkInNewTab={data.openLinkInNewTab}
                >
                  {image}
                </UniversalLink>
              );
            } else {
              return image;
            }
          })()}
        </>
      )}
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withBlockExtensions(View);
