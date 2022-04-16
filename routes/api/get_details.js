const express = require("express");
const mongoose = require("mongoose");
const Attacker = require("../../models/Attacker");
const router = express.Router();

router.get("/", (req, res) => {
    Attacker.find({}).exec((err, result) => {
        if (err) console.log(err);
        else {
            console.log(result);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(result);
            res.end();
        }
    });
});

module.exports = router;
