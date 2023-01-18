import { signOut } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { auth, firebaseConfig } from "../database/firebase";

export const signIn = (email, password) => {
  firebase.initializeApp(firebaseConfig);
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const logOut = () => {
  firebase.initializeApp(firebaseConfig);
  return signOut(auth);
};

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const signUp = (email, verificationPassword) => {
  firebase.initializeApp(firebaseConfig);
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, verificationPassword);
};

export const uniqueID = () =>
  Number(String(Date.now()).split("").splice(-3, 3).join(""));
