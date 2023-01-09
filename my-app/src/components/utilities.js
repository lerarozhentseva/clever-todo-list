import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import {firebaseConfig} from "../firebase";

export const signIn = (email, password) => {
  firebase.initializeApp(firebaseConfig);
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export const signUp = (email, verificationPassword) => {
  firebase.initializeApp(firebaseConfig);
  return firebase.auth().createUserWithEmailAndPassword(email, verificationPassword);
};

export const uniqueID = () => Number(String(Date.now()).split("").splice(-3, 3).join(""));
