import { useMyContext } from "../useContext";
import { useEffect } from "react";
import ItemsFiltering from "../shared/ItemsFiltering";
import SharedComponent from "../shared/SharedComponent";

export default function Movies() {
  ItemsFiltering();
  const { movies, setPath } = useMyContext();

  useEffect(() => {
    setPath("/movies");
  }, []);

  return <SharedComponent currentComponent={movies} currentSection="Movies" />;
}
