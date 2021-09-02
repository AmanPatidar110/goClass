import Firebase from 'firebase/app';

class FirebaseUtil {
    constructor() {
        if (Firebase.apps.length < 1) {
            Firebase.initializeApp({
                apiKey: "AIzaSyA3FmpFwQVTdv-vZOO0lLuhqEoiwb17XSI",
                authDomain: "go-class-a16cd.firebaseapp.com",
                projectId: "go-class-a16cd",
                storageBucket: "go-class-a16cd.appspot.com",
                messagingSenderId: "728024310476",
                appId: "1:728024310476:web:a0873463f52d8cf5ebd869",
                measurementId: "G-WM9DCCG8VB"
            });
        }
    }

    app() {
        return Firebase.app();
    }
}

export default FirebaseUtil;
