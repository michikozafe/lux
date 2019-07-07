import React, { useState, useEffect, Fragment } from 'react';
import ProfilePhoto from '../assets/images/profile-photo.png';
import LogoImage from '../assets/images/lux-logo.png';
import Footer from '../components/shared/Footer'
import { Link } from 'react-router-dom';
import Timer from "../components/shared/Timer";
import axios from "axios";
import { appUrl } from "../constants/api";
import Swal from 'sweetalert2';


function User(props) {
  // const [date, setDate] = useState(new Date());
  const [user, setUser] = useState({name: '', email: '', date: (new Date()).toLocaleDateString()})
  const [dashboard, setDashboard] = useState({
    bookings: {count: 0},
    reviews: {count: 0}
   } );
  useEffect(() => {
    let user = JSON.parse(window.localStorage.getItem('user'));
    // console.log(user, 'LOGGED IN USER')
    
    if (!Object.entries(user).length) {
      props.history.push('/')
      user = {
        user: {
          role: ''
        }
      }
    }

    if (user.user.role !== 'user') {
      Swal.fire({
        type: 'error',
        title: 'Ooopps!',
        text: 'Unauthorized Access'
      })
      props.history.push('/')
    };

    setUser(user.user)
    // console.log(user, 'USER')

    const fetchDashboardData = async () => {
      const { data } = await axios.get(`${appUrl}dashboard/user/${user.user._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      setDashboard(data);
      // console.log(data);
    };

    fetchDashboardData();
  }, [props.history])

  const membershipDate = new Date(user.date).toLocaleDateString("en-US")
  // console.log(dashboard.bookings.count);
  return (
    <Fragment>
      <div className="row mx-0" id="user-dashboard">
        <nav className="col-md-2 d-none d-md-block sidebar px-0 text-center">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <div className="mt-4">
                <img src={ProfilePhoto} height="100" alt="profilePhoto"/>
              </div>
              <li className="nav-item">
                <div className="nav-link text-dark text-uppercase font-weight-bold" href="#">
                    { user.name }
                </div>
              </li>
              <li className="nav-item mb-3">
                <p className="nav-link">
                  { user.email }
                </p>
              </li>
              <li className="nav-item dashboard-links">
                <Link className="nav-link" to="/user">
                  HOME
                </Link>
              </li>
              <li className="nav-item dashboard-links">
                <Link className="nav-link" to="/bookings">
                  BOOKINGS
                </Link>
              </li>
              <li className="nav-item dashboard-links">
                <Link className="nav-link" to="/reviews">
                  REVIEWS
                </Link>
              </li>
            </ul>
          </div>
        </nav>
  
        <main className="col-md-9 ml-3">
          <div className="align-items-center">
          <h1 className="h2 border-bottom mb-3 pb-2 header-color mt-4">
            DASHBOARD{" "}
            <Timer />
          </h1>
          <div className="text-white text-center">
            <div className="row">
              <div className="col-md-6 px-0">
                <div className="row bg-primary mx-1 rounded py-4">
                  <div className="col-md-5 text-center px-1"><i className="fas fa-suitcase-rolling fa-3x"></i></div>
                  <div className="col-md-7 px-0">
                    <div className="admin-dashboard-counter">{dashboard.bookings.count}</div>
                    <div className="admin-dashboard-tile">Confirmed Bookings</div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 px-0">
                <div className="row bg-success mx-1 rounded py-4">
                  <div className="col-md-5 text-center px-1"><i className="fas fa-check fa-3x"></i></div>
                  <div className="col-md-7 px-0">
                      <div className="admin-dashboard-counter">{dashboard.reviews.count}</div>
                      <div className="admin-dashboard-tile">Completed Reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>

          <div className="container">
            <div className="row my-5">
              <div className="col-md-7">
                <h2 className="text-uppercase mb-4 text-crimson font-weight-bold">{ user.name }</h2>
                <p><i className="fas fa-user"></i> Member Since: { membershipDate }</p>
                <p><i className="fas fa-envelope"></i> { user.email } </p>
              </div>
              <div className="col-md-5">
                <div className="user-card">
                <img src={LogoImage} height="75px" alt="logoImage"/>
                  <div className="user-card-name">
                    <h4 className="text-uppercase font-weight-bold">{ user.name }</h4>
                    <h5 className="text-uppercase font-weight-bold">12345678</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </main>
    </div>
    <Footer />
    </Fragment>
  )
}

export default User;