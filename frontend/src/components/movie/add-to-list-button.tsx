import { Button, Row, Select } from "antd";
import * as React from "react";
import { CheckOutlined, HeartOutlined } from "@ant-design/icons";
import { defaultActivities } from "../../common/interfaces.d";
import {
  addToMovieList,
  checkMovieAdded,
  updateMovieList,
} from "../../common/api";

const { useEffect, useState } = React;
const { Option } = Select;

interface IProps {
  movie_id: number;
}

const AddToListButton: React.FC<IProps> = (props) => {
  const { movie_id } = props;
  const [selected, setSelected] = useState<boolean>(false);
  const [movieStatus, setMovieStatus] = useState("");

  const user_id = localStorage.getItem("user_id") as string;

  const activityOptions = defaultActivities.map((activityObj, index) => {
    return (
      <Option key={index} value={activityObj.value}>
        <Row justify="space-between">{activityObj.label}</Row>
      </Option>
    );
  });

  const handleSelected = async () => {
    setSelected(true);
    const res = await addToMovieList(user_id, movie_id);
    // Default to currently watching
    setMovieStatus("CURRENT");
  };

  const handleUpdateActivity = async (activityType: string) => {
    const res = await updateMovieList(user_id, movie_id, activityType);
    setMovieStatus(activityType);
  };

  useEffect(() => {
    const checkSelected = async () => {
      const res = await checkMovieAdded(user_id, movie_id);
      if (res.added) {
        setSelected(true);
        setMovieStatus(res.status);
      }
    };

    checkSelected();
  }, [user_id, movie_id]);

  return (
    <>
      {!selected && (
        <Button onClick={handleSelected} type="primary">
          <HeartOutlined />
          Add To List
        </Button>
      )}

      {selected && movieStatus && (
        <Select
          defaultValue={movieStatus}
          onSelect={handleUpdateActivity}
          style={{ width: 200 }}
        >
          {activityOptions}
        </Select>
      )}
    </>
  );
};

export default AddToListButton;
