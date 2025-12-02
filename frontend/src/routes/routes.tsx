import { createBrowserRouter, redirect } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import Series from "../pages/Series";
import Movies from "../pages/Movies";
import BookMarked from "../pages/BookMarked";
import LayoutWithHeader from "../shared/LayoutWithHeader";

const checkAuthLoader = () => {
  const AuthToken = localStorage.getItem("auth-token");
  if (!AuthToken) {
    return redirect("/");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },
  {
    element: <LayoutWithHeader />,
    children: [
      {
        path: "/home",
        element: <Home />,
        loader: checkAuthLoader,
        
      },
      {
        path: "/series",
        element: <Series />,
        loader: checkAuthLoader,
      },
      {
        path: "/movies",
        element: <Movies />,
        loader: checkAuthLoader,
      },
      {
        path: "/bookmarked",
        element: <BookMarked />,
        loader: checkAuthLoader,
      },
    ],
  },
]);

export default router;
