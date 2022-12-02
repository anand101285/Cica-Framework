const Users = require("../models/Users");
const Honeypots = require("../models/Honeypots");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const getHoneypotMachine = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  Users.aggregate([
    {
      $lookup: {
        from: "honeypots",
        localField: "_id",
        foreignField: "generated_by",
        as: "honeypot_data",
      },
    },
    {
      $match: {
        _id: ObjectId(req.params.uid),
      },
    },
  ]).then(doc => {
    res.send(doc[0].honeypot_data);
  });
};

const generateApi = async (req, res) => {
  const { email, password, systemName, macAddress } = req.body;

  let user = await Users.findOne({ email });

  if (!user) {
    res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    return;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    return;
  }

  Honeypots.findOne({
    macAddress: macAddress,
    systemName: systemName,
    generated_by: user._id,
  })
    .then(data => {
      if (!data) {
        //If Honeypot does not exist already in the database
        const newHoneypot = new Honeypots({
          macAddress: macAddress,
          systemName: systemName,
          generated_by: user._id,
        });
        newHoneypot.save((err, doc) => {
          if (err) console.log(err);
          else {
            Users.findOneAndUpdate(
              { _id: user._id },
              { $push: { honeypots: doc._id } },
              (err, data) => {
                if (err) console.log(err);
                else {
                  res.status(200).json({
                    msg: "New Honeypot Data Addded Completely",
                    ApiKey: doc._id,
                  });
                  return;
                }
              }
            );
          }
        });
      } else {
        //If Honeypot exist already in the database
        res
          .status(200)
          .json({ msg: "This Honeypot is already signed", ApiKey: data._id });
        return;
      }
    })
    .catch(err => {
      res.status(400).json({ errors: [{ msg: `Unknown Error ${err}` }] });
      return;
    });
};

module.exports = { generateApi, getHoneypotMachine };
