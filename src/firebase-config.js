import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
    apiKey: 'AIzaSyC0teZUETqQolcNfGeIIXB1l0kMN_yQOn4',
    authDomain: 'fir-divisima.firebaseapp.com',
    databaseURL: 'https://fir-divisima-default-rtdb.firebaseio.com',
    projectId: 'fir-divisima',
    storageBucket: 'fir-divisima.appspot.com',
    messagingSenderId: '1046165362128',
    appId: '1:1046165362128:web:c089297577482d539dd5d5',
    measurementId: 'G-5ED0Z0CKVY',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
