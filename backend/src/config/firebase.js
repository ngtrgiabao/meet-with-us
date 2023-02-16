const { firebase } = require("./database.config");
const { initializeApp } = require("firebase/app");
const { getFirestore, collection } = require("firebase/firestore");
const { getAuth } = require("firebase/auth");

const app = initializeApp(firebase.config);

const firebaseAuth = getAuth(app);
const firebaseDB = getFirestore(app);
const usersRef = collection(firebaseDB, "users");
const meetingsRef = collection(firebaseDB, "meetings");

module.exports = {
    firebaseAuth,
    firebaseDB,
    usersRef,
    meetingsRef,
};
