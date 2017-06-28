import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from 'components/App';
import CounterPage from 'components/CounterPage';
import HelloWorldPage from 'components/HelloWorldPage';
import TimePage from 'components/TimePage';

export default (
  <App>
    <Switch>
      <Route exact path='/' component={HelloWorldPage} />
      <Route path='/counters' component={CounterPage} />
      <Route path='/time' component={TimePage} />
    </Switch>
  </App>
);
