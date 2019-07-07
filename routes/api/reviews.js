const express = require('express');
const router = express.Router();
const { check, validationResult} = require('express-validator/check');

const Review = require('../../models/Review');

//  @route   POST api/reviews/create/:roomId
//  @desc    Create a review
//  @access  Private
router.post('/create/:bookingId/:userId', [
  check('rating', 'Rating is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { rating, description } = req.body;
  let booking = await Booking.findById(req.params.bookingId)
  // console.log(booking.roomId);
  const roomId = booking.roomId
  const roomName = await Room.findById(roomId)
  // console.log(roomName.name)
  try {
    review = new Review({
      rating,
      description,
      user: req.params.userId,
      room: roomId,
      roomName: roomName.name
    })
    await review.save();
    let reviewId = review.id
    const room = await Room.findByIdAndUpdate(roomId, {$push: {reviews: reviewId}})
    booking = await Booking.findByIdAndUpdate(req.params.bookingId, {$set: {review: reviewId}})
    res.json(review);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
})

//  @route   GET api/reviews:
//  @desc    Get review by Id
//  @access  Private
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.find({user: req.params.id});
    console.log(review)
    res.json(review);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
})

//  @route   PUT api/reviews/edit/:reviewId
//  @desc    Edit review by Id
//  @access  Private
router.put('/edit/:reviewId', [
  check('rating', 'Rating is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { rating, description } = req.body;
  try {
    let review = await Review.findByIdAndUpdate(req.params.reviewId, {$set: {
      rating,
      description
    }})
    review = await Review.findById(req.params.reviewId)
    res.json(review)
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

//  @route   DELETE api/reviews/delete/:reviewId
//  @desc    Edit review by Id
//  @access  Private
router.delete('/delete/:reviewId', async (req, res) => {
  const { reviewId } = req.params
  try {
    const review = await Review.findById(reviewId);
    await review.remove();
    // res.json(review)
    const room = await Room.findByIdAndUpdate(review.room,
      {$pull: {reviews: reviewId}},
      {safe: true, upsert: true},)
    const booking = await Booking.findOne({review: review._id}).select('id')
    const bookings = await Booking.findByIdAndUpdate(booking.id,
      {$unset: {
        review
      }})
    console.log(review);
    console.log(bookings);
    console.log(room);
    // res.json(review)
    res.json({ msg: 'Review Successfully Deleted'})
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
})

module.exports = router;
