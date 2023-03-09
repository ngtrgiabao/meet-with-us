const {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    doc,
    deleteDoc,
} = require("firebase/firestore");
const jwt = require("jsonwebtoken");

const { firebaseDB } = require("../../../config/firebase");
const ApiError = require("../../../api.error");

// Create a room
const create = async (req, res, next) => {
    if (!req.body?.hostName) {
        return next(new ApiError(404, "Hostname can't be empty"));
    }

    try {
        const { hostName, members } = req.body;

        const document = await addDoc(collection(firebaseDB, "rooms"), {
            hostName,
            members,
            createdAt: Date(),
        });

        res.status(200).send({
            msg: `created room successfully`,
            id: document.id,
        });
    } catch (error) {
        return next(new ApiError(500, "An error occured while creating room"));
    }
};

// Find room by host name
const findAll = async (req, res, next) => {
    try {
        let hosts = [];
        const roomCollection = collection(firebaseDB, "rooms");
        // Get docs
        const roomDocs = await getDocs(roomCollection);

        const name = req.query.name;
        // If host name not exist in db return all host name
        if (!name) {
            roomDocs.forEach((doc) => {
                hosts.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            return res.status(200).send(hosts);
        }

        // Filter room by host name
        roomDocs.forEach((doc) => {
            if (doc.get("hostName") === name) {
                hosts.push({ id: doc.id, ...doc.data() });
            }
        });

        res.status(200).send(hosts);
    } catch (error) {
        return next(new ApiError(404, "An error occured while get data room"));
    }
};

// Find room by ID
const findOne = async (req, res, next) => {
    try {
        let rooms = [];
        const id = req.params.id;
        const roomCollection = collection(firebaseDB, "rooms");
        // Get Docs
        await getDocs(roomCollection)
            .then((roomDocs) => {
                // Filter user by ID
                roomDocs.forEach((doc) => {
                    if (doc.id === id) {
                        rooms.push({ id: doc.id, ...doc.data() });
                    }
                });
                res.status(200).send(rooms);
            })
            .catch(() => {
                res.status(404).send({
                    msg: "Can not get rooms",
                });
            });
    } catch (error) {
        return next(new ApiError(500, "An error occured while find a room ID"));
    }
};

// Update a room
const update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(404, "Data to update can not be empty"));
    }

    try {
        const id = req.params.id;
        // Get a doc
        const roomDoc = doc(firebaseDB, "rooms", id);

        updateDoc(roomDoc, req.body)
            .then(() =>
                res.status(200).send({ msg: `Update room: ${id} successfully` })
            )
            .catch(() =>
                res
                    .status(404)
                    .send({ msg: `Failed to update room: ${id} data` })
            );
    } catch (error) {
        return next(
            new ApiError(500, `An error occured while update data room ${id}`)
        );
    }
};

// Delete a room
const deleteOne = async (req, res, next) => {
    try {
        const id = req.params.id;
        // Get a doc
        const roomDoc = doc(firebaseDB, "rooms", id);

        await deleteDoc(roomDoc)
            .then(() => {
                res.status(200).send({
                    msg: `Deleted room: ${id} successfully`,
                });
            })
            .catch(() => {
                res.status(404).send({
                    msg: `Deleted room: ${id} failed`,
                });
            });
    } catch (error) {
        return next(new ApiError(500, "An error occured while delete room"));
    }
};

// Delete all rooms
const deleteAll = async (req, res, next) => {
    try {
        // Get collection
        const roomCollection = collection(firebaseDB, "rooms");
        // Get docs
        await getDocs(roomCollection)
            .then((roomDocs) => {
                roomDocs.forEach(async (document) => {
                    const docRef = doc(firebaseDB, "rooms", document.id);
                    await deleteDoc(docRef);
                });

                res.status(200).send({
                    msg: "Deleted all docs in collection rooms successfully",
                });
            })
            .catch(() => {
                res.status(404).send({
                    msg: "Can not delete all rooms",
                });
            });
    } catch (error) {
        return next(
            new ApiError(
                500,
                "An error occured while delete all document in collection rooms"
            )
        );
    }
};

const controller = {
    create,
    findAll,
    findOne,
    update,
    deleteOne,
    deleteAll,
};

module.exports = { controller };
