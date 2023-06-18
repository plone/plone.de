/**
 * View image block.
 * @module components/manage/Blocks/Image/View
 */

import PropTypes from 'prop-types';
import { UniversalLink } from '@plone/volto/components';
import cx from 'classnames';
import { withBlockExtensions } from '@plone/volto/helpers';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';

/**
 * View image block class.
 * @class View
 * @extends Component
 */
export const View = ({ data, detached }) => {
  const href = data?.href?.[0]?.['@id'] || '';

  const creditHref = data?.linkTo?.[0]?.['@id'] || '';

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
                          return `${flattenToAppURL(data.url)}/@@images/image`;
                        })()
                      : data.url
                  }
                  alt={data.alt || ''}
                  loading="lazy"
                />
                <figcaption className="figure-caption">
                  <div className="title">{data.title}</div>
                  {(() => {
                    if (creditHref) {
                      return (
                        <div className="credits">
                          Credit:{' '}
                          <UniversalLink href={creditHref}>
                            {data.credits}
                          </UniversalLink>
                        </div>
                      );
                    } else {
                      return (
                        <div className="credits">
                          Credit: <div>{data.credits}</div>
                        </div>
                      );
                    }
                  })()}
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
