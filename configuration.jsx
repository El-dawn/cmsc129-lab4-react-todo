// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyC1Mr8NIj5Sm8ClLDtZ8-YKFXmbglXjntE",
	authDomain: "todo-list-d59cb.firebaseapp.com",
	projectId: "todo-list-d59cb",
	storageBucket: "todo-list-d59cb.firebasestorage.app",
	messagingSenderId: "942801691578",
	appId: "1:942801691578:web:7793693f7adb558a817383",
	measurementId: "G-89YVX9LBEL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
