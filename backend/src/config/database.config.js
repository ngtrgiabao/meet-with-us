require("dotenv").config();

module.exports = {
    app: {
        port: process.env.PORT || 3002,
    },
    firebase: {
        config: {
            apiKey: process.env.API_KEY_FIREBASE,
            authDomain: process.env.AUTH_DOMAIN,
            projectId: process.env.PROJECT_ID,
            storageBucket: process.env.STORAGE_BUCKET,
            messagingSenderId: process.env.MSG_SENDER_ID,
            appId: process.env.APP_ID,
        },
    },
    room: {
        apiKey: process.env.ROOM_API_KEY,
        secretKey: process.env.ROOM_SECRET_KEY,
    },
};
