const admin = require('firebase-admin');

admin.initializeApp({
    apiKey: "AIzaSyDgc5xhNZYV7kiFVUjC2bOc_-ZyQe12Esw",
    authDomain: "restaurant-45eb0.firebaseapp.com",
    databaseURL: "https://restaurant-45eb0.firebaseio.com",
    projectId: "restaurant-45eb0",
    storageBucket: "restaurant-45eb0.appspot.com",
    messagingSenderId: "1019933584778",
    appId: "1:1019933584778:web:7903f68a3c6c455e38ec73",
    measurementId: "G-RP9XP6X1F6"
  });

const db = admin.firestore();

exports.GOOGLE_APPLICATION_CREDENTIALS = "C:\Users\Kai Tan\Desktop\Projects\restaurant2\restaurant\restaurantFront/restaurant-23350530831a"
module.exports = { admin, db };