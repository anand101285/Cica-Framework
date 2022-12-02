const express = require("express");
const router = express.Router();

const {
  getFakeUserData,
  getSpecificUser,
} = require("../controller/fakeApi_controller");

router.get("/getAllUsers", getFakeUserData);
router.post("/getUser", getSpecificUser);

module.exports = router;
