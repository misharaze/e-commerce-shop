import React from "react";
import "./AdminButtons.scss";
import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import SideBar from "../../../../components/UI/AdminSideBar/SideBar";
import { AiOutlineMenuFold } from "react-icons/ai";
import { useEffect } from "react";
import { useState } from "react";
import { BsAlarm, BsAlarmFill, BsApp, BsBattery, BsCalculator, BsCart, BsMenuAppFill, BsSubtract } from "react-icons/bs";

const AdminButtons = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  const handleShowSidebar = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <>
      <Container className="admin_container_btn">
        <Row className="admin_title">
          <Col xs={12}>
            <Button
              variant="outline-primary"
              onClick={() => handleShowSidebar()}
              className="me-2"
            >
              <AiOutlineMenuFold />
            </Button>
            Cabinet de l'administrateur
          </Col>
        </Row>
        <Row className="admin_subtitle">
          <Col xs={12}>Catégories Button</Col>
        </Row>
        <Row>
          <Col xs={12}>
            {showAlert ? (
              <Alert
                variant="primary"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>
                 cette partie est conscaré au differents type de bouttons présent sur le site 
                </Alert.Heading>
                <p>ici on pourrais accéder a :</p>
                <ul>
                  <li>differentes couleur de bouttons ;</li>
                  <li>Тtype de bouttons</li>
                </ul>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Card>
            <Card.Body>
              <Card.Title>choix de bouttons </Card.Title>
              <Row className="mb-3">
                <Col>
                  <Button className="btn-special bg-white-red text-white">acheter</Button>{" "}
                  <Button className="btn-special bg-red text-white">acheter</Button>{" "}
                  <Button className="btn-special bg-black text-white">acheter</Button>{" "}
                  <Button className="btn-special bg-white text-black">acheter</Button>{" "}
                  <Button className="btn-special bg-pink-red text-black">acheter</Button>{" "}
                  <Button className="btn-special bg-pink text-black">acheter</Button>{" "}
                  <Button className="btn-special bg-green text-black">acheter</Button>{" "}
                  <Button className="btn-special bg-white-green text-black">acheter</Button>{" "}
                </Col>
              </Row>
              <Row className="mb-3">
              <Col>
                  <Button className="btn-special bg-white-red text-white"><BsAlarm /></Button>{" "}
                  <Button className="btn-special bg-red text-white"><BsAlarmFill /></Button>{" "}
                  <Button className="btn-special bg-black text-white"><BsApp /></Button>{" "}
                  <Button className="btn-special bg-white text-black"><BsCalculator /></Button>{" "}
                  <Button className="btn-special bg-pink-red text-black"><BsCart /></Button>{" "}
                  <Button className="btn-special bg-pink text-black"><BsSubtract /></Button>{" "}
                  <Button className="btn-special bg-green text-black"><BsMenuAppFill /></Button>{" "}
                  <Button className="btn-special bg-white-green text-black"><BsBattery /></Button>{" "}
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>bouttons Bootstrap</Card.Title>
              <Row className="mb-3">
                <Col>
                  <Button variant="primary">Primary</Button>{" "}
                  <Button variant="secondary">Secondary</Button>{" "}
                  <Button variant="success">Success</Button>{" "}
                  <Button variant="warning">Warning</Button>{" "}
                  <Button variant="danger">Danger</Button>{" "}
                  <Button variant="info">Info</Button>{" "}
                  <Button variant="light">Light</Button>{" "}
                  <Button variant="dark">Dark</Button>{" "}
                  <Button variant="link">Link</Button>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Button variant="outline-primary">Primary</Button>{" "}
                  <Button variant="outline-secondary">Secondary</Button>{" "}
                  <Button variant="outline-success">Success</Button>{" "}
                  <Button variant="outline-warning">Warning</Button>{" "}
                  <Button variant="outline-danger">Danger</Button>{" "}
                  <Button variant="outline-info">Info</Button>{" "}
                  <Button variant="outline-light">Light</Button>{" "}
                  <Button variant="outline-dark">Dark</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Container>

      <SideBar show={showSidebar} handleClose={handleCloseSidebar} />
    </>
  );
};
export default AdminButtons;
