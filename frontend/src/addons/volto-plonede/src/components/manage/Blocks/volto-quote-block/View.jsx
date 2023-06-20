import React from 'react';
import cx from 'classnames';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Container } from 'semantic-ui-react';
import QuoteImage from './quote.png';
import QuoteImageGrey from './quote-grey.png';

const QuoteBlockView = (props) => {
  const { data } = props;
  return (
    <>
      {data && (
        <div
          className={cx('block quote', data.backgroundColor, {
            'no-image': !data.image,
            'align-left': data.align === 'left',
          })}
        >
          <Container>
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
            <div className="quotation">
              <p className="quote-text">
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
              </p>
              <p className="author">
                <span className="person">{data.person}</span>
                {data.position && ', '}
                {data.position}
              </p>
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default QuoteBlockView;
