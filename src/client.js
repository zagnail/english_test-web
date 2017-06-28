import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

import configureStore from './redux/configureStore';

import routes from './routes';

import DevTools from './components/DevTools';

const store = configureStore();

const component = (
  <Provider store={store}>
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(component, document.getElementById('react-view'));
ReactDOM.render(<DevTools store={store} />, document.getElementById('dev-tools'));
