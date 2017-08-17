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
} from '../actions/types/index';

export default (state = {}, action) => {
  switch (action.type) {
    case DELETE_BOOK_SUCCESS:
      return { ...state, error: { } };
    case DELETE_BOOK_FAILURE:
      return { ...state, error: { book: action.payload } };
    case READ_BOOKS_SUCCESS:
      return { ...state, list: action.payload };
    case READ_BOOK_SUCCESS:
      return { ...state, book: action.payload };
    case READ_BOOK_FAILURE:
      return { ...state, error: { book: action.payload } };
    case UPDATE_BOOK_SUCCESS:
      return { ...state, error: { } };
    case UPDATE_BOOK_FAILURE:
      return { ...state, error: { book: action.payload } };
    case CREATE_BOOK_SUCCESS:
      return { ...state, error: { } };
    case CREATE_BOOK_FAILURE:
      return { ...state, error: { book: action.payload } };
    case UNAUTH:
      return { ...state, error: { signin: action.payload } };
    default:
      return state;
  }
};
