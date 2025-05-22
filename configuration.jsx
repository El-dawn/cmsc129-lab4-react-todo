// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBMarCDvL22EuJMxNoUdUuF-Xnozs1JP1w",
	authDomain: "todo-app-react-4de6c.firebaseapp.com",
	databaseURL: "https://todo-app-react-4de6c-default-rtdb.firebaseio.com",
	projectId: "todo-app-react-4de6c",
	storageBucket: "todo-app-react-4de6c.firebasestorage.app",
	messagingSenderId: "24640178812",
	appId: "1:24640178812:web:d472d9b4fd637b3d5b17f9",
	measurementId: "G-B7BWMRNCSD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export default app;