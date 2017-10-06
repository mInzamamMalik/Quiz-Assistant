import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

var defaultApp = admin.initializeApp(functions.config().firebase)

export { defaultApp }
export let auth  = admin.auth();
const db = admin.database();
export default db;