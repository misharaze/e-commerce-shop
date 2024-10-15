import React from 'react'
import './ErrorAddQuestionModal.scss'
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

const ErrorAddQuestionModal = ({stateModal, handleCloseModal}) => {
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
          <Modal.Title>mince... vous avez deja poser une question a propos de ce produit </Modal.Title>
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
                <p className="error_text">
                   vous avez deja envoyer une réponse au sujet de ce produit... attendez la réponse a la question poser, la réponse vous aidera surement   ) 
                </p>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default ErrorAddQuestionModal