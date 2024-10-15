import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Accordion,
  Alert,
  Button,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import { AiOutlineMenuFold } from "react-icons/ai";
import LocationItemAdmin from "../../../../components/AdminItems/LocationItemAdmin";
import CreateLocation from "../../../../components/modals/CreateLocation";
import SideBar from "../../../../components/UI/AdminSideBar/SideBar";
import { fetchLocations } from "../../../../http/locationAPI";
import "./LocationAdmin.scss";

const LocationAdmin = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const [showAlert, setShowAlert] = useState(true);
  const [stateAccordion, setStateAccordion] = useState(false);

  const [stateModalCreate, setStateModalCreate] = useState(false);

  const [location, setLocation] = useState([]);

  useEffect(() => {
    fetchLocations().then((data) => {
      setLocation(data.rows);
    });
  }, []);

  const handleShowSidebar = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  const handleShowLocation = () => {
    setStateModalCreate(true);
  };

  const handleCloseLocation = () => {
    setStateModalCreate(false);
  };

  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    fetchLocations().then((data) => {
      setLocation(data.rows);
    });
  }, [rerender]);

  const reRender = () => {
    setRerender(!rerender);
  };

  return (
    <>
      <Container className="admin_container">
        <Row className="admin_title">
          <Col xs={12}>
            <Button
              variant="success"
              onClick={() => handleShowSidebar()}
              className="me-2"
            >
              <AiOutlineMenuFold />
            </Button>
           cabinet de l'administrateur
          </Col>
        </Row>
        <Row className="admin_subtitle">
          <Col xs={12}>Rubrique "principal emplacements "</Col>
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
                  cette rubique est destinée au différentes location
                  de l'entreprise...
                </Alert.Heading>
                <p>ici vous pouvez:</p>
                <ul>
                  <li>supprimer un emplacement ;</li>
                  <li>changer les  emplacements déja connu</li>
                  <li>ajouter des nouveaux emplacements.</li>
                </ul>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Accordion>
              <Accordion.Item
                eventKey=""
                className="mt-4 mb-4"
                onClick={() => setStateAccordion(true)}
              >
                <Accordion.Header>liste des emplacements</Accordion.Header>
                <Accordion.Body>
                  <Button
                    variant="success"
                    onClick={() => handleShowLocation()}
                  >
                    ajouter
                  </Button>
                  <Table striped bordered hover className="mt-4 p-2">
                    <thead>
                      <tr>
                        <th>ID emplacements</th>
                        <th>nom</th>
                        <th>adresse test</th>
                        <th>coordonées</th>
                        <th>changer</th>
                        <th>supprimer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {location?.map((item) => {
                        return <LocationItemAdmin reRender={reRender} item={item} />;
                      })}
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>

      <CreateLocation
        reRender={reRender}
        show={stateModalCreate}
        onHide={handleCloseLocation}
      />

      <SideBar show={showSidebar} handleClose={handleCloseSidebar} />
    </>
  );
};
export default LocationAdmin;
