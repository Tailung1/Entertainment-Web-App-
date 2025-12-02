import { useMyContext } from "../useContext";
import { useEffect } from "react";
import ItemsFiltering from "../features/ItemsFiltering";
import SharedComponent from "../shared/SharedComponent";

export default function Series() {
  ItemsFiltering();
  const { series, setPath, path, searching } = useMyContext();


    

  useEffect(() => {
    setPath("Series");
  }, []);

  return (
    <div className='min-h-screen'>
      {series.length < 1 && searching ? (
        <h1 className='text-[25px] text-white pl-7'>
          <div className='text-[20px] md:text-[25px]'>
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
