const {firebaseClient} = require('../firebaseClient');
class LoginController {
    constructor(){
        
    }
    login(username, password) {
        return new Promise((resolve, reject) => {
            if(!username) {
                reject('username is mandatory');
            }
            else if(!password) {
                reject('Password is mandatory');
            }else {
                firebaseClient.login(username, password)
                .then(creds => {
                    if(creds.user) {
                        firebaseClient.setLoggedInState(true);
                        resolve({loggedIn:true});
                    } else {
                        reject('Invalid Credentials');
                    }
                })
                .catch(err => {
                    reject(err.message)
                });
            }
        });
    }

    logout() {
        return new Promise((resolve, reject) => {
            firebaseClient.logout()
            .then(_ => {
                firebaseClient.setLoggedInState(false);
                resolve({loggedOut:true});
            })
            .catch(err => {
                reject(err.message)
            });
        });
    }
}
module.exports = LoginController;