import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as _cors from 'cors';
import { auth, firebase } from '../db'
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
    cors(req, res, () => {

        firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
            .catch(function (error) {
                console.log("Error signin:", error);
                res.send({
                    error: "wrong pass"
                })

            }).then(user => {
                console.log("user:", user.uid)

                auth.getUserByEmail(req.body.email)
                    .then(function (userRecord) {
                        // See the UserRecord reference doc for the contents of userRecord.
                        console.log("Successfully fetched user data:", userRecord.toJSON());

                        admin.auth().createCustomToken(userRecord.uid)
                            .then(function (customToken) {
                                // Send token back to client
                                console.log("customToken: ", customToken);
                                res.send({
                                    "uid": userRecord.uid,
                                    "customToken": customToken
                                })
                            })
                            .catch(function (error) {
                                console.log("Error creating custom token:", error);
                                res.send("error: firebase auth ")

                            });
                    })
                    .catch(function (error) {
                        console.log("Error fetching user data:", error);
                        res.send("error: firebase auth ")
                    });


            });
        // / on every request we will verify token like this:
        // auth.verifyIdToken(idToken)
        //     .then(function (decodedToken) {
        //         var uid = decodedToken.uid;
        //         // ...
        //     }).catch(function (error) {
        //         // Handle error
        //     });

    })
});



