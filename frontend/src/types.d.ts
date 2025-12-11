interface IconClickHandler {
  handleClick: (iconName: string) => void;
}

interface movieType {
  id: number;
  title: string;
  year: number;
  type: string;
  raiting: string;
  image: string;
  trending: boolean;
  bookMarked: boolean;
  recommended: boolean;
}

type moviesType = movieType[];
