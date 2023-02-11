const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("helo");
});

module.exports = app;
