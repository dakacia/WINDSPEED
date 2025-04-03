import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

// Thông tin cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyBju9Sb-sOkT9yKYPMSwiXkVBI2cnTV6VU",
  authDomain: "windspeed-c77e5.firebaseapp.com",
  databaseURL: "https://windspeed-c77e5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "windspeed-c77e5",
  storageBucket: "windspeed-c77e5.appspot.com",
  messagingSenderId: "903381326723",
  appId: "1:903381326723:web:716bc825f00f6cf5afb4b6",
  measurementId: "G-MMM9BK76G9"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, onValue };
