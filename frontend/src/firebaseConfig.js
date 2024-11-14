
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config (use your own credentials)

const firebaseConfig = {
    apiKey: "AIzaSyBwZxTlVj4JVQDkbHdUoNLp2ObolDBtDdQ",
    authDomain: "airlneapp.firebaseapp.com",
    projectId: "airlneapp",
    storageBucket: "airlneapp.firebasestorage.app",
    messagingSenderId: "108969635420",
    appId: "1:108969635420:web:58b653863e55b6300bc099",
    measurementId: "G-9Y7TXLWW8H"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
