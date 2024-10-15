import React from "react";
import { useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { AiOutlineMenuFold } from "react-icons/ai";
import ChangeSlides from "../../../../components/modals/ChangeSlide";
import CreateSlider from "../../../../components/modals/CreateSlides";
import SideBar from "../../../../components/UI/AdminSideBar/SideBar";

const AdminSlider = () => {
  const [showAlert, setShowAlert] = useState(true);

  const [showSidebar, setShowSidebar] = useState(false);
  const [stateAccordion, setStateAccordion] = useState(false);

  const [slideCreateVisible, setSlideCreateVisible] = useState(false);
  const [slideChangeVisible, setSlideChangeVisible] = useState(false);

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
              variant="outline-info"
              onClick={() => handleShowSidebar()}
              className="me-2"
            >
              <AiOutlineMenuFold />
            </Button>
            cabinet de l'administrateur
          </Col>
        </Row>
        <Row className="admin_subtitle">
          <Col xs={12}>rubrique "slider"</Col>
        </Row>
        <Row>
          <Col xs={12}>
            {showAlert ? (
              <Alert
                variant="info"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>
                  cette rubrique est destinés au slide
                </Alert.Heading>
                <p>ici tu peux modifier rajouter ou bien suprprimer un slide:</p>
                <ul>
                  <li>
                    pour changer l'informations du slide, appuye sur le boutton
                    "suurpimer/modifier le slide", choissiez le slide a modifier 
                      rentrer l'informations que vous voulez voir apparaitre
                    `
                  </li>
                  <li>
                   pour supprimer un slide , appuyer sur le boutton "supprimer/changer le slide,
                    choissisez  le slide a supprimer et appuyer sur le boutton "supprimer".
                  </li>
                  <li>
                    pour ajpouter un slide, appuyer sur le boutton "ajouter un slide",
                    renseigner ce que vous voulez ajouter et appuyer sur boutton "ajouter".
                  </li>
                </ul>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Button
              variant={"outline-dark"}
              className="w-100"
              onClick={() => setSlideCreateVisible(true)}
            >
             ajouter un slide
            </Button>
          </Col>
          <Col xs={6}>
            <Button
              variant={"outline-dark"}
              className="w-100"
              onClick={() => setSlideChangeVisible(true)}
            >
              supprimer/changer un slide
            </Button>
          </Col>
        </Row>
      </Container>

      <SideBar show={showSidebar} handleClose={handleCloseSidebar} />

      <CreateSlider
        show={slideCreateVisible}
        onHide={() => setSlideCreateVisible(false)}
      />
      <ChangeSlides
        show={slideChangeVisible}
        onHide={() => setSlideChangeVisible(false)}
      />
    </>
  );
};
export default AdminSlider;
