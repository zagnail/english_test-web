import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from 'components/App';
import BooksPage from 'components/BooksPage';
import BookView from 'components/BookView';
import BookForm from 'components/BookForm';

export default (
  <App>
    <Switch>
      <Route exact path='/' component={BooksPage} />
      <Route path='/books/:number' component={BookView} />
      <Route path='/books/:number/change' component={BookForm} />
      <Route path='/books/create' component={BookView} />
    </Switch>
  </App>
);
