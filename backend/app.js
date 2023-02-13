const express = require("express");
const app = express();
<<<<<<< HEAD
const middleWare = require("./src/api/v1/user/user.middleware");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(middleWare);
=======
const router = require("./src/api/v1/user/user.route.js");

app.use("/api/v1", router);

>>>>>>> main
module.exports = app;
