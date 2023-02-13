const express = require("express");
const app = express();
const middleWare = require("./src/api/v1/user/user.middleware");
const router = require("./src/api/v1/user/user.route.js");

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(middleWare);

app.use("/api/v1", router);

module.exports = app;
