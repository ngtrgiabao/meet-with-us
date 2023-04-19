<<<<<<< HEAD
import firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';


=======
import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
>>>>>>> main

const firebaseConfig = {
    apiKey: "AIzaSyBtQgJ4x5r5SaEZMExUQAnzrXF6oQNJjK0",
    authDomain: "meet-with-us-8fdf6.firebaseapp.com",
    projectId: "meet-with-us-8fdf6",
    storageBucket: "meet-with-us-8fdf6.appspot.com",
    messagingSenderId: "967185560280",
    appId: "1:967185560280:web:bc7443be39da256cfa5dad",
<<<<<<< HEAD
    measurementId: "G-MDEW9JWTXV"
=======
    measurementId: "G-MDEW9JWTXV",
>>>>>>> main
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
<<<<<<< HEAD
// export const firebaseAtuh = getAuth(app);
// export const firebaseDB = getAuth

export { db, auth };

export default firebase;
=======

export { db, auth };

export default firebase;
>>>>>>> main
