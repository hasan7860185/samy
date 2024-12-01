import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDZ9YbH_MWEwgVNwfcX5YV_5lZVzYhqQWE",
  authDomain: "real-estate-system-12345.firebaseapp.com",
  projectId: "real-estate-system-12345",
  storageBucket: "real-estate-system-12345.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);