const Token = require("../models/Tokens");
const TokenAccesses = require("../models/TokenAccess");
const Attackers = require("../models/Attacker");
const Users = require("../models/User");

async function changeTokenAssessibility(req, res) {
  const { accessible, tokenId } = req.body;
  Token.findOneAndUpdate({ _id: tokenId }, { accessible: accessible }, err => {
    if (err) {
      res.status(304).json({ msg: `Updation Error: ${err}` });
    } else {
      res.status(200).json({ msg: "Update Successfully" });
    }
  });
}

async function deleteToken(req, res) {
  const { tokenId, userId } = req.body;

  //find all ids of token access
  const tokenAccessFindQuery = await TokenAccesses.find({ token_id: tokenId });
  let attackerQuery;
  //delete every attacker data of token access
  tokenAccessFindQuery.map(async data => {
    attackerQuery = await Attackers.findOneAndDelete({
      _id: data.accessed_by,
    });
  });

  //delete all token access collection data
  const tokenAccessQuery = await TokenAccesses.deleteMany({
    token_id: tokenId,
  });

  //delete token with id
  const tokenQuery = await Token.findOneAndDelete({ _id: tokenId });

  //remove token from array of tokens in user collection
  Users.updateOne({ _id: userId }, { $pull: { tokens: tokenId } }, err => {
    if (err) res.send({ msg: err });
    else {
      if (attackerQuery && tokenAccessQuery && tokenQuery) {
        res.status(200).send({ msg: "Token Deleted Successfully", status: 1 });
      } else {
        res.send({ msg: "Token Deletion Failed", status: 0 });
      }
    }
  });
}

async function redirect_empty(req, res) {
  console.log("Asd");
  console.log(req.body);
  res.send();
}

module.exports = {
  changeTokenAssessibility,
  redirect_empty,
  deleteToken,
};
