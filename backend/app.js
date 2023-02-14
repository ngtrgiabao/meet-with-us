const express = require("express");
const cors = require("cors");
const app = express();
const logEvents = require("./src/api/v1/helper/log.helper");

const middleWare = require("./src/api/v1/user/user.middleware");
const userRouter = require("./src/api/v1/user/user.route.js");

const ApiError = require("./src/api.error");

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(middleWare);

app.use("/api/v1", userRouter);

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    logEvents(`${req.url}------${req.method}------${err.message}`);
    return res.status(err.statusCode || 500).json({
        msg: err.message || "Internal Server Error",
    });
});

module.exports = app;
