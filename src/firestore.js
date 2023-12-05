import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDFvVtfdPPhNfIzNQ4HEr9UmqilKbjbjAc",
  authDomain: "news-app-e4945.firebaseapp.com",
  projectId: "news-app-e4945",
  storageBucket: "news-app-e4945.appspot.com",
  messagingSenderId: "672244704831",
  appId: "1:672244704831:web:032726607d7c6d71367a8a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { db, auth }