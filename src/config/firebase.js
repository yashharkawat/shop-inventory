// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVUPOrMfIxOcBUyKRu4FTBOtVpY_C8PtY",
  authDomain: "shop-inventory-managemen-71a92.firebaseapp.com",
  projectId: "shop-inventory-managemen-71a92",
  storageBucket: "shop-inventory-managemen-71a92.appspot.com",
  messagingSenderId: "138941287749",
  appId: "1:138941287749:web:19cad26e358db37996022c",
  measurementId: "G-58D06J5BB9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleProvider=new GoogleAuthProvider();
export const db=getFirestore(app);

// const analytics = getAnalytics(app);