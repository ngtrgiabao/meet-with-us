const ApiError = require("../../../api.error");
const { collection, addDoc, serverTimestamp } = require("firebase/firestore");
const { firebaseDB } = require("../../../config/firebase");

const create = async (req, res, next) => {
    const { firstName, lastName, email, phoneNumber, password, photoUrl } =
        req.body;

    if (!req.body?.email) {
        return next(new ApiError(404, "Email can't be empty"));
    }

    try {
        const document = await addDoc(collection(firebaseDB, "users"), {
            firstName,
            lastName,
            displayname: `${firstName} ${lastName}`,
            email,
            phoneNumber,
            password,
            photoUrl,
            createdAt: serverTimestamp(),
        });

        return res.send({
            msg: `created user successfully`,
            id: document.id,
        });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "server error"));
    }
};

const findAll = async (req, res, next) => {};

const findByName = async (req, res, next) => {};

const findOne = async (req, res, next) => {};

const update = async (req, res, next) => {};

const deleteOne = async (req, res, next) => {};

const deleteAll = async (req, res, next) => {};

const controller = {
    create,
    findAll,
    findByName,
    findOne,
    update,
    deleteOne,
    deleteAll,
};

module.exports = { controller };
