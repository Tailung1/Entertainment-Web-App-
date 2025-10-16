
import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
  SetStateAction,
} from "react";

interface contextTypes {
  path: string;
  setPath: React.Dispatch<SetStateAction<string>>;
  serverMessage: string;
  fetchedItems: moviesType;
  trendingItems: moviesType;
  recommenedItems: moviesType;
  movies: moviesType;
  series: moviesType;
loading:boolean,
setLoading:React.Dispatch<React.SetStateAction<boolean>>
  bookMarked: moviesType;
  setBookMarked: React.Dispatch<SetStateAction<moviesType>>;
  searching: string;
  setSearching: React.Dispatch<SetStateAction<string>>;
  itemsToShow: moviesType;
  setItemsToShows: React.Dispatch<SetStateAction<moviesType>>;
  setFetchtedItems: React.Dispatch<SetStateAction<moviesType>>;
  setTrendingItems: React.Dispatch<SetStateAction<moviesType>>;
  setRecommenedItems: React.Dispatch<SetStateAction<moviesType>>;
  setMovies: React.Dispatch<SetStateAction<moviesType>>;
  setSeries: React.Dispatch<SetStateAction<moviesType>>;
}

const MyContext = createContext({} as contextTypes);

export default function MovieContext({
  children,
}: {
  children: ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(false);
    
  const [path, setPath] = useState<string>("");
  const [serverMessage, setServerMessage] = useState<string>("");
  const [fetchedItems, setFetchtedItems] = useState<moviesType>([]);
  const [trendingItems, setTrendingItems] = useState<moviesType>([]);
  const [recommenedItems, setRecommenedItems] = useState<moviesType>(
    []
  );
  const [movies, setMovies] = useState<moviesType>([]);
  const [series, setSeries] = useState<moviesType>([]);

  const [bookMarked, setBookMarked] = useState<moviesType>([]);
  const [searching, setSearching] = useState<string>("");
  const [itemsToShow, setItemsToShows] = useState<moviesType>([]);

  //   useEffect(() => {
  //     if (fetchedItems.length < 1) return;

  //     const handleBeforeUnload = async () => {
  //       if (fetchedItems.length < 1) return;

  //       const data = JSON.stringify(fetchedItems);

  //       localStorage.setItem("dataToSend", data);
  //       localStorage.setItem("testt", "sent");

  //       const response = navigator.sendBeacon(
  //         "http://localhost:3000/api/movies/unload",
  //         data
  //       );

  //       if (response) {
  //         localStorage.setItem("resMessage", "good");
  //       } else if (!response) {
  //         localStorage.setItem("resMessage2", "bad");
  //       }
  //     };

  //     // Listen for the beforeunload event to trigger data sending
  //     window.addEventListener("beforeunload", handleBeforeUnload);

  //     return () => {
  //       // Clean up the event listener
  //       window.removeEventListener("beforeunload", handleBeforeUnload);
  //     };
  //   }, [fetchedItems]);

  {
  }
  {
    {
    }
    {
    }
    {
    }
  }

  useEffect(() => {
    const handleBeforeUnload = async () => {
      try {
        const data = await fetch(
          "http://localhost:3000/api/movies/unload",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(fetchedItems),
          }
        );
        const resp = await data.json();

      } catch (err) {
        console.log(err, "Failed in front");
      }
    };
    if (fetchedItems.length > 0) {
      handleBeforeUnload();
    }
  }, [fetchedItems]);

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
          setServerMessage("Failed to fetch movies data");
        }
        setFetchtedItems(response);
        setTrendingItems(
          response.filter((item: movieType) => item.trending)
        );
        setRecommenedItems(
          response.filter((item: movieType) =>
            item.title
              .toLocaleLowerCase()
              .includes(searching.toLocaleLowerCase())
          )
        );
      } catch (error: unknown) {
        if (error instanceof Error)
          setServerMessage("Error fetching data: " + error.message);
      }
    };

    fetchMovies();
  }, []);

  //   useEffect(() => {
  //     if (searching) {
  //       if (location.pathname === "/home") {
  //         const itemsToSearchTrending = fetchedItems.filter(
  //           (item) => item.trending
  //         );
  //         const itemsToSearchRecommened = fetchedItems.filter(
  //           (item) => item.recommended
  //         );
  //         setTrendingItems(
  //           itemsToSearchTrending.filter((item) =>
  //             item.title
  //               .toLocaleLowerCase()
  //               .includes(searching.toLocaleLowerCase())
  //           )
  //         );
  //         setRecommenedItems(
  //           itemsToSearchRecommened.filter((item) =>
  //             item.title
  //               .toLocaleLowerCase()
  //               .includes(searching.toLocaleLowerCase())
  //           )
  //         );
  //       } else if (location.pathname === "/movies") {
  //         const itemsToSearch = fetchedItems.filter(
  //           (item) => item.type === "Movie"
  //         );
  //         setMovies(
  //           itemsToSearch.filter((item) =>
  //             item.title
  //               .toLocaleLowerCase()
  //               .includes(searching.toLocaleLowerCase())
  //           )
  //         );
  //       } else if (location.pathname === "/series") {
  //         const itemsToSearch = fetchedItems.filter(
  //           (item) => item.type === "Series"
  //         );

  //         setSeries(
  //           itemsToSearch.filter((item) =>
  //             item.title
  //               .toLocaleLowerCase()
  //               .includes(searching.toLocaleLowerCase())
  //           )
  //         );
  //       } else if (location.pathname === "/bookmarked") {
  //         const itemsToSearch = fetchedItems.filter(
  //           (item) => item.bookMarked
  //         );
  //         setBookMarked(
  //           itemsToSearch.filter((item) =>
  //             item.title
  //               .toLocaleLowerCase()
  //               .includes(searching.toLocaleLowerCase())
  //           )
  //         );
  //       }
  //     } else {
  //       if (location.pathname === "/home") {
  //         console.log("endlich");
  //         setTrendingItems(
  //           fetchedItems.filter((movie: movieType) => movie.trending)
  //         );
  //         setRecommenedItems(
  //           fetchedItems.filter((movie: movieType) => movie.recommended)
  //         );
  //       } else if (location.pathname === "/movies") {
  //         setMovies(
  //           fetchedItems.filter(
  //             (movie: movieType) => movie.type === "Movie"
  //           )
  //         );
  //       } else if (location.pathname === "/series") {
  //         setSeries(
  //           fetchedItems.filter(
  //             (movie: movieType) => movie.type === "Series"
  //           )
  //         );
  //       } else if (location.pathname === "/bookmarked") {
  //         setBookMarked(
  //           fetchedItems.filter((movie: movieType) => movie.bookMarked)
  //         );
  //       }
  //     }

  //     // ItemFiltering()
  //   }, [searching, location.pathname, fetchedItems]);

  return (
    <MyContext.Provider
      value={{
        serverMessage,
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
        path,
        setPath,
        recommenedItems,
        setRecommenedItems,
        loading,
        setLoading
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) throw new Error("Context must be within  Provider");
  return context;
};
