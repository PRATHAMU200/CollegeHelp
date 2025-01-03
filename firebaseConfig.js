import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getFirestore as getFirestoreInstance,
} from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBnQqB8Uf_cqr5r9qnZXlF10oKKtItfTTM",
  authDomain: "collegehelp-305c5.firebaseapp.com",
  projectId: "collegehelp-305c5",
  storageBucket: "collegehelp-305c5.firebasestorage.app",
  messagingSenderId: "610179033637",
  appId: "1:610179033637:web:d0168f81ff3bbe5a8cedcc",
  measurementId: "G-N6YQ3XMQLP",
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db, app };
