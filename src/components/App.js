import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history';
import Game from './Game';
import Rules from './Rules';

import Header from './Header';
import '../css/index.css';

const App = () => {
  return (
    <Router history={history}>
      <Header />
      <h3>Tiny Towns</h3>
      <Switch>
        <Route exact path="/" component={Game} />
        <Route path="/rules" component={Rules} />
        <Route path="/score" component={Game} />
      </Switch>
    </Router>
  );
}

export default App;
