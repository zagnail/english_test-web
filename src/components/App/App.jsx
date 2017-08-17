import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'react-bootstrap/lib/Grid';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import { Link } from 'react-router-dom';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

import AuthWindow from 'components/AuthWindow';

import { connect } from 'react-redux';
import * as actions from '../../redux/actions/auth';

import './bootstrap.css';

const propTypes = {
  children: PropTypes.node,
  signOutUser: PropTypes.func
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLoginModal: false
    };

    this.handleCloseLoginModal = this.handleCloseLoginModal.bind(this);
    this.handleOpenLoginModal = this.handleOpenLoginModal.bind(this);
  }

  handleCloseLoginModal() {
    this.setState({ showLoginModal: false });
  }

  handleOpenLoginModal() {
    this.setState({ showLoginModal: true });
  }

  handleLogout() {
    this.props.signOutUser();
  }

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>My Library</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav navbar>
              <LinkContainer to='/books'>
                <NavItem eventKey={1}>Books</NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight>
              {
                localStorage.getItem('token') ?
                  <NavItem eventKey={1} onClick={this.handleLogOut}>
                    LogOut
                  </NavItem>
                  :
                  <NavItem eventKey={1} onClick={this.handleOpenLoginModal}>
                    Login
                  </NavItem>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AuthWindow onClose={this.handleCloseLoginModal} showModal={this.state.showLoginModal} />
        <Grid>
          {this.props.children}
        </Grid>
      </div>
    );
  }
}

App.propTypes = propTypes;

export default connect(null, actions)(App);
