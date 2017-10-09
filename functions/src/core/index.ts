import * as request from 'request';

import { encryption } from './encryption'
export {
    encryption
}

export let session = {
    id: ""
}

export function makeUserEntity(
    sessionId: string,
    entityName: string,
    entries: {
        "value": string,
        "synonyms": string[]
    }[]
) {

    return new Promise((resolve, reject) => {

        // adding all organizations in apiai userEntity
        request.post({
            url: "https://api.api.ai/v1/userEntities",
            headers: {
                "Authorization": "Bearer 316e65b1806e40b788373fdb4601b0e8"
            },
            json: {
                "sessionId": sessionId,
                "name": entityName,
                "entries": entries
            }
        }, function (error: any, response: any, body: any) {

            console.log("response: ", response.body);
            //checking if response was success
            if (!error && response.statusCode == 200) {

                resolve(response.body);

            } else {
                console.log("error in making user /entity: ", response.statusCode, error);
                reject(error)
            }
        })
    })//promise end
}//main func end