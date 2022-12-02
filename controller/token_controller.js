const axios = require("axios");
const attacker = require("../models/Attacker");
const User = require("../models/User");
const Token = require("../models/Tokens");
const TokenAccess = require("../models/TokenAccess");
const path = require("path");
const REGEX_IP =
  /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g;
const {
  generate_worddoc,
  generate_excelvba,
  generate_bashscript,
  generate_mysqldump,
  generate_msworddoc,
  generate_msexceldoc,
  generate_kubeconfig,
  generate_awsconfig,
  generate_webGif,
  generate_contentWithoutSource,
  generateHostFile,
  generate_DnsToken,
  generate_RegistryProcess,
  generate_WindowsBatch,
  generate_fakeApiData,
} = require("./token_maker_controller");

//TODO check if the attacker has send the token to any online sandbox platform (by detecting same token access in a certain time)
async function insertAccessTokenDetail(attacker_ip = "0.0.0.0", tokenid) {
  //filtering only the ip address
  console.log(`attack ${attacker_ip}`);
  const ipdata = await axios.get(`http://ip-api.com/json/${attacker_ip}`);

  const ipaddress = attacker_ip.match(REGEX_IP);
  //certain checks to identify if the valid ip address is sent
  if (ipaddress != null) {
    console.log(`ipadd : ${attacker_ip}`);
    if (ipaddress.length > 1) attacker_ip = ipaddress[1];
    else attacker_ip = ipaddress[0];
  } else if (ipdata.data.status != "success") {
    console.log("ipv6 address");
    attacker_ip = "0.0.0.0";
  }

  //check if the ip address and token exist already in database
  //helps to prevent if the attacker open same token multiple times
  const alreadyexist = await checkIfAlreadyExist(tokenid, attacker_ip);
  const isAccessible = await identifyAccessableKey(tokenid);

  //api to find latitude and longitude from ip add
  const ax_res = await axios.get(`http://ip-api.com/json/${attacker_ip}`);

  if (!alreadyexist && isAccessible) {
    let today = new Date();
    //getting the current date
    let currdate =
      today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear();

    //saving in the database
    const attacker_detail = new attacker({
      ip: attacker_ip,
      date: currdate,
      coordinates: [ax_res.data.lon, ax_res.data.lat],
    });

    attacker_detail.save((err, doc) => {
      if (err) console.log(err);
      else {
        let new_tokenaccess = new TokenAccess({
          token_id: tokenid,
          accessed_by: doc._id,
        });

        new_tokenaccess.save((err, doc) => {
          if (err) console.log(err);
          else {
            console.log(doc);
            console.log("[+] New Token Detail added");
          }
        });
      }
    });
  }
}

async function respondCanaryAccess(req, res) {
  let tokenid = req.params.tokenid;

  let attacker_ip = req.body.additional_data.src_ip;
  if (req.body.memo != "canarytokenaccess") {
    console.log("[+] canary checking request");
    res.status(200).send();
    return;
  }
  console.log("[+]Request from token");
  await insertAccessTokenDetail(attacker_ip, tokenid);

  // it is canary respond hence we should always send 200 response
  res.status(200).send();
}

const generateToken = async (req, res) => {
  //getting the session id from front end user logged in
  let body = "";
  req.on("data", chunk => {
    console.log(` ${chunk}`);
    body += chunk;
  });
  req.on("end", async () => {
    let jsonbody = JSON.parse(body);

    await generate_tokens(
      req.params.type,
      jsonbody.sessionid,
      jsonbody.techniqueId,
      res
    );
  });
};

const checkIfAlreadyExist = async (tokenid, attackerip) => {
  let exist = false;

  const dataacc = await TokenAccess.findOne({ token_id: tokenid });

  if (dataacc != undefined) {
    const data = await attacker.findOne({ _id: dataacc.accessed_by });

    if (data != undefined) {
      let ip_addr = data.ip;
      if (ip_addr.includes(attackerip)) {
        console.log("[-] data already exist (no insertion)");
        exist = true;
      }
    }
  }
  return exist;
};

const identifyAccessableKey = async token_id => {
  const tokenData = await Token.findById(token_id);

  if (tokenData) {
    if (tokenData.accessible !== true) {
      console.log("[-] Token accessibilty is turned off");
    }
    return tokenData.accessible;
  }
};

async function insertTokenAccess(req, res) {
  let tokenid = req.params.tokenid;

  let attacker_ip = req.headers["x-forwarded-for"];
  if (attacker_ip == undefined) attacker_ip = res.socket.remoteAddress;
  //filtering only the ip address

  await insertAccessTokenDetail(attacker_ip, tokenid);
  res.status(200).send();
}

async function redirectTokenAccess(req, res) {
  let tokenid = req.params.tokenid;

  let attacker_ip = req.headers["x-forwarded-for"];
  if (attacker_ip == undefined) attacker_ip = res.socket.remoteAddress;
  //filtering only the ip address
  await insertAccessTokenDetail(attacker_ip, tokenid);

  res
    .writeHead(301, {
      Location: `https://google.com`,
    })
    .end();
}

