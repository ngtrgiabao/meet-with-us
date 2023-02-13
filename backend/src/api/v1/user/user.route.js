const express = require("express");
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log("Time: ", Date.now());
    next();
});

// define the about route
router.get("/", (req, res) => {
    res.send("Hello");
});

router.get("/about", (req, res) => {
    res.send("About Meet with us");
});

router.get("/login", (req, res) => {
    res.send("Login Meet with us");
});

router.get("/logout", (req, res) => {
    res.send("Logout Meet with us");
});

router.get("/register", (req, res) => {
    res.send("Register Meet with us");
});

module.exports = router;
