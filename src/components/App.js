import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

import '../css/index.css';
import history from '../history';
import Setup from './Setup';
import Game from './Game';
import Rules from './Rules';
import Header from './Header';

const App = () => {
  return (
    <Router history={history}>
      <Header />
      <Container><h3>Tiny Towns</h3>
        <Switch>
          <Route exact path="/" component={Setup} />
          <Route path="/game" component={Game} />
          <Route path="/rules" component={Rules} />
          <Route path="/score" component={Game} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
