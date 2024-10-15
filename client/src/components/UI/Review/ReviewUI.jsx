import { Rating } from "@material-ui/lab";
import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import BadReviewTag from "../Tags/BadReviewTag/BadReviewTag";
import GoodReviewTag from "../Tags/GoodReviewTag/GoodReviewTag";

import "./ReviewUI.scss";

const ReviewUI = ({
  name_user,
  family_user,
  img_user,
  text_review,
  img_review,
  description_true,
  size_true,
  delivery_true,
  size,
  rate,
  isVk,
  isGoogle,
}) => {
  return (
    <>
      <Card className="review_card">
        <Card.Header>
          <Row>
            <Col className="d-flex flex-row align-items-center">
              {isVk || isGoogle ? (
                <div
                  className="avatar_profile"
                  style={{
                    backgroundImage: `url(${img_user})`,
                  }}
                ></div>
              ) : (
                <div
                  className="avatar_profile"
                  style={{
                    backgroundImage: `url(${
                      process.env.REACT_APP_API_URL + img_user
                    })`,
                  }}
                ></div>
              )}{" "}
              {name_user} {family_user}
            </Col>
            <Col className="d-flex flex-row justify-content-end">
              <Rating
                name="size-large"
                readOnly
                defaultValue={rate}
                size="large"
              />
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col className="d-flex flex-row">
              {description_true ? (
                <GoodReviewTag children={"la description correspond"} />
              ) : (
                <BadReviewTag children={"la description ne correspond pas"} />
              )}
              {size_true ? (
                <GoodReviewTag children={"la taille correspond"} />
              ) : (
                <BadReviewTag children={"la taille ne correspond pas"} />
              )}
              {delivery_true ? (
                <GoodReviewTag children={"la livraison correspond"} />
              ) : (
                <BadReviewTag children={"la livraison ne correspond pas "} />
              )}
              
            </Col>
          </Row>
          <Row>
            <Col>
              <br />
              {text_review}
              <br />
            </Col>
          </Row>
        </Card.Body>
        {img_review != "not img" ? (
          <Card.Footer>
            <img
              width={"10%"}
              src={process.env.REACT_APP_API_URL + img_review}
            />
          </Card.Footer>
        ) : (
          <div className="null_img"></div>
        )}
      </Card>
    </>
  );
};
export default ReviewUI;
