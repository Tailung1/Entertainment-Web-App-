import { useMyContext } from "../useContext";
import ItemFiltering from "../shared/ItemsFiltering";
import { bookMarkIcon } from "../shared/Icon";
import { dotIcon } from "../shared/Icon";

export default function Movies() {
  const { itemsToShow } = useMyContext();
  ItemFiltering();
  return (
    <div className='bg-[#10141E] px-6 min-h-screen'>
      <h2 className='text-white text-[20px] mb-3'>Movies</h2>

      <div className='flex flex-wrap gap-x-4 gap-y-5 '>
        {itemsToShow.map((item) => (
          <div
            key={item.id}
            className='flex   flex-col gap-2  relative w-[153px]   '
          >
            <img
              src={item.image}
              alt={item.title}
              className='rounded-lg h-[110px]  '
            />

            <div className='flex flex-col '>
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
