import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as _cors from 'cors';

var cors = _cors({ origin: true });// set these options appropriately According to your case,
// see document: https://www.npmjs.com/package/cors#configuration-options
// true means allow everything

// http example
export const login = functions.https.onRequest((req, res) => {

    let client_id = req.query.client_id
    let redirect_uri = req.query.redirect_uri
    let state = req.query.state
    let response_type = req.query.response_type

    res.send(`<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    
    <body>
        <p>
            client_id: ${client_id}
            <br>
            redirect_uri: ${redirect_uri}
            <br>
            state: ${state}
            <br>
            response_type: ${response_type}
        </p>
        <p>
            <input type="text">
            <input type="text">
            <button>login</button>
        </p>
        <script>
            setTimeOut(function(){
                window.location = "https://oauth-redirect.googleusercontent.com/r/inzi-quiz-assistant#access_token=myaccesstoken123&token_type=bearer&state=${state}" ;        
            },3000)
        </script>
    </body>
    
    </html>`)
});

//databse trigger example
export const makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onWrite(event => {
        const original = event.data.val();
        console.log('Uppercasing', event.params.pushId, original);
        const uppercase = original.toUpperCase();
        return event.data.ref.parent.child('uppercase').set(uppercase);
    });

//cors example
export const function3 = functions.https.onRequest(async (req, res) => {
    cors(req, res, () => {
        res.send("this is a function");
    })
})

export const function4 = functions.https.onRequest(async (req, res) => {
    res.send("this is a function");
})