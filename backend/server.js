const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const config = require("./src/config/database.config");

const PORT = config.app.port;

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});

io.on("connection", (socket) => {
    socket.on("send-msg", (data) => {
        console.log(data);
    });
    socket.emit("server", "hello from server");

    // Broadcast when user connected
    socket.broadcast.emit("message", "a user has joined the room");

    // When client disconnected
    socket.on("disconnect", () => {
        io.emit("message", "a user has been left");
    });
});

httpServer.listen(PORT, () => {
    console.log("server connected");
});
