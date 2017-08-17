import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from 'components/App';
import BooksPage from 'components/BooksPage';

export default (
  <App>
    <Switch>
      <Route exact path='/' component={BooksPage} />
    </Switch>
  </App>
);
