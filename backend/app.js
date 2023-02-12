const express = require("express");
const app = express();
const router = require("./src/api/v1/user/user.route.js");

app.use("/api/v1", router);

module.exports = app;
