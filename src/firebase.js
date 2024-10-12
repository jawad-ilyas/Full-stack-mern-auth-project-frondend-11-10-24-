// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCt0bAIk_Xc_KI4O89WBPQ8QPDqrHuGioU",
    authDomain: "chats-app-5f3fb.firebaseapp.com",
    databaseURL: "https://chats-app-5f3fb-default-rtdb.firebaseio.com",
    projectId: "chats-app-5f3fb",
    storageBucket: "chats-app-5f3fb.appspot.com",
    messagingSenderId: "684087422782",
    appId: "1:684087422782:web:3acb98d36b75872902466f",
    measurementId: "G-GVEG2PDBT4"
};

// Initialize Firebase
export const fireBaseapp = initializeApp(firebaseConfig);
