const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const { port } = require("./src/config/database.config");

const httpServer = createServer(app);

app.listen(3000, () => {
    console.log("Conected to server!");
});

const io = new Server(httpServer, {
    /* options */
});

io.on("connection", (socket) => {
    console.log("hello", socket);
});

httpServer.listen(port);
