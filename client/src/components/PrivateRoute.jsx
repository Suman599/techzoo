// src/components/PrivateRoute.jsx
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth } from '../services/firebase';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = auth.currentUser; // Check if the user is logged in

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
