import * as functions from 'firebase-functions'
import db from './db'

import { login, signup } from './lib/oauthFunctions'
import { webhook } from './lib/apiai-webhook'

export { login, signup, webhook }