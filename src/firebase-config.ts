import { getFirestore } from "firebase/firestore";
import { FirebaseError, initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "test-sb-407d4.firebaseapp.com",
  projectId: "test-sb-407d4",
  storageBucket: "test-sb-407d4.appspot.com",
  messagingSenderId: "374266938790",
  appId: "1:374266938790:web:d6769207c859b8a605fb67",
  measurementId: "G-ZXW581PF5L",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const providers = {
  google: new GoogleAuthProvider(),
};

export {
  auth,
  createUserWithEmailAndPassword,
  db,
  getDownloadURL,
  onAuthStateChanged,
  providers,
  ref,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  storage,
  uploadBytes,
};

export type { FirebaseError };
