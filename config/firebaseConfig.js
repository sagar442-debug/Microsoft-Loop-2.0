// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "loop-clone-6ffb0.firebaseapp.com",
  projectId: "loop-clone-6ffb0",
  storageBucket: "loop-clone-6ffb0.appspot.com",
  messagingSenderId: "779581965078",
  appId: "1:779581965078:web:09d06df65cd59b8f5f4637",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
