import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRiPWvPjoPesSvEUDaQmmqFD70aN7QDbI",
  authDomain: "auth-with-firebase-test.firebaseapp.com",
  projectId: "auth-with-firebase-test",
  storageBucket: "auth-with-firebase-test.firebasestorage.app",
  messagingSenderId: "27459268644",
  appId: "1:27459268644:web:9a418efd77608f9360e8b1",
  measurementId: "G-2BFH3MWD7B",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const githubProvider = new GithubAuthProvider();
const handleGithubSignUp = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;
  } catch (error: any) {
    console.error("Error signing up/in with Google:", error.message);
  }
};

export { handleGithubSignUp };
