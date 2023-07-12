import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAV4QYTsbLT84NCFsNLYjtclj0idm7dEdU",
  authDomain: "codeninjasdojochat.firebaseapp.com",
  projectId: "codeninjasdojochat",
  storageBucket: "codeninjasdojochat.appspot.com",
  messagingSenderId: "932359496982",
  appId: "1:932359496982:web:556dd69a94c7c0db50dc37",
  measurementId: "G-LEPD000YR6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const firestore = getFirestore(app);

// Enable persistence
setPersistence(auth, browserLocalPersistence);

export { auth };
export const googleprovider = new GoogleAuthProvider();
