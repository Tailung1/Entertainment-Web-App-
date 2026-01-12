import { initializeApp } from "firebase/app";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import githubLogo from "../assets/github-mark.png";
import googleLogo from "../assets/google-color.svg";
import { useMyContext } from "../useContext";

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
  const { setProfilePicture } = useMyContext();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if (user) {
        setProfilePicture(user.photoURL as string);
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
    <div className='w-[50px] '>
      <button
        className=' bg-gradient-to-r rounded-[50%] from-blue-100 to-cyan-400 p-2 hover:from-violet-300 hover:to-violet-400'
        onClick={handleGoogleAuth}
      >
        <img className='w-8 h-8' src={googleLogo} alt='google logo' />
      </button>
    </div>
  );
};

const GithubAuth = () => {
  const { setProfilePicture } = useMyContext();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGithubAuth = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      if (user) {
        setProfilePicture(user.photoURL as string);
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
        className=' bg-gradient-to-r rounded-[50%] from-orange-200 to-orange-400 flex p-2 hover:from-green-400 hover:to-green-800'
        onClick={handleGithubAuth}
      >
        <img className='w-8 h-8' src={githubLogo} alt='github logo' />
      </button>
    </div>
  );
};

export { GithubAuth, GoogleAuth };
