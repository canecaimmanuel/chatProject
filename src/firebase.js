import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD9b6SY1ctDw79GfMAKIeNHVRK9iKG-Obs",
    authDomain: "chatapp-73561.firebaseapp.com",
    projectId: "chatapp-73561",
    storageBucket: "chatapp-73561.appspot.com",
    messagingSenderId: "1070079122448",
    appId: "1:1070079122448:web:988e26559d474e24373e95",
    measurementId: "G-GC90M05TYM"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };