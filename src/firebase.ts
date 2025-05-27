import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBKiHVy7IE_UD1QcISE5OyUhA7QjoqgW-4',
  authDomain: 'myhelper-2e599.firebaseapp.com',
  projectId: 'myhelper-2e599',
  storageBucket: 'myhelper-2e599.firebasestorage.app',
  messagingSenderId: '771864947132',
  appId: '1:771864947132:web:39cad1ae404025a38c23b9',
  measurementId: 'G-QDQEV09ZPR',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
