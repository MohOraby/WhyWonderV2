import React from 'react';
import { Route, Redirect } from "react-router-dom";

import Navigation from './Partials/Navbar';


function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <div>
      <Navigation />
      <Route
        {...rest}
        render={(props) => authed === true
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
      />
    </div>
  );
}
export default PrivateRoute
