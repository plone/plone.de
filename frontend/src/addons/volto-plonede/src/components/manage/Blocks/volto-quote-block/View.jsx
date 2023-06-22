import React from 'react';
import cx from 'classnames';
import { flattenToAppURL } from '@plone/volto/helpers';
import QuoteImage from './quote.png';
import QuoteImageGrey from './quote-grey.png';
// import quoteSVG from '@plone/volto/icons/quote.svg';
// import { Icon } from '@plone/volto/components';

const QuoteBlockView = (props) => {
  const { data } = props;
  return (
    <>
      {data && (
        <div
          className={cx('block quote', data.backgroundColor, {
            'no-image': !data.image?.length > 0,
            // The image is returned in an array (empty array = true)
            // so we are checking the length of the array to set the 'no-image'
            // class when the array is empty.
            'align-left': data.align === 'left',
          })}
        >
          <div className="inner-wrapper">
            {data?.image?.[0] && (
              <div className="quote-image-wrapper">
                <img
                  src={`${flattenToAppURL(
                    data.image[0]['@id'],
                  )}/@@images/image/preview`}
                  alt=""
                  width="150"
                  height="150"
                  loading="lazy"
                  className="quote-image"
                />
              </div>
            )}
            <figure className="quotation">
              <blockquote className="quote-text">
                {data.align !== 'left' && (
                  <img
                    className="quotation-mark"
                    src={
                      data.backgroundColor === 'lightGrey'
                        ? QuoteImage
                        : QuoteImageGrey
                    }
                    alt=""
                    width="79"
                    height="70"
                    loading="lazy"
                  />
                )}
                {data.align === 'left' ? '„' : null}
                {data.text}“
              </blockquote>
              <figcaption className="author">
                <span className="person">
                  {'- '}
                  {data.person}
                </span>
                {data.position && ', '}
                {data.position}
              </figcaption>
            </figure>
          </div>
        </div>
      )}
    </>
  );
};

export default QuoteBlockView;
