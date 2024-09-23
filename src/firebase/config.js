import { getApp, initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const firebaseConfig = {
  apiKey: "AIzaSyAo8GfAB1e1pzpl-W-qbv-WKhH5O7bt-ZM",
  authDomain: "scanmystock.firebaseapp.com",
  databaseURL: "https://scanmystock-default-rtdb.firebaseio.com",
  projectId: "scanmystock",
  storageBucket: "scanmystock.appspot.com",
  messagingSenderId: "172404037499",
  appId: "1:172404037499:web:a3c394f0bc0030959b4fde"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export {app, auth};