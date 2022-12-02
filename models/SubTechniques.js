const mongoose = require("mongoose");

const subtech = new mongoose.Schema(
  {
    id: String,
    name: String,
    description: String,
    type: String,
    parent: [String],
  },
  { _id: false }
);

var attacker = mongoose.model("SubTechniques", subtech);

module.exports = attacker;
