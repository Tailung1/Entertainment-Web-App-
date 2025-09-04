import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/home", element: <Home /> },
    ],
  },
]);
export default router;
