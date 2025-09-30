import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
  SetStateAction,
} from "react";

interface contextTypes {
  fetchMessage: string;
  fetchedItems: moviesType;
  trendingItems: moviesType;
  movies: moviesType;
  series: moviesType;

  bookMarked: moviesType;
  setBookMarked: React.Dispatch<SetStateAction<moviesType>>;
  searching: string;
  setSearching: React.Dispatch<SetStateAction<string>>;
  itemsToShow: moviesType;
  setItemsToShows: React.Dispatch<SetStateAction<moviesType>>;
  setFetchtedItems: React.Dispatch<SetStateAction<moviesType>>;
  setTrendingItems: React.Dispatch<SetStateAction<moviesType>>;
  setMovies: React.Dispatch<SetStateAction<moviesType>>;
  setSeries: React.Dispatch<SetStateAction<moviesType>>;
}

const MyContext = createContext({} as contextTypes);

export default function MovieContext({
  children,
}: {
  children: ReactNode;
}) {
  const [fetchMessage, setFetchMessage] = useState<string>("");
  const [fetchedItems, setFetchtedItems] = useState<moviesType>([]);
  const [trendingItems, setTrendingItems] = useState<moviesType>([]);
  const [movies, setMovies] = useState<moviesType>([]);
  const [series, setSeries] = useState<moviesType>([]);

  const [bookMarked, setBookMarked] = useState<moviesType>([]);
  const [searching, setSearching] = useState<string>("");
  const [itemsToShow, setItemsToShows] = useState<moviesType>([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetch("http://localhost:3000/api/movies", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const response = await data.json();
        if (!data.ok) {
          setFetchMessage("Failed to fetch movies data");
        }
        setFetchtedItems(response);
        setTrendingItems(
          response.filter((movie: movieType) => movie.trending)
        );
        setMovies(
          response.filter(
            (movie: movieType) => movie.type === "Movie"
          )
        );
        setSeries(
          response.filter(
            (movie: movieType) => movie.type === "Series"
          )
        );
        setBookMarked(
          response.filter((movie: movieType) => movie.bookMarked)
        );
      } catch (error: unknown) {
        if (error instanceof Error)
          setFetchMessage("Error fetching data: " + error.message);
      }
    };

    fetchMovies();
  }, []);

  return (
    <MyContext.Provider
      value={{
        fetchMessage,
        fetchedItems,
        trendingItems,
        bookMarked,
        setBookMarked,
        searching,
        setSearching,
        itemsToShow,
        setItemsToShows,
        series,
        movies,
        setFetchtedItems,
        setTrendingItems,
        setMovies,
        setSeries,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
export const useMyContext = () => {
  const context = useContext(MyContext);
  return context;
};
