import React, { useEffect } from "react";
import { useState } from "react";
import { Accordion, Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import { AiOutlineMenuFold } from "react-icons/ai";
import ReviewItemAdmin from "../../../../components/AdminItems/ReviewItemAdmin";
import SideBar from "../../../../components/UI/AdminSideBar/SideBar";
import { fetchReviews } from "../../../../http/reviewsAPI";
import "./ReviewAdmin.scss";

const ReviewAdmin = () => {
  const [showAlert, setShowAlert] = useState(true);

  const [showSidebar, setShowSidebar] = useState(false);
  const [stateAccordion, setStateAccordion] = useState(false);

  const [reviews, setReviews] = useState([]);

  const [rerenderReview, setRerenderReview] = useState(false);

  const handleShowSidebar = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  useEffect(() => {
    fetchReviews().then((data) => {
      setReviews(data);
    });
  }, []);

  //re-render after change status, or delete some order
  useEffect(() => {
    fetchReviews().then((data) => {
        setReviews(data);
      });
  }, [rerenderReview]);

  const reRender = () => {
    setRerenderReview(!rerenderReview);
  };

  return (
    <>
      <Container className="admin_container">
        <Row className="admin_title">
          <Col xs={12}>
            <Button
              variant="outline-success"
              onClick={() => handleShowSidebar()}
              className="me-2"
            >
              <AiOutlineMenuFold />
            </Button>
            cabinet de l'administrateur
          </Col>
        </Row>
        <Row className="admin_subtitle">
          <Col xs={12}>rubrique "questions"</Col>
        </Row>
        <Row>
          <Col xs={12}>
            {showAlert ? (
              <Alert
                variant="success"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>
                  cette rubrique est destinée au questions 
                </Alert.Heading>
                <p>ici tu peux consulter les questions:</p>
                <ul>
                  <li>
                    si la question n'est pas poser correctement ou contient des propos injurieux ,
                    alors on peux la supprimer, en appuyant sur le boutton "supprimer" dans la  
                    case correspondante a la question rechercher.
                  </li>
                  <li>
                    si besoin vous pouvez changer la réponse a la question, en appuyant sur le boutton
                    "changer" dans la case correpondante.
                  </li>
                  <li>
                    pour consulter le texte de la question et voir tout l'information au sujet de
                     la question, appuyer sur le boutton "informations" dans la case qui correpsond à la question.
                  
                  </li>
                </ul>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Accordion>
            <Accordion.Item
              eventKey=""
              className="mt-4 mb-4"
              onClick={() => setStateAccordion(true)}
            >
              <Accordion.Header>liste des avis </Accordion.Header>
              <Accordion.Body>
                <Table striped bordered hover className="mt-4 p-2">
                  <thead>
                    <tr>
                      <th>ID avis</th>
                      <th>ID produit</th>
                      <th>plus de détails</th>
                      <th>supprimer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        reviews.rows?.map((item) => (
                            <ReviewItemAdmin 
                            key={item.id}
                            review_data={item}
                            reRender={reRender}
                            />
                        ))
                    }
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
      </Container>

      <SideBar show={showSidebar} handleClose={handleCloseSidebar} />
    </>
  );
};
export default ReviewAdmin;
