// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getStorage } from "@firebase/storage";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
// import { getDatabase } from "@firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// // Import the Secret Manager client and instantiate it:
// const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
// const client = new SecretManagerServiceClient();

const firebaseConfig = {
  apiKey: "AIzaSyBV_B_qv5tkl3gYwXFuAhPs06A2qRRwHaA",
  authDomain: "easyartshow-2dbd2.firebaseapp.com",
  databaseURL: "https://easyartshow-2dbd2-default-rtdb.firebaseio.com",
  projectId: "easyartshow-2dbd2",
  storageBucket: "easyartshow-2dbd2.appspot.com",
  messagingSenderId: "1017423300118",
  appId: "1:1017423300118:web:45e012119db4497e2ed737",
  measurementId: "G-B3QKCQ1VDS"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const fireStoreDB = getFirestore(app);

export {auth, fireStoreDB };