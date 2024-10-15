import React from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteReviewsProduct } from "../../http/reviewsAPI";

const DeleteReview = ({show, handleClose, id_review, reRender}) => {

const deleteReviewInModal = () => {
    deleteReviewsProduct(id_review).then(() => {
        reRender()
        handleClose()
    })
}

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>suppresion du produit N{id_review}</Modal.Title>
        </Modal.Header>
        <Modal.Body>vous etes sur de vouloir supprimer l'avis N{id_review}?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteReviewInModal()}>
           supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default DeleteReview