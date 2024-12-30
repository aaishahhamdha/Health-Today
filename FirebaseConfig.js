import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  

const firebaseConfig = {
    apiKey: "AIzaSyAdGG9W32lZMYOG8jTgYtepACeGU2-8sLc",
    authDomain: "health-app-dbcf4.firebaseapp.com",
    projectId: "health-app-dbcf4",
    storageBucket: "health-app-dbcf4.firebasestorage.app",
    messagingSenderId: "955520207601",
    appId: "1:955520207601:web:7062a057c366d53a157750",
    measurementId: "G-5X0XLHLN28"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP); 
