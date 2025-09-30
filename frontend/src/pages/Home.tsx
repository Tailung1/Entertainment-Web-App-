import { useRef } from "react";
import { useEffect } from "react";
import { useMyContext } from "../useContext";
import { bookMarkIcon } from "../shared/Icon";
import { dotIcon } from "../shared/Icon";

export default function Home() {
  const { trendingItems } = useMyContext();
  const scrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const scrollContainer = scrollRef.current;
//     const interval = setInterval(() => {
//       if (!scrollContainer) return;

//       const { scrollLeft, clientWidth, scrollWidth } =
//         scrollContainer;
//       if (scrollLeft + clientWidth >= scrollWidth) {
//         scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
//       } else {
//         scrollContainer.scrollBy({ left: 255, behavior: "smooth" });
//       }
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

  return (
    <div className='bg-[#10141E] pl-6'>
      <h2 className='text-white text-[20px] mb-3'>Trending</h2>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className='flex overflow-x-auto space-x-4 hide-scrollbar  '
      >
        {trendingItems.map((item) => (
          <div
            key={item.id}
            className='flex flex-col gap-2 bottom-2 relative   '
          >
            <img
              src={item.image}
              alt={item.title}
              className='w-full h-auto object-cover min-w-[164px] max-h-[110px] rounded-lg'
            />

            <div className='flex flex-col'>
              <div className='flex items-center text-yellow-500   text-[14px] gap-2 '>
                <p>{item.year}</p>
                {dotIcon()}
                <p>{item.type}</p>
                {dotIcon()}
                <p>{item.raiting}</p>
              </div>
              <p className='text-[20px] text-white '>{item.title}</p>
            </div>
            {bookMarkIcon(item,location.pathname)}
          </div>
        ))}
      </div>
    </div>
  );
}
