import React from "react";
import "./SuccessAddQuestionModal.scss";
import { useState } from "react";
import {
  Button,
  Col,
  Form,
  Image,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";

const SuccessAddQuestionModal = ({ stateModal, handleCloseModal }) => {
  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={stateModal}
        onHide={handleCloseModal}
        className="modal_add_question"
      >
        <Modal.Header closeButton>
          <Modal.Title>votre réponse est envoyer!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} md={4}>
              <Image
                src={process.env.PUBLIC_URL + "/img/productcard/tea-time.png"}
                width={250}
              />
            </Col>
            <Col xs={12} md={8}>
              <p className="success_text">
                nous avons bien recu votre question au sujet de ce produit ! nous y répondrons dans les splus brefs délais ... vous recevrez une notifications dans peu de temps .
              </p>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default SuccessAddQuestionModal;
