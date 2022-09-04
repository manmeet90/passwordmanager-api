const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const {signInWithEmailAndPassword, getAuth, signOut} = require('firebase/auth');
const { getDatabase, ref, child, get, set, remove } = require("firebase/database");

class FirebaseClient {
    constructor(){
        console.log('firebase client init');
        this.isLoggedIn = false;
    }
    initDB() {
        const firebaseConfig = {
            apiKey: process.env.FB_API_KEY,
            authDomain: process.env.FB_AUTH_DOMAIN,
            databaseURL: process.env.FB_DB_URL,
            projectId: process.env.FB_PROJECT_ID,
            storageBucket: process.env.FB_STORAGE_BUCKET,
            messagingSenderId: process.env.MSG_SENDER_ID,
            appId: process.env.APP_ID,
        };
        
        this.app = initializeApp(firebaseConfig);
        this.db = getFirestore(this.app);
        this.auth = getAuth(this.app);
        if(this.db) {
            console.log('firebase initialized');
        }
    }

    login(username, password) {
        return signInWithEmailAndPassword(this.auth, username, password);
    }
    
    setLoggedInState(isLoggedIn) {
        this.isLoggedIn =  isLoggedIn;
    }

    logout(){
        return signOut(this.auth);
    }

    getAllPasswords() {
        const dbRef = ref(getDatabase());
        return get(child(dbRef, `passwords`));
    }

    addUpdatePassword(id, title, password) {
        const db = getDatabase();
        return set(ref(db, 'passwords/' + id), {
            id: id,
            title: title,
            password: password
        });
    }

    deletePassword(id) {
        const db = getDatabase();
        return remove(ref(db, 'passwords/' + id));
    }
}

module.exports = {
    firebaseClient: new FirebaseClient()
};
