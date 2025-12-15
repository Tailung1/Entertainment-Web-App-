import { useMyContext } from "../useContext";
import { useEffect } from "react";
import SharedComponent from "../shared/SharedComponent";
// import { Helmet } from "react-helmet";

export default function Movies() {
  const { movies, setPath, path, searching } = useMyContext();

  useEffect(() => {
    setPath("Movies");
    document.title = "Movies";
  }, []);

  return (
    <div className='min-h-screen '>
      {/* <Helmet>
        <title>Movies</title>
        <meta name='description' content='there you can see movies' />
      </Helmet> */}
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
          currentSection={path}
        />
      )}
    </div>
  );
}
