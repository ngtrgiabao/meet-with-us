require("dotenv").config();

module.exports = {
    app: {
        port: process.env.PORT || 3002,
    },
    socket: {
        port: process.env.SOCKET_PORT || 4001,
    },
    firebase: {
        config: {
            apiKey: process.env.API_KEY_FIREBASE,
            authDomain: "test-626ec.firebaseapp.com",
            projectId: "test-626ec",
            storageBucket: "test-626ec.appspot.com",
            messagingSenderId: "542868177162",
            appId: process.env.APP_ID,
        },
    },
};
