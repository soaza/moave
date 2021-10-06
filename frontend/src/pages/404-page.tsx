import { Divider } from "antd";
import * as React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div style={{ marginTop: "30vh", textAlign: "center" }}>
      <h1>
        404
        <Divider
          style={{
            borderLeft: "2px solid rgba(0, 0, 0, 0.685)",
            height: 30,
            margin: 10,
          }}
          type="vertical"
        />
        Page not found.
      </h1>
    </div>
  );
};

export default NotFoundPage;
