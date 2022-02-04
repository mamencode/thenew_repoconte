import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

 const firebaseConfig = {
    apiKey: "AIzaSyBGZXFnw2PPwycvwXWkjmYraU9jyPg2yE4",
    authDomain: "mynewinsta-691d1.firebaseapp.com",
    databaseURL: "https://mynewinsta-691d1-default-rtdb.firebaseio.com",
    projectId: "mynewinsta-691d1",
    storageBucket: "mynewinsta-691d1.appspot.com",
    messagingSenderId: "355903971926",
    appId: "1:355903971926:web:b0e1f17146ea851f3f91f7",
    measurementId: "G-C34C9QQGMM"
  };

  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

  const db = getFirestore();
  
  
  
  const storage = getStorage();
  
  const auth = getAuth();
  
  export { app, db, storage, auth };