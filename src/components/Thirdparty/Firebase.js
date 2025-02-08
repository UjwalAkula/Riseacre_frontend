import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCt0fs69AsBgcDp8JXSqWrL0Snz-tIFk0",
  authDomain: "riseacre-39da0.firebaseapp.com",
  projectId: "riseacre-39da0",
  storageBucket: "riseacre-39da0.firebasestorage.app",
  messagingSenderId: "474347634396",
  appId: "1:474347634396:web:5078443e33b890d0283e19",
  measurementId: "G-8VPB5BN01G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);

export default firestore;

export {auth};