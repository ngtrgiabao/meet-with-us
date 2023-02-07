const express = require("express");

const app = express();

app.use("/", (req, res) => {
    res.send("hello");
});

app.listen(3000, () => {
    console.log("hello");
});