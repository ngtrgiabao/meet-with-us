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

io.on("connection", (socket) => {
    console.log(`user  connected: ${socket.id}`);
    socket.on("send-msg", (data) => {
        console.log(data);
    });
    socket.emit("server", {
        msg: "hello from server",
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
    /*io.on("connection", (socket) => {
        socket.broadcast.emit("hello", "world");
    });*/
    socket.on("join-room", (text) => {
        console.log(text);
    });
    socket.broadcast.emit("room-join", {
        msg: "helllo from broadcast backend",
    });
});

httpServer.listen(PORT, () => {
    console.log("server connected");
});
