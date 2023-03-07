const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

const app = require("./app");
const config = require("./src/config/database.config");

const PORT = config.app.port;
const API_KEY = "82f46fe4-9cce-4647-8c6c-ab657a3a58b8";
const SECRET =
    "3e313418ceedb3fa1a023e6886ed6cc8d05fcfcfea6f7783d254718544efcfdf";

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

    const options = {
        expiresIn: "10m",
        algorithm: "HS256",
    };
    const payload = {
        apikey: API_KEY,
        permissions: ["allow_join", "allow_mod"], // `ask_join` || `allow_mod`
        version: 2,
        roles: ["CRAWLER"],
    };

    const token = jwt.sign(payload, SECRET, options);
    console.log(token);

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
