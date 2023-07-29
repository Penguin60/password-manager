// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5WfAysQUafD-rP2_bsPHRw8VbF9wAw0E",
  authDomain: "password-manager-49762.firebaseapp.com",
  projectId: "password-manager-49762",
  storageBucket: "password-manager-49762.appspot.com",
  messagingSenderId: "1048122392674",
  appId: "1:1048122392674:web:335e446aea2f3b6a1ad13b",
  measurementId: "G-H0640CJ5ZV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);