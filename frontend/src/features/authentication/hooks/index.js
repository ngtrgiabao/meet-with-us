const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Initialize Express app
const app = express();

// Middleware to verify Firebase ID token and add user to request object
const authMiddleware = async(req, res, next) => {
    try {
        const idToken = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const user = await admin.auth().getUser(decodedToken.uid);
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).send('Unauthorized');
    }
};

// Route to add role to user
app.post('/users/:uid/roles/:role', authMiddleware, async(req, res) => {
    const uid = req.params.uid;
    const role = req.params.role;

    try {
        // Check if user exists
        const user = await admin.auth().getUser(uid);

        // Set custom claim for user
        const customClaims = {};
        customClaims[role] = true;
        await admin.auth().setCustomUserClaims(uid, customClaims);

        res.send(`Role ${role} added to user ${user.email}`);
    } catch (error) {
        console.error(error);
        res.status(404).send('User not found');
    }
});

// Middleware to check if user has admin role
const checkAdmin = async(req, res, next) => {
    try {
        const user = req.user;
        const token = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = await admin.auth().verifyIdToken(token);
        const customClaims = decodedToken.customClaims;

        if (customClaims.admin === true) {
            next();
        } else {
            res.status(403).send('Forbidden');
        }
    } catch (error) {
        console.error(error);
        res.status(401).send('Unauthorized');
    }
};

// Route to test admin role
app.get('/admin', authMiddleware, checkAdmin, (req, res) => {
    res.send('Hello Admin!');
});

// Start Express server
// app.listen(3000, () => {
//     console.log('Server started on port 3000');
// });