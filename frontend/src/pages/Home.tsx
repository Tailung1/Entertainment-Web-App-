import { useRef, useEffect } from "react";
import { useMyContext } from "../useContext";
import { BookMarkIcon } from "../shared/Icon";
import { DotIcon } from "../shared/Icon";
import ItemsFiltering from "../shared/ItemsFiltering";
import Auth from "../shared/Auth";

export default function Home() {
  Auth();
  ItemsFiltering();
  const { trendingItems, recommenedItems, searching } =
    useMyContext();
  const loadingArr = new Array(6).fill(6);
  const scrollRef = useRef<HTMLDivElement>(null);

  // This useEffect is for the auto-scrolling functionality if you want to enable it later.
//   useEffect(() => {
//     const scrollContainer = scrollRef.current;
//     const interval = setInterval(() => {
//       if (!scrollContainer) return;
//       const { scrollLeft, clientWidth, scrollWidth } =
//         scrollContainer;
//       if (scrollLeft + clientWidth >= scrollWidth) {
//         scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
//       } else {
//         scrollContainer.scrollBy({ left: 195, behavior: "smooth" });
//       }
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

  return (
    <div className='bg-[#10141E] pl-6 pr-1 min-h-screen'>
      {/* Trending Section */}
      {trendingItems.length < 1 && searching ? (
        <h1 className='text-[25px] text-white'>
          <div className='text-[20px] md:text-[25px]'>
            No Trending items found for{" "}
            <span className='text-green-700'>"</span>
            <p className='text-red-500 inline'>{searching}</p>
            <span className='text-green-700'>"</span>
          </div>
        </h1>
      ) : (
        <>
          <h2 className='text-white text-[20px]'>Trending</h2>
          <div ref={scrollRef} className='scroll-container py-3   '>
            <div className='wrapper-div'>
              {trendingItems.length < 1 ? (
                <div className='flex gap-3'>
                  {loadingArr.map((_, index) => (
                    <div key={index} className='loading-placeholder'>
                      {" "}
                    </div>
                  ))}
                </div>
              ) : (
                trendingItems.map((item) => (
                  <div
                    key={item.id}
                    className='flex flex-col ml-4 gap-2 min-w-[180px] md:min-w-[200px] lg:min-w-[220px] relative'
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className='h-[110px] lg:h-[120px] rounded-lg'
                      loading='lazy'
                    />
                    <div className='flex flex-col absolute bottom-1 left-2'>
                      <div className='flex items-center text-yellow-500 text-[14px] gap-2'>
                        <p>{item.year}</p>
                        <DotIcon />
                        <p>{item.type}</p>
                        <DotIcon />
                        <p>{item.raiting}</p>
                      </div>
                      <p className='text-[16px] text-white'>
                        {item.title}
                      </p>
                    </div>
                    <button className='absolute right-0.5'>
                      <BookMarkIcon item={item} />
                    </button>
                  </div>
                ))
              )}
            </div>{" "}
          </div>
        </>
      )}

      {/* Recommended Section */}
      {recommenedItems.length < 1 && searching ? (
        <h1 className='text-[25px] text-white mt-5'>
          <div className='text-[20px] md:text-[25px]'>
            No Recommended items found for{" "}
            <span className='text-green-700'>"</span>
            <p className='text-red-500 inline'>{searching}</p>
            <span className='text-green-700'>"</span>
          </div>
        </h1>
      ) : (
        <>
          <h2 className='text-white text-[20px] mt-5'>
            Recommended for you
          </h2>
          <div className='py-5 flex flex-wrap gap-x-4 gap-y-6'>
            {recommenedItems.length < 1
              ? loadingArr.map((_, idnex) => (
                  <div key={idnex} className='loading-placeholder'>
                    {" "}
                  </div>
                ))
              : recommenedItems.map((item) => (
                  <div
                    key={item.id}
                    className='flex flex-col w-[156px] lg:w-[220px] relative'
                  >
                    <img
                      className='h-[100px] lg:h-[120px] mb-2 rounded-lg'
                      src={item.image}
                      alt='movie picture'
                    />
                    <div className='flex items-center justify-start gap-3 text-orange-400'>
                      <p>{item.year}</p>
                      <DotIcon />
                      <p>{item.type}</p>
                      <DotIcon />
                      <p className='text-red-600 text-[100px]'>
                        {item.raiting}
                      </p>
                    </div>
                    <p className='text-fuchsia-600 text-[16px]'>
                      {item.title}
                    </p>
                    <button>
                      <BookMarkIcon item={item} />
                    </button>
                  </div>
                ))}
          </div>
        </>
      )}
    </div>
  );
}
