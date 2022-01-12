import React from "react";
import { Row } from "react-bootstrap";

const Banner = () => {
  return (
    <div className="banner">
      <Row className="overlay d-flex align-items-center">
        <div className="intro-text">
          <div>
            <h1 className="title">Top of The World</h1>
            <p className="subtitle">Explor The World With Us</p>
          </div>
        </div>
      </Row>
    </div>
  );
};

export default Banner;
