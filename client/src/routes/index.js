import React, { Fragment } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import uuidv4 from 'uuid/v4';

import PrivateRoute from './PrivateRoute';
import Nav from '../components/shared/Nav';
import Home from '../pages/Home';
import Admin from '../pages/AdminDashboard';
import User from '../pages/UserDashboard';
import Rooms from '../pages/Rooms';
import Amenities from '../pages/Amenities';
import Gallery from '../pages/Gallery';
import Promos from '../pages/Promos';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Bookings from '../pages/Bookings';
import Reviews from '../pages/Reviews';

const publicRoutes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/rooms', component: Rooms, name: 'Rooms' },
  { path: '/amenities', component: Amenities, name: 'Ameneties' },
  { path: '/gallery', component: Gallery, name: 'Gallery' },
  { path: '/promos', component: Promos, name: 'Promos' },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/register', component: Register, name: 'Register' },
  { path: '/admin', component: Admin, name: 'Admin'},
  { path: '/user', component: User, name: 'User'},
  { path: '/bookings', component: Bookings, name: 'Bookings'},
  { path: '/reviews', component: Reviews, name: 'Reviews'},
];

const privateRoutes = [
  
];

function PageRouter() {
  return (
    <Router>
      <Fragment>
        <Nav />
        <Switch>
          {
            publicRoutes.map(({ path, component }) => (
              <Route key={uuidv4()} path={path} component={component} exact/>
            ))
          }
          {
              privateRoutes.map(({path, component}) => (
                <PrivateRoute key={uuidv4()} path={path} component={component} exact />
              ))
            }
        </Switch>
      </Fragment>
    </Router>
  )
}

export default PageRouter;