import { useMyContext } from "../useContext";
import { useEffect } from "react";
import ItemsFiltering from "../shared/ItemsFiltering";
import SharedComponent from "../shared/SharedComponent";

export default function BookMarked() {
  ItemsFiltering();
  const { bookMarked, setPath } = useMyContext();

  useEffect(() => {
    setPath("/bookmarked");
  }, []);
  return <SharedComponent currentComponent={bookMarked} currentSection="Bookmarked" />;
}
