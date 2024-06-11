import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

export const firebaseConfig = {
    apiKey: "AIzaSyBBshog1fqB43xLKxipGw2OVS_QK139fl4",
    authDomain: "cattit-3c66a.firebaseapp.com",
    projectId: "cattit-3c66a",
    storageBucket: "cattit-3c66a.appspot.com",
    messagingSenderId: "1021923165053",
    appId: "1:1021923165053:web:eaff52415c420212c04214",
    measurementId: "G-ZQC3ETP628"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
}); 

export { db, app, auth }