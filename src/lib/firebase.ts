// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBv8keQMiGnviYzM9_AqrIosuQvhkTvbQQ",
  authDomain: "task-dashboard-d0311.firebaseapp.com",
  projectId: "task-dashboard-d0311",
  storageBucket: "task-dashboard-d0311.firebasestorage.app",
  messagingSenderId: "236964583439",
  appId: "1:236964583439:web:45b8405a5e15381c592b7a",
  measurementId: "G-LP09XFEB59",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
