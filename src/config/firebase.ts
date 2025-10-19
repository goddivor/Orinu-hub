import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Remplacer avec les vraies valeurs de votre projet Firebase
// Pour obtenir cette configuration :
// 1. Allez sur https://console.firebase.google.com
// 2. Sélectionnez votre projet
// 3. Allez dans Paramètres du projet > Général
// 4. Faites défiler jusqu'à "Vos applications" et copiez la configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default app;
