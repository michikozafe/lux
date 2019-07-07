import React, { Fragment } from 'react';
import PageHeader from '../components/shared/PageHeader'
import Footer from '../components/shared/Footer'
import Barbel from '../assets/images/barbel.png';
import Buffet from '../assets/images/buffet.png';
import Calendar from '../assets/images/calendar.png';
import Clock from '../assets/images/clock.png';
import Food from '../assets/images/food.png';
import KidsPool from '../assets/images/kids-pool.png';
import Lounger from '../assets/images/lounger.png';
import Pool from '../assets/images/pool.png';
import Shower from '../assets/images/shower.png';
import Treadmill from '../assets/images/treadmill.png';
import Weight from '../assets/images/weight.png';

function Amenities(props) {
  return (
    <Fragment>
      <PageHeader title="Amenities" />
      <div id="amenities" className="container mb-5">
      <h3 className="mb-4 mt-5 text-center">Go above and beyond the ordinary city vacation.</h3>
      <section id="lux-cafe my-3">
        <div className="my-3">
            <img src="https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" height="450" width="1100" alt="luxCafe"/>
        </div>
        <h2 className="text-center text-uppercase header-font text-crimson mt-4">Lux Cafe</h2>
        <p className="text-center mb-5 mt-3">Go on a journey around the flavors of the world at Lux Cafe. Offering a wide variety of indulgent dishes, Lux Cafe is the place to be for breakfast, lunch, or dinner. Whether you are craving authentic European or mouthwatering Filipino dishes, you will always find something to satisfy your cravings.</p>
        <div className="row text-center">
          <div className="col-md-4">
            <img src={Calendar} alt="calendar"/>
            <p className="mt-2">Open daily including national holidays.</p>
          </div>
          <div className="col-md-4">
              <img src={Food} alt="food"/>
              <p className="mt-2">A la carte</p>  
          </div>
          <div className="col-md-4">
              <img src={Buffet} alt="buffet"/>
              <p className="mt-2">Breakfast, Lunch & Dinner Buffet</p>  
          </div>
        </div>
      </section>
      <hr className="mb-5" />
      <section id="swimming-pool">
        <div className="my-3">
            <img src="https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=2&h=650&w=940" height="450" width="1100" alt="swimmingPool"/>
        </div>
        <h2 className="text-center text-uppercase header-font text-crimson mt-4">Swimming Pool</h2>
        <p className="text-center mb-5 mt-3">Go on a reinvigorating dive at our twenty (20) meter swimming pool. On a bright day, guests can relax and soak up some sunshine at our poolside loungers. We also have a kiddie pool for little tots to splash around.  Let the waves soothe your spirit after a hard day’s work by revelling in the cool water and refreshing atmosphere.</p>
        <div className="row text-center">
          <div className="col-md-3">
            <img src={Pool} alt="pool"/>
            <p className="mt-2">20 Meters Deep</p>
          </div>
          <div className="col-md-3">
              <img src={KidsPool} alt="kidsPool"/>
              <p className="mt-2">Kiddie Pool</p>  
          </div>
          <div className="col-md-3">
              <img src={Lounger} alt="lounger"/>
              <p className="mt-2">Poolside Loungers</p>  
          </div>
          <div className="col-md-3">
            <img src={Shower} alt="shower"/>
            <p className="mt-2">Shower Facilities</p>  
          </div>
        </div>
      </section>
      <hr className="mb-5" />
      <section id="fitness-center">
        <div className="my-3">
            <img src="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=2&h=650&w=940" height="450" width="1100" alt="fitnessCenter"/>
        </div>
        <h2 className="text-center text-uppercase header-font text-crimson mt-4">Fitness Center</h2>
        <p className="text-center mb-5 mt-3">Stick to your workout regimen even while on staycation at Lux Hotel’s fitness center. Exercise using state-of-the-art gym equipment for all your cardio and strength training needs. Whether you are looking to stay in shape or just want to burn off some steam, our fitness center has something for you. Make the most of your stay at Lux Hotel and mix together travel and fitness for a happy, healthier you.</p>
        <div className="row text-center">
          <div className="col-md-3">
            <img src={Barbel} alt="barbel"/>
            <p className="mt-2">Circuit Weight Equipment</p>
          </div>
          <div className="col-md-3">
              <img src={Treadmill} alt="treadmill"/>
              <p className="mt-2">Cardio Equipment</p>  
          </div>
          <div className="col-md-3">
              <img src={Weight} alt="weight"/>
              <p className="mt-2">Free Weight Equipment</p>  
          </div>
          <div className="col-md-3">
              <img src={Clock} alt="clock"/>
              <p className="mt-2">6:00AM to 10:00PM</p>  
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </Fragment>
  )
}

export default Amenities;