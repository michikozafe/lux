import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import ProfilePhoto from "../assets/images/profile-photo.png";
import Footer from "../components/shared/Footer";
import axios from "axios";
import { appUrl } from "../constants/api";
import Timer from "../components/shared/Timer";
import { Bar } from 'react-chartjs-2';
import Swal from 'sweetalert2';

function Admin(props) {
  const [user, setUser] = useState({ name: "", email: "", date: new Date() });
  const [dashboard, setDashboard] = useState({
     bookings: {count: 0},
     promos: {count: 0},
     rooms: {count: 0},
     users: {count: 0},
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

    if (user.user.role !== 'admin') {
      Swal.fire({
        type: 'error',
        title: 'Ooopps!',
        text: 'Unauthorized Access'
      })
      props.history.push('/')
    };
    // console.log(user, "LOGGED IN USER");
    setUser(user.user);

    const fetchDashboardData = async () => {
      const { data } = await axios.get(`${appUrl}dashboard/admin`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      setDashboard(data);
      // console.log(data);
    };

    fetchDashboardData();
  }, [props.history]);
  // console.log(dashboard.promos, 'dashboard');

  const chartData = (canvas) => {
    const ctx = canvas.getContext('2d');
    const gradientStroke = ctx.createLinearGradient(500, 150, 100, 500);
    gradientStroke.addColorStop(0, '#DA50CA');
    gradientStroke.addColorStop(1, '#FE6666');
    return (
      {
        labels: ['Bookings', 'Rooms', 'Users', 'Promos'],
        datasets: [{
          label: 'Total Count',
          data: [dashboard.bookings.count, dashboard.rooms.count, dashboard.users.count, dashboard.promos.count],
          borderColor: gradientStroke,
          backgroundColor: gradientStroke,
          pointBorderColor: gradientStroke,
          pointBackgroundColor: gradientStroke,
          pointHoverBackgroundColor: gradientStroke,
          pointHoverBorderColor: gradientStroke,
          borderWidth: 3
        }]
      }
    );
  };
  
  const chartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          display: true
        }
      }]
    },
    legend: {
      display: false
    },
    maintainAspectRatio: false
  };

  return (
    <Fragment>
      <div>
        <div className="row mx-0" id="user-dashboard">
          <nav className="col-md-2 d-none d-md-block sidebar px-0 text-center">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <div className="mt-4">
                  <img src={ProfilePhoto} height="100" alt="profilePhoto" />
                </div>
                <li className="nav-item">
                  <div className="nav-link text-dark text-uppercase font-weight-bold">{user.name}</div>
                </li>
                <li className="nav-item mb-3">
                  <p className="nav-link">{user.email}</p>
                </li>
                <li className="nav-item dashboard-links">
                  <Link className="nav-link" to="/admin">
                    HOME
                  </Link>
                </li>
                <li className="nav-item dashboard-links">
                  <Link className="nav-link" to="/rooms">
                    ROOMS
                  </Link>
                </li>
                <li className="nav-item dashboard-links">
                  <Link className="nav-link" to="/promos">
                    PROMOS
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
                  <div className="col-md-3 px-0">
                    <div className="row bg-primary mx-1 rounded py-4">
                      <div className="col-md-5 text-center px-1">
                        <i className="fas fa-suitcase-rolling fa-3x" />
                      </div>
                      <div className="col-md-7 px-0">
                        <div className="admin-dashboard-counter">{dashboard.bookings.count}</div>
                        <div className="admin-dashboard-tile">Total Bookings</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 px-0">
                    <div className="row bg-danger mx-1 rounded py-4">
                      <div className="col-md-5 text-center px-1">
                        <i className="fas fa-bed fa-3x" />
                      </div>
                      <div className="col-md-7 px-0">
                        <div className="admin-dashboard-counter">{dashboard.rooms.count}</div>
                        <div className="admin-dashboard-tile">Total Rooms</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 px-0">
                    <div className="row bg-warning mx-1 rounded py-4">
                      <div className="col-md-5 text-center px-1">
                        <i className="fas fa-users fa-3x" data-toggle="tooltip" title="Guest" />
                      </div>
                      <div className="col-md-7 px-0">
                        <div className="admin-dashboard-counter">{dashboard.users.count}</div>
                        <div className="admin-dashboard-tile">Total Users</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 px-0">
                    <div className="row bg-success mx-1 rounded py-4">
                      <div className="col-md-5 text-center px-1">
                        <i className="fas fa-hotel fa-3x" />
                      </div>
                      <div className="col-md-7 px-0">
                        <div className="admin-dashboard-counter">{dashboard.promos.count}</div>
                        <div className="admin-dashboard-tile">Active Promos</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container my-5">
              <Bar data={chartData} options={chartOptions} width={60} height={250}/>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

export default Admin;
