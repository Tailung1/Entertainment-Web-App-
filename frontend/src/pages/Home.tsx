import { useEffect, useRef } from "react";
import { useMyContext } from "../useContext";
import { BookMarkIcon } from "../shared/Icon";
import { DotIcon } from "../shared/Icon";
import ItemsFiltering from "../ItemsFiltering";
import { easeInOut, motion } from "framer-motion";

// import { Helmet } from "react-helmet";

export default function Home() {
  ItemsFiltering();
  const { trendingItems, recommenedItems, searching } =
    useMyContext();
  const loadingArr = new Array(5).fill("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const notEmptyTrending = trendingItems.length !== 0;

  useEffect(() => {
    document.title = "Home";
  }, []);

  const calculatedAnimationDuration =
    document.getElementById("scrollParent")?.scrollWidth;

  return (
    <div className='pt-3 md:pt-5'>
      {/* <Helmet>
        <title>Home</title>
        <meta
          name='description'
          content='there you can see trending anf recommened movies and tv series'
        />
      </Helmet> */}
      {/* Trending Section */}
      {
        <>
          <h2 className='text-white text-[25px]'>Trending</h2>
          <div
            id='scrollParent'
            ref={scrollRef}
            className={` ${
              notEmptyTrending && "scroll-container"
            } py-3`}
          >
            <div
              className={`${
                notEmptyTrending && "scroll-container-wrapper"
              }  hide-scrollbar `}
              style={{
                width: `${calculatedAnimationDuration}px`,
                animationPlayState: searching? "paused":"running",
              }}
            >
              {
                // SCROLL CONTAINER items !!!!!!!! {}{}{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}
                !notEmptyTrending ? (
                  <div className='flex gap-3'>
                    {loadingArr.map((_, index) => (
                      <div
                        key={index}
                        className='loading-placeholder'
                      >
                        {" "}
                      </div>
                    ))}
                  </div>
                ) : (
                  trendingItems.map((item) => (
                    <div
                      id='movie'
                      key={item.id}
                      className='flex gap-3 min-w-[200px] md:min-w-[230px]  lg:min-w-[300px] relative  item-container'
                    >
                      <div className='relative group'>
                        <img
                          src={item.image}
                          alt={item.title}
                          className='h-[125px] w-full lg:h-[150px] rounded-lg'
                          loading='lazy'
                        />
                        <div className='overlay  absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-lg  transition-opacity duration-300'>
                          <button className='play-button'>
                            Play
                          </button>
                        </div>
                      </div>
                      <div className='flex flex-col absolute bottom-0 left-1  pointer-events-none'>
                        <div className='flex items-center text-yellow-500 text-[14px] gap-2'>
                          <p>{item.year}</p>
                          <DotIcon />
                          <p>{item.type}</p>
                          <DotIcon />
                          <p>{item.rating}</p>
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
                )
              }
            </div>{" "}
          </div>
        </>
      }

      {/* Recommended Section */}

      {recommenedItems.length === 0 && searching ? (
        <h1 className='text-[25px] text-white mt-5'>
          <div className='text-[25px]'>
            No Recommended items found for{" "}
            <span className='text-green-700'>"</span>
            <p className='text-red-500 inline '>{searching}</p>
            <span className='text-green-700'>"</span>
          </div>
        </h1>
      ) : (
        <div className='min-h-screen'>
          <h2 className='text-white text-[25px] mt-5'>
            Recommended for you
          </h2>
          <div className='py-5  flex flex-wrap  gap-x-4  gap-y-6'>
            {recommenedItems.length < 1
              ? loadingArr.map((_, idnex) => (
                  <div key={idnex} className='loading-placeholder'>
                    {" "}
                  </div>
                ))
              : recommenedItems.map((item) => (
                  <motion.div
                    initial={{ y: 20, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 100, scale: 1 }}
                    transition={{ duration: 0.3, ease: easeInOut }}
                    key={item.id}
                    className='item-container flex flex-col gap-2  w-[150px] md:min-w-[200px]  lg:min-w-[220px] relative  '
                  >
                    <div className='relative group'>
                      <img
                        src={item.image}
                        alt={item.title}
                        className='item-image h-[110px] lg:h-[120px] rounded-lg hover:bg-black'
                        loading='lazy'
                      />
                      <div className='overlay  absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-lg  transition-opacity duration-300'>
                        <button className='play-button'>Play</button>
                      </div>
                    </div>
                    <div className='flex flex-col  left-2 cursor-default'>
                      <div className='flex items-center text-yellow-500 text-[14px] gap-2'>
                        <p>{item.year}</p>
                        <DotIcon />
                        <p>{item.type}</p>
                        <DotIcon />
                        <p>{item.rating}</p>
                      </div>
                      <p className='text-[16px] text-white'>
                        {item.title}
                      </p>
                    </div>

                    <button className='absolute right-0.5'>
                      <BookMarkIcon item={item} />
                    </button>
                  </motion.div>
                ))}
          </div>
        </div>
      )}
    </div>
  );
}
