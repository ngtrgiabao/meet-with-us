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

const users = {};
const socketToRoom = {};

io.on("connection", (socket) => {
    console.log(`user connected socket: ${socket.id}`);
    // Emit event fromt server to client
    socket.emit("server", {
        msg: "hello from server",
    });

    socket.on("react", (data) => {
        // Get msg from client
        const { msg } = data;
        console.log(msg);
    });
    socket.on("join-room", (roomID) => {
        /* Checking if the roomID exists in the users object. */
        if (users[roomID]) {
            const length = users[roomID].length;

            // Length of room
            if (length === 4) {
                socket.emit("room-full");
                return;
            }
            users[roomID].push(socket.id);
        } else {
            /* creating a new room if the room doesn't exist. */
            users[roomID] = [socket.id];
        }

        // Add member ID to list room
        socketToRoom[socket.id] = roomID;

        // Log list of members joined room, except member join recently
        const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);

        socket.broadcast.emit("all-users", usersInThisRoom);
    });
    socket.on("sending-signal", (payload) => {
        // Emit when member join
        io.to(payload.userToSignal).emit("user-joined", {
            signal: payload.signal,
            callerID: payload.callerID,
        });
    });
    socket.on("returning-signal", (payload) => {
        // Emit msg get signal success from client
        io.to(payload.callerID).emit("receiving-returned-signal", {
            signal: payload.signal,
            id: socket.id,
        });
    });

    socket.on("disconnect", () => {
        // Delete user when leave room
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter((id) => id !== socket.id);
            users[roomID] = room;
        }
    });
});

httpServer.listen(PORT, () => {
    console.log("server connected");
});
