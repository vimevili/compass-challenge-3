import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBht0kBTEVvKr9Cv_J_goHDYCIaE_tpKQY",
  authDomain: "compass-challange-3.firebaseapp.com",
  projectId: "compass-challange-3",
  storageBucket: "compass-challange-3.appspot.com",
  messagingSenderId: "229640339190",
  appId: "1:229640339190:web:7bb018459e855d246636d7",
  measurementId: "G-T8SKSRQDKB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()

export {auth, googleProvider, facebookProvider}
