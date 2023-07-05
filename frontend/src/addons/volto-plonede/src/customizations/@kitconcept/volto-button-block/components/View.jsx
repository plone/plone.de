import React from 'react';
import { Button } from 'semantic-ui-react';
import cx from 'classnames';
import { ConditionalLink } from '@plone/volto/components';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  ButtonText: {
    id: 'Button text',
    defaultMessage: 'Button text',
  },
});

const View = (props) => {
  const { className, data, isEditMode } = props;
  const [hasLink, setHasLink] = React.useState(false);
  const intl = useIntl();

  React.useEffect(() => {
    if (data.href) {
      if (data.href && data.href.length > 0) {
        setHasLink(true);
      }
      if (data.href.length === 0) {
        setHasLink(false);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.href]);

  const link = hasLink ? (
    data.href.length > 0 && isInternalURL(data.href[0]['@id']) ? (
      <ConditionalLink
        to={data.href.length > 0 ? flattenToAppURL(data.href[0]['@id']) : ''}
        condition={!isEditMode}
      >
        <Button className={(cx('__button'), data.backgroundColor)}>
          {data.title || intl.formatMessage(messages.ButtonText)}
        </Button>
      </ConditionalLink>
    ) : (
      data.href.length > 0 && (
        <a
          href={flattenToAppURL(data.href[0]['@id'])}
          target="_blank"
          rel="noreferrer"
        >
          <Button className={(cx('__button'), data.backgroundColor)}>
            {data.title || intl.formatMessage(messages.ButtonText)}
          </Button>
        </a>
      )
    )
  ) : (
    <Button className={(cx('noLink'), data.backgroundColor)}>
      {data.title || intl.formatMessage(messages.ButtonText)}
    </Button>
  );

  return (
    <div
      className={cx(
        'block __button',
        `has--align--${data.outerAlign}`,
        data.newTab,
        className,
      )}
    >
      <div className="button container">
        <div className={cx(`align-${data?.inneralign}`)}>{link}</div>
      </div>
    </div>
  );
};

export default View;
