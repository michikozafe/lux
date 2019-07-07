import React, { Fragment, useContext } from 'react';
import PageHeader from '../components/shared/PageHeader'
import {AuthContext} from '../context/Auth'
import Footer from '../components/shared/Footer'

function Gallery(props) {
  const { authState } = useContext(AuthContext)

  console.log(authState, 'STATE')
  return (
    <Fragment>
      <PageHeader title="Gallery" />
      <section className="no-touch container">
      <h3 className="mb-4 mt-5 text-center">Get a closer look of what we have to offer at Lux Hotel.</h3>
      <div className="wrap mb-5">
        <div className="box">
          <div className="boxInner">
            <img src="https://images.pexels.com/photos/244133/pexels-photo-244133.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=2&h=650&w=940" height="340" alt="lobbyArea"/>
            <div className="titleBox">Lobby Area</div>
          </div>
        </div>
        <div className="box">
          <div className="boxInner">
            <img src="https://images.pexels.com/photos/1028379/pexels-photo-1028379.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" height="340" alt="executiveKingBathtub"/>
            <div className="titleBox">Executive King Bathtub</div>
          </div>
        </div>
        <div className="box">
          <div className="boxInner">
            <img src="https://images.pexels.com/photos/2290740/pexels-photo-2290740.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" height="340" alt="miniCafe"/>
            <div className="titleBox">Mini Cafe</div>
          </div>
        </div>
        <div className="box">
          <div className="boxInner">
            <img src="https://images.pexels.com/photos/271656/pexels-photo-271656.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" height="340" alt="snacks"/>
            <div className="titleBox">Snacks</div>
          </div>
        </div>
        <div className="box">
          <div className="boxInner">
            <img src="https://images.pexels.com/photos/60217/pexels-photo-60217.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=2&h=650&w=940" height="340" alt="poolDuringSunset"/>
            <div className="titleBox">Pool during Sunset</div>
          </div>
        </div>
        <div className="box">
          <div className="boxInner">
            <img src="https://images.pexels.com/photos/172872/pexels-photo-172872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" height="340" alt="executiveKing"/>
            <div className="titleBox">Executive King</div>
          </div>
        </div>
        <div className="box">
          <div className="boxInner">
            <img src="https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" height="340" alt="executiveTwinBedroom"/>
            <div className="titleBox">Executive Twin Bedroom</div>
          </div>
        </div>
        <div className="box">
          <div className="boxInner">
            <img src="https://images.pexels.com/photos/53577/hotel-architectural-tourism-travel-53577.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" height="340" alt="commonArea"/>
            <div className="titleBox">Common Area</div>
          </div>
        </div>
        <div className="box">
          <div className="boxInner">
            <img src="https://images.pexels.com/photos/271631/pexels-photo-271631.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=2&h=650&w=940" height="340" alt="executiveTwinBathroom"/>
            <div className="titleBox">Executive Twin Bathroom</div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
    </Fragment>
  )
}

export default Gallery;