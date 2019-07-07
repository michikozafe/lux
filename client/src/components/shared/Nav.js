import React, { useContext, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Logo from '../../assets/images/lux-logo.png';
import { Link } from "react-router-dom";
import {AuthContext} from '../../context/Auth'

const NavBar = (props) => {
  const { user, setUser } = useContext(AuthContext)

  const logout = () => {
    setUser({})
    props.history.push('/login')
  }
  
  const renderConditionalRoutes = () => {
    if (!user.token) {
      return (
        <Fragment>
          <li className="nav-item px-2 py-2">
              <Link to="/register">REGISTER</Link>
            </li>
          <li className="nav-item px-2 py-2">
            <Link to="/login">LOGIN</Link>
          </li>
        </Fragment>
      )
    } else {
      // console.log(user.user.role, 'userrole')
       return (user.user.role === 'admin') ? (
         <Fragment>
            <li className="nav-item px-2 py-2">
              <Link to="/admin">DASHBOARD</Link>
            </li>
            <li className="nav-item px-2 py-2">
              <Link onClick={() => logout()}>LOGOUT</Link>
            </li>
         </Fragment>
       ) : (
        <Fragment>
          <li className="nav-item px-2 py-2">
            <Link to="/user">DASHBOARD</Link>
          </li>
          <li className="nav-item px-2 py-2">
            <Link to="" onClick={() => logout()}>LOGOUT</Link>
          </li>
        </Fragment>
       )
    }
  }
  return (
    <nav className="navbar navbar-expand-md py-0">
      <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item px-2 py-2">
              <Link to="/rooms">ROOMS</Link>
            </li>
            <li className="nav-item px-2 py-2">
              <Link to="/amenities">AMENITIES</Link>
            </li>
            <li className="nav-item px-2 py-2">
                <Link to="/gallery">GALLERY</Link>
            </li>
            <li className="nav-item px-2 py-2">
              <Link to="/promos">PROMOS</Link>
            </li>
            <li className="nav-item px-2 py-2">
              <Link to="/rooms" className="font-weight-bold animated pulse infinite text-crimson">BOOK NOW</Link>
            </li>
        </ul>
      </div>
      <div className="mx-auto order-0">
        <a className="navbar-brand" href="/">
          <img src={Logo} alt="Logo" height="40" className="ml-5"/>
        </a> 
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul className="navbar-nav ml-auto">
          {renderConditionalRoutes()}
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(NavBar);