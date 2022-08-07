
const firebaseConfig = {
    apiKey: "AIzaSyCYahVCQpaZUfE7O4sELSW_VViTRjMN-BM",
    authDomain: "nardi-app.firebaseapp.com",
    projectId: "nardi-app",
    storageBucket: "nardi-app.appspot.com",
    messagingSenderId: "1023914836480",
    appId: "1:1023914836480:web:c2c5e202e78105f99b0ee5",
    measurementId: "G-5N73TJSYEB"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

let db = firebase.firestore();


let url = 'http://127.0.0.1:5501/';



function logout() {
    firebase.auth().signOut().then(() => {

        window.location.href = `${url}login.html`;
        localStorage.removeItem('adminUid')
    }).catch((error) => {
        // An error happened.

        window.alert(error.message);
    });
}