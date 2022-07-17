
const firebaseConfig = {
    apiKey: "AIzaSyDqY4AmO9DdZMSKxHK51GVlZa4_nfV2gK0",
    authDomain: "nardi-food-app.firebaseapp.com",
    projectId: "nardi-food-app",
    storageBucket: "nardi-food-app.appspot.com",
    messagingSenderId: "871398731410",
    appId: "1:871398731410:web:8fc1bcabfdab2b405b404b",
    measurementId: "G-TZWJDXHJ10"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

let db = firebase.firestore();


function logOff() {
    firebase.auth().signOut().then(() => {

        window.location.href = ""
    }).catch((error) => {
        // An error happened.

        window.alert(error.message);
    });
}