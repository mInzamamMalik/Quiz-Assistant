import * as functions from 'firebase-functions'
import * as _admin from 'firebase-admin'
import * as _firebase from "firebase";

// var defaultApp = admin.initializeApp(functions.config().firebase) // doesnt work with createCustomToken()
//Error: createCustomToken() requires a certificate with "private_key" set.

var serviceAccount = require("./serviceAccount.json");
let admin = _admin.initializeApp({
    credential: _admin.credential.cert(serviceAccount),
    databaseURL: "https://quiz-assistant-444c4.firebaseio.com"
});
export { admin }
export let adminauth = admin.auth();
export let admindb = admin.database().ref('/');

let config = {
    apiKey: "AIzaSyC-A0avoEVDjmGg81UO9zYzw3As4YLTqkk",
    authDomain: "quiz-assistant-444c4.firebaseapp.com",
    databaseURL: "https://quiz-assistant-444c4.firebaseio.com",
    projectId: "quiz-assistant-444c4",
    storageBucket: "",
    messagingSenderId: "829690274579"
};
let firebase = _firebase.initializeApp(config);
export { firebase }
export let auth = firebase.auth();
export let db = firebase.database().ref('/');




