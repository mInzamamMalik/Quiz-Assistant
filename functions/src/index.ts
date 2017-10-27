import * as functions from 'firebase-functions'
import { Request, Response } from "express"; //interfaces
import { adminauth, admindb } from './db'
import { webhook } from './lib/apiai-webhook'
import {
    stringToHash,
    varifyHash,
    validateHash
} from "bcrypt-inzi"
export { webhook }

// client_id=GOOGLE_CLIENT_ID&client_secret=GOOGLE_CLIENT_SECRET&grant_type=authorization_code&code=AUTHORIZATION_CODE

// client_id=GOOGLE_CLIENT_ID&client_secret=GOOGLE_CLIENT_SECRET&grant_type=refresh_token&refresh_token=REFRESH_TOKEN



export const tokenEnd = functions.https.onRequest(async (request: Request, response: Response) => {

    var client_id = request.body.client_id
    var client_secret = request.body.client_secret
    var grant_type = request.body.grant_type

    if (client_id == '829690274579-j8uaqsstl73qc1mhmofta3d2g5mubjgj.apps.googleusercontent.com' &&
        client_secret == 'i0YVyZIo0l4N4Ohb9CNLhcHV') {

        if (grant_type == 'authorization_code') {
            console.log("AUTHORIZATION CODe")
            let authorizationCode = request.body.code
            let refreshToken: any;

            console.log('code', authorizationCode)

            adminauth.verifyIdToken(authorizationCode)
                .then(function (decodedToken) {
                    console.log("decodedToken: ", decodedToken)
                    console.log("decodedToken.uid: ", decodedToken.uid)

                    refreshToken = decodedToken.uid;
                    console.log('refreshToken ', refreshToken);

                    createAccessToken(refreshToken).then(function (accessToken) {

                        return response.json({
                            token_type: "bearer",
                            access_token: accessToken,
                            refresh_token: refreshToken,
                            expires_in: 3600
                        });

                    })
                        .catch(function (error) {

                            console.log(error);
                        })

                }).catch((e) => {
                    console.log("firebase error: ", e);


                })


        }
        else {
            let refreshToken = request.body.refresh_token;
            let accessToken: any;
            console.log('REFRESH TOKEN')
            console.log('refreshToken ', refreshToken)

            admindb.child("accessTokens")
                .child(refreshToken)
                .child('token').once('value', (snapshot: any) => {

                    //creating new access token
                    createAccessToken(refreshToken).then(function (accessToken) {

                        return response.json({

                            token_type: "bearer",
                            access_token: accessToken,
                            expires_in: 3600

                        })

                    })
                        .catch(function (error) {

                            console.log(error);
                        })

                })
                .catch((e) => {

                    console.log('Incorrect refresh token');
                });


        }

    }
    else {
        console.log('Incorrect cliend_id or client secret ');
        console.log('client_id ', client_id);
        console.log('client_secret ', client_secret);
    }

    function randomStringGenerator(length: number): Promise<{ hashedRandomString: string, unHashedRandomString: string }> {
        return new Promise(function (resolve, reject) {

            let text = "";
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            stringToHash(text).then(hash => {

                resolve({
                    hashedRandomString: hash,
                    unHashedRandomString: text
                })
            })

        })
    }

    function createAccessToken(refreshToken: any) {
        return new Promise(function (resolve, reject) {

            let temp =
                {
                    randomString: "",
                    uid: ""
                };

            randomStringGenerator(9).then((strings) => {

                admindb.child("accessTokens")
                    .child(refreshToken)
                    .child("randomString")
                    .set(strings.unHashedRandomString)
                    .then(data => {

                        //hashed random string
                        temp.randomString = strings.hashedRandomString;
                        temp.uid = refreshToken;

                        //return JSON.stringify(temp);
                        resolve(JSON.stringify(temp));


                    })
                    .catch(error => {
                        console.log('Firebase token insertion error', error);
                        reject('Firebase token insertion error' + error)
                    });
            })
        })
    }


})//end of webhook http trigger