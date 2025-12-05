import { initializeApp } from "firebase/app";


import { getAuth, GithubAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDRiPWvPjoPesSvEUDaQmmqFD70aN7QDbI",
  authDomain: "auth-with-firebase-test.firebaseapp.com",
  projectId: "auth-with-firebase-test",
  storageBucket: "auth-with-firebase-test.firebasestorage.app",
  messagingSenderId: "27459268644",
  appId: "1:27459268644:web:8849039623e547c660e8b1",
  measurementId: "G-HFX2F7G75K",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const githubProvider = new GithubAuthProvider();

export { auth, githubProvider };
