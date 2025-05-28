import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const apiKey: string = import.meta.env.VITE_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: 'myhelper-b83b8.firebaseapp.com',
  projectId: 'myhelper-b83b8',
  storageBucket: 'myhelper-b83b8.firebasestorage.app',
  messagingSenderId: '74128747814',
  appId: '1:74128747814:web:c21e3078dca098ac4625e7',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
