import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import MovieContext from "./useContext";


function App() {
  return (
    <MovieContext>
      <RouterProvider router={router} />
    </MovieContext>
  );
}

export default App;
