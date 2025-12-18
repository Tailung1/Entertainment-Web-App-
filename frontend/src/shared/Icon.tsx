import { buildTransform } from "framer-motion";
import { useMyContext } from "../useContext";

export default function Icon({
  iconType,
  handleClick,
  fillColor,
}: {
  iconType: string;
  handleClick: (iconName: string) => void;
  fillColor: string;
}) {
  switch (iconType) {
    case "logo":
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='30'
          height='30'
          viewBox='0 0 25 20'
          fill='none'
        >
          <path
            d='M20 0L22.5 5H18.75L16.25 0H13.75L16.25 5H12.5L10 0H7.5L10 5H6.25L3.75 0H2.5C1.11875 0 0.0125 1.11875 0.0125 2.5L0 17.5C0 18.8813 1.11875 20 2.5 20H22.5C23.8813 20 25 18.8813 25 17.5V0H20Z'
            fill='red'
            className='cursor-pointer '
          />
        </svg>
      );
    case "home":
      return (
        <button onClick={() => handleClick("home")} className='group'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='30'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M0.8 0H6.4C6.88 0 7.2 0.32 7.2 0.8V6.4C7.2 6.88 6.88 7.2 6.4 7.2H0.8C0.32 7.2 0 6.88 0 6.4V0.8C0 0.32 0.32 0 0.8 0ZM0.8 8.8H6.4C6.88 8.8 7.2 9.12 7.2 9.6V15.2C7.2 15.68 6.88 16 6.4 16H0.8C0.32 16 0 15.68 0 15.2V9.6C0 9.12 0.32 8.8 0.8 8.8ZM15.2 0H9.6C9.12 0 8.8 0.32 8.8 0.8V6.4C8.8 6.88 9.12 7.2 9.6 7.2H15.2C15.68 7.2 16 6.88 16 6.4V0.8C16 0.32 15.68 0 15.2 0ZM9.6 8.8H15.2C15.68 8.8 16 9.12 16 9.6V15.2C16 15.68 15.68 16 15.2 16H9.6C9.12 16 8.8 15.68 8.8 15.2V9.6C8.8 9.12 9.12 8.8 9.6 8.8Z'
              fill={fillColor}
              className='cursor-pointer group-hover:fill-red-600'
            />
          </svg>
        </button>
      );
    case "movies":
      return (
        <button
          onClick={() => handleClick("/movie")}
          className='group'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='30'
            viewBox='0 0 16 16'
            fill='none'
            onClick={() => handleClick("/movie")}
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M13.5644 0H2.43556C1.09044 0 0 1.09044 0 2.43556V13.5644C0 14.9096 1.09044 16 2.43556 16H13.5644C14.2104 16 14.8299 15.7434 15.2866 15.2866C15.7434 14.8299 16 14.2104 16 13.5644V2.43556C16 1.78961 15.7434 1.17011 15.2866 0.713358C14.8299 0.256602 14.2104 0 13.5644 0ZM3.2 7.2H1.6V5.6H3.2V7.2ZM3.2 8.8H1.6V10.4H3.2V8.8ZM14.4 7.2H12.8V5.6H14.4V7.2ZM14.4 8.8H12.8V10.4H14.4V8.8ZM14.4 2.192V3.2H12.8V1.6H13.808C13.965 1.6 14.1156 1.66237 14.2266 1.77339C14.3376 1.88441 14.4 2.03499 14.4 2.192ZM3.2 1.6H2.192C2.03499 1.6 1.88441 1.66237 1.77339 1.77339C1.66237 1.88441 1.6 2.03499 1.6 2.192V3.2H3.2V1.6ZM1.6 13.808V12.8H3.2V14.4H2.192C2.03499 14.4 1.88441 14.3376 1.77339 14.2266C1.66237 14.1156 1.6 13.965 1.6 13.808ZM12.8 14.4H13.808C14.135 14.4 14.4 14.135 14.4 13.808V12.8H12.8V14.4Z'
              fill={fillColor}
              className='cursor-pointer group-hover:fill-red-600'
            />
          </svg>
        </button>
      );
    case "series":
      return (
        <button
          className='group'
          onClick={() => handleClick("series")}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='30'
            viewBox='0 0 16 16'
            fill='none'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M7.264 3.58487H16V16H0V3.58487H3.936L1.776 0.962173L3.024 0.0232784L5.6 3.12706L8.176 0L9.424 0.962173L7.264 3.58487ZM1.6 14.4481H9.6V5.13676H1.6V14.4481ZM13.6 11.3443H12V9.79243H13.6V11.3443ZM12 8.24054H13.6V6.68865H12V8.24054Z'
              fill={fillColor}
              className='cursor-pointer group-hover:fill-red-600'
            />
          </svg>
        </button>
      );
    case "bookmarked":
      return (
        <button
          onClick={() => handleClick("bookmarked")}
          className='group'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='30'
            viewBox='0 0 14 16'
            fill='none'
          >
            <path
              className='cursor-pointer group-hover:fill-red-600'
              d='M12.3093 0C12.4715 0 12.6266 0.031725 12.7746 0.0951751C13.0073 0.186825 13.1923 0.331351 13.3298 0.528751C13.4673 0.726151 13.536 0.944701 13.536 1.1844V14.8156C13.536 15.0553 13.4673 15.2738 13.3298 15.4712C13.1923 15.6686 13.0073 15.8132 12.7746 15.9048C12.6407 15.9612 12.4856 15.9894 12.3093 15.9894C11.9709 15.9894 11.6783 15.8766 11.4316 15.651L6.76801 11.1672L2.10443 15.651C1.85063 15.8837 1.55805 16 1.2267 16C1.06455 16 0.909451 15.9683 0.761401 15.9048C0.528751 15.8132 0.343688 15.6686 0.206213 15.4712C0.0687376 15.2738 0 15.0553 0 14.8156V1.1844C0 0.944701 0.0687376 0.726151 0.206213 0.528751C0.343688 0.331351 0.528751 0.186825 0.761401 0.0951751C0.909451 0.031725 1.06455 0 1.2267 0H12.3093Z'
              fill={fillColor}
            />
          </svg>
        </button>
      );
    case "profilePic":
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 100 100'
          width='50'
          height='40'
        >
          <circle
            cx='50'
            cy='50'
            r='40'
            fill='#F7C18A'
            stroke='black'
            strokeWidth='2'
          />

          <polygon
            points='30,20 40,10 50,25'
            fill='#F7C18A'
            stroke='black'
            strokeWidth='2'
          />
          <polygon
            points='70,20 60,10 50,25'
            fill='#F7C18A'
            stroke='black'
            strokeWidth='2'
          />

          <circle
            cx='50'
            cy='60'
            r='30'
            fill='white'
            stroke='black'
            strokeWidth='2'
          />

          <circle cx='35' cy='45' r='5' fill='black' />
          <circle cx='65' cy='45' r='5' fill='black' />

          <circle cx='50' cy='55' r='3' fill='black' />

          <path
            d='M45,60 Q50,65 55,60'
            stroke='black'
            strokeWidth='2'
            fill='transparent'
          />
        </svg>
      );
    default:
      return null;
  }
}
// interface BookMarkIconProps {
//   item: movieType;
//   fetchedItems: moviesType;
//   setFetchtedItems: React.Dispatch<SetStateAction<moviesType>>;
// }
export const BookMarkIcon = ({ item }: { item: movieType }) => {
  const { fetchedItems, setFetchtedItems, setBookmarkChangeImpact } =
    useMyContext();

  const ToggleMarkIcon = (id: number) => {
    if (!id) return;
    setBookmarkChangeImpact(true);
    setFetchtedItems(
      fetchedItems.map((item: movieType) =>
        item.id === id
          ? { ...item, bookMarked: !item.bookMarked }
          : item
      )
    );
  };
  return (
    <svg
      className='absolute top-2 right-2 cursor-pointer'
      onClick={() => ToggleMarkIcon(item.id)}
      xmlns='http://www.w3.org/2000/svg'
      width='30'
      height='30'
      viewBox='0 0 32 32'
      fill={item.bookMarked ? "white" : "none"}
    >
      <circle
        opacity='0.500647'
        cx='16'
        cy='16'
        r='16'
        fill='#10141E'
      />
      <path
        d='M11.0576 9.75H20.6094C20.6466 9.75 20.6782 9.75724 20.7109 9.77148L20.7217 9.77539L20.7314 9.7793C20.7986 9.80616 20.8383 9.84044 20.8701 9.88672C20.9028 9.93431 20.917 9.97775 20.917 10.0361V21.9639C20.917 22.0222 20.9028 22.0657 20.8701 22.1133C20.8383 22.1596 20.7986 22.1938 20.7314 22.2207L20.7236 22.2236L20.7158 22.2275C20.7109 22.2296 20.6807 22.2412 20.6094 22.2412C20.5318 22.2412 20.4733 22.225 20.418 22.1885L20.3633 22.1445L16.3574 18.2344L15.833 17.7236L15.3096 18.2344L11.3027 22.1455C11.2158 22.2264 11.144 22.2499 11.0576 22.25C11.0204 22.25 10.9879 22.2428 10.9551 22.2285L10.9453 22.2246L10.9346 22.2207L10.8525 22.1738C10.8302 22.1562 10.8119 22.1365 10.7959 22.1133C10.7632 22.0657 10.75 22.0222 10.75 21.9639V10.0361C10.75 9.97775 10.7633 9.93431 10.7959 9.88672C10.8277 9.84029 10.8673 9.80622 10.9346 9.7793L10.9453 9.77539L10.9551 9.77148C10.9879 9.75722 11.0204 9.75 11.0576 9.75Z'
        stroke='white'
        strokeWidth='1.5'
      />
    </svg>
  );
};

export const DotIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='3'
    height='3'
    viewBox='0 0 3 3'
    fill='none'
  >
    <circle opacity='0.5' cx='1.5' cy='1.5' r='1.5' fill='white' />
  </svg>
);

//  const {
//    fetchedItems,
//    trendingItems,
//    setTrendingItems,
//    movies,
//    series,
//    bookMarked,
//    setMovies,
//    setSeries,
//    setBookMarked,
//    searching,
//  } = useMyContext();

//  if (location.pathname === "home") {
//    setTrendingItems(
//      fetchedItems.filter((movie: movieType) => movie.trending)
//    );
//  } else if (location.pathname === "movies") {
//    setMovies(
//      fetchedItems.filter((movie: movieType) => movie.type === "Movie")
//    );
//  } else if (location.pathname === "series") {
//    setSeries(
//      fetchedItems.filter(
//        (movie: movieType) => movie.type === "Series"
//      )
//    );
//  } else if (location.pathname === "bookmarked") {
//    setBookMarked(
//      fetchedItems.filter((movie: movieType) => movie.bookMarked)
//    );
//  }
