const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const config = require("./src/config/database.config");

const PORT = config.app.port;

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`user  connected: ${socket.id}`);
    socket.on("send-msg", (data) => {
        console.log(data);
    });
});

httpServer.listen(PORT, () => {
    console.log("server connected");
});
