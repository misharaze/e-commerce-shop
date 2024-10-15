import React from "react";
import { Button, Image, Modal, Table } from "react-bootstrap";

const DetailsReview = ({ show, handleClose, review_data }) => {
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
          <Modal.Title>nformation sur l'avis N°{review_data.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>ID avis</th>
                <th>{review_data.id}</th>
              </tr>
              <tr>
                <th>ID produit</th>
                <th>{review_data.productId}</th>
              </tr>
              <tr>
                <th>nom du produit</th>
                <th>{review_data.product.name}</th>
              </tr>
              <tr>
                <th>ID utilisateur</th>
                <th>{review_data.review.userId}</th>
              </tr>
              <tr>
                <th>nom de familleutilisateur</th>
                <th>
                  {review_data.review.user.name}{" "}
                  {review_data.review.user.family}
                </th>
              </tr>
              <tr>
                <th>texte de l'avis</th>
                <th>{review_data.text_reviews}</th>
              </tr>
              <tr>
                <th>image</th>
                <th>
                  {review_data.img_reviews === "not img" ? (
                    "aucune image"
                  ) : (
                    <Image
                      src={
                        process.env.REACT_APP_API_URL + review_data.img_reviews
                      }
                      width={150}
                    ></Image>
                  )}
                </th>
              </tr>
              <tr>
                <th>correspondance de la description</th>
                <th>
                  {review_data.description_true
                    ? "correspond "
                    : "ne correspond pas "}
                </th>
              </tr>
             
              
              <tr>
                <th>Сorrespondance de la livraison</th>
                <th>
                  {review_data.delivery_true
                    ? "correspond"
                    : "ne correspond pas "}
                </th>
              </tr>
            </tbody>
          </Table>
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
export default DetailsReview;
