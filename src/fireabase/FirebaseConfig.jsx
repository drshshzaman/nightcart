// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA67pl5x3lXSN1dpqg0qsa4VSzOXHgjqUU",
  authDomain: "skin-sugar.firebaseapp.com",
  projectId: "skin-sugar",
  storageBucket: "skin-sugar.appspot.com",
  messagingSenderId: "443087382013",
  appId: "1:443087382013:web:058c389301c787185fa594",
  measurementId: "G-X60P161RP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB, auth}