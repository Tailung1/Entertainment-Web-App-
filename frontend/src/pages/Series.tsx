import { useMyContext } from "../useContext";
import { useEffect } from "react";

import ItemsFiltering from "../shared/ItemsFiltering";
import SharedComponent from "../shared/SharedComponent";

export default function Series() {
    ItemsFiltering()
  const { series, setPath } = useMyContext();
    useEffect(() => {
      setPath("/series");
    }, []);


  return (
     <SharedComponent currentComponent={series} currentSection="Series" />
  );
}
