/* eslint-disable import/no-unresolved */
import React from 'react';
import { Button, Message } from 'semantic-ui-react';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { showDSGVOBanner } from '@kitconcept/volto-dsgvo-banner/actions';

const IfConfirm = ({ children, module, showDSGVOBanner }) => {
  const [cookies] = useCookies();

  // We bail out if module is undefined, while this is most likely
  // a bug in the caller, there is nothing we can do here,
  // but we want to avoid a traceback.
  // See https://gitlab.dlr.de/internet-cms/cms-plone/dlr-internet/-/issues/1384
  if (!module || !!Number(cookies[`confirm_${module?.cookie}`])) {
    return <>{children}</>;
  } else {
    return (
      <div className="block">
        <Message>
          <div>
            <FormattedMessage
              id="You can not view this content at this moment because you have selected to disable {module} cookies in the privacy settings."
              defaultMessage="You can not view this content at this moment because you have selected to disable {module} cookies in the privacy settings."
              values={{
                module: <b>{module}</b>,
              }}
            />{' '}
            <Button onClick={showDSGVOBanner}>
              <FormattedMessage
                id="Enable {module} cookies"
                defaultMessage="Enable {module} cookies"
                values={{
                  module: <b>{module}</b>,
                }}
              />
            </Button>
            <FormattedMessage id=", or " defaultMessage=", or " />
            <Button onClick={showDSGVOBanner}>
              <FormattedMessage
                id="Customize your Privacy Settings"
                defaultMessage="Customize your Privacy Settings"
              />
            </Button>
          </div>
        </Message>
      </div>
    );
  }
};

export default connect((state, props) => ({}), {
  showDSGVOBanner,
})(IfConfirm);
