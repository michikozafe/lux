const express = require('express');
const router = express.Router();

const Promotion = require('../../models/Promotion');
const Room = require('../../models/Room');

//  @route   GET api/public
//  @desc    Get all rooms
//  @access  Public
router.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find()
    res.json(rooms);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
})

//  @route   GET api/public
//  @desc    Get all promotions
//  @access  Public
router.get('/promos', async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.json(promotions);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
})

module.exports = router;