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

app.get("/:room", (req, res) => {
    res.render("room", {
        roomID: req.params.room,
    });
});

io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("join", (room) => {
        console.log(`Member ${socket.id} joined room ${room}`);

        socket.join(room);
        socket.to(room).emit("user-connected", { userID: socket.id });
    });
    socket.on("signal", (data) => {
        console.log(`Member ${socket.id} signaling to ${data.target}`);

        socket
            .to(data.target)
            .emit("signal", { sender: socket.id, signal: data.signal });
    });

    socket.on("disconnect", () => {
        console.log(`Member ${socket.id} disconnected`);
        socket.broadcast.emit("user-disconnected", socket.id);
    });
});

httpServer.listen(PORT, () => {
    console.log("server connected");
});
