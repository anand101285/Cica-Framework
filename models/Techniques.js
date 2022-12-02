const mongoose = require("mongoose");

const tech = new mongoose.Schema(
  {
    _id: String,
    name: String,
    description: String,
    type: String,
    detection: [String],
    parent: [String],
  },
  { _id: false }
);

var attacker = mongoose.model("Techniques", tech);

module.exports = attacker;
