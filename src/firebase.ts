import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD54JyeernZKh9aoExakQ_PAUhJx6FEYPQ",
  authDomain: "nwitter-reloaded-cd0b5.firebaseapp.com",
  projectId: "nwitter-reloaded-cd0b5",
  storageBucket: "nwitter-reloaded-cd0b5.appspot.com",
  messagingSenderId: "58772497049",
  appId: "1:58772497049:web:2b46e723afc4896c43ce08",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
