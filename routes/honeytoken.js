const express = require("express");

const router = express.Router();

//controllers

const {
  generateToken,
  insertTokenAccess,
  respondCanaryAccess,
  insertTokenAccessGif,
  redirectTokenAccess,
} = require("../controller/token_controller");

const {
  changeTokenAssessibility,
  deleteToken,
  // redirect_empty,
} = require("../controller/token_settings_controller");

router.post("/:type", generateToken);

//this route will recieve the request on token access
router.get("/ping/:tokenid/fun.gif", insertTokenAccessGif);

router.get("/ping/:tokenid", insertTokenAccess);
router.get("/ping/redirect/:tokenid", redirectTokenAccess);
//token access request getting from thinkist canary dns server
router.post("/ping/:tokenid", respondCanaryAccess);

router.post("/settings/change_assessibility", changeTokenAssessibility);
router.delete("/settings/deleteToken", deleteToken);

// Dont Delete it , it is a testing route for a empty directory token
// router.get("/test-content", redirect_empty);

module.exports = router;
