const express = require("express");
const router = express.Router();

// Controllers
const {
  get_Token_Count,
  get_Num_of_Accessed_Tokens,
  get_table_data,
  get_compromised_tokens_location,
  get_Attacker_tokens,
  getAllAttackerTokenPath,
} = require("../controller/database_controller");

// routes
router.get("/tokens/summary/", get_Token_Count);
router.get("/token/generated/", get_Num_of_Accessed_Tokens);
router.get("/token/compromised/:uid", get_table_data);
router.get(
  "/token/getcompromisedlocation/:uid",
  get_compromised_tokens_location
);
router.post("/attacker/get-all-tokens", get_Attacker_tokens);
router.get("/all-attacker/get-all-tokens", getAllAttackerTokenPath);

module.exports = router;
