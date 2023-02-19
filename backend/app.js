const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const route = require("./src");
const logEvents = require("./src/api/v1/helper/log.helper");
const ApiError = require("./src/api.error");
const middleWare = require("./src/api/v1/user/user.middleware");

//Config backend
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(middleWare);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use("/api/v1/user", route.userRoute);
app.use("/api/v1/room", route.roomRoute);

//_404
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

//Log error in file /logs/log.log
app.use((err, req, res, next) => {
    logEvents(`${req.url}------${req.method}------${err.message}`);
    return res.status(err.statusCode || 500).json({
        msg: err.message || "Internal Server Error",
    });
});

module.exports = app;
