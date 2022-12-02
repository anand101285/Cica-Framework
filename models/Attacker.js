const mongoose = require("mongoose");

const attackerobj = new mongoose.Schema({
    ip: String,
    date: String,
    user_id: String,
    coordinates: [Number],
});

var attacker = mongoose.model("Attacker", attackerobj);

module.exports = attacker;
