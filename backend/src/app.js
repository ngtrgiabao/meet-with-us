const express = require("express");
const app = express();
const router = require("./src/api/v1/user/user.route.js");

<<<<<<< HEAD:backend/src/app.js
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("helo");
});
=======
app.use("/api/v1", router);
>>>>>>> main:backend/app.js

module.exports = app;
