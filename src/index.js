import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import UserStore from './stores/UserStore';
import ItemStore from './stores/ItemStore';
import { Provider } from 'mobx-react';
import Account from './components/Account';
import Login from './components/Login';
import Browse from './components/Browse';
import Neighbors from './components/Neighbors';
import Main from './components/Main';
import ItemRequested from './components/ItemRequested';
import 'bootstrap/dist/css/bootstrap.css';
import CreateAccount from './components/CreateAccount';

let userStore = new UserStore();
let itemStore = new ItemStore();

render((
  <Provider userStore={userStore} itemStore={itemStore}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}/>
        <Route path="/Login" component={Login}/>
        <Route path="/NewUser" component={CreateAccount}/>
        <Route path="/Browse" component={Browse}/>
        <Route path="/Neighbors" component={Neighbors}/>
        <Route path="/Account" component={Account}/>
        <Route path="/Requested" component={ItemRequested}/>
    </Router>
  </Provider>

), document.getElementById('app'));
