// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPKI7vQMDH5QRf0qkOPac0sPiz2LA-k5E",
  authDomain: "social-sound-58b2e.firebaseapp.com",
  projectId: "social-sound-58b2e",
  storageBucket: "social-sound-58b2e.appspot.com",
  messagingSenderId: "101040439284",
  appId: "1:101040439284:web:719ba7cf95f279117dc3a1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
