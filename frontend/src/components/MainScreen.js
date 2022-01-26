import React from "react";
import { Container, Row } from "react-bootstrap";
import "./MainScreen.css";
import SidebarAdmin from "./SidebarAdmin/SidebarAdmin";

const MainScreen = ({ title, children }) => {
  return (
    <div className="mainback">
      <Container>
        <Row>
          <SidebarAdmin />
          <div className="col-xs-12 col-md-9 page">
            {title && (
              <>
                <h1 className="heading">{title}</h1>
                <hr />
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default MainScreen;
