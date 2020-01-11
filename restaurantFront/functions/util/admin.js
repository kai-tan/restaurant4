const admin = require('firebase-admin');
// const fs = require('fs')

var serviceAccount = require('../restaurant-221b65049caa.json');

// let jsonData = JSON.parse(fs.readFileSync('JsonFile.json', 'utf-8'))

admin.initializeApp({
    // apiKey: "YOUR INFO HERE",
    // authDomain: "YOUR INFO HERE",
    // databaseURL: "YOUR INFO HERE,
    // projectId: "YOUR INFO HERE",
    // storageBucket: "YOUR INFO HERE",
    // messagingSenderId: "YOUR INFO HERE",
    // appId: "YOUR INFO HERE",
    // measurementId: "YOUR INFO HERE",
    // credential: YOUR INFO HERE
  });

const db = admin.firestore();

// exports.GOOGLE_APPLICATION_CREDENTIALS = "C:\Users\Kai Tan\Desktop\Projects\restaurant2\restaurant\restaurantFront/restaurant-23350530831a"
module.exports = { admin, db };