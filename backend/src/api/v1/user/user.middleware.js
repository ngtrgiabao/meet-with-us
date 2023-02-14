const express = require("express");
const middleWare = express();

const userValidation = require("./user.validation");
const ApiError = require("../../../api.error");

/* ==================================  ÁP DỤNG STRATEGY PATTERN ===============================================*/

//Middleware xử lí khi người dùng vào trang chủ ứng dụng
middleWare.get("/", (req, res) => {
    res.json({ Notification: "Welcome to Meet-with-us!" });
});

middleWare.get(
    "/login/user/:id",
    (req, res, next) => {
        console.log("ID:", req.params.id);
        next();
    },
    (req, res, next) => {
        res.send("User Information");
    }
);

//Middleware xử lí khi người cố ý thay đổi đường dẫn là admin mà không đăng nhập
middleWare.get("/admin*", (req, res, next) => {
    res.send("If you are admin, please sign in as admin!");
    next();
});

middleWare.get("/login/admin", (req, res, next) => {
    res.send("You are sign in as admin!");
});

module.exports = middleWare;
