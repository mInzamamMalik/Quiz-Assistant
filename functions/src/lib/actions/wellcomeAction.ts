import * as request from 'request';
import { adminauth, admindb, db } from './../../db';
import { session, makeUserEntity } from './../../core';

export function inputWelcome(app: any) {

    console.log("app.getUser().accessToken: ", app.getUser().accessToken)
    console.log("app.getUser().userId: ", app.getUser().userId)

    adminauth.verifyIdToken(app.getUser().accessToken)
        .then(function (decodedToken) {
            console.log("decodedToken: ", decodedToken)
            console.log("decodedToken.uid: ", decodedToken.uid)

            admindb.child('users').child(decodedToken.uid)
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

        }).catch((e) => {
            console.log("firebase error: ", e);
            app.ask("firebase error: some thing went wrong on server")
        })

}
