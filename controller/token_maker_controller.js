var fs = require("fs");
const path = require("path");
const axios = require("axios");
const admZip = require("adm-zip");
const { PING_URL } = require("../config/config");
var shortUrlMaker = require("node-url-shortener");

async function downloadAgent(req, res) {
  try {
    const file = path.resolve(__dirname + "/../python_backend/agent/main.txt");
    res.download(file);
  } catch (err) {
    console.log(err);
  }
}

//generate Worddoc document and download it to user
async function generate_worddoc(sessionid, res) {
  //TODO change url
  url_to_ping = `http://${PING_URL}/honeytoken/ping/${sessionid}`;
  fs.readFile(
    path.resolve(__dirname + "/../python_backend/webbug.doc"),
    "utf-8",
    (err, data) => {
      if (err) res.send("Error ");

      const replaced = data.replace("ngrok-link-here", url_to_ping);

      fs.writeFile(
        path.resolve(__dirname + "/../python_backend/newwebbug.doc"),
        replaced,
        "utf-8",
        (err, data) => {
          if (err) res.send("Error ");
          res.download(__dirname + "/../python_backend/newwebbug.doc");
        }
      );
    }
  );
}
async function generate_webGif(sessionid, res) {
  url_to_ping = `http://${PING_URL}/honeytoken/ping/${sessionid}/fun.gif`;
  res.status(200).json({
    url: url_to_ping,
  });
}

//TODO fix this function to generate proper excel_vba as
async function generate_excelvba(sessionid, res) {
  //create xlsm file
  fs.writeFile(
    path.resolve(__dirname + "/../python_backend/mal_docs/my_macrotest.xlsm"),
    "",
    (err, data) => {
      if (err) console.log(err);
      res.download(__dirname + "/../python_backend/mal_docs/mal_excel.xlsm");
    }
  );

  //create new vba file for
}

async function generate_bashscript(sessionid, res) {
  let filepath = path.resolve(
    __dirname + "/../python_backend/executable_scripts/"
  );
  fs.readFile(
    path.resolve(filepath + "/Linux_executable.sh"),
    "utf8",
    (err, data) => {
      if (err) console.log(err);
      var result = data.replace(
        /urlhere/g,
        "http://" + PING_URL + "/honeytoken/ping/" + sessionid
      );
      fs.writeFile(filepath + "/Linux_executable1.sh", result, "utf8", err => {
        if (err) console.log(err);
        else {
          // console.log("Done creating linux executable");
          res.download(path.resolve(filepath + "/Linux_executable1.sh"));
        }
      });
    }
  );
}

async function generate_awsconfig(sessionid, res) {
  const URLPING = "http://" + PING_URL + "/honeytoken/ping/" + sessionid;
  const canarydata = await getCanaryData(URLPING, "aws_keys");
  const AwsData = `[default]\naws_access_key=${canarydata.aws_access_key_id}\naws_secret_access_key=${canarydata.aws_secret_access_key}\nregion=${canarydata.region}\noutput=json`;
  const AWSCLIENT = path.resolve(
    __dirname + "/../python_backend/TokenFiles/aws_client.txt"
  );
  fs.writeFile(AWSCLIENT, AwsData, (err, data) => {
    if (err) console.log(err);
    else {
      res.download(AWSCLIENT);
    }
  });
}

async function generate_kubeconfig(sessionid, res) {
  const URLPING = "http://" + PING_URL + "/honeytoken/ping/" + sessionid;
  const KUBECONFIGFILE = path.resolve(
    __dirname + "/../python_backend/TokenFiles/kubeconfig.txt"
  );
  const KUBECONFIGCLIENT = path.resolve(
    __dirname + "/../python_backend/TokenFiles/kubeconfig_client.txt"
  );

  fs.readFile(KUBECONFIGFILE, "utf-8", (err, data) => {
    if (err) console.log(err);
    else {
      data = data.replace("URLHERE", URLPING);
      fs.writeFile(KUBECONFIGCLIENT, data, (err, data) => {
        if (err) console.log(err);
        else {
          res.download(KUBECONFIGCLIENT);
        }
      });
    }
  });
}

