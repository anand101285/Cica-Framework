const express = require("express");
const path = require("path");
const router = express.Router();
const {
  generateApi,
  getHoneypotMachine,
} = require("../controller/honeypot_controller");

const { downloadAgent } = require("../controller/token_maker_controller");

router.post("/generate/newapi", generateApi);
router.get("/honeypot_machine/:uid", getHoneypotMachine);
router.get("/download_agent", downloadAgent);
module.exports = router;
