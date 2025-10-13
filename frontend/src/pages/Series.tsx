import { useMyContext } from "../useContext";
import { useEffect } from "react";
import Auth from "../shared/Auth";

import ItemsFiltering from "../shared/ItemsFiltering";
import SharedComponent from "../shared/SharedComponent";

export default function Series() {
    Auth()
    ItemsFiltering()
  const { series, setPath,searching } = useMyContext();

    useEffect(() => {
      setPath("/series");
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
          currentSection='Bookmarked'
        />
      )}
    </div>
  );
}
