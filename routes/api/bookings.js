const express = require('express');
const router = express.Router();
const { check, validationResult} = require('express-validator/check');

const User = require('../../models/User');
const Room = require('../../models/Room');
const Booking = require('../../models/Booking');

//  @route   POST api/bookings/create
//  @desc    Book a room
//  @access  Private
router.post('/create/:roomId/:userId', [
  check('bookingStart', 'Start Date is required').not().isEmpty(),
  check('bookingEnd', 'End Date is required').not().isEmpty(),
  check('guest', 'guest is required').not().isEmpty(),
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { bookingStart, bookingEnd, guest } = req.body;
  const { roomId, userId } = req.params;

  try {
    const roomName = await Room.findById(roomId).select('name')
    // res.send(roomName.name)
    const notAvailableDates = await Booking.find().where('bookingStart').gte(bookingStart).where('bookingEnd').lte(bookingEnd);
    const roomCapacity = await Room.findOne({_id: roomId}).select('capacity');

    if(notAvailableDates.length > 0) {
      return res.status(422).json({ errors: { msg: "Date not available." } })
    }

    if(roomCapacity.capacity < guest) {
      return res.status(422).json({ errors: { msg: "No of guests exceeded limit." } })
    }
    booking = new Booking({
      user: userId,
      bookingStart,
      bookingEnd,
      guest,
      roomId,
      roomName: roomName.name
    })
    await booking.save();
    let bookingId = booking.id
    // console.log(bookingId)
    const room = await Room.findByIdAndUpdate(roomId, {$push: {bookings: bookingId}})
    res.json(booking);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});

//  @route   GET api/bookings/:id
//  @desc    Get booking by id
//  @access  Private
router.get('/:id', async (req, res) => {
  try {
    const bookings = await Booking.find({user: req.params.id});
    res.json(bookings);
    // res.json(new Date(booking[0].bookingStart).toLocaleDateString("en-US"));
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
})

//  @route   PUT api/bookings/edit/:bookingId
//  @desc    Edit booking
//  @access  Private
router.put('/edit/:bookingId', [
  check('bookingStart', 'Start Date is required').not().isEmpty(),
  check('bookingEnd', 'End Date is required').not().isEmpty(),
  check('guest', 'guest is required').not().isEmpty(),
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { bookingStart, bookingEnd, guest } = req.body;

  try {
    let booking = await Booking.findByIdAndUpdate(req.params.bookingId, {$set: {
      bookingStart,
      bookingEnd,
      guest
    }})
    booking = await Booking.findById(req.params.bookingId)
    res.json(booking)
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

//  @route   DELETE api/bookings/delete/:bookingId
//  @desc    Cancel booking
//  @access  Private
router.delete('/delete/:bookingId', async (req, res) => {
  const { bookingId } = req.params
  try {
    const booking = await Booking.findById(bookingId);
    await booking.remove();
    // console.log(booking.roomId);
    const room = await Room.findByIdAndUpdate(booking.roomId,
      {$pull: {bookings: bookingId}},
      {safe: true, upsert: true},)
    // console.log(room);
    res.json({ msg: 'Booking Successfully Cancelled'})
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
})

module.exports = router;