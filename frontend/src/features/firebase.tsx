import { initializeApp } from "firebase/app";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import githubLogo from "../assets/github-mark.png";

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

const GithubAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGithubAuth = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      if (user) {
        localStorage.setItem("auth-token", user.accessToken);
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
        className=' mt-5 bg-orange-500 flex gap-3 py-2 items-center justify-center w-full  rounded-[6px]'
        onClick={handleGithubAuth}
      >
        <img className='w-8 h-8' src={githubLogo} alt='github logo' />
        <span className='text-[18px]'>
          {" "}
          {`${location.pathname === "/" ? "Sign in" : "Sign up"}
        with github`}
        </span>
      </button>
    </div>
  );
};

export { GithubAuth };
