import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

// Admin credentials
export const ADMIN_EMAIL = 'carl@amyna.se';
export const ADMIN_PASSWORD = 'JagKodarAppen1!';

// Collection names
export const COLLECTIONS = {
  USERS: 'users',
  COURSES: 'courses',
  PROGRESS: 'progress',
  ANALYTICS: 'analytics'
} as const;