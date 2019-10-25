const functions = require('firebase-functions');
const app = require('express')();
require('dotenv').config();
const FBAuth = require('./util/fbAuth');
const cors = require('cors');
app.use(cors());

const { db } = require('./util/admin');


const {
    postOneOrder,
    testing,
    addAdmin
} = require('./handlers/orders');

// Scream routes
app.post('/order', FBAuth, postOneOrder);
app.get('/order', testing); 
app.post('/addadmin', addAdmin); 

exports.api = functions.region('europe-west1').https.onRequest(app);
