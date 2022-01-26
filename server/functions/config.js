// const firebase = require('firebase');
// const firebaseConfig = {
//   apiKey: "AIzaSyCReozHatzvLLpAZmwIOgR7WnL3x9fUa74",
//   authDomain: "capstone-database2.firebaseapp.com",
//   databaseURL: "https://capstone-database2-default-rtdb.firebaseio.com",
//   projectId: "capstone-database2",
//   storageBucket: "capstone-database2.appspot.com",
//   messagingSenderId: "600067532776",
//   appId: "1:600067532776:web:0038d2696e554062b9265d",
//   measurementId: "G-PN315D00W3"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
// const test = db.collection("test");
// module.exports = test;
const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyCReozHatzvLLpAZmwIOgR7WnL3x9fUa74",
  authDomain: "capstone-database2.firebaseapp.com",
  databaseURL: "https://capstone-database2-default-rtdb.firebaseio.com",
  projectId: "capstone-database2",
  storageBucket: "capstone-database2.appspot.com",
  messagingSenderId: "600067532776",
  appId: "1:600067532776:web:0038d2696e554062b9265d",
  measurementId: "G-PN315D00W3"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("Users");
module.exports = User;
