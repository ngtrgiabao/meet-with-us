const { Server } = require("socket.io");
const express = require("express");
<<<<<<< HEAD:backend/src/server.js
const http = require("http");
const { v4: uuidV4 } = require("uuid");
=======
const { createServer } = require("http");
const { Server } = require("socket.io");
>>>>>>> main:backend/server.js

const app = require("./app");
const { route } = require("./src/api/v1/user/user.route");
const httpServer = createServer(app);

<<<<<<< HEAD:backend/src/server.js
const server = http.createServer(app);

app.use((req, res) => {
    res.send({ id: uuidV4() });
});

app.listen(3000, () => {
    console.log("connected server success");
=======
const io = new Server(httpServer, {
    /* options */
});

io.on("connection", (socket) => {
    console.log("hello");
>>>>>>> main:backend/server.js
});

httpServer.listen(3000);
