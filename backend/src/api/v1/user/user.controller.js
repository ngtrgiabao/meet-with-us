const ApiError = require("../../../api.error");
const {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    onSnapshot,
} = require("firebase/firestore");
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
            createdAt: Date(),
        });

        res.status(200).send({
            msg: `created user successfully`,
            id: document.id,
        });
    } catch (error) {
        return next(new ApiError(500, "server error"));
    }
};

const findAll = async (req, res, next) => {
    try {
        let users = [];
        const userCollection = collection(firebaseDB, "users");
        const userDocs = await getDocs(userCollection);
        const name = req.query.name;

        /*
        1. We’re using the get() method to get all the documents in the users collection.
        2. We’re using the forEach() method to loop through the documents.
        3. We’re using the push() method to push the documents into the users array.
        4. We’re using the status() method to set the status code to 200.
        5. We’re using the send() method to send the users array back to the client.
        */
        if (!name) {
            userDocs.forEach((doc) => {
                users.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            return res.status(200).send(users);
        }

        /*
        1. We’re using the query() function to create a query object.
        2. We’re using the where() function to create a where clause.
        3. We’re using the onSnapshot() function to listen for changes to the query.
        4. We’re using the forEach() function to iterate over the documents in the snapshot.
        5. We’re using the push() function to add the documents to the users array.
        6. We’re using the send() function to send the users array back to the client.
        */
        const q = query(userCollection, where("firstName", "==", name));
        onSnapshot(q, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                users.push({ id: doc.id, ...doc.data() });
            });
            res.status(200).send(users);
        });
    } catch (error) {
        return next(new ApiError(404, "An error occured while get data"));
    }
};

// Fix this
const findOne = async (req, res, next) => {
    try {
        let users = [];
        const id = req.params.id;
        const userCollection = collection(firebaseDB, "users");
        const q = query(userCollection, where("id", "==", id));

        onSnapshot(q, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                users.push({ id: doc.id, ...doc.data() });
            });
        });

        res.status(200).send(users);
    } catch (error) {
        return next(new ApiError(500, "An error occured while find a user"));
    }
};

const update = async (req, res, next) => {};

const deleteOne = async (req, res, next) => {};

const deleteAll = async (req, res, next) => {};

const controller = {
    create,
    findAll,
    findOne,
    update,
    deleteOne,
    deleteAll,
};

module.exports = { controller };
