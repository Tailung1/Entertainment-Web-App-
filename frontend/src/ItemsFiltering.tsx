import { useEffect } from "react";
import { useMyContext } from "./useContext";

export default function ItemsFiltering() {
  let {
    searching,
    fetchedItems,
    setTrendingItems,
    setRecommenedItems,
    setMovies,
    setSeries,
    setBookMarked,
    bookmarkChangeImpact,
    setDbIsEmpty,
  } = useMyContext();

  useEffect(() => {
    setDbIsEmpty(false);
    if (searching) {
      console.log("join filtering");
      switch (location.pathname) {
        case "/home":
          //   const itemsToSearchTrending = fetchedItems.filter(
          //     (item) => item.trending
          //   );
          const itemsToSearchRecommened = fetchedItems.filter(
            (item) => item.recommended
          );

          //   setTrendingItems(
          //     itemsToSearchTrending.filter((item) =>
          //       item.title
          //         .toLocaleLowerCase()
          //         .includes(searching.toLocaleLowerCase())
          //     )
          //   );
          setRecommenedItems(
            itemsToSearchRecommened.filter((item) =>
              item.title
                .toLocaleLowerCase()
                .includes(searching.toLocaleLowerCase())
            )
          );
          break;

        case "/movies":
          const itemsToSearchMovies = fetchedItems.filter(
            (item) => item.type === "Movie"
          );
          setMovies(
            itemsToSearchMovies.filter((item) =>
              item.title
                .toLocaleLowerCase()
                .includes(searching.toLocaleLowerCase())
            )
          );
          break;

        case "/series":
          const itemsToSearchSeries = fetchedItems.filter(
            (item) => item.type === "Series"
          );
          setSeries(
            itemsToSearchSeries.filter((item) =>
              item.title
                .toLocaleLowerCase()
                .includes(searching.toLocaleLowerCase())
            )
          );
          break;

        case "/bookmarked":
          const searchedBookMarked = fetchedItems.filter(
            (item) => item.bookMarked
          );
          setBookMarked(
            searchedBookMarked.filter((item) =>
              item.title
                .toLocaleLowerCase()
                .includes(searching.toLocaleLowerCase())
            )
          );

          break;

        default:
          break;
      }
    } else {
      switch (location.pathname) {
        case "/home":
          setTrendingItems(
            fetchedItems.filter((item: movieType) => item.trending)
          );
          setRecommenedItems(
            fetchedItems.filter((item: movieType) => item.recommended)
          );
          break;

        case "/movies":
          setMovies(
            fetchedItems.filter(
              (item: movieType) => item.type === "Movie"
            )
          );
          break;

        case "/series":
          setSeries(
            fetchedItems.filter(
              (item: movieType) => item.type === "Series"
            )
          );
          break;

        case "/bookmarked":
          const bookMarked = fetchedItems.filter(
            (item: movieType) => item.bookMarked
          );
          setBookMarked(bookMarked);

          if (fetchedItems.length !== 0 && bookMarked.length === 0) {
            setDbIsEmpty(true);
          }
          break;

        default:
          break;
      }
    }
    if (!searching) {
      setBookMarked(
        fetchedItems.filter((item: movieType) => item.bookMarked)
      );
    }
  }, [searching, fetchedItems, bookmarkChangeImpact]);
}
