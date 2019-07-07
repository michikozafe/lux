import React from 'react';
import LogoImage from '../assets/images/lux-logo.png';
import { Link } from 'react-router-dom';

function Home(props) {
  // console.log(LogoImage, 'image')
  return (
    <div className="homepage dark-overlay"> 
      <div className="content home-content">
        <div className="dark-overlay">
          <div className="homepage-text-container text-center">
            <div className="d-flex justify-content-center">
              <div className="image-container">
                <img src={LogoImage} height="170" className="image-fluid" alt="logoImage"/>
              </div>
            </div>
            <p className="homepage-text my-3">private retreats. extraordinary experiences. fabulous location.</p>
            <Link to="/rooms" className="btn btn-crimson text-uppercase btn-lg btn-block mt-4">View Rates</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;