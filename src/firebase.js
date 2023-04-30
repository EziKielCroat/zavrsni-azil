// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSie7b6Q8czvWpWa4-4Nn8eH1plrx9skw",
  authDomain: "zavrsni-azil.firebaseapp.com",
  projectId: "zavrsni-azil",
  storageBucket: "zavrsni-azil.appspot.com",
  messagingSenderId: "883063756890",
  appId: "1:883063756890:web:3c458604d31cc3d3cf2063"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);