const express = require('express');
const router = express.Router();
const Review = require('../../models/Review');
const Booking = require('../../models/Booking');
const User = require('../../models/User');
const Promo = require('../../models/Promotion');


//  @route   GET api/dashboard
//  @desc    Get admin dashboard
//  @access  Private
router.get('/admin', async (req, res) => {
  try {
    const dashboard = {
      bookings: {},
      rooms: {},
      promos: {},
      users: {}, 
    }
    const bookingsCount = await Booking.countDocuments()
    const roomsCount = await Room.countDocuments();
    const promosCount = await Promo.countDocuments();
    const usersCount = await User.countDocuments();

    dashboard.bookings.count = bookingsCount
    dashboard.rooms.count = roomsCount
    dashboard.promos.count = promosCount
    dashboard.users.count = usersCount
    
    res.json(dashboard);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
})

//  @route   GET api/dashboard
//  @desc    Get admin dashboard
//  @access  Private
router.get('/user/:id', async (req, res) => {
  try {
    const dashboard = {
      bookings: {},
      reviews: {}
    }
    // console.log(req.params.id)
    const bookingsCount = await Booking.countDocuments({user: req.params.id})
    const reviewsCount = await Review.countDocuments({user: req.params.id});
    // console.log(bookingsCount);
    // console.log(reviewsCount);

    dashboard.bookings.count = bookingsCount
    dashboard.reviews.count = reviewsCount

    res.json(dashboard);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
})

module.exports = router;