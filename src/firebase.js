// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
/*const firebaseConfig = {
  apiKey: "AIzaSyA1K1xD54w-p51oWfzApFSEJTxX_O80EJI",
  authDomain: "realtor-demo-react-9b173.firebaseapp.com",
  projectId: "realtor-demo-react-9b173",
  storageBucket: "realtor-demo-react-9b173.appspot.com",
  messagingSenderId: "464552757206",
  appId: "1:464552757206:web:8a844a2b4b1d04d1364677"
};*/

const firebaseConfig = {
  apiKey: "AIzaSyB3qIEZLlzTmTWBhYoDGBbFbXldtk4NCGo",
  authDomain: "react-realtor-clone-df0b9.firebaseapp.com",
  projectId: "react-realtor-clone-df0b9",
  storageBucket: "react-realtor-clone-df0b9.appspot.com",
  messagingSenderId: "226291593121",
  appId: "1:226291593121:web:42932a1c90cd45ade0e5e0",
  measurementId: "G-7TV32LG0E9"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
export const db = getFirestore();