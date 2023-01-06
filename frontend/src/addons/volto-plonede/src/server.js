import express from 'express';
import { run } from 'node-jq';
import { fromPairs, isEmpty, map } from 'lodash';
import { getContent } from '@plone/volto/actions';
import config from '@plone/volto/registry';

function sortByArray(blocks, blocks_layout) {
  return fromPairs(map(blocks_layout.items, (key) => [key, blocks[key]]));
}

function jsonExporter(req, res, next) {
  const { store } = res.locals;
  res.set(
    'Content-Disposition',
    `attachment;filename="${req.path
      .replace('/export', '')
      .replace(/\//g, '.')}.json"`,
  );
  res.set('Content-Type', 'application/json');

  store
    .dispatch(getContent(req.path.replace('/export', '')))
    .then((content) => {
      return new Promise(function (resolve, reject) {
        if (content.blocks) {
          resolve(content);
        } else {
          content.blocks = {};
          content.blocks_layout = [];
          resolve(content);
        }
      });
    })
    .then((content) => {
      return run(
        `. | .blocks[].columns[]?.href[]?."@id"? |= sub("${config.settings.apiPath}";"")`,
        content,
        {
          input: 'json',
          output: 'json',
        },
      );
    })
    .then((content) => {
      return run(
        `(.. | .href? | strings) |= sub("${config.settings.apiPath}";"")`,
        content,
        {
          input: 'json',
          output: 'json',
        },
      );
    })
    .then((content) => {
      return run(
        `(.. | .href? | arrays | .[]."@id") |= sub("${config.settings.apiPath}";"")`,
        content,
        {
          input: 'json',
          output: 'json',
        },
      );
    })
    .then((content) => {
      return run(
        `(.. | .preview_image? | arrays | .[]."@id") |= sub("${config.settings.apiPath}";"")`,
        content,
        {
          input: 'json',
          output: 'json',
        },
      );
    })
    .then((content) => {
      return run(
        `(.. | .url? | arrays | .[]."@id") |= sub("${config.settings.apiPath}";"")`,
        content,
        {
          input: 'json',
          output: 'json',
        },
      );
    })
    .then((content) => {
      return run(
        `(.. | .url? | strings) |= sub("${config.settings.apiPath}";"")`,
        content,
        {
          input: 'json',
          output: 'json',
        },
      );
    })
    .then((content) => {
      return run(
        `(. | .preview_image_link? | ."@id" | strings) |= sub("${config.settings.apiPath}";"")`,
        content,
        {
          input: 'json',
          output: 'json',
        },
      );
    })
    .then((content) => {
      return run(`del(.. | .image_scales?)`, content, {
        input: 'json',
        output: 'json',
      });
    })
    .then((content) => {
      return new Promise(function (resolve, reject) {
        if (isEmpty(content.blocks)) {
          delete content.blocks;
          delete content.blocks_layout;
          resolve(content);
        } else {
          resolve(content);
        }
      });
    })
    .then((content) => {
      const {
        blocks,
        blocks_layout,
        id,
        title,
        description,
        review_state,
        text,
        subjects,
        show_navigation_portlet,
        preview_image_link,
      } = content;

      res.send(
        JSON.stringify(
          {
            '@type': content['@type'],
            id,
            title,
            description,
            review_state,
            ...(preview_image_link && {
              preview_image_link: preview_image_link['@id'],
            }),
            ...(text && { text }),
            ...(show_navigation_portlet && { show_navigation_portlet }),
            subjects,
            blocks: sortByArray(blocks, blocks_layout),
            blocks_layout,
          },
          null,
          2,
        ),
      );
    })
    .catch((error) => console.log(error));
}

function jsonExporterMiddleware() {
  const middleware = express.Router();

  middleware.all(['**/export', '/export'], jsonExporter);
  middleware.id = 'jsonExport';
  return middleware;
}

export default [jsonExporterMiddleware()];
