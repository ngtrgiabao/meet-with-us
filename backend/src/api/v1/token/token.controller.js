const jwt = require("jsonwebtoken");
const { room } = require("../../../config/database.config");

const getToken = (req, res) => {
    const API_KEY = room.apiKey;
    const SECRET = room.secretKey;

    const options = {
        expiresIn: "606060m",
        algorithm: "HS256",
    };

    const payload = {
        apikey: API_KEY,
        version: 2,
        roles: ["CRAWLER"],
        permissions: ["allow_join", "allow_mod", "ask_join"],
    };

    const token = jwt.sign(payload, SECRET, options);

    console.log(token);

    res.status(200).json({
        auth_key: token,
    });
};

const controller = {
    getToken,
};

module.exports = { controller };
