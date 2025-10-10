import { useMyContext } from "../useContext";
import { useEffect } from "react";
import ItemsFiltering from "../shared/ItemsFiltering";
import SharedComponent from "../shared/SharedComponent";

export default function Movies() {
  ItemsFiltering();
  const { movies, setPath, searching } = useMyContext();

  useEffect(() => {
    setPath("/movies");
  }, []);

  return (
    <div className='min-h-screen'>
      {movies.length < 1 && searching ? (
        <h1 className='text-[25px] text-white pl-7'>
          <div>
            No movies  found for{" "}
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
