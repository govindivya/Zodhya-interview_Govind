import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPrDMjs7tWCltEMKySJ47Sto3QbBgOF4U",
  authDomain: "healthy-dragon-360417.firebaseapp.com",
  projectId: "healthy-dragon-360417",
  storageBucket: "healthy-dragon-360417.appspot.com",
  messagingSenderId: "740123156094",
  appId: "1:740123156094:web:ab2e713e6dbc6edd4fc22f",
  measurementId: "G-VL32PBSECW",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
