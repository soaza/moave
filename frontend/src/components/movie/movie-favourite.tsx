import { Button } from "antd";
import * as React from "react";
import { HeartOutlined } from "@ant-design/icons";

const { useEffect, useState } = React;

interface IProps {
  movie_id: number;
}
const MovieFavourite: React.FC<IProps> = (props) => {
  const { movie_id } = props;
  const [favourited, setFavourited] = useState<boolean>();

  useEffect(() => {
    const checkFavourited = () => {
      const favouritesJSON: any = localStorage.getItem("favourites");
      if (favouritesJSON) {
        const favourites: number[] = JSON.parse(favouritesJSON);
        return favourites.includes(movie_id);
      } else {
        return false;
      }
    };
    setFavourited(checkFavourited());
  }, [movie_id]);

  const handleAddFavourite = () => {
    const favouritesJSON: any = localStorage.getItem("favourites");
    // if user no favourites yet
    let favourites = [];
    if (favouritesJSON) {
      favourites = JSON.parse(favouritesJSON);
    }
    favourites.push(movie_id);
    localStorage.setItem("favourites", JSON.stringify(favourites));
    setFavourited(true);
  };
  return (
    <>
      {!favourited && (
        <Button onClick={() => handleAddFavourite()} type="primary">
          <HeartOutlined />
          Add To Favourites
        </Button>
      )}

      {favourited && (
        <Button disabled type="primary">
          <HeartOutlined />
          Added To Favourites
        </Button>
      )}
    </>
  );
};

export default MovieFavourite;
