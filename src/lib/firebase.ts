import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDR9vzwVMqyRCKszW3FAgT2y_wWNoO1b8k", // IMPORTANT: Consider using environment variables for sensitive keys
  authDomain: "nexo-website-8de73.firebaseapp.com",
  projectId: "nexo-website-8de73",
  storageBucket: "nexo-website-8de73.appspot.com", // Corrected storage bucket domain
  messagingSenderId: "194632691253",
  appId: "1:194632691253:web:35b1169b8c353d1f29cb7c",
  measurementId: "G-DWT0CSRFP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // Analytics can be enabled if needed

export const auth = getAuth(app);
export const db = getFirestore(app);

// Optional: Export analytics if you plan to use it
// export { analytics }; 