async function generate_mysqldump(sessionid, res) {
  const URLPING = "http://" + PING_URL + "/honeytoken/ping/" + sessionid;
  const data = await getCanaryData(URLPING, "my_sql");
  const hostname = data.Hostname;
  const MasterQuery = `SET @bb = CONCAT(\"CHANGE MASTER TO MASTER_PASSWORD='my-secret-pw',MASTER_HOST='${hostname}', MASTER_USER='counterintelligenceframework\", @@lc_time_names, @@hostname, \"';\");`;
  let encoded = Buffer.from(MasterQuery, "ascii");
  let base64_encoded_string = encoded.toString("base64");

  fs.readFile(
    path.resolve(__dirname + "/../python_backend/TokenFiles/Mysqltoken.txt"),
    "utf-8",
    (err, data) => {
      if (err) console.log(err);
      data = data.replace(/base64masterhere/g, base64_encoded_string);
      fs.writeFile(
        path.resolve(__dirname + "/../python_backend/TokenFiles/client.sql"),
        data,
        (err, data) => {
          if (err) console.log("err" + err);
          res.download(
            path.resolve(__dirname + "/../python_backend/TokenFiles/client.sql")
          );
        }
      );
    }
  );
}
async function generate_msworddoc(sessionid, res) {
  const URLPING = "http://" + PING_URL + "/honeytoken/ping/" + sessionid;
  const FILENAME = "wordtoken";
  const XMLPATH = path.resolve(
    __dirname +
      `/../python_backend/TokenFiles/${FILENAME}/word/_rels/footer2.xml.rels`
  );
  const EXTRACTEDPATH = path.resolve(
    __dirname + `/../python_backend/TokenFiles/${FILENAME}`
  );
  const clientZipFile = path.resolve(
    __dirname + `/../python_backend/TokenFiles/${FILENAME}_client.zip`
  );

  const zip = new admZip(
    path.resolve(__dirname + `/../python_backend/TokenFiles/${FILENAME}.zip`)
  );
  const zipclient = new admZip();
  zip.extractAllTo(EXTRACTEDPATH);
  fs.readFile(XMLPATH, "utf-8", (err, data) => {
    if (err) console.log(err);
    else {
      data = data.replace("ngrok-link-here", URLPING);
      fs.writeFile(XMLPATH, data, (err, data) => {
        if (err) console.log(err);
        else {
          zipclient.addLocalFolder(EXTRACTEDPATH);
          zipclient.writeZip(clientZipFile);
          fs.rm(EXTRACTEDPATH, { recursive: true }, err => console.log(err));
          res.download(clientZipFile);
        }
      });
    }
  });
}

async function generate_msexceldoc(sessionid, res) {
  const URLPING = "http://" + PING_URL + "/honeytoken/ping/" + sessionid;
  const FILENAME = "exceltoken";
  const XMLPATH = path.resolve(
    __dirname +
      `/../python_backend/TokenFiles/${FILENAME}/xl/drawings/_rels/drawing1.xml.rels`
  );
  const EXTRACTEDPATH = path.resolve(
    __dirname + `/../python_backend/TokenFiles/${FILENAME}`
  );
  const clientZipFile = path.resolve(
    __dirname + `/../python_backend/TokenFiles/${FILENAME}_client.zip`
  );

  const zip = new admZip(
    path.resolve(__dirname + `/../python_backend/TokenFiles/${FILENAME}.zip`)
  );
  const zipclient = new admZip();
  zip.extractAllTo(EXTRACTEDPATH);
  fs.readFile(XMLPATH, "utf-8", (err, data) => {
    if (err) console.log(err);
    else {
      data = data.replace("ngrok-link-here", URLPING);
      fs.writeFile(XMLPATH, data, (err, data) => {
        if (err) console.log(err);
        else {
          zipclient.addLocalFolder(EXTRACTEDPATH);
          zipclient.writeZip(clientZipFile);
          fs.rm(EXTRACTEDPATH, { recursive: true }, err => console.log(err));
          res.download(clientZipFile);
        }
      });
    }
  });
}

async function generate_contentWithoutSource(sessionid, res) {
  url_to_ping = `http://${PING_URL}/honeytoken/ping/${sessionid}/fun.gif`;
  res.status(200).json({
    url: url_to_ping,
  });
}

