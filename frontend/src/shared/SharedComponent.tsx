import { BookMarkIcon } from "./Icon";
import { DotIcon } from "./Icon";
import ItemsFiltering from "../ItemsFiltering";
import { motion } from "framer-motion";
import { useState } from "react";

export default function SharedComponent({
  currentComponent,
  currentSection,
}: {
  currentComponent: moviesType;
  currentSection: string;
}) {
  ItemsFiltering();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const loadingDivs = new Array(6).fill(null);
  return (
    <div className='pt-3 md:pt-5 pr-3 relative'>
      <h2 className='text-white text-[25px] mb-3'>
        {currentSection}
      </h2>

      <div className='flex flex-wrap gap-x-4 gap-y-5 '>
        {currentComponent.length === 0
          ? loadingDivs.map((_, index) => (
              <div key={index} className='loading-placeholder'></div>
            ))
          : currentComponent.map((item: movieType) => (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                key={item.id}
                className='item-container w-[150px]  md:w-[220px] lg:w-[260px] relative'
              >
                <div className='relative group'>
                  <img
                    src={item.image}
                    alt={item.title}
                    className='item-image h-[100px] md:h-[120px] lg:h-[130px] w-full rounded-lg'
                    loading='lazy'
                  />

                  <motion.div className='overlay inset-0  absolute  bg-black bg-opacity-50 flex justify-center items-center rounded-lg  transition-opacity duration-300'>
                    <button
                      onClick={() => setIsOpen(true)}
                      className='play-button text-red-500 text-lg font-bold'
                    >
                      Play
                    </button>
                  </motion.div>
                </div>
                <div className='flex flex-col items-start '>
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

                <BookMarkIcon item={item} />
              </motion.div>
            ))}
      </div>
      {isOpen && (
        <div className='absolute inset-0 top-2 flex justify-center items-center z-50 bg-black bg-opacity-50'>
          <button
            onClick={() => setIsOpen(false)}
            className='absolute top-1 traslatex-[50%] text-white text-[18px] bg-red-700 rounded-full px-8 py-1 hover:bg-red-500 '
          >
            Exit
          </button>
          <iframe
            width='47%'
            height='80%'
            src='https://www.youtube.com/embed/StYhR1pWqQw?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0'
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            className='rounded-[20px]'
          ></iframe>
        </div>
      )}
    </div>
  );
}
