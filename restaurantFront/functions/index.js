const functions = require('firebase-functions');
const app = require('express')();
require('dotenv').config();
const FBAuth = require('./util/fbAuth');
const cors = require('cors');

app.use(cors({ origin: true }));

const { db } = require('./util/admin');


const {
    postOneOrder,
    testing,
    addAdmin,
    payment,
    sendEmail
} = require('./handlers/orders');

// Scream routes
app.post('/order', FBAuth, postOneOrder);
app.get('/order', testing); 
app.post('/addadmin', addAdmin);
app.post('/payment', payment);
app.post('/sendEmail', sendEmail);


exports.api = functions.region('asia-east2').https.onRequest(app);
