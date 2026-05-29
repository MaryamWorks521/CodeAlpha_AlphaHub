import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyB4T0VzUdpXHXNbgoL6lY-kFIyo1LBJZWU",
  authDomain: "alphahub-48a97.firebaseapp.com",
  projectId: "alphahub-48a97",
  storageBucket: "alphahub-48a97.firebasestorage.app",
  messagingSenderId: "161481410204",
  appId: "1:161481410204:web:e28283db4fc8b21e660f59"
};

const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();