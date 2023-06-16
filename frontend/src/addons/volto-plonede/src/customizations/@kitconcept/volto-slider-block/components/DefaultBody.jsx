import React from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { getTeaserImageURL } from '@kitconcept/volto-slider-block/helpers';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Icon, MaybeWrap, UniversalLink } from '@plone/volto/components';
import { Input, Button, Message } from 'semantic-ui-react';
import cx from 'classnames';
import navTreeSVG from '@plone/volto/icons/nav.svg';
import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import config from '@plone/volto/registry';

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
  buttonText: {
    id: 'Continue reading',
    defaultMessage: 'Continue reading',
  },
  buttonColor: {
    id: 'Button color',
    defaultMessage: 'Button color',
  },
});

const DefaultImage = (props) => <img {...props} alt={props.alt || ''} />;

const SliderBody = ({
  index,
  onChangeBlock,
  block,
  data,
  dataBlock,
  isEditMode,
  openObjectBrowser,
}) => {
  const intl = useIntl();
  const href = data.href?.[0];
  const image = data.preview_image?.[0];

  const hasImageComponent = config.getComponent('Image').component;
  const Image = config.getComponent('Image').component || DefaultImage;
  const defaultImageSrc =
    href && flattenToAppURL(getTeaserImageURL({ href, image }));

  const handleClick = () => {
    openObjectBrowser({
      onSelectItem: (url, document) => {
        dataBlock.slides[index].title = document.Title;
        dataBlock.slides[index].description = document.Description;
        dataBlock.slides[index].href = [
          {
            '@id': document['@id'],
            Title: document.Title,
            Description: document.Description,
            title: document.Title,
            image_field: document.image_field,
            hasPreviewImage: document.hasPreviewImage,
          },
        ];
        onChangeBlock(block, dataBlock);
      },
      mode: 'link',
    });
  };

  return (
    <div
      className={cx('grid-teaser-item top', {
        'empty-slide': !href && isEditMode,
      })}
    >
      {!href && isEditMode && (
        <Message>
          <div className="grid-teaser-item default">
            <img src={imageBlockSVG} alt="" />
            <p>{intl.formatMessage(messages.PleaseChooseContent)}</p>
            <div className="toolbar-inner">
              <Button.Group>
                <Button onClick={handleClick} icon basic>
                  <Icon name={navTreeSVG} size="24px" />
                </Button>
              </Button.Group>
              <Input
                placeholder={`${intl.formatMessage(messages.source)}...`}
                onClick={handleClick}
                onFocus={(e) => e.target.blur()}
              />
            </div>
          </div>
        </Message>
      )}
      {href && (
        <div className="teaser-item top">
          {(href?.hasPreviewImage || image) && (
            <div className="highlight-image-wrapper gradient">
              <Image
                src={hasImageComponent ? href : defaultImageSrc}
                alt=""
                loading="lazy"
              />
            </div>
          )}
          <div
            className={cx('teaser-item-title fix-width-issue', {
              'align-right': data.flagAlign === 'right',
              'align-left': data.flagAlign === 'left',
            })}
          >
            <div className="title">
              {data?.head_title && (
                <span className="supertitle">{data?.head_title}</span>
              )}
              <h2>{data?.nav_title || data?.title}</h2>
            </div>
            <div className="body">
              <p>{data?.description}</p>
            </div>
            <div className="button">
              <UniversalLink
                href={href['@id']}
                target={data.openLinkInNewTab ? '_blank' : null}
              >
                <Button className="white">
                  {data.buttonText || intl.formatMessage(messages.buttonText)}
                </Button>
              </UniversalLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SliderBody;
