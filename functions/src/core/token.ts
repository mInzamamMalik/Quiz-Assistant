// import { encryption } from './encryption'


// export class token {

//     static generateToken = (objectToMakeToken: any): Promise<string> => { //objectToMakeToken must be JSON and must have '_id' property
//         return new Promise((resolve, reject) => {

//             encryption.stringToHash(JSON.stringify(objectToMakeToken))
//                 .then(function (Hash: string) {
//                     resolve(Hash)
//                 })
//                 .catch(error => {
//                     console.error("bcrypt error: ");
//                     console.error(error);
//                     reject({ message: "bcrypt error", err: error });
//                 });
//         })
//     }

//     static verifyToken = function (tokenString: string, orignalObject: any): Promise<boolean> { //token string must be valid bcrypt hash, return Uid in promise
//         return new Promise((resolve, reject) => {

//             encryption.validateHash(tokenString)
//                 .then((isValid: boolean) => {
//                     resolve(isValid)
//                 })
//                 .catch(error => {
//                     reject(error)
//                 });
//         })
//     }

// }