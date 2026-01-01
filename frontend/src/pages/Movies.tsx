import { useMyContext } from "../useContext";
import { useEffect } from "react";
import SharedComponent from "../shared/SharedComponent";

export default function Movies() {
  const {
    movies,
    setPath,
    path,
    searching,
    setMovies,
    fetchedItems,
  } = useMyContext();

  useEffect(() => {
    setPath("Movies");
    document.title = "Movies";
    const movieItems = fetchedItems.filter(
      (item) => item.type === "Movie"
    );
    setMovies(
      movieItems.filter((item) =>
        item.title
          .toLocaleLowerCase()
          .includes(searching.toLocaleLowerCase())
      )
    );
  }, [searching]);

  return (
    <div className='p-3 md:p-5'>
      {movies.length === 0 && searching ? (
        <h1 className='text-[25px] text-white '>
          <div className=' md:text-[25px]'>
            No movies found for{" "}
            <span className='text-green-700'>"</span>
            <p className=' text-red-500 inline'>{searching}</p>
            <span className='text-green-700'>"</span>{" "}
          </div>
        </h1>
      ) : (
        <SharedComponent
          currentComponent={movies}
          currentSection={path}
        />
      )}
    </div>
  );
}
