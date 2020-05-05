import React from 'react';
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import User from '../containers/User/User';
import UserList from '../containers/User/UserList';
import Questions from '../containers/User/Questions';
import Register from '../containers/Auth/Register';
import Login from '../containers/Auth/Login';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

function Routes() {
  const authed = Boolean(localStorage.getItem('jwt'))
  return (
    <div>
      <Router>
        <Switch>
          <PublicRoute authed={authed} exact path="/login" component={Login} />
          <PublicRoute authed={authed} exact path="/register" component={Register} />
          <PrivateRoute authed={authed} exact path="/questions" component={Questions} />
          <PrivateRoute authed={authed} exact path="/userlist" component={UserList} />
          <PrivateRoute authed={authed} path="/user/:id" component={User} />
        </Switch >
      </Router >
    </div>
  );
}

export default Routes;
