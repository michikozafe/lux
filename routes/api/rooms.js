const express = require('express');
const router = express.Router();
const { check, validationResult} = require('express-validator/check');

const Room = require('../../models/Room');


//  @route   POST api/rooms/create
//  @desc    Create a room
//  @access  Private

router.post('/create', [
  check('name', 'Name is required').not().isEmpty(),
  check('floor', 'Floor is required').not().isEmpty(),
  check('price', 'Price is required').not().isEmpty(),
  check('capacity', 'Capacity is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty()
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { name, floor, price, capacity, description } = req.body
  let room = await User.findOne({ name });

  if (room) {
    return res.status(422).json({ errors: { msg: "Room already exist" } });
  }

  try {
    const room = new Room({
      name,
      floor,
      price,
      capacity,
      description,
    })
  
    await room.save();
    res.json(room);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});

//  @route   GET api/rooms
//  @desc    Get all rooms
//  @access  Public
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find()
    res.json(rooms);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
})

//  @route   PUT api/rooms/edit
//  @desc    Edit room
//  @access  Private
router.put('/edit/:id', [
  check('name', 'Name is required').not().isEmpty(),
  check('floor', 'Floor is required').not().isEmpty(),
  check('price', 'Price is required').not().isEmpty(),
  check('capacity', 'Capacity is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty()
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  const { name, floor, price, capacity, description } = req.body
  // console.log(req.body)
  // console.log(req.params.id);
  try {
    let room = await Room.findByIdAndUpdate(req.params.id, {$set: {
      name,
      floor,
      price,
      capacity,
      description
    }})    
    room = await Room.findById(req.params.id)
    res.json(room)
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
})

//  @route   DELETE api/rooms/delete/:roomId
//  @desc    Delete room
//  @access  Private
router.delete('/delete/:roomId', async (req, res) => {
  const { roomId } = req.params
  try {
    const room = await Room.findById(roomId);

    await room.remove();
    res.json({ msg: 'Room Successfully Deleted'})
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
})

module.exports = router;