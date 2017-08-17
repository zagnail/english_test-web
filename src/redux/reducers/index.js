import { combineReducers } from 'redux';

import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import bookReducer from './bookReducer';

export default combineReducers({
  form,
  auth: authReducer,
  book: bookReducer
});
