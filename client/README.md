// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxZpYp1YAqBtbdReAK7u2UdKsRlXDytUg",
  authDomain: "techzoo-54fb9.firebaseapp.com",
  projectId: "techzoo-54fb9",
  storageBucket: "techzoo-54fb9.firebasestorage.app",
  messagingSenderId: "1024806482087",
  appId: "1:1024806482087:web:c8bb3925de0d7913c0ab82",
  measurementId: "G-VE9HYMEK4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);