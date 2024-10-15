import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import DeleteReview from "../modals/DeleteReview";
import DetailsReview from "../modals/DetailsReview";

const ReviewItemAdmin = ({ review_data, reRender }) => {
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const [showDetail, setShowDetail] = useState(false);

  const handleCloseDetail = () => setShowDetail(false);
  const handleShowDetail = () => setShowDetail(true);

  return (
    <>
      <tr>
        <th>{review_data.id}</th>
        <th>{review_data.product.name}</th>
        <th>
          <Button onClick={() => handleShowDetail()}>plus de détails</Button>
        </th>
        <th>
          <Button variant="danger" onClick={() => handleShowDelete()}>
            surpprimer
          </Button>
        </th>
      </tr>

      <DeleteReview
        reRender={reRender}
        id_review={review_data.id}
        show={showDelete}
        handleClose={handleCloseDelete}
      />
      <DetailsReview
        review_data={review_data}
        show={showDetail}
        handleClose={handleCloseDetail}
      />
    </>
  );
};
export default ReviewItemAdmin;
