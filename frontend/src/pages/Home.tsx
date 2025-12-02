import { useRef } from "react";
import { useMyContext } from "../useContext";
import { BookMarkIcon } from "../shared/Icon";
import { DotIcon } from "../shared/Icon";
import ItemsFiltering from "../ItemsFiltering";


export default function Home() {
    ItemsFiltering()
  const { trendingItems, recommenedItems, searching } =
    useMyContext();
  const loadingArr = new Array(6).fill(6);
  const scrollRef = useRef<HTMLDivElement>(null);
  const notEmpty = trendingItems.length > 0;

  return (
    <div className='bg-[#10141E] pl-6 pr-1 min-h-screen'>
      {/* Trending Section */}
      {!notEmpty && searching ? (
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
          <div
            ref={scrollRef}
            className={` ${notEmpty && "scroll-container"} py-3    `}
          >
            <div
              className={`${
                notEmpty && "wrapper-div"
              } hide-scrollbar`}
            >
              {!notEmpty ? (
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
                    className='flex flex-col ml-4 gap-2 min-w-[180px] md:min-w-[200px]  lg:min-w-[220px] relative hover:scale-105 group hover:opacity-90'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='40'
                      height='40'
                      viewBox='0 0 24 24'
                      fill='red'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='absolute cursor-pointer inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-black'
                    >
                      <polygon points='5,3 19,12 5,21 5,3' />
                    </svg>
                    <img
                      src={item.image}
                      alt={item.title}
                      className='h-[110px] lg:h-[120px] rounded-lg'
                      loading='lazy'
                    />
                    <div className='flex flex-col absolute bottom-1 left-2 cursor-default'>
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
          <div className='py-5 flex flex-wrap gap-x-4  gap-y-6'>
            {recommenedItems.length < 1
              ? loadingArr.map((_, idnex) => (
                  <div key={idnex} className='loading-placeholder'>
                    {" "}
                  </div>
                ))
              : recommenedItems.map((item) => (
                  <div
                    key={item.id}
                    className='flex flex-col  gap-2 w-[150px] md:min-w-[200px] hover:scale-105 lg:min-w-[220px] relative group hover:opacity-90'
                  >
                    {/* Play Icon */}
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='40'
                      height='40'
                      viewBox='0 0 24 24'
                      fill='red'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='absolute cursor-pointer inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-black'
                    >
                      <polygon points='5,3 19,12 5,21 5,3' />
                    </svg>
                    <img
                      src={item.image}
                      alt={item.title}
                      className='h-[110px] lg:h-[120px] rounded-lg hover:bg-black'
                      loading='lazy'
                    />
                    <div className='flex flex-col absolute bottom-1 left-2 cursor-default'>
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
                ))}
          </div>
        </>
      )}
    </div>
  );
}
