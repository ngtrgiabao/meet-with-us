const ApiError = require("../../../api.error");
const { collection, addDoc } = require("firebase/firestore");
const { firebaseDB } = require("../../../config/firebase");

const create = async (req, res, next) => {
    try {
        const data = req.body;
        const docRef = await addDoc(collection(firebaseDB, "users"), data);
        res.send({ id: docRef.id });
    } catch (error) {
        return next(new ApiError(500, "server error"));
    }
};

const findAll = async (req, res, next) => {};

const findByName = async (req, res, next) => {};

const findById = async (req, res, next) => {};

const update = async (req, res, next) => {};

const deleteOne = async (req, res, next) => {};

const deleteAll = async (req, res, next) => {};

const controller = {
    create,
    findAll,
    findByName,
    findById,
    update,
    deleteOne,
    deleteAll,
};

module.exports = { controller };
