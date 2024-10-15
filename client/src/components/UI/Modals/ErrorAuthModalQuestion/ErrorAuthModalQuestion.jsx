import React from 'react'
import './ErrorAuthModalQuestion.scss'
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
import { Link } from 'react-router-dom';
import  {LOGIN_ROUTE}  from "../../../../utils/consts.js";

const ErrorAuthModalQuestion = ({stateModal, handleCloseModal}) => {
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
          <Modal.Title>mince.. vous avez oublié de rentrer </Modal.Title>
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
                    seul les utlisateurs inscrit peuvent poser des questions au sujet d'un produit... s'il vous plais connecter vous ou créer un compte ! )
                </p>
                <Link to={LOGIN_ROUTE}>
                <Button className='auth_question_btn'>
                    rentrer sur le site
                </Button>
               </Link>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default ErrorAuthModalQuestion