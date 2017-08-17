import axios from 'axios';
import { API_URL } from '../../config';
import {
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_FAILURE,
  READ_BOOKS_SUCCESS,
  READ_BOOK_SUCCESS,
  READ_BOOK_FAILURE,
  UPDATE_BOOK_SUCCESS,
  UPDATE_BOOK_FAILURE,
  CREATE_BOOK_SUCCESS,
  CREATE_BOOK_FAILURE,
  UNAUTH
} from './types/index';

export function fetchBooks(pageNumber) {
  const token = localStorage.getItem('token');

  return (dispatch) => {
    axios.get(`${API_URL}/books/page/${pageNumber}`,
      { headers: { mylibrarytoken: token } })
      .then(response => {
        dispatch({ type: READ_BOOKS_SUCCESS, payload: response.data });
      })
      .catch(response => dispatch({ type: UNAUTH, payload: response.data }));
  };
}

export function fetchBook(id) {
  const token = localStorage.getItem('token');

  return (dispatch) => {
    axios.get(`${API_URL}/books/${id}`,
      { headers: { mylibrarytoken: token } }
    )
      .then(response => {
        dispatch({ type: READ_BOOK_SUCCESS, payload: response.data });
      })
      .catch(response => dispatch(
        { type: READ_BOOK_FAILURE, payload: response.data }));
  };
}

export function updateBook(id, props) {
  const token = localStorage.getItem('token');

  return (dispatch) => {
    axios.put(`${API_URL}/books/${id}`,
      { headers: { mylibrarytoken: token }, props })
      .then(response => {
        dispatch({ type: UPDATE_BOOK_SUCCESS, payload: response.data });
      })
      .catch(response => dispatch(
        { type: UPDATE_BOOK_FAILURE, payload: response.data }));
  };
}

export function deleteBook(id) {
  const token = localStorage.getItem('token');

  return (dispatch) => {
    axios.delete(`${API_URL}/books/${id}`,
      { headers: { mylibrarytoken: token } })
      .then(response => {
        dispatch({ type: DELETE_BOOK_SUCCESS, payload: response.data });
      })
      .catch(response => dispatch(
        { type: DELETE_BOOK_FAILURE, payload: response.data }));
  };
}

export function createBook(props) {
  const token = localStorage.getItem('token');

  return (dispatch) => {
    axios.post(`${API_URL}/books/`,
      { headers: { mylibrarytoken: token }, props })
      .then(response => {
        dispatch({ type: CREATE_BOOK_SUCCESS, payload: response.data });
      })
      .catch(response => dispatch(
        { typs: CREATE_BOOK_FAILURE, payload: response.data }));
  };
}
