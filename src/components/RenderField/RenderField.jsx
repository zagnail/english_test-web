import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

const propTypes = {
  input: PropTypes.object,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.object,
  touched: PropTypes.bool,
  error: PropTypes.bool
};

class RenderField extends Component {
  render() {
    return (
      <FormGroup className={`${this.props.touched && this.props.error ? 'has-error' : '' }`}>
        <FormControl type={this.props.type} placeholder={this.props.placeholder} {...this.props.input} />
        { this.props.touched && this.props.error && <div className='form-error'>{ this.props.error }</div> }
      </FormGroup>
    );
  }
}

RenderField.propTypes = propTypes;

export default RenderField;
