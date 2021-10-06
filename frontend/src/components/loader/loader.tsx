import { Spin } from "antd";
import * as React from "react";

const Loader: React.FC = () => {
  return (
    <Spin
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
};
export default Loader;
