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
  console.log(`user connected socket: ${socket.id}`);
  // Emit event fromt server to client
  socket.emit("server", {
    msg: "hello from server",
  });

  socket.on("react", (data) => {
    console.log(data);
  });
  socket.on("join-room", (data) => {
    const { username, roomID } = data;
    console.log("user connected a room:", roomID, "with name", username);

    socket.join(roomID);

    socket.broadcast.emit("member-join", {
      username,
      roomID,
    });
  });

  socket.on("disconnect", () => {
    console.log(`user disconnected: ${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log("server connected");
});
