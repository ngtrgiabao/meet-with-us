const express = require("express");
const app = express();
const admin = require("firebase-admin");
const functions = require("firebase-functions");

// Khởi tạo Firebase
admin.initializeApp(functions.config().firebase);

// Khởi tạo Firebase Authentication
const auth = admin.auth();
// Xử lý đăng ký
app.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Tạo tài khoản
        const userRecord = await auth.createUser({
            email: email,
            password: password,
        });

        // Trả về thông tin người dùng
        res.status(200).json({
            message: "Đăng ký thành công",
            user: userRecord.toJSON(),
        });
    } catch (error) {
        res.status(400).json({
            message: "Đăng ký không thành công",
            error: error.message,
        });
    }
});
