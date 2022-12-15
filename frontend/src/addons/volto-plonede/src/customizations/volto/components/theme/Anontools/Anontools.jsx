/**
 * Anontools component.
 * @module components/theme/Anontools/Anontools
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';

/**
 * Anontools container class.
 */
export class Anontools extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    token: PropTypes.string,
    content: PropTypes.shape({
      '@id': PropTypes.string,
    }),
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    token: null,
    content: {
      '@id': null,
    },
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return !this.props.token && <Menu pointing secondary floated="right" />;
  }
}

export default connect((state) => ({
  token: state.userSession.token,
  content: state.content.data,
}))(Anontools);
