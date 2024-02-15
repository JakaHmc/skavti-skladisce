import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNFQe4b3cTRhGPyVOWczQoCNo1BUE3L5A",
  authDomain: "skladisce-skavti.firebaseapp.com",
  databaseURL: "https://skladisce-skavti-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "skladisce-skavti",
  storageBucket: "skladisce-skavti.appspot.com",
  messagingSenderId: "824115398216",
  appId: "1:824115398216:web:b821e44d6f398b8875fa7d",
  measurementId: "G-7MFSH31E9X"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
