import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({ type: AUTH_USER });
}

export default function (initialState = {}) {
  return createStore(reducers, initialState, applyMiddleware(thunk));
}
