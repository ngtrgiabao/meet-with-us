const http = require("http");

const app = require("./app");
const config = require("./src/config/database.config");

const PORT = config.app.port;

const httpServer = http.createServer(app);

app.get("/:room", (req, res) => {
    res.render("room", {
        roomID: req.params.room,
    });
});

httpServer.listen(PORT, () => {
    console.log("server connected");
});
