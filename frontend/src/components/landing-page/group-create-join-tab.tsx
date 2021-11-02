import { AutoComplete, Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { getGroupsByKeyword, joinGroup } from "../../common/api";
import { IGroupData } from "../../common/interfaces.d";
import GroupCreateFrom from "./group-create-form";

interface IProps {
  fetchGroups: () => void;
}

const GroupCreateJoinTab: React.FC<IProps> = (props) => {
  const { fetchGroups } = props;
  const [keyword, setKeyword] = useState("");
  const [groups, setGroups] = useState<IGroupData[]>([]);
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );

  const loggedUserId = localStorage.getItem("user_id") as string;

  useEffect(() => {
    const fetchGroupsByKeyword = async () => {
      const res = await getGroupsByKeyword(keyword);

      const groupsRes = res.data;
      const arrToSet: { label: string; value: string }[] = [];
      groupsRes.map((group) =>
        arrToSet.push({ label: group.group_name, value: group.group_id })
      );
      setOptions(arrToSet);
    };
    if (keyword) {
      fetchGroupsByKeyword();
    }
  }, [keyword]);

  const handleSelect = async (group_id: string) => {
    const res = await joinGroup(loggedUserId, group_id);
    if (res.success) {
      message.success("Sucessfully joined group!");
      fetchGroups();
    } else {
      message.error("Server Error, please try again");
    }
  };

  return (
    <>
      <div style={{ marginBottom: 30 }}>
        <h1>Join Groups</h1>
        <Row justify="center">
          <Col span={12}>
            <AutoComplete
              style={{ width: "100%" }}
              options={options}
              value={keyword}
              placeholder="Search for Group Title"
              onSearch={setKeyword}
              onSelect={handleSelect}
            />
          </Col>
        </Row>
      </div>

      <h1>Create a Group</h1>
      <GroupCreateFrom fetchGroups={fetchGroups} />
    </>
  );
};

export default GroupCreateJoinTab;
