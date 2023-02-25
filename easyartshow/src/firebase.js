// Import the functions you need from the SDKs you need
// import * as firebase from 'firebase';
import { getAnalytics } from "firebase/analytics"; 
import { getStorage } from "@firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyBV_B_qv5tkl3gYwXFuAhPs06A2qRRwHaA",
  authDomain: "easyartshow-2dbd2.firebaseapp.com",
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGE_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
});

export const storage = getStorage(app);
// const auth = getAuth(app);

// export default storage;
export const auth = getAuth(app);
