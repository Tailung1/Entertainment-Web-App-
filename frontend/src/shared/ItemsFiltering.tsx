import { useEffect } from "react";
import { useMyContext } from "../useContext";


export default function ItemsFiltering() {
  let {
    searching,
    fetchedItems,
    setTrendingItems,
    setRecommenedItems,
    setMovies,
    setSeries,
    setBookMarked,
  } = useMyContext();


  useEffect(() => {
    if (searching) {
      switch (location.pathname) {
        case "/home":
          const itemsToSearchTrending = fetchedItems.filter(
            (item) => item.trending
          );
          const itemsToSearchRecommened = fetchedItems.filter(
            (item) => item.recommended
          );

          setTrendingItems(
            itemsToSearchTrending.filter((item) =>
              item.title
                .toLocaleLowerCase()
                .includes(searching.toLocaleLowerCase())
            )
          );
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
          const itemsToSearchBookmarked = fetchedItems.filter(
            (item) => item.bookMarked
          );
          setBookMarked(
            itemsToSearchBookmarked.filter((item) =>
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
            fetchedItems.filter((movie: movieType) => movie.trending)
          );
          setRecommenedItems(
            fetchedItems.filter(
              (movie: movieType) => movie.recommended
            )
          );
          break;

        case "/movies":
          setMovies(
            fetchedItems.filter(
              (movie: movieType) => movie.type === "Movie"
            )
          );
          break;

        case "/series":
          setSeries(
            fetchedItems.filter(
              (movie: movieType) => movie.type === "Series"
            )
          );
          break;

        case "/bookmarked":
          setBookMarked(
            fetchedItems.filter(
              (movie: movieType) => movie.bookMarked
            )
          );
          break;

        default:
          break;
      }
    }
  }, [searching, fetchedItems]);
}
