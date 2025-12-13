import { useMyContext } from "../useContext";
import { useEffect } from "react";
import SharedComponent from "../shared/SharedComponent";

export default function BookMarked() {
  const { bookMarked, setPath, path, searching } = useMyContext();

  useEffect(() => {
    setPath("Bookmarked");
    document.title = "Bookmarked";
  }, []);

  return (
    <div className='min-h-screen'>
      {bookMarked.length < 1 && searching ? (
        <h1 className='text-[25px] text-white pl-7'>
          {searching ? (
            <div className='text-[20px] md:text-[25px]'>
              No Bookmarked items found for{" "}
              <span className='text-green-700'>"</span>
              <p className=' text-red-500 inline'>{searching}</p>
              <span className='text-green-700'>"</span>{" "}
            </div>
          ) : (
            "No bookmarked items available :("
          )}
        </h1>
      ) : (
        <SharedComponent
          currentComponent={bookMarked}
          currentSection={path}
        />
      )}
    </div>
  );
}
