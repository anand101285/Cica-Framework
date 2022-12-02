const mongoose = require("mongoose");

const HoneypotObj = new mongoose.Schema({
  macAddress: {
    type: String,
    required: true,
  },
  systemName: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  generated_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = User = mongoose.model("Honeypot", HoneypotObj);
