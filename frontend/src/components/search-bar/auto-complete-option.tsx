import { Col, Row } from "antd";
import * as React from "react";

interface IProps {
  title: string;
  overview: string;
  imageSlug: string;
}

const AutoCompleteOption: React.FC<IProps> = (props) => {
  const { title, overview, imageSlug } = props;
  const imageLink = imageSlug
    ? `https://image.tmdb.org/t/p/w200${imageSlug}`
    : "https://i.stack.imgur.com/y9DpT.jpg";

  return (
    <Row style={{ width: "100%", padding: 0 }}>
      <Col span={6}>
        <img
          alt="Autocomplete  poster"
          style={{ height: 100 }}
          src={imageLink}
        />
      </Col>

      <Col style={{ fontFamily: "Muli" }} span={16}>
        <h2>{title}</h2>

        <p
          style={{
            color: "gray",
            fontSize: 10,
            height: 100,
            wordBreak: "break-word",
            overflow: "hidden",
            whiteSpace: "pre-wrap",
          }}
        >
          {overview}
        </p>
      </Col>
    </Row>
  );
};

export default AutoCompleteOption;
