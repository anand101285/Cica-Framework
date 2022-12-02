const express = require("express");
const router = express.Router();

const {
  ExecuteNmap,
  intelGatheringIp,
} = require("../controller/scripts_controller");

router.post("/run-nmap", ExecuteNmap);
router.post("/get-intel", intelGatheringIp);

module.exports = router;
