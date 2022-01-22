const functions = require('firebase-functions');
const express = require('express');


const app = express();

app.get("/app", (req, res) => {
    res.send({"data":"hello"});
});

exports.app = functions.https.onRequest(app);
