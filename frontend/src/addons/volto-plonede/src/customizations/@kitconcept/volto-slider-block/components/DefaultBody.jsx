import React from 'react';
import { useIntl, defineMessages } from 'react-intl';
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

  const Image = config.getComponent('Image').component || DefaultImage;

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
        <MaybeWrap
          className={cx('teaser-item top', {
            right: data.flagAlign === 'right',
            left: data.flagAlign === 'left',
          })}
          condition={isEditMode}
          tabIndex="-1"
        >
          <MaybeWrap
            className={cx('teaser-item link', {
              right: data.flagAlign === 'right',
              left: data.flagAlign === 'left',
            })}
            condition={!isEditMode}
            as={UniversalLink}
            href={href['@id']}
            target={data.openLinkInNewTab ? '_blank' : null}
            tabIndex="-1"
          >
            {/* START CUSTOMSTARTIZATION */}
            {(href?.hasPreviewImage || href.image_field || image) && (
              <div className="highlight-image-wrapper gradient">
                <Image
                  item={image || href}
                  imageField={image ? image.image_field : href.image_field}
                  alt=""
                  loading="lazy"
                  responsive={true}
                />
              </div>
            )}
            {/* END CUSTOMIZATION */}
            <div className="teaser-item-title fix-width-issue">
              <div className="title">
                {data?.head_title && (
                  <span className="supertitle">{data?.head_title}</span>
                )}
                <h2>{data?.nav_title || data?.title}</h2>
              </div>
              <div className="body">
                <p>{data?.description}</p>
              </div>
              <Button className="white">
                {data.buttonText || intl.formatMessage(messages.buttonText)}
              </Button>
            </div>
          </MaybeWrap>
        </MaybeWrap>
      )}
    </div>
  );
};

export default SliderBody;
