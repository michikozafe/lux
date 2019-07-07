const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  bookingStart: {
    type: Date,
    min: Date.now
  },
  bookingEnd: Date,
  guest: Number,
  roomId: {
    type: Schema.Types.ObjectId,
    ref: "Room"
  },
  roomName: String,
  review: {
      type: Schema.Types.ObjectId,
      ref: "Review"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Booking = mongoose.model("Booking", bookingSchema);
