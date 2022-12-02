const path = require("path");
const fs = require("fs");

hostname = "vxwwd0vahwd5zwh8gwosgvds2.canarytokens.com";
const MasterQuery = `SET @bb = CONCAT(\"CHANGE MASTER TO MASTER_PASSWORD='my-secret-pw',MASTER_HOST='${hostname}', MASTER_USER='counterintelligenceframework\", @@lc_time_names, @@hostname, \"';\");`;
let encoded = Buffer.from(MasterQuery, "ascii");
let tosend = encoded.toString("base64");

fs.readFile(
  path.resolve(__dirname + "/../python_backend/TokenFiles/Mysqltoken.txt"),
  "utf-8",
  (err, data) => {
    // console.log(data);
    data = data.replace(/base64masterhere/g, tosend);
    fs.writeFile(
      path.resolve(__dirname + "/../python_backend/TokenFiles/client.sql"),
      data,
      (err, data) => {
        if (err) console.log("err" + err);
      }
    );
  }
);
