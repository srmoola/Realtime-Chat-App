import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGYkFiFeNQuUAVgVJszHZXVY1yaLqENXQ",
  authDomain: "realtime-chat-app-edd4b.firebaseapp.com",
  projectId: "realtime-chat-app-edd4b",
  storageBucket: "realtime-chat-app-edd4b.appspot.com",
  messagingSenderId: "84792719044",
  appId: "1:84792719044:web:087f6631131657c3e0fb91",
  measurementId: "G-GP99JXLYV4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const firestore = getFirestore(app);

// Enable persistence
setPersistence(auth, browserLocalPersistence);

export { auth };
export const googleprovider = new GoogleAuthProvider();
