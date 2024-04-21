// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_cVNMIdH7qlPbuLu5WGo3UYj3mFnirs8",
  authDomain: "evs-92df0.firebaseapp.com",
  projectId: "evs-92df0",
  storageBucket: "evs-92df0.appspot.com",
  messagingSenderId: "323326701492",
  appId: "1:323326701492:web:f22d6a46aa7dc55b120ce1",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export {app, auth}
