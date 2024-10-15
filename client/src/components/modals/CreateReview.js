import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  InputGroup,
  ListGroup,
  Modal,
  NavLink,
  Row,
} from "react-bootstrap";
import { createReviews } from "../../http/reviewsAPI";
import { Rating } from "@material-ui/lab";

import { Context } from "../..";

export const CreateReview = ({
  modalReview,
  handleCloseReviews,
  productId, reRender
}) => {
  const user = useContext(Context);

  const [descriptionTrueState, setDescriptionTrueState] = useState(true);
  const [deliveryTrueState, setDeliveryTrueState] = useState(true);
  const [rating, setRating] = useState(3);

  const [reviewText, setReviewText] = useState();
  const [fileReview, setFileReview] = useState(null);
  const selectFileReview = (e) => {
    setFileReview(e.target.files[0]);
  };

  const createReviewsInModal = () => {
    const formData = new FormData();
    formData.append("text_review", reviewText);
    formData.append("img_reviews", fileReview);
    formData.append("description_true", descriptionTrueState);
   formData.append("delivery_true", deliveryTrueState);
    formData.append("product_id", productId);
    formData.append("rate", rating);
    formData.append("user_id", user.user.user.id);
    createReviews(formData).then((data) => {
      handleCloseReviews();
      reRender()
    });
  };


  return (
    <>
      <Modal
        show={modalReview}
        onHide={handleCloseReviews}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            création de l'avis
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br />
          créer son avis:
          <Form.Control
            as="textarea"
            aria-label="With textarea"
            onChange={(e) => setReviewText(e.target.value)}
          />
          <br />
          ajouter une image:
          <Form.Control type="file" onChange={selectFileReview} />
          <br />
          <Rating
            name="size-large"
            defaultValue={rating || 3}
            value={rating || 3}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            size="large"
          />
          <br />
          la description correspond elle au produit?
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setDescriptionTrueState(e.target.value)}
          >
            <option value={true}>oui</option>
            <option value={false}>non</option>
          
           
          </Form.Select>
          <br />
          la livraison correspond elle la description?
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setDeliveryTrueState(e.target.value)}
          >
            <option value={true}>oui</option>
            <option value={false}>non</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReviews}>
            fermer
          </Button>
          <Button variant="success" onClick={() => createReviewsInModal()}>
            ajouter un avis
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
