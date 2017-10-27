import * as request from 'request';
import { adminauth, admindb, db } from './../../db';
import { session, makeUserEntity } from './../../core';
import {
    stringToHash,
    varifyHash,
    validateHash
} from "bcrypt-inzi";

export function inputWelcome(app: any) {

    console.log("app.getUser().accessToken: ", app.getUser().accessToken)
    console.log("app.getUser().userId: ", app.getUser().userId)

    // adminauth.verifyIdToken(app.getUser().accessToken)
    //     .then(function (decodedToken) {
    //         console.log("decodedToken: ", decodedToken)
    //         console.log("decodedToken.uid: ", decodedToken.uid)

    //         admindb.child('users').child(decodedToken.uid)
    //             .once("value", (snapshot: any) => {

    //                 let userProfile = snapshot.val();

    //                 console.log("userProfile: ", userProfile); //undefined

    //                 app.ask(app.buildRichResponse()
    //                     .addSimpleResponse({
    //                         speech: `Hi ${userProfile.name}, how are you today?`,
    //                         displayText: `Hi ${userProfile.name}, how are you today?`
    //                     })
    //                     .addSuggestions(['Make organisation', 'Manage an Organisation', 'Help'])
    //                 );
    //             }).catch((e) => {
    //                 console.log("firebase error: ", e);
    //                 app.ask("firebase error: some thing went wrong on server")
    //             })

    //     }).catch((e) => {
    //         console.log("firebase error: ", e);
    //         app.ask("firebase error: some thing went wrong on server")
    //     })

    //recieveToken cantains uid and random string
    let accessToken = app.getUser().accessToken;
    console.log('recieveToken', accessToken); // {uid: , rendonString: }

    let parsedAccessToken = JSON.parse(accessToken)
    console.log('parsedAccessToken', parsedAccessToken)


    admindb.child("accessTokens")
        .child(parsedAccessToken.uid)
        // .child('token')
        .once('value', (snapshot: any) => {

            console.log('snapshot.val()', snapshot.val());
            console.log('snapshot.val().randomString', snapshot.val().randomString);

            varifyHash(snapshot.val().randomString, parsedAccessToken.randomString).then(result => {
                if (result) {
                    console.log("matched");

                    //access token verified

                    admindb.child('users').child(parsedAccessToken.uid)
                        .once("value", (snapshot: any) => {

                            let userProfile = snapshot.val();

                            console.log("userProfile: ", userProfile); //undefined

                            app.ask(app.buildRichResponse()
                                .addSimpleResponse({
                                    speech: `Hi ${userProfile.name}, how are you today?`,
                                    displayText: `Hi ${userProfile.name}, how are you today?`
                                })
                                .addSuggestions(['Make organisation', 'Manage an Organisation', 'Help'])
                            );
                        }).catch((e) => {
                            console.log("firebase error: ", e);
                            app.ask("firebase error: some thing went wrong on server")
                        })

                } else {
                    console.log("Access token is expired");
                    app.tell("Internal server error")
                }
            }).catch(e => {
                console.log("error: ", e)
                app.tell("Internal server error")
            })


        })
        .catch((e) => {
            console.log("Invalid uid: ", e);
            app.tell("Internal server error")
        });
    // a.uid uid mil jaegi


}
