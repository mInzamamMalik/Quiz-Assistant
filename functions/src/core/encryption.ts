import * as bcrypt from "bcrypt-nodejs";

class encryption {

    static stringToHash = (PasswordString: string) => {
        return new Promise((resolve, reject) => {
            var round = 10;

            bcrypt.genSalt(round, function (err, salt) {
                if (err) {
                    reject(err);
                }
                bcrypt.hash(PasswordString, salt, function () { }, function (err, hashedPassword) {
                    if (err) {
                        reject(err);
                    }
                    resolve(hashedPassword);
                });
            });
        })
    }


    static varifyHash = (realPassword: string, hashString: string) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(realPassword, hashString, function (err, result) {//'result'' will be boolean 
                if (err) {
                    reject(err);//it means hash is invalid
                }
                resolve(result);//return with boolean 'Hash' is matched or not
            });
        })
    }


    static validateHash = (hashString: string) => {//true or false in resolve, no reject
        return new Promise((resolve, reject) => {
            bcrypt.compare("dummy", hashString, function (err, result) {//'result'' will be boolean 
                if (err) {
                    resolve(false);//it means Hash is invalid
                }
                resolve(true);//it means hash is either matched or not but it is a valid Hash
            });
        })
    }

}//class end
