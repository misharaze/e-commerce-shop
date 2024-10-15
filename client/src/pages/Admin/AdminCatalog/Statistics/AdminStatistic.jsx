import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Accordion, Alert, Button, Col, Container, Row } from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import { AiOutlineMenuFold } from "react-icons/ai";
import SideBar from "../../../../components/UI/AdminSideBar/SideBar";
import "./AdminStatistic.scss";
import RatingChart from "../../../../components/Charts/RatingChart";
import ProductBuyCount from "../../../../components/Charts/ProductBuyCount";
import UserRegistration from "../../../../components/Charts/UserRegistration";
const AdminStatistic = () => {
  const [showAlert, setShowAlert] = useState(true);

  const [showSidebar, setShowSidebar] = useState(false);

  const [stateAccordion, setStateAccordion] = useState(false);
  const [stateAccordionTwo, setStateAccordionTwo] = useState(false);
  const [stateAccordionThree, setStateAccordionThree] = useState(false);

  const handleShowSidebar = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <>
      <Container className="admin_container">
        <Row className="admin_title">
          <Col xs={12}>
            <Button
              variant="outline-primary"
              onClick={() => handleShowSidebar()}
              className="me-2"
            >
              <AiOutlineMenuFold />
            </Button>
            cabinet de l'administrateur
          </Col>
        </Row>
        <Row className="admin_subtitle">
          <Col xs={12}>rubrique "statistique"</Col>
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
                 cette rubrique est destinée a consulter les statistiques...
                </Alert.Heading>
                <p>Зici tu peux:</p>
                <ul>
                  <li>consulter le tableaux de consultations des différents produits  .</li>
                  <li>tableaux des inscriptions.</li>
                  <li>moyenne des notes données a un produit.</li>
                  <li>tableaux des questions posées.</li>
                </ul>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Accordion className="accordion">
            <Accordion.Item
              eventKey=""
              className="mt-1 mb-1"
              onClick={() => setStateAccordion(true)}
            >
              <AccordionHeader>tableaux des commandes</AccordionHeader>
              <AccordionBody>
                <ProductBuyCount stateAccordion={stateAccordion}/>
              </AccordionBody>
            </Accordion.Item>
          </Accordion>
        </Row>
        <Row>
          <Accordion className="accordion">
            <Accordion.Item
              eventKey=""
              className="mt-1 mb-1"
              onClick={() => setStateAccordionTwo(true)}
            >
              <AccordionHeader>
                tableaux des notes  moyennes données au produit
              </AccordionHeader>
              <AccordionBody>
                <Row className="donut_chart_container">
                    <RatingChart stateAccordion={stateAccordionTwo}/>
                </Row>
              </AccordionBody>
            </Accordion.Item>
          </Accordion>
        </Row>
        <Row>
          <Accordion className="accordion">
            <Accordion.Item
              eventKey=""
              className="mt-1 mb-1"
              onClick={() => setStateAccordionThree(true)}
            >
              <AccordionHeader>
               tableaux des utilisateurs qui sont rentrer sur le site 
              </AccordionHeader>
              <AccordionBody>
                <Row className="donut_chart_container">
                    <UserRegistration stateAccordion={stateAccordionThree}/>
                </Row>
              </AccordionBody>
            </Accordion.Item>
          </Accordion>
        </Row>
      </Container>

      <SideBar show={showSidebar} handleClose={handleCloseSidebar} />
    </>
  );
};
export default AdminStatistic;
