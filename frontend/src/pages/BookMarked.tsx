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
    dbIsEmpty,
    searchInputChangeImpact,
    setBookmarkChangeImpact,
    fetchedItems,
    setBookMarked,
  } = useMyContext();

  useEffect(() => {
    setPath("Bookmarked");
    document.title = "Bookmarked";

    const bookMarkedItems = fetchedItems.filter(
      (item) => item.bookMarked
    );
    setBookMarked(
      bookMarkedItems.filter((item) =>
        item.title
          .toLocaleLowerCase()
          .includes(searching.toLocaleLowerCase())
      )
    );
    setBookmarkChangeImpact(false);
  }, [searching]);

  return (
    <div className='p-3 md:p-5'>
      {(bookMarked.length === 0 && bookmarkChangeImpact) ||
      dbIsEmpty ? (
        <h1 className='text-[25px] text-white '>
          No bookmarked items available
        </h1>
      ) : bookMarked.length === 0 && searching ? (
        <div className='text-[25px] text-white'>
          <h1 className=''>
            No Bookmarked items found for{" "}
            <span className='text-green-700'>"</span>
            <p className=' text-red-500 inline'>{searching}</p>
            <span className='text-green-700'>"</span>{" "}
          </h1>
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
