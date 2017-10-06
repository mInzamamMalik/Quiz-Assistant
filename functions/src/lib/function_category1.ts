import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as _cors from 'cors';
import { auth } from '../db'
var cors = _cors({ origin: true });// set these options appropriately According to your case,
// see document: https://www.npmjs.com/package/cors#configuration-options
// true means allow everything


export const signup = functions.https.onRequest((req, res) => {

    auth.createUser({
        email: req.body.email,
        password: req.body.password,
        displayName: req.body.name
    })
        .then(function (userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log("Successfully created new user:", userRecord.uid);
            res.send("Successfully created new user:" + userRecord.uid)
        })
        .catch(function (error) {
            console.log("Error creating new user:", error);
            res.send("Error creating new user:" + error);
        });

});
export const login = functions.https.onRequest((req, res) => {

    auth.getUserByEmail(req.body.email)
        .then(function (userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log("Successfully fetched user data:", userRecord.toJSON());
        })
        .catch(function (error) {
            console.log("Error fetching user data:", error);
        });


    // / on every request we will verify token like this:
    // auth.verifyIdToken(idToken)
    //     .then(function (decodedToken) {
    //         var uid = decodedToken.uid;
    //         // ...
    //     }).catch(function (error) {
    //         // Handle error
    //     });

});
