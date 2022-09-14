// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8HzlrSlOGAVzYkamozTXx6L-TO1LcTAc",
  authDomain: "fazt-code-firebase.firebaseapp.com",
  projectId: "fazt-code-firebase",
  storageBucket: "fazt-code-firebase.appspot.com",
  messagingSenderId: "262828336303",
  appId: "1:262828336303:web:26c0319dde70fde647605a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
