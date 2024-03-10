import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCwb7rWU2jy1l4uZupEXvk0WJFrausTvgg",
    authDomain: "gameglance-829ec.firebaseapp.com",
    projectId: "gameglance-829ec",
    storageBucket: "gameglance-829ec.appspot.com",
    messagingSenderId: "464828101235",
    appId: "1:464828101235:web:88e525a33cbb9f164cf006",
    measurementId: "G-RD0M26KDBQ"
  };
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);