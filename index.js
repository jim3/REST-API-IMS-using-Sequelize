const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));

// routes
app.use("/", require("./routes/partsRoute"));

// sync the database
const sequelize = require("./db");
const Parts = require("./models/Parts");
const Accounts = require("./models/Accounts");
sequelize.sync().then(() => {
    console.log("Synced db.");
});

// start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
