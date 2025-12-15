import { initializeApp } from "firebase/app";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import githubLogo from "../assets/github-mark.png";
import googleLogo from "../assets/google-color.svg";

import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env
    .VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const githubProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();

const GoogleAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if (user) {
        console.log(user);
        localStorage.setItem("auth-token", user.uid);
        navigate("/home");
      }
    } catch (error: any) {
      console.error(
        "Error signing up/in with Google:",
        error.message
      );
    }
  };
  return (
    <div>
      <button
        className='mt-5 bg-gradient-to-r  from-blue-800 to-cyan-400 flex gap-3 py-2 items-center justify-center w-full rounded-[6px]'
        onClick={handleGoogleAuth}
      >
        <img className='w-8 h-8' src={googleLogo} alt='google logo' />
        <span className='text-white text-[18px]'>
          {`${
            location.pathname === "/" ? "Sign in" : "Sign up"
          } with Google`}
        </span>
      </button>
    </div>
  );
};

const GithubAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGithubAuth = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      if (user) {
        console.log(user.displayName?.split(" ")[0]);
        localStorage.setItem("auth-token", user.uid);
        navigate("/home");
      }
    } catch (error: any) {
      console.error(
        "Error signing up/in with Github:",
        error.message
      );
    }
  };
  return (
    <div>
      <button
        className='mt-5 bg-gradient-to-r from-orange-500 to-orange-400 flex gap-3 py-2 items-center justify-center w-full  rounded-[6px]'
        onClick={handleGithubAuth}
      >
        <img className='w-8 h-8' src={githubLogo} alt='github logo' />
        <span className='text-white text-[18px]'>
          {" "}
          {`${location.pathname === "/" ? "Sign in" : "Sign up"}
        with github`}
        </span>
      </button>
    </div>
  );
};

export { GithubAuth, GoogleAuth };
