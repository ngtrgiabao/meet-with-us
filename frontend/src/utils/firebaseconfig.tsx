import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBtQgJ4x5r5SaEZMExUQAnzrXF6oQNJjK0",
    authDomain: "meet-with-us-8fdf6.firebaseapp.com",
    projectId: "meet-with-us-8fdf6",
    storageBucket: "meet-with-us-8fdf6.appspot.com",
    messagingSenderId: "967185560280",
    appId: "1:967185560280:web:bc7443be39da256cfa5dad",
    measurementId: "G-MDEW9JWTXV",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const usersRef = collection(firebaseDB, "users");
export const meetingsRef = collection(firebaseDB, "meetings");
