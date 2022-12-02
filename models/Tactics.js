const mongoose = require("mongoose");

const tact = new mongoose.Schema(
  {
    _id: String,
    name: String,
    description: String,
    type: String,
  },
  { _id: false }
);

var attacker = mongoose.model("Tactics", tact);

module.exports = attacker;
