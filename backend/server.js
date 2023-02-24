const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const config = require("./src/config/database.config");

const { controler } = require("./src/api/v1/user/user.controller");

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
    console.log(`user connected socket: ${socket.id}`);

    socket.emit("server", {
        msg: "hello from server",
    });
    socket.broadcast.emit("member-join", {
        msg: "helllo from broadcast backend",
    });
    // socket.on("createUser", async (userData, callback) => {
    //     try {
    //         const {userId} = await controler.create(userData);
    //         callback({ userId });
    //         console.log(`user id: ${userId} `);
    //     } catch (error) {
    //         callback({ error: error.message });
    //     }
    // });

    io.on("connection", (socket) => {
        socket.broadcast.emit("hello", "world");
    });

    socket.on("join-room", (text) => {
        console.log(text);
    });
    /*socket.on("react", (data) => {
        console.log(data);
    });
    socket.on("join-room", (data) => {
        const { roomID, userID } = data;
        console.log("connected a room:", roomID, socket.rooms);
        socket.to(roomID).emit("join-room-accept", "hello");
    });
    socket.on("disconnect", () => {
        console.log(`user disconnected: ${socket.id}`);
    });*/
});

httpServer.listen(PORT, () => {
    console.log("server connected");
});
