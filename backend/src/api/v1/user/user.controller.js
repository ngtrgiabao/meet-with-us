const {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    doc,
    deleteDoc,
} = require("firebase/firestore");

const { firebaseDB } = require("../../../config/firebase");
const ApiError = require("../../../api.error");

// Create a user
const create = async (req, res, next) => {
    if (!req.body?.email) {
        return next(new ApiError(404, "Email can't be empty"));
    }

    try {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            photoUrl,
            isHost,
        } = req.body;

        const document = await addDoc(collection(firebaseDB, "users"), {
            firstName,
            lastName,
            displayname: `${firstName} ${lastName}`,
            email,
            phoneNumber,
            password,
            photoUrl,
            isHost,
            createdAt: Date(),
        });

        const userId = document.id;

        res.status(200).send({
            msg: `created user successfully`,
            UserID: document.id,
        });
    } catch (error) {
        return next(new ApiError(500, "An error occured while creating user"));
    }
};

// Find user by name
const findAll = async (req, res, next) => {
    try {
        let users = [];
        const userCollection = collection(firebaseDB, "users");
        // Get docs
        const userDocs = await getDocs(userCollection);
        const name = req.query.name;

        // If username not exist in db return all users
        if (!name) {
            userDocs.forEach((doc) => {
                users.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            return res.status(200).send(users);
        }

        // Filter user by name
        userDocs.forEach((doc) => {
            if (doc.get("firstName") === name) {
                users.push({ id: doc.id, ...doc.data() });
            }
        });

        res.status(200).send(users);
    } catch (error) {
        return next(new ApiError(404, "An error occured while get data"));
    }
};

// Find user by ID
const findOne = async (req, res, next) => {
    try {
        let users = [];
        const id = req.params.id;
        const userCollection = collection(firebaseDB, "users");
        // Get Docs
        const userDocs = await getDocs(userCollection);

        // Filter user by ID
        userDocs.forEach((doc) => {
            if (doc.id === id) {
                users.push({ id: doc.id, ...doc.data() });
            }
        });

        res.status(200).send(users);
    } catch (error) {
        return next(new ApiError(500, "An error occured while find a user"));
    }
};

// Update a user
const update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(404, "Data to update can not be empty"));
    }

    try {
        const id = req.params.id;
        // Get a doc
        const userDoc = doc(firebaseDB, "users", id);

        updateDoc(userDoc, req.body)
            .then(() =>
                res.status(200).send({ msg: `Update user: ${id} successfully` })
            )
            .catch(() =>
                res
                    .status(404)
                    .send({ msg: `Failed to update user: ${id} data` })
            );
    } catch (error) {
        return next(
            new ApiError(500, `An error occured while update data user ${id}`)
        );
    }
};

// Delete a user
const deleteOne = async (req, res, next) => {
    try {
        const id = req.params.id;
        // Get a doc
        const userDoc = doc(firebaseDB, "users", id);

        await deleteDoc(userDoc)
            .then(() => {
                res.status(200).send({
                    msg: `Deleted user: ${id} successfully`,
                });
            })
            .catch(() => {
                res.status(404).send({
                    msg: `Deleted user: ${id} failed`,
                });
            });
    } catch (error) {
        return next(new ApiError(500, "An error occured while delete user"));
    }
};

// Delete all users
const deleteAll = async (req, res, next) => {
    try {
        // Get collection
        const userCollection = collection(firebaseDB, "users");
        // Get docs
        const userDocs = await getDocs(userCollection);

        userDocs.forEach(async (document) => {
            const docRef = doc(firebaseDB, "users", document.id);
            await deleteDoc(docRef);
        });

        res.status(200).send({
            msg: "Deleted all docs in collection users successfully",
        });
    } catch (error) {
        return next(
            new ApiError(
                500,
                "An error occured while delete all document in collection users"
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
