const express = require("express");
const { v4: uuidV4 } = require("uuid");

const app = require("./app");

app.use("/", (req, res) => {
    res.send({ id: uuidV4() });
});

app.listen(5000, () => {
    console.log("connected server success");
});
