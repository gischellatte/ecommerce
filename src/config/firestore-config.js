// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyDyEIh-JolOsE48crtXpf6JD-Qqr0WCWdM",
  authDomain: "dublin-firestore.firebaseapp.com",
  projectId: "dublin-firestore",
  storageBucket: "dublin-firestore.firebasestorage.app",
  messagingSenderId: "116290905426",
  appId: "1:116290905426:web:dfd49dec3b605fc31c868b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);