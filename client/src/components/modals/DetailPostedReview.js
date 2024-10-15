import React from "react";
import { Button, Col, Image, Modal, Row, Table } from "react-bootstrap";
const DetailsPostedReview = ({ show, handleClose, review }) => {
  console.log(review);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>informations sur l'avis</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>texte de l'avis: {review[0]?.text_reviews}</Col>
          </Row>
          <Row>
            <Col>
              Сorrespondance des descriptions:{" "}
              {review[0]?.description_true
                ? "correspond "
                : "ne correspond pas"}
            </Col>
          </Row>
          <Row>
          
          </Row>
          <Row>
            <Col>
              correspondance de la livraison:{" "}
              {review[0]?.delivery_true ? "correspond " : "ne correspond pas "}
            </Col>
          </Row>
          <Row>
            <Col>
              {review[0]?.img_reviews == "not img" ? (
                "aucune image associé!"
              ) : (
                <img
                  width={"10%"}
                  src={process.env.REACT_APP_API_URL + review[0]?.img_reviews}
                />
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => handleClose()}>
            fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default DetailsPostedReview;
