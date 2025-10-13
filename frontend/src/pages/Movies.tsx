import { useMyContext } from "../useContext";
import { useEffect } from "react";
import ItemsFiltering from "../shared/ItemsFiltering";
import SharedComponent from "../shared/SharedComponent";
import Auth from "../shared/Auth";

export default function Movies() {
  Auth();
  ItemsFiltering();
  const { movies, setPath, searching } = useMyContext();

  useEffect(() => {
    setPath("/movies");
  }, []);

  return (
    <div className='min-h-screen'>
      {movies.length < 1 && searching ? (
        <h1 className='text-[25px] text-white pl-7'>
          <div className='text-[20px] md:text-[25px]'>
            No movies found for{" "}
            <span className='text-green-700'>"</span>
            <p className=' text-red-500 inline'>{searching}</p>
            <span className='text-green-700'>"</span>{" "}
          </div>
        </h1>
      ) : (
        <SharedComponent
          currentComponent={movies}
          currentSection='Bookmarked'
        />
      )}
    </div>
  );
}
