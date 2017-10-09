import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

// var defaultApp = admin.initializeApp(functions.config().firebase) // doesnt work with createCustomToken()
//Error: createCustomToken() requires a certificate with "private_key" set.

var serviceAccount = require("./serviceAccount.json");

let defaultApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://inzi-quiz-assistant.firebaseio.com"
});


export { defaultApp }
export let auth = admin.auth();
const db = admin.database();
export default db;