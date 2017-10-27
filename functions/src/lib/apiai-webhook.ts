import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Request, Response } from "express"; //interfaces
import { session } from './../core'

const ActionsSdkApp = require('actions-on-google').ApiAiAssistant;

// API.AI Action names
import {
    inputWelcome
} from './actions'

const WELCOME_INTENT = 'input.welcome';

export const webhook = functions.https.onRequest(async (request: Request, response: Response) => {

    session.id = request.body.sessionId;
    const app = new ActionsSdkApp({ request: request, response: response });

    let actionMap = new Map();
    
    actionMap.set(WELCOME_INTENT, inputWelcome);
    
    app.handleRequest(actionMap);
})//end of webhook http trigger
