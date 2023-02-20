const { createServer } = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const config = require("./src/config/database.config");

const PORT = config.app.port;
const SOCKET_PORT = config.socket.port;

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3002",
        credentials: true,
        optionSuccessStatus: 200,
    },
});

io.on("connection", (socket) => {
    console.log("Socketio in server connected");
});

io.listen(SOCKET_PORT);
httpServer.listen(PORT, () => {
    console.log("server connected");
});
