const express = require("express");

const app = express();
require("dotenv").config();
const path = require('path');
const { fileURLToPath } = require('url');
const __filenamee = path.join(__dirname, 'server.js');
const __dirnamee = path.dirname(__filenamee);
app.use(express.json());

require("dotenv").config();
const dbConfig = require("./config/dbconfig");
const User = require("./models/user");

var mongodb = require("mongodb");
var ObjectId = mongodb.ObjectId;

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Backend is up and running!" });
});

app.use(express.static(path.join(__dirnamee, '/client/build')));
app.get('*', (req, res) => {
  res.send("Backend works");
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Node Server started at port " + port));
