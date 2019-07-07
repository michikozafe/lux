const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  rating: {
    type: Number,
    required: true,
    max: 5
  },
  description: {
    type: String,
    required: true
  },
  user: { 
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  room: { 
    type: Schema.Types.ObjectId,
    ref: "Room"
  },
  roomName: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Review = mongoose.model("Review", reviewSchema);
