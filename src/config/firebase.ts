import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBeE7fwCzl2nm4-dIpbeRf9JnmmIO1y4GE",
  authDomain: "neurostep-se.firebaseapp.com",
  projectId: "neurostep-se",
  storageBucket: "neurostep-se.firebasestorage.app",
  messagingSenderId: "793869368812",
  appId: "1:793869368812:web:2d6b8e0741f5d511fdd4c9",
  measurementId: "G-Z2L82HBZ2Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

// Enable persistence
enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('Browser doesn\'t support persistence');
    }
  });