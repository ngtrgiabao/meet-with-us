<<<<<<< HEAD
        const express = require('express');
        const app = express();
        const admin = require('firebase-admin');
        const functions = require('firebase-functions');
        // interface MyRequest extends Request {
        //     myCustomProperty: string;
        // }

        // interface MyResponse extends Response {
        //     myCustomMethod: (message: string) => void;
        // }

        // app.get('/', (req: MyRequest, res: MyResponse) => {
        //     const myCustomProperty = req.myCustomProperty;
        //     res.myCustomMethod;
        // });
        // Khởi tạo Firebase
        admin.initializeApp(functions.config().firebase);

        // Khởi tạo Firebase Authentication
        const auth = admin.auth();
        // Xử lý đăng ký
        app.post('/signup', async(req, res) => {
            try {
                const { email, password } = req.body;

                // Tạo tài khoản
                const userRecord = await auth.createUser({
                    email: email,
                    password: password,
                });

                // Trả về thông tin người dùng
                res.status(200).json({
                    message: 'Đăng ký thành công',
                    user: userRecord.toJSON(),
                });
            } catch (error) {
                res.status(400).json({
                    message: 'Đăng ký không thành công',
                    error: error.message,
                });
            }
        });
        // exports.app = functions.https.onRequest(app);
        // const handleCreateIdRoom = () => {
        //     peer.on("open", (id) => {
        //         setPeerId(id);
        //     });
        //     console.log(peerId);
        // };
=======
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
>>>>>>> main
