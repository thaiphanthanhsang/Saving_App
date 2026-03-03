import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCj0SKsWBcKSOH7SF4an5WAa3SD0ecX9zk",
  authDomain: "saving-app-341f8.firebaseapp.com",
  projectId: "saving-app-341f8",
  storageBucket: "saving-app-341f8.firebasestorage.app",
  messagingSenderId: "479215157594",
  appId: "1:479215157594:web:ca07ee1fb134f743fe3363",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
