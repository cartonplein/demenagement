import Firebase from 'firebase';

let config = {
    apiKey: "AIzaSyB9Bx-j5rmskhZdJsfo8sr5Eeb7NW_hJHE",
    authDomain: "plateforme-demenagement.firebaseapp.com",
    databaseURL: "https://plateforme-demenagement.firebaseio.com",
    projectId: "plateforme-demenagement",
    storageBucket: "plateforme-demenagement.appspot.com",
    messagingSenderId: "490144184435"
};

let app = Firebase.initializeApp(config);

// firebase utils
//let db = app.database();

const rootRef = app.database().ref();

let backOfficeRef = rootRef.child('backOffice');


// firebase collections


export {
    db,
    auth,
    currentUser,
    rootRef,
    backOfficeRef
}
