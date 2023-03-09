const express = require("express");
const router = express.Router();

const { controller } = require("./token.controller");

router.route("/").get(controller.getToken);

module.exports = router;
