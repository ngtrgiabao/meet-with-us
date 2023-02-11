const { Server } = require("socket.io");
const express = require("express");
const http = require("http");
const { v4: uuidV4 } = require("uuid");

const app = require("./app");

const server = http.createServer(app);

app.use((req, res) => {
    res.send({ id: uuidV4() });
});

app.listen(3000, () => {
    console.log("connected server success");
});
