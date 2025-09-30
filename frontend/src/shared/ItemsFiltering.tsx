import { useEffect } from "react";
import { useMyContext } from "../useContext";
import { useLocation } from "react-router-dom";

export default function ItemFiltering() {
  const location = useLocation();
  const {
    fetchedItems,
    bookMarked,
    movies,
    series,
    searching,
    itemsToShow,
    setItemsToShows,
    setBookMarked,
  } = useMyContext();

  useEffect(() => {
    setItemsToShows(fetchedItems);

    if (location.pathname === "/movies") {
      setItemsToShows(movies);
    } else if (location.pathname === "/series") {
      setItemsToShows(series);
    } else if (location.pathname === "/bookmarked") {
      setItemsToShows(bookMarked);
    }

    if (searching) {
      if (location.pathname === "/movies") {
        const filtredMovies = movies.filter((item) =>
          item.title.includes(searching.toLocaleLowerCase())
        );
        setItemsToShows(filtredMovies);
      } else if (location.pathname === "/series") {
        const filtredSeries = series.filter((item) =>
          item.title.includes(searching.toLocaleLowerCase())
        );
        setItemsToShows(filtredSeries);
      } else if (location.pathname === "/bookmarked") {
        const filtredItems = bookMarked.filter((item) =>
          item.title.includes(searching.toLocaleLowerCase())
        );
        setItemsToShows(filtredItems);
      }
    }
  }, [location.pathname, searching, fetchedItems]);
  return null;
}
