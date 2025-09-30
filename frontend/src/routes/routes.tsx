import { createBrowserRouter, Outlet } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import Series from "../pages/Series";
import Movies from "../pages/Movies";
import BookMarked from "../pages/BookMarked"
import LayoutWithHeader from "../shared/LayoutWithHeader";
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
      },
      {
        path: "/series",
        element: <Series />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/bookmarked",
        element: <BookMarked />,
      },
    ],
  },
]);

export default router;
