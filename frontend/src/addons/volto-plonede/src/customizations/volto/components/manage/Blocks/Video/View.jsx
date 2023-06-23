/**
 * View video block.
 * @module components/manage/Blocks/Video/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import Body from '@plone/volto/components/manage/Blocks/Video/Body';
import { withBlockExtensions } from '@plone/volto/helpers';
import cx from 'classnames';
import { useIntl, defineMessages } from 'react-intl';
import { UniversalLink } from '@plone/volto/components';

const messages = defineMessages({
  defaultCredits: {
    id: '© Plone Foundation',
    defaultMessage: '© Plone Foundation',
  },
});

/**
 * View video block class.
 * @class View
 * @extends Component
 */
const View = (props) => {
  const { data, className } = props;
  const intl = useIntl();

  return (
    <div
      className={cx(
        'block video align',
        {
          center: !Boolean(data.align),
        },
        data.align,
        className,
      )}
    >
      <figure className="video-inner">
        <Body data={data} />
        <figcaption className="figure-caption">
          <div className="title">{data.title}</div>
          <div className="credits">
            Credit:{' '}
            <UniversalLink href={data.creditHref || '/imprint'}>
              {data.credits || intl.formatMessage(messages.defaultCredits)}
            </UniversalLink>
          </div>
        </figcaption>
      </figure>
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
