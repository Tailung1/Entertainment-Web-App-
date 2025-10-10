import { BookMarkIcon } from "../shared/Icon";
import { DotIcon } from "../shared/Icon";
import ItemsFiltering from "../shared/ItemsFiltering";


export default function SharedComponent({
  currentComponent,
  currentSection,
}: {
  currentComponent: moviesType;
  currentSection:string
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
              <div
                key={item.id}
                className='flex   flex-col gap-2  relative w-[153px]   '
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className='rounded-lg h-[110px]  '
                  loading='lazy'
                />

                <div className='flex flex-col '>
                  <div className='flex items-center text-yellow-500   text-[14px] gap-2 '>
                    <p>{item.year}</p>
                    <DotIcon />
                    <p>{item.type}</p>
                    <DotIcon />
                    <p>{item.raiting}</p>
                  </div>
                  <p className='text-[18px] text-white '>
                    {item.title}
                  </p>
                </div>

                <BookMarkIcon item={item} />
              </div>
            ))}
      </div>
    </div>
  );
}
