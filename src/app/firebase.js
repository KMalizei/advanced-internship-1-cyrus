import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxn055WkFucHhpocSu1qGqk1t09xJiC50",
  authDomain: "summarist-6c344.firebaseapp.com",
  projectId: "summarist-6c344",
  storageBucket: "summarist-6c344.appspot.com",
  messagingSenderId: "822764507976",
  appId: "1:822764507976:web:4c02ffa851167c196b597d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
