import { AutoComplete } from "antd";
import * as React from "react";
import { getUsersByUsername } from "../../common/api";
import { useHistory } from "react-router-dom";
import Loader from "../loader/loader";

const { useEffect, useState } = React;
const currentUser = localStorage.getItem("username");

const UserSearchBar: React.FC = (props) => {
  const [options, setOptions] = useState<any>([]);
  const [keyword, setKeyword] = useState<string>();
  const [selected, setSelected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const history = useHistory();

  const handleRedirect = (user_id: string) => {
    setSelected(true);
    history.push(`/profile?user_id=${user_id}`, { title: "Test" });
  };

  useEffect(() => {
    if (keyword) {
      const loadMovies = async () => {
        keyword ? setLoading(true) : setLoading(false);
        const res = await getUsersByUsername(keyword);

        let optionsArr: { value: string; label: string }[] = [];
        res.data
          // Exclude current user
          .filter((obj) => obj.username !== currentUser)
          .map((item) => {
            optionsArr.push({
              value: item.user_id,
              label: item.username,
            });
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
      notFoundContent={!loading ? <div>No users found.</div> : <Loader />}
      options={options}
      style={{ width: "100%" }}
      onSelect={(value) => {
        handleRedirect(value);
      }}
      onSearch={(text) => {
        if (!text) {
          setOptions([]);
        }
        setKeyword(text);
      }}
      placeholder="Search Username"
    />
  );
};

export default UserSearchBar;
