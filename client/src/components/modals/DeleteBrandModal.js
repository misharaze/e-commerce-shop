import React from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteBrand } from "../../http/productAPI";

const DeleteBrandModal = ({ id, name, show, handleClose, reRender }) => {
  const deleteBrandInModal = async (id) => {
    await deleteBrand(id).then((data) => {
      handleClose();
      reRender()
    });
  };

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
          <Modal.Title>suppresion de la marque"{name}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>vous etes sur de vouloir supprimer la marque  "{name}"?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteBrandInModal(id)}>
            supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default DeleteBrandModal;
