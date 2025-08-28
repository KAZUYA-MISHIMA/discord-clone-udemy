// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCL6o2oOis_bX7Ez12j1nPhFAucVa2wC7o",
  authDomain: "discord-clone-udemy-7bb8a.firebaseapp.com",
  projectId: "discord-clone-udemy-7bb8a",
  storageBucket: "discord-clone-udemy-7bb8a.firebasestorage.app",
  messagingSenderId: "7380141178",
  appId: "1:7380141178:web:7a8b9c9dce2ae459f367c3",
  measurementId: "G-VBY62DXXNX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db};