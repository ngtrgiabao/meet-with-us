const express = require("express");
const cors = require("cors");
const app = express();
const middleWare = require("./src/api/v1/user/user.middleware");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(middleWare);
module.exports = app;
