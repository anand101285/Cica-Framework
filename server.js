const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

app.get("/", (req, res) => res.send("API Running"));

app.use(express.json({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use("/viewaccess", require("./routes/api/get_details"));
app.use("/api/honeytoken", require("./routes/api/honeytoken"));
app.use("/download/exe/", require("./routes/api/download_file"));
app.use("/mongo", require("./routes/api/testing_route"));
app.use("/api/database", require("./routes/api/database"));

// auth, login and sign-up
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
// app.use("/api/profile", require("./routes/api/profile"));

// error handling route
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message } || "An unknown error occurred");
});

const PORT = process.env.PORT || 5000;
const url_db = process.env.MONGO_DB_URI;
mongoose.connect(
    url_db ||
        "//mongodb+srv://cicaf2021:Counterintelligenceattack2021@cluster0.vscuv.mongodb.net/CounterAttackdb?retryWrites=true&w=majority",
    (err) => (err ? console.log(err) : console.log("[+] connected to mongo"))
);
// const PORT = 5000;
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

if (process.ENV.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "client", "build")));
}
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
