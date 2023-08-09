// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvU0G-mMc1ZQQRljXdBzmwOP324JqwmKM",
  authDomain: "courseprep-e32dc.firebaseapp.com",
  projectId: "courseprep-e32dc",
  storageBucket: "courseprep-e32dc.appspot.com",
  messagingSenderId: "447894790803",
  appId: "1:447894790803:web:046c7f33af6bd300fce366",
  measurementId: "G-G2KTKVMV2M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();
