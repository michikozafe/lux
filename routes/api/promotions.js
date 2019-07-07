const express = require('express');
const router = express.Router();
const { check, validationResult} = require('express-validator/check');

const Promotion = require('../../models/Promotion');

//  @route   POST api/promotions/create
//  @desc    Create a promotion
//  @access  Private
router.post('/create', [
  check('title', 'Title is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('validUntil', 'Valid Until is required').not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { title, description, validUntil } = req.body;
  try {
    promotion = new Promotion({
      title,
      description,
      validUntil
    })
    await promotion.save();
    res.json(promotion);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
})

//  @route   GET api/promotions
//  @desc    Get all promotions
//  @access  Public
router.get('/', async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.json(promotions);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
})

//  @route   PUT api/promotions/edit/:promotionId
//  @desc    Edit a promotion
//  @access  Private
router.put('/edit/:promotionId', [
  check('title', 'Title is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('validUntil', 'Valid Until is required').not().isEmpty(),
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { title, description, validUntil } = req.body;
  try {
    let promotion = await Promotion.findByIdAndUpdate(req.params.promotionId, {$set: {
      title,
      description,
      validUntil
    }})
    promotion = await Promotion.findById(req.params.promotionId)
    res.json(promotion)
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

//  @route   DELETE api/promotions/delete/:promotionId
//  @desc    Delete a promotion
//  @access  Private
router.delete('/delete/:promotionId', async (req, res) => {
  const { promotionId } = req.params
  try {
    const promotion = await Promotion.findById(promotionId);
    await promotion.remove();
    res.json({ msg: 'Promotion Successfully Deleted'})
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
})

module.exports = router;