const os = require("os-utils");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

const mongoose = require("mongoose");
require("dotenv").config();

//ENV Variables
const PORT = process.env.PORT || 5000;
const MONGO_URLDB = process.env.MONGO_DB_URI;

mongoose.connect(MONGO_URLDB, err =>
  err ? console.log(err) : console.log("[+] connected to mongo")
);

app.use(express.json({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + "/public"));

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.of("/api/socket").on("connection", socket => {
  console.log("socket.io: User connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("socket.io: User disconnected: ", socket.id);
  });
});

app.use("/honeytoken", require("./routes/honeytoken"));
app.use("/download/exe/", require("./routes/download_file"));
app.use("/database", require("./routes/database"));
app.use("/elasticsearch", require("./routes/elasticsearch"));
app.use("/api/token", require("./routes/fakeApi"));
app.use("/mitre", require("./routes/mitre"));
// auth, login and sign-up
app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
app.use("/honeypot", require("./routes/honeypot"));
// app.use("/test-c", require("./routes/get_details"));
app.use("/attacker", require("./routes/attackerProfile"));

// error handling route
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message } || "An unknown error occurred");
});

mongoose.createConnection(MONGO_URLDB, err =>
  err ? console.log(err) : console.log("[+] Server connected to mongo")
);

app.use(express.static(path.join(__dirname, "./client/build")));

//start the server
server.listen(PORT, () => console.log(`Server now running on port ${PORT}!`));

// Socket Connection
const connection = mongoose.connection;
connection.once("open", () => {
  // setInterval(() => {
  //   os.cpuUsage((v) => {
  //     const date = new Date();
  //     io.of("/api/socket/").emit("cpu", {
  //       name: `${date.getMinutes()} : ${date.getSeconds()}`,
  //       value: v * 100,
  //     });
  //   });
  // }, 5000);
  //   console.log("Setting change streams");

  const TokensChangeStream = connection.collection("tokens").watch();

  TokensChangeStream.on("change", change => {
    switch (change.operationType) {
      case "insert":
        const accessed = {
          type: change.fullDocument.type,
        };
        io.of("/api/socket").emit("tokenaccesses", accessed);
        break;
    }
  });

  const TokenAccessedStream = connection.collection("tokenaccesses").watch();
  TokenAccessedStream.on("change", change => {
    switch (change.operationType) {
      case "insert":
        const accessed = {
          type: change.fullDocument.type,
        };
        io.of("/api/socket").emit("tokenaccesses", accessed);
        break;
    }
  });
});

connection.on("error", error => console.log());
