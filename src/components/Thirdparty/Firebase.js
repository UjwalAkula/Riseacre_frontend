// src/Firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ALL variables MUST now start with VITE_ to be picked up by Vite.js
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // CHANGED: VITE_ prefix
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, // CHANGED: VITE_ prefix
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID, // CHANGED: VITE_ prefix
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, // CHANGED: VITE_ prefix
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, // CHANGED: VITE_ prefix
  appId: import.meta.env.VITE_FIREBASE_APP_ID, // CHANGED: VITE_ prefix
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID // Optional, CHANGED: VITE_ prefix
};



// Initialize Firebase (Error is happening here because apiKey is undefined)
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);

export default firestore;
export { auth };