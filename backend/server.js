const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const { route } = require("./src/api/v1/user/user.route");
const { port } = require("./src/config/database.config");
const httpServer = createServer(app);

const io = new Server(httpServer, {});

io.on("connection", (socket) => {
    console.log("hello");
});

httpServer.listen(port);
