const express = require("express");
const router = express.Router();

const { controller } = require("./room.controller");

// middleware that is specific to this router
router.use((req, res, next) => {
    console.log("Time: ", Date.now());
    next();
});

router
    .route("/")
    .get(controller.findAll)
    .post(controller.create)
    .delete(controller.deleteAll);

router
    .route("/:id")
    .get(controller.findOne)
    .put(controller.update)
    .delete(controller.deleteOne);

module.exports = router;
