const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const promotionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  validUntil: {
    type: Date,
    required: true,
    min: Date.now
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Promotion = mongoose.model("Promotion", promotionSchema);