async function generate_DnsToken(sessionid, res) {
  url_to_ping = `http://${PING_URL}/honeytoken/ping/redirect/${sessionid}/`;
  shortUrlMaker.short(url_to_ping, (err, url) => {
    if (err) console.log(err);
    else {
      res.status(200).json({
        url: url,
      });
    }
  });
}

async function generateHostFile(sessionid, res) {
  url_to_ping = `http://${PING_URL}/honeytoken/ping/redirect/${sessionid}`;
  const HOSTPATH = path.resolve(
    __dirname + `/../python_backend/TokenFiles/host_client.txt`
  );

  const CLIENTHOSTPATH = path.resolve(
    __dirname + `/../python_backend/TokenFiles/host`
  );
  shortUrlMaker.short(url_to_ping, (err, url) => {
    if (err) {
      res.send(404).send();
    } else {
      fs.readFile(HOSTPATH, "utf-8", (err, data) => {
        if (err) console.log(err);
        else {
          data = data.replace("host-here", url);
          fs.writeFile(CLIENTHOSTPATH, data, err => {
            if (err) console.log(err);
            else {
              res.download(CLIENTHOSTPATH);
            }
          });
        }
      });
    }
  });
}

async function generate_WindowsBatch(sessionid, res) {
  url_to_ping = `http://${PING_URL}/honeytoken/ping/${sessionid}`;
  const BATCHREQ = path.resolve(
    __dirname + `/../python_backend/TokenFiles/batch_request.bat`
  );

  const BATCHREQCLIENT = path.resolve(
    __dirname + `/../python_backend/TokenFiles/batch_request_client.bat`
  );

  fs.readFile(BATCHREQ, "utf-8", (err, data) => {
    if (err) console.log(err);
    else {
      data = data.replace("ngrok-link-here", url_to_ping);
      fs.writeFile(BATCHREQCLIENT, data, err => {
        if (err) console.log(err);
        else {
          res.download(BATCHREQCLIENT);
        }
      });
    }
  });
}

async function generate_RegistryProcess(sessionid, res) {
  url_to_ping = `http://${PING_URL}/honeytoken/ping/${sessionid}`;
  const REGPATH = path.resolve(
    __dirname + `/../python_backend/TokenFiles/process_call_ping.reg.txt`
  );
  const CLIENTREGPATH = path.resolve(
    __dirname + `/../python_backend/TokenFiles/process_call_client.reg.txt`
  );

  fs.readFile(REGPATH, "utf-8", (err, data) => {
    if (err) console.log(err);
    else {
      data = data.replace("ngrok-link-here", url_to_ping);
      fs.writeFile(CLIENTREGPATH, data, err => {
        if (err) console.log(err);
        else {
          res.download(CLIENTREGPATH);
        }
      });
    }
  });
}

async function generate_fakeApiData(sessionid, res) {
  const host = PING_URL;
  const APIPATH = path.resolve(
    __dirname + `/../python_backend/TokenFiles/FakeAPI.json`
  );

  const APICLIENTPATH = path.resolve(
    __dirname + `/../python_backend/TokenFiles/FakeAPI_client.json`
  );
  fs.readFile(APIPATH, "utf-8", (err, data) => {
    if (err) console.log(err);
    else {
      data = data.replace(/host-here/gi, host);
      data = data.replace(/tokenid-here/gi, sessionid);
      fs.writeFile(APICLIENTPATH, data, err => {
        if (err) console.log(err);
        else {
          res.download(APICLIENTPATH);
        }
      });
    }
  });
}

async function getCanaryData(url, type) {
  const CANARY_URL = "https://canarytokens.com/generate";
  var FormData = require("form-data");
  var data = new FormData();
  data.append("type", type);
  data.append("email", "");
  data.append("webhook", url);
  data.append("memo", "canarytokenaccess");
  config = {
    method: "post",
    url: CANARY_URL,
    headers: {
      ...data.getHeaders(),
    },
    data: data,
  };
  return axios(config)
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(err => console.log(err));
}

module.exports = {
  generate_worddoc,
  generate_excelvba, //to be done
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
  downloadAgent,
};
