const functions = require('firebase-functions');
const app = require('express')();
const FBAuth = require('./util/fbAuth');
require('dotenv').config()
const cors = require('cors');
app.use(cors());

const { db } = require('./util/admin');

const {
    postOneOrder,
    testing
} = require('./handlers/orders');

// Scream routes
app.post('/order', FBAuth, postOneOrder);
app.get('/order', FBAuth, testing); 

exports.api = functions.region('europe-west1').https.onRequest(app);
