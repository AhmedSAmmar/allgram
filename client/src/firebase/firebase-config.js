// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCtIs6as8YWtq6ruzbVR6UF41HMaW8JYJM",
  authDomain: "firegram-3941d.firebaseapp.com",
  projectId: "firegram-3941d",
  storageBucket: "firegram-3941d.appspot.com",
  messagingSenderId: "1069284864120",
  appId: "1:1069284864120:web:1e1ffad27c5f6f73aebd8d",
  measurementId: "G-RHXM7M4N8J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage };
