import firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyBtQgJ4x5r5SaEZMExUQAnzrXF6oQNJjK0",
    authDomain: "meet-with-us-8fdf6.firebaseapp.com",
    projectId: "meet-with-us-8fdf6",
    storageBucket: "meet-with-us-8fdf6.appspot.com",
    messagingSenderId: "967185560280",
    appId: "1:967185560280:web:bc7443be39da256cfa5dad",
    measurementId: "G-MDEW9JWTXV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const auth = firebase.auth();
const db = firebase.firestore();

export { db, auth };

export default firebase;