const {firebaseClient} = require('../firebaseClient');
class PasswordController {
    getAllPasswords() {
        return new Promise((resolve, reject) => {
            if(!firebaseClient.isLoggedIn) {
                reject('please login to perform this operation');
            } else {
                firebaseClient.getAllPasswords()
                .then(snapshot => {
                    resolve(snapshot.val());
                })
                .catch(err => {
                    reject(err.message)
                });
            }
        });
    }

    addUpdatePassword(id, title, password) {
        return new Promise((resolve, reject) => {
            if(!firebaseClient.isLoggedIn) {
                reject('please login to perform this operation');
            } else {
                if(!id) {
                    reject('id is mandatory');
                } else if(!title) {
                    reject('title is mandatory');
                } else if(!password) {
                    reject('password is mandatory');
                }else {
                    firebaseClient.addUpdatePassword(id, title, password)
                    .then(_ => {
                        resolve({saved:true});
                    })
                    .catch(err => {
                        reject(err.message)
                    });
                }
            }
        });
    }

    deletePassword(id) {
        return new Promise((resolve, reject) => {
            if(!firebaseClient.isLoggedIn) {
                reject('please login to perform this operation');
            } else {
                if(!id) {
                    reject('id is mandatory');
                }else {
                    firebaseClient.deletePassword(id)
                    .then(_ => {
                        resolve({deleted:true});
                    })
                    .catch(err => {
                        reject(err.message)
                    });
                }
            }
        });
    }
}
module.exports = PasswordController;