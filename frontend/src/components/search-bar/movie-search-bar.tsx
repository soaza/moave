import { AutoComplete } from "antd";
import * as React from "react";
import { getMoviesOnSearch } from "../../common/api";
import AutoCompleteOption from "./auto-complete-option";
import { useHistory } from "react-router-dom";
import Loader from "../loader/loader";

const { useEffect, useState } = React;

interface IProps {}
const MovieSearchBar: React.FC<IProps> = (props) => {
  const [options, setOptions] = useState<any>([]);
  const [keyword, setKeyword] = useState<string>();
  const [selected, setSelected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const history = useHistory();

  const handleRedirect = (movieId: number, title = "tst") => {
    setSelected(true);
    history.push(`/movie?id=${movieId}`, { title: "Test" });
  };

  useEffect(() => {
    if (keyword) {
      const loadMovies = async () => {
        keyword ? setLoading(true) : setLoading(false);
        const res = await getMoviesOnSearch(keyword);
        const movies = res.data;
        const optionsArr: any = [
          {
            value: "Keyword",
            label: `View all movies relating to "${keyword}"`,
          },
        ];

        movies.results.slice(0, 5).map((movie: any) => {
          const { id, title, overview, poster_path } = movie;

          const optionsObj = {
            value: id,
            label: (
              <AutoCompleteOption
                title={title}
                overview={overview}
                imageSlug={poster_path}
              />
            ),
          };
          return optionsArr.push(optionsObj);
        });
        setOptions(optionsArr);
        setLoading(false);
      };

      loadMovies();
    }
  }, [keyword]);

  return (
    <AutoComplete
      defaultActiveFirstOption
      value={selected ? "" : keyword}
      notFoundContent={!loading ? <div>No movies found.</div> : <Loader />}
      options={options}
      style={{ width: "100%" }}
      onSelect={(value) => {
        if (value === "Keyword") {
          history.push(`/movies?keyword=${keyword}`);
        } else {
          handleRedirect(parseInt(value));
        }
      }}
      onSearch={(text) => {
        if (!text) {
          setOptions([]);
        }
        setKeyword(text);
      }}
      placeholder="Search Movie Title"
    />
  );
};

export default MovieSearchBar;
