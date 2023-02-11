const express = require("express");
const middleWare = express();
const userValidation = require("./user.validation");

class ApiError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
/* ==================================  ÁP DỤNG STRATEGY PATTERN ===============================================*/

//Middleware xử lí khi người dùng vào trang chủ ứng dụng
middleWare.get("/", (req, res) => {
  res.json({ Notification: "Welcome to Meet-with-us!" });
});

//Middleware xử lí khi người dùng đăng nhập sai
/*middleWare.get("/login/user", (req, res, next) => {
  return next(new ApiError(userValidation));
});*/
middleWare.get(
  "/login/user/:id",
  (req, res, next) => {
    console.log("ID:", req.params.id);
    next();
  },
  (req, res, next) => {
    res.send("User Info");
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

//Middle-ware xử lí phản hồi lỗi 404
middleWare.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

//Middle-ware xử lí lỗi tập trung
middleWare.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = middleWare;
