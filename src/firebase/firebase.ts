// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKlb3VpJ-9enn-6NWi6iM-LQbOW7ILmxM",
  authDomain: "michu-fashionwear-69450.firebaseapp.com",
  projectId: "michu-fashionwear-69450",
  storageBucket: "michu-fashionwear-69450.firebasestorage.app",
  messagingSenderId: "714303966102",
  appId: "1:714303966102:web:9efda0037dd175079febb7",
  measurementId: "G-BNE6W1MTQS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };