import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';

import RenderField from '../RenderField';
import * as actions from '../../redux/actions/auth';
import { connect } from 'react-redux';

bootstrapUtils.addStyle(Button, 'register');

const propTypes = {
  display: PropTypes.string.isRequired,
  signUpUser: PropTypes.func,
  handleSubmit: PropTypes.func,
  onModalClose: PropTypes.func
};

let RegisterPage = class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    this.props.signUpUser(formProps);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form id='register-form' onSubmit={handleSubmit(this.handleFormSubmit)}
        role='form' style={this.props}
      >
        <Field type='email' name='email' id='email'
          tabIndex={1} placeholder='Email Address'
          component={RenderField}
        />
        <Field type='password' name='password' id='password'
          tabIndex={2} placeholder='Password'
          component={RenderField}
        />
        <Field type='password' name='matchingPassword' id='matchingPassword'
          tabIndex={3} placeholder='Mathing Password'
          component={RenderField}
        />


        <FormGroup>
          <Row>
            <Col sm={6} smOffset={3}>
              <Button bsStyle='register' type='submit' name='register-submit'
                id='register-submit' tabIndex={6} className='form-control'
                onClink={this.props.onModalClose}
              >
                Register Now
              </Button>
            </Col>
          </Row>
        </FormGroup>
      </form>
    );
  }
};

function validate(props) {
  const fields = ['email', 'password', 'matchingPassword'];
  const errors = {};

  fields.forEach((f) => {
    if (!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });

  if (props.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(props.email)) {
    errors.email = 'please provide valid email';
  }

  if (props.password && props.password.length < 6) {
    errors.password = 'minimum 6 characters';
  }

  if (props.password !== props.matchingPassword) {
    errors.matchingPassword = 'password doesn\'t match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

RegisterPage = reduxForm({ form: 'signup', validate })(RegisterPage);

RegisterPage.propTypes = propTypes;

export default connect(mapStateToProps, actions)(RegisterPage);
