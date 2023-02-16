require("dotenv").config();

module.exports = {
    app: {
        port: process.env.PORT || 5000,
    },
    socket: {
        port: process.env.SOCKET_PORT || 5001,
    },
    firebase: {
        config: {
            apiKey: process.env.API_KEY_FIREBASE,
            authDomain: "test-626ec.firebaseapp.com",
            projectId: "test-626ec",
            storageBucket: "test-626ec.appspot.com",
            messagingSenderId: "542868177162",
            appId: "1:542868177162:web:fb0bd9ccf0d4cc7b75faf3",
        },
    },
};
