import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

class Choose extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.index);
  }

  render() {
    return (
      <a id={this.props.id} onClick={this.handleClick}
        className={this.props.isActive ? 'active' : ''}
      >
        {this.props.value}
      </a>
    );
  }
}

Choose.propTypes = propTypes;

export default Choose;
