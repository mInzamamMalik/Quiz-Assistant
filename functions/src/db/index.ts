import * as functions from 'firebase-functions'
import * as _admin from 'firebase-admin'
import * as _firebase from "firebase";

// var defaultApp = admin.initializeApp(functions.config().firebase) // doesnt work with createCustomToken()
//Error: createCustomToken() requires a certificate with "private_key" set.

var serviceAccount = require("./serviceAccount.json");
let admin = _admin.initializeApp({
    credential: _admin.credential.cert(serviceAccount),
    databaseURL: "https://inzi-quiz-assistant.firebaseio.com"
});
export { admin }

let config = {
    apiKey: "AIzaSyAFOf27clnj39WcgzdSVMYw_smjt_ANRrE",
    authDomain: "inzi-quiz-assistant.firebaseapp.com",
    databaseURL: "https://inzi-quiz-assistant.firebaseio.com",
    projectId: "inzi-quiz-assistant",
    storageBucket: "inzi-quiz-assistant.appspot.com",
    messagingSenderId: "190190683842"
};
let firebase = _firebase.initializeApp(config);
export { firebase }


export let auth = admin.auth();
const db = admin.database();
export default db;