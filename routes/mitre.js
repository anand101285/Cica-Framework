const express = require("express");
const router = express.Router();

const SubTechniques = require("../models/SubTechniques");
const Techniques = require("../models/Techniques");
const Tactics = require("../models/Tactics");

router.post("/addtactic", async (req, res) => {
  const { _id, name, type, description } = req.body;
  try {
    const tactics = new Tactics({
      _id,
      name,
      type,
      description,
    });
    await tactics.save();

    res.json({
      msg: "Tactic added successfully",
      tactics,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  const tech = await Techniques.find();
  let resData = [];
  tech.map(data => {
    resData = [...resData, ...data.detection];
  });
  const newdata = [...new Set(resData)];
  res.send(newdata);
});

router.post("/addtechniques", async (req, res) => {
  const { _id, name, type, detection, description, parent } = req.body;
  try {
    const technique = new Techniques({
      _id,
      name,
      type,
      description,
      detection,
      parent,
    });
    await technique.save();

    res.json({
      msg: "Technique added successfully",
      technique,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/addsubtechniques", async (req, res) => {
  const { _id, name, type, detection, description, parent } = req.body;
  try {
    const subtechnique = new SubTechniques({
      _id,
      name,
      type,
      description,
      detection,
      parent,
    });
    await subtechnique.save();

    res.json({
      msg: "SubTechnique added successfully",
      subtechnique,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});
//TODO fix
router.get("/fetchMitreNavigator", async (req, res) => {
  try {
    const aggCursor = Tactics.aggregate([
      {
        $lookup: {
          from: "techniques",
          localField: "_id",
          foreignField: "parent",
          as: "child",
        },
      },
      {
        $lookup: {
          from: "tokens",
          localField: "child._id",
          foreignField: "techniqueId",
          as: "mapped_tokens",
        },
      },
    ]);
    const mitredata = [];
    for await (const docs of aggCursor) {
      mitredata.push(docs);
    }
    res.send(mitredata);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
