const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  floor: {
    type: Number,
    required: true
  },
  price: Number,
  capacity: Number,
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'https://static.thenounproject.com/png/340719-200.png'
  },
  bookings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Booking"
    }
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Room = mongoose.model("Room", roomSchema);
