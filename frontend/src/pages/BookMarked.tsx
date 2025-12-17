import { useMyContext } from "../useContext";
import { useEffect } from "react";
import SharedComponent from "../shared/SharedComponent";

export default function BookMarked() {
  const {
    bookMarked,
    setPath,
    path,
    searching,
    bookmarkChangeImpact,
  } = useMyContext();

  useEffect(() => {
    setPath("Bookmarked");
    document.title = "Bookmarked";
  }, []);

  return (
    <div className='min-h-screen'>
      {bookMarked.length === 0 && bookmarkChangeImpact ? (
        <h1 className='text-[25px] text-white pl-7'>
          No bookmarked items available :(
        </h1>
      ) : bookMarked.length === 0 && searching ? (
        <div className='text-[25px] text-white pl-7'>
          {searching && bookMarked.length !== 0 ? (
            <h1 className='text-[20px] md:text-[25px]'>
              No Bookmarked items found for{" "}
              <span className='text-green-700'>"</span>
              <p className=' text-red-500 inline'>{searching}</p>
              <span className='text-green-700'>"</span>{" "}
            </h1>
          ) : (
            "No bookmarked items available :("
          )}
        </div>
      ) : (
        <SharedComponent
          currentComponent={bookMarked}
          currentSection={path}
        />
      )}
    </div>
  );
}
