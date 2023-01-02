import React from 'react';
import PropTypes from 'prop-types';
import { ConditionalLink, Component } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import { format, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';

import { isInternalURL } from '@plone/volto/helpers/Url/Url';

const EventTemplate = ({ items, linkTitle, linkHref, isEditMode }) => {
  let link = null;
  let href = linkHref?.[0]?.['@id'] || '';

  var deLocale = de;

  if (isInternalURL(href)) {
    link = (
      <ConditionalLink to={flattenToAppURL(href)} condition={!isEditMode}>
        {linkTitle || href}
      </ConditionalLink>
    );
  } else if (href) {
    link = <a href={href}>{linkTitle || href}</a>;
  }
  return (
    <>
      <div className="items">
        {items.map((item) => (
          <div className="listing-item" key={item['@id']}>
            <ConditionalLink item={item} condition={!isEditMode}>
              <Component componentName="PreviewImage" item={item} alt="" />
              <div className="listing-body">
                <div className="event-when-where">
                  <div className="dates">
                    {item?.start ? (
                      <span className="day">
                        {format(parseISO(item?.start), 'd. MMMM yyyy', {
                          locale: deLocale,
                        })}
                      </span>
                    ) : (
                      <span className="day">No date</span>
                    )}{' '}
                    &mdash;&nbsp;
                    {item?.end ? (
                      <span className="day">
                        {format(parseISO(item?.end), 'd. MMMM yyyy', {
                          locale: deLocale,
                        })}
                      </span>
                    ) : (
                      <span className="day">No date</span>
                    )}
                  </div>
                  <p>, {item.location}</p>
                </div>
                <h3>{item.title ? item.title : item.id}</h3>
                <p>{item.description}</p>
              </div>
            </ConditionalLink>
          </div>
        ))}
      </div>

      {link && <div className="footer">{link}</div>}
    </>
  );
};

EventTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};

export default EventTemplate;

//item.start && item.end && item.location
