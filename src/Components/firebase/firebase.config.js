// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBrrBkneMngHJzD3K4rD-5hBZOD5VnZD0",
  authDomain: "tech-hub-c2612.firebaseapp.com",
  projectId: "tech-hub-c2612",
  storageBucket: "tech-hub-c2612.appspot.com",
  messagingSenderId: "1029465134636",
  appId: "1:1029465134636:web:5256517f93911f55902389"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;