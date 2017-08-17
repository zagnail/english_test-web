import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import RenderField from '../RenderField';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../redux/actions/book';
import { connect } from 'react-redux';

const propTypes = {
  handleSubmit: PropTypes.func,
  book: PropTypes.func,
  type: PropTypes.string
};

let BookForm = class BookForm extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(props) {
    this.props.book(props);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)} role='form'>
        <Field name='name' component={RenderField} type='text'
          placeholder='Book name' tabIndex={1}
        />
        <Field name='author' component={RenderField} type='text'
          placeholder='Password' tabIndex={2}
        />
        <Field name='description' component={RenderField} type='text'
          placeholder='Description' tabIndex={3}
        />
        <FormGroup>
          <Row>
            <Col sm={6} smOffset={3}>
              <Button className='form-control' type='submit'
                name='submit' id='submit' tabIndex={4}
              >
                {this.props.type}
              </Button>
            </Col>
          </Row>
        </FormGroup>
      </form>
    );
  }
};

function validate(formProps) {
  const errors = {};

  if (!formProps.name) {
    errors.email = 'Name is required';
  }

  if (!formProps.author) {
    errors.password = 'Author is required';
  }

  if (!formProps.description) {
    errors.description = 'Description is required';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.books.error };
}

BookForm = reduxForm({ form: 'books', validate })(BookForm);

BookForm.propTypes = propTypes;

export default connect(mapStateToProps, actions)(BookForm);
