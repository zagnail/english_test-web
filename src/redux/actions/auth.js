import axios from 'axios';
import { browserHistory } from 'react-router';
import { API_URL } from '../../config';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_FAILURE,
  AUTH_USER,
  UNAUTH_USER
} from './types/index';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

/**
 * Error helper
 */
export function authError(CONST, error) {
  return {
    type: CONST,
    payload: error
  };
}

/**
 * Sign Up
 */
export function signUpUser(props) {
  return (dispatch) => {
    console.log('props', props);
    axios.post(`${API_URL}/register`, props, headers)
      .then(() => {
        dispatch({ type: SIGNUP_SUCCESS });

        browserHistory.push('/books/page/1');
      })
      .catch(() => dispatch(authError(SIGNUP_FAILURE)));
  };
}

/**
 * SignIn
 */
export function signInUser(props) {
  const { email, password } = props;

  console.log('props', props);

  return (dispatch) => {
    axios.post(
      `${API_URL}/login`, { email, password }, headers)
      .then(response => {
        console.log('headers', response.headers);
        localStorage.setItem('token', response.headers.mylibrarytoken);

        dispatch({ type: AUTH_USER });

        browserHistory.push('/books/page/1');
      })
      .catch(() => dispatch(authError(SIGNIN_FAILURE, "Email or password isn't right")));
  };
}

/**
 * SignOut
 */
export function signOutUser() {
  localStorage.clear();

  return {
    type: UNAUTH_USER
  };
}
