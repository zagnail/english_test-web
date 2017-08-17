import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Choose from './Choose';
import LoginPage from 'components/LoginPage';
import RegisterPage from 'components/RegisterPage';

import './style.css';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired
};

class AuthWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(index) {
    this.setState({ activeIndex: index });
  }

  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.onClose}>
        <Modal.Header>
          <Row>
            <Col xs={6}>
              <Choose id='login-form-link' value='Login'
                index={0} isActive={this.state.activeIndex === 0}
                onClick={this.handleClick}
              />
            </Col>
            <Col xs={6}>
              <Choose id='register-form-link' value='Register'
                index={1} isActive={this.state.activeIndex === 1}
                onClick={this.handleClick}
              />
            </Col>
          </Row>
          <hr />
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={12}>
              <LoginPage display={this.state.activeIndex === 0 ? 'block' : 'none'}
                onModalClose={this.props.onClose}
              />
              <RegisterPage display={this.state.activeIndex === 1 ? 'block' : 'none'}
                onModalClose={this.props.onClose}
              />
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }
}

AuthWindow.propTypes = propTypes;

export default AuthWindow;
