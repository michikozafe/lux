import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { AuthContext } from '../context/Auth';

function PrivateRoute({ component: Component, ...rest }) {
  const user = JSON.parse(window.localStorage.getItem('user'));
  let isAuthenticated = false

    if (Object.entries(user).length) {
      isAuthenticated = false
    }
  return (
    <Route
      { ...rest }
      render = { props => isAuthenticated ? (
        <Component { ...props } />
      ) : (
        <Redirect 
         to={{
           pathname: '/login',
           state: { from: props.location }
         }}
        />
      ) }
    />
  )
}

export default PrivateRoute;