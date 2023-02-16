const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const config = require("./src/config/database.config");

const PORT = config.app.port;
const SOCKET_PORT = config.socket.port;

const httpServer = createServer(app);

app.listen(PORT, () => {
    console.log("Conected to server!");
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log(socket, "is connected");
});

io.listen(SOCKET_PORT);
