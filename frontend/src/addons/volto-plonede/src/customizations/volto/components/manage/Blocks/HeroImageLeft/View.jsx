/**
 * View image block.
 * @module components/manage/Blocks/Hero/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';
import { useIntl, defineMessages } from 'react-intl';
import { Button } from 'semantic-ui-react';
import cx from 'classnames';

/**
 * View image block class.
 * @class View
 * @extends Component
 */
const messages = defineMessages({
  PleaseChooseContent: {
    id: 'Please choose an existing content as source for this element',
    defaultMessage:
      'Please choose an existing content as source for this element',
  },
  moreInfo: {
    id: 'moreInfo',
    defaultMessage: 'More info',
  },
  source: {
    id: 'Source',
    defaultMessage: 'Source',
  },
  ButtonText: {
    id: 'Continue reading',
    defaultMessage: 'Continue reading',
  },
});

const View = (props) => {
  const { className, data } = props;
  const intl = useIntl();
  const href = data.linkHref?.[0];
  return (
    <div
      className={cx('block hero', className, {
        'align-left': data.align === 'left',
        'align-right': data.align === 'right',
      })}
    >
      <div className="block-inner-wrapper">
        {data.url && (
          <img
            src={`${flattenToAppURL(data.url)}/@@images/image`}
            alt=""
            className="hero-image"
            loading="lazy"
          />
        )}
        <div className="hero-body">
          <div className="hero-text">
            {data.title && <h1>{data.title}</h1>}
            {data.description && <p>{data.description}</p>}
          </div>
          {href && data.showButton && (
            <UniversalLink
              href={href['@id']}
              target={data.openLinkInNewTab ? '_blank' : null}
            >
              <Button className={(cx('button'), data.buttonColor)}>
                {data.buttonText || intl.formatMessage(messages.ButtonText)}
              </Button>
            </UniversalLink>
          )}
        </div>
      </div>
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

export default View;
