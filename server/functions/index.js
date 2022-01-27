const functions = require('firebase-functions'); // firefunction for deploying backend

// express app
const express = require('express');
const cors = require('cors');
///////////////////////////////////////

// Initialize Firebase
const firebase = require("firebase");
require("firebase/firestore");
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

const users = db.collection("users");
// const rooms = db.collection("rooms");
// const devices = db.collection("devices");
// const hubs = db.collection('hubs');
//////////////////////////////////////

// Initialize Express App
const app = express();
app.use(cors({origin:true}));
//////////////////////////////////////

app.get("/app", (req, res) => {
    res.send({"data":"hello"});
});

app.post('/test', async (req,res) => {
    const data = req.body;
    await users.add(data);
    res.send({ msg: "User Added" });
});



exports.app = functions.https.onRequest(app);
