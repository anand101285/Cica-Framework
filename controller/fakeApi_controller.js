const { json } = require("body-parser");
const fs = require("fs");
const path = require("path");
const { insertAccessTokenDetail } = require("./token_controller");

async function getFakeUserData(req, res) {
  const authKey = req.body.AuthenticationKeyServer;
  let attacker_ip = req.headers["x-forwarded-for"];
  if (attacker_ip == undefined) attacker_ip = res.socket.remoteAddress;
  else attacker_ip = "0.0.0.0";

  await insertAccessTokenDetail(attacker_ip, authKey);

  let rawData = fs.readFileSync(
    path.resolve(__dirname + "./../python_backend/FakeUserData/fakeUser.json")
  );
  res.send(rawData);
}

async function getSpecificUser(req, res) {
  const authKey = req.body.AuthenticationKeyServer;
  const userId = req.body._id;
  let attacker_ip = req.headers["x-forwarded-for"];
  if (attacker_ip == undefined) attacker_ip = res.socket.remoteAddress;
  else attacker_ip = "0.0.0.0";

  await insertAccessTokenDetail(attacker_ip, authKey);

  fs.readFile(
    path.resolve(__dirname + "./../python_backend/FakeUserData/fakeUser.json"),
    "utf-8",
    (err, data) => {
      if (err) console.log(err);
      else {
        const userData = JSON.parse(data);
        const selectedUser = userData.filter(value => value._id == userId);
        res.send(selectedUser);
      }
    }
  );

  //TODO fix
}

module.exports = {
  getFakeUserData,
  getSpecificUser,
};
