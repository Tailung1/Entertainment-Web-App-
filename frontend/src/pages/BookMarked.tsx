import { useMyContext } from "../useContext";
import { useEffect } from "react";
import ItemsFiltering from "../shared/ItemsFiltering";
import SharedComponent from "../shared/SharedComponent";

export default function BookMarked() {
  ItemsFiltering();
  const { bookMarked, setPath, searching } = useMyContext();

  useEffect(() => {
    setPath("/bookmarked");
  }, []);
  return (
    <div className='min-h-screen'>
      {bookMarked.length < 1 ? (
        <h1 className='text-[25px] text-white pl-7'>
          {searching ? (
            <div>
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
          currentSection='Bookmarked'
        />
      )}
    </div>
  );
}
