import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";

// export const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY || 'mock_key',
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID
// };

export const firebaseConfig = {
  apiKey: "AIzaSyAJp59EXMNoDLDPiGijTR_VN__BbAsehaA",
  authDomain: "to-do-list-3d63b.firebaseapp.com",
  databaseURL: "https://to-do-list-3d63b-default-rtdb.firebaseio.com",
  projectId: "to-do-list-3d63b",
  storageBucket: "to-do-list-3d63b.appspot.com",
  messagingSenderId: "769798511812",
  appId: "1:769798511812:web:4cc76738e1e9d05ea53d91"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

