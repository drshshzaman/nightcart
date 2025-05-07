// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArP--v6nWJs3D_4zshWA-tIErCs_UVMdA",
  authDomain: "impactshopping-3f088.firebaseapp.com",
  databaseURL: "https://impactshopping-3f088-default-rtdb.firebaseio.com",
  projectId: "impactshopping-3f088",
  storageBucket: "salancer-444c7.appspot.com",
  messagingSenderId: "998340797570",
  appId: "1:998340797570:web:fa184ad26724c85862809b",
  measurementId: "G-RCZYRJCSJ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {fireDB, auth, storage}
