import { BookMarkIcon } from "./Icon";
import { DotIcon } from "./Icon";
import ItemsFiltering from "../ItemsFiltering";
import { motion } from "framer-motion";

export default function SharedComponent({
  currentComponent,
  currentSection,
}: {
  currentComponent: moviesType;
  currentSection: string;
}) {
  ItemsFiltering();

  const loadingDivs = new Array(6).fill(null);

  return (
    <div className='bg-[#10141E] px-6 min-h-screen'>
      <h2 className='text-white text-[20px] mb-3'>
        {currentSection}
      </h2>

      <div className='flex flex-wrap gap-x-4 gap-y-5 '>
        {currentComponent.length < 1
          ? loadingDivs.map((_, index) => (
              <div key={index} className='loading-placeholder'></div>
            ))
          : currentComponent.map((item: movieType) => (
              <motion.div
              initial={{opacity:0,y:20}}
              animate={{opacity:1,y:0}}
              transition={{duration:0.3}}
                key={item.id}
                className='item-container md:w-[220px] lg:w-[220px] '
              >
                <div className='item-container-image-wrapper'>
                  <img
                    src={item.image}
                    alt={item.title}
                    className='item-container-image h-[100px] md:h-[120px]  lg:h-[130px]'
                    loading='lazy'
                  />
                </div>

                <div className='flex flex-col items-start animation-container'>
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
                  <button className='play-button text-red-500'>
                    Play
                  </button>{" "}
                  /
                </div>

                <BookMarkIcon item={item} />
              </motion.div>
            ))}
      </div>
    </div>
  );
}
