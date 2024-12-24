// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore , doc ,setDoc} from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4x9TQ5y-nf9SSO0cjQztq6AonUrPSilo",
  authDomain: "finance-dashboard-14504.firebaseapp.com",
  projectId: "finance-dashboard-14504",
  storageBucket: "finance-dashboard-14504.firebasestorage.app",
  messagingSenderId: "859119597305",
  appId: "1:859119597305:web:bdcd2f02c143263efb1428",
  measurementId: "G-VJTE5546HL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { doc, auth , provider , db,setDoc};