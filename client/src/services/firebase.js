import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCxZpYp1YAqBtbdReAK7u2UdKsRlXDytUg",
    authDomain: "techzoo-54fb9.firebaseapp.com",
    projectId: "techzoo-54fb9",
    storageBucket: "techzoo-54fb9.firebasestorage.app",
    messagingSenderId: "1024806482087",
    appId: "1:1024806482087:web:c8bb3925de0d7913c0ab82",
    measurementId: "G-VE9HYMEK4G"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

export { auth,createUserWithEmailAndPassword,signInWithEmailAndPassword, db };