async function insertTokenAccessGif(req, res) {
  let tokenid = req.params.tokenid;
  console.log("gif access token");
  let attacker_ip = req.headers["x-forwarded-for"];
  if (attacker_ip == undefined) attacker_ip = res.socket.remoteAddress;
  //filtering only the ip address
  await insertAccessTokenDetail(attacker_ip, tokenid);
  res.setHeader("Content-Type", "image/gif");
  res.sendFile(path.resolve("E:\\FYP\\decepticon\\img\\giphy"));
  const uri =
    "https://media3.giphy.com/media/7NoNw4pMNTvgc/giphy.gif?cid=ecf05e478p3yiq4287qcz48rtbm0ddmsh34o9c83eiedszba&rid=giphy.gif&ct=g";
  res.setHeader("Content-Type", "image/gif");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.redirect(301, uri);
}
async function generate_tokens(req_type, sessionid, techniqueId, res) {
  const newtoken = new Token({
    type: req_type,
    generated_by: sessionid,
    techniqueId: techniqueId,
  });

  newtoken.save((err, doc) => {
    if (err) console.log(err);
    else {
      User.findOneAndUpdate(
        { _id: sessionid },
        { $push: { tokens: doc._id } },
        (err, data) => {
          if (err) console.log(err);
          else {
            try {
              if (req_type == "worddoc") {
                generate_worddoc(doc._id, res);
              } else if (req_type == "excel_vba") {
                generate_excelvba(doc._id, res);
              } else if (req_type == "linux_bashrc") {
                generate_bashscript(doc._id, res);
              } else if (req_type == "mysql_master") {
                generate_mysqldump(doc._id, res);
              } else if (req_type == "word") {
                generate_msworddoc(doc._id, res);
              } else if (req_type == "excel") {
                generate_msexceldoc(doc._id, res);
              } else if (req_type == "kubeconfig") {
                generate_kubeconfig(doc._id, res);
              } else if (req_type == "aws_keys") {
                generate_awsconfig(doc._id, res);
              } else if (req_type == "web_gif") {
                generate_webGif(doc._id, res);
              } else if (req_type == "content_without_source") {
                generate_contentWithoutSource(doc._id, res);
              } else if (req_type == "hostFile") {
                generateHostFile(doc._id, res);
              } else if (req_type == "dnsToken") {
                generate_DnsToken(doc._id, res);
              } else if (req_type == "registry_process") {
                generate_RegistryProcess(doc._id, res);
              } else if (req_type == "windows_batch") {
                generate_WindowsBatch(doc._id, res);
              } else if (req_type == "fakeApi") {
                generate_fakeApiData(doc._id, res);
              } else console.log("Other Tokens");
            } catch (err) {
              console.log(err.message);
              res.status(500).send("Server Error");
            }
          }
        }
      );
    }
  });
}

module.exports = {
  generateToken,
  insertTokenAccess,
  respondCanaryAccess,
  insertTokenAccessGif,
  redirectTokenAccess,
  insertAccessTokenDetail,
};

/*============CODE TO BE CONVERTED TO JS===========*/

// } else if (req_type == "excel_vba") {
//   const excel_vba = spawn("python", [
//     path.resolve(
//       "" + __dirname + "/../../python_backend/xslm_macrogen.py"
//     ),
//     "--file",
//     "my_macro",
//     "--sessionid",
//     doc._id,
//     "--url",
//     current_ip,
//   ]);

//   //on execution
//   excel_vba.stdout.on("data", (data) => {
//     console.log("Pipe data from python script ...");
//     dataToSend = data.toString();
//   });

//   //on error the message is displayed , python script was not finding the proper directory
//   excel_vba.stderr.on("data", (data) => {
//     console.log(data.toString());
//   });

//   //on close of script
//   excel_vba.on("close", (code) => {
//     console.log(
//       `child process close all stdio with code ${code}`
//     );
//     res.download(
//       path.resolve(
//         "" +
//           __dirname +
//           "/../../python_backend/mal_docs/my_macro.xlsm"
//       )
//     );
//   });

// } else if (req_type == "windowsfolder") {
//   const python = spawn("python", [
//     path.resolve(
//       "" +
//         __dirname +
//         "/../../python_backend/WindowsFolderToken.py"
//     ),

//     "--url",
//     current_ip,
//     "--tokenid",
//     doc._id,
//   ]);
//   python.stdout.on("data", (data) => {
//     console.log("Pipe data from python script ...");
//     dataToSend = data.toString();
//   });

//   //on error the message is displayed , python script was not findinf the proper directory
//   python.stderr.on("data", (data) => {
//     console.log("error here");
//     console.log(data.toString());
//   });

//   //on close of script
//   python.on("close", (code) => {
//     console.log(
//       `child process close all stdio with code ${code}`
//     );
//     res.download(
//       path.resolve(
//         "" +
//           __dirname +
//           "/../../python_backend/TokenFiles/folderToken_client.zip"
//       )
//     );
//   });
