import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';
import RenderField from '../RenderField';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../redux/actions/auth';
import { connect } from 'react-redux';

bootstrapUtils.addStyle(Button, 'login');

const propTypes = {
  display: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func,
  signInUser: PropTypes.func,
  onModalClose: PropTypes.func
};

let LoginPage = class LoginPage extends Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(props) {
    this.props.signInUser(props);
  }

  componentWillMount() {
    console.log('props', this.props);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form id='login-form' onSubmit={handleSubmit(this.handleFormSubmit)}
        role='form' style={this.props}
      >
        <Field name='email' component={RenderField} type='email'
          placeholder='Email address' tabIndex={1}
        />
        <Field name='password' component={RenderField} type='password'
          placeholder='Password' tabIndex={2}
        />
        <FormGroup className='text-center'>
          <Checkbox tabIndex={3} id='remember'>Remember me</Checkbox>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col sm={6} smOffset={3}>
              <Button bsStyle='login' className='form-control' type='submit'
                name='login-submit' id='login-submit' tabIndex={4}
                onClick={this.props.onModalClose}
              >
                Log In
              </Button>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col lg={12}>
              <div className='text-center'>
                <a href='#' className='forgot-password' tabIndex={5}>Forgot Password?</a>
              </div>
            </Col>
          </Row>
        </FormGroup>
      </form>
    );
  }
};

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Email is required';
  }

  if (!formProps.password) {
    errors.password = 'Password is required';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

LoginPage = reduxForm({ form: 'signin', validate })(LoginPage);

LoginPage.propTypes = propTypes;

export default connect(mapStateToProps, actions)(LoginPage);
