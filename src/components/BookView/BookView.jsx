import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Panel from 'react-bootstrap/lib/Panel';
import Well from 'react-bootstrap/lib/Well';

const propTypes = {
  book: PropTypes.object
};

class BookView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Panel header={this.props.book.name}>
        <Well bsSize='small'>{this.props.book.author}</Well>
        <Well bsSize='large'>{this.props.book.description}</Well>
      </Panel>
    );
  }
}

BookView.propTypes = propTypes;

export default BookView;
