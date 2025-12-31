import { useMyContext } from "../useContext";
import { useEffect } from "react";
import SharedComponent from "../shared/SharedComponent";

export default function Series() {
  const {
    series,
    setSeries,
    fetchedItems,
    setPath,
    path,
    searching,
  } = useMyContext();
  useEffect(() => {
    setPath("Series");
    document.title = "Series";
    const seriesItems = fetchedItems.filter(
      (item) => item.type === "Series"
    );
    setSeries(
      seriesItems.filter((item) =>
        item.title
          .toLocaleLowerCase()
          .includes(searching.toLocaleLowerCase())
      )
    );
  }, [searching]);

  return (
    <div className='p-3 md:p-5'>
      {series.length === 0 && searching ? (
        <h1 className='text-[25px] text-white'>
          <div className=' md:text-[25px]'>
            No Series found for{" "}
            <span className='text-green-700'>"</span>
            <p className=' text-red-500 inline'>{searching}</p>
            <span className='text-green-700'>"</span>{" "}
          </div>
        </h1>
      ) : (
        <SharedComponent
          currentComponent={series}
          currentSection={path}
        />
      )}
    </div>
  );
}
