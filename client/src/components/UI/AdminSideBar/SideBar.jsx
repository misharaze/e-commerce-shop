import React from "react";
import { Button, Col, Container, Nav, Row, Offcanvas } from "react-bootstrap";
import {
  MdCake,
  MdColorLens,
  MdDocumentScanner,
  MdImage,
  MdMap,
  MdOutlineDomainVerification,
 MdQuestionAnswer,
  MdQuiz,
  MdReviews,
  MdSmartButton,
  MdSubject,
  MdSupport,
  MdTabletMac,
  MdTextSnippet,
  MdToys,
} from "react-icons/md";
import { Link } from "react-router-dom";
import {
  ADMIN_BRANDANDTYPE_ROUTE,
  ADMIN_BUTTONS_ROUTE,
  ADMIN_COLORS_ROUTE,
  ADMIN_COUPONS_ROUTE,
  ADMIN_EXCEL_ROUTE,
  ADMIN_IMG_ROUTE,
  ADMIN_LOCATION_ROUTE,
  ADMIN_ORDER_ROUTE,
  ADMIN_PRODUCT_ROUTE,
  ADMIN_QUESTION_ROUTE,
  ADMIN_REVIEW_ROUTE,
  ADMIN_ROUTE,
  ADMIN_RULES_ROUTE,
   ADMIN_SLIDER_ROUTE,
  ADMIN_STATISTIC_ROUTE,
} from "../../../utils/consts";
import "./SideBar.scss";

const SideBar = ({ show, handleClose }) => {
  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>menu de navigation</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container fluid className="sidebar_container">
            <Row className="sidebar_row_dop">
              <Col xs={12} className="sidebar_col_dop">
                réglages principales
              </Col>
            </Row>

            <Row className="sidebar_row">
              <Link to={ADMIN_ROUTE}>
                <Col xs={12} className="sidebar_col">
                  <Row>
                    <Col xs={6} className="sidebar_row_icons">
                      <MdOutlineDomainVerification size={"30px"} />
                    </Col>
                    <Col xs={6} className="sidebar_row_text">
                      principal
                    </Col>
                  </Row>
                </Col>
              </Link>
            </Row>

            <Row className="sidebar_row">
              <Link to={ADMIN_STATISTIC_ROUTE}>
                <Col xs={12} className="sidebar_col">
                  <Row>
                    <Col xs={6} className="sidebar_row_icons">
                      <MdSupport size={"30px"} />
                    </Col>
                    <Col xs={6} className="sidebar_row_text">
                      statistiques
                    </Col>
                  </Row>
                </Col>
              </Link>
            </Row>

            <Row className="sidebar_row">
              <Link to={ADMIN_BRANDANDTYPE_ROUTE}>
                <Col xs={12} className="sidebar_col">
                  <Row>
                    <Col xs={6} className="sidebar_row_icons">
                      <MdSupport size={"30px"} />
                    </Col>
                    <Col xs={6} className="sidebar_row_text">
                      marques et catégories
                    </Col>
                  </Row>
                </Col>
              </Link>
            </Row>

            <Row className="sidebar_row">
              <Link to={ADMIN_PRODUCT_ROUTE}>
                <Col xs={12} className="sidebar_col">
                  <Row>
                    <Col xs={6} className="sidebar_row_icons">
                      <MdToys size={"30px"} />
                    </Col>
                    <Col xs={6} className="sidebar_row_text">
                      Produits
                    </Col>
                  </Row>
                </Col>
              </Link>
            </Row>


            <Row className="sidebar_row">
              <Link to={ADMIN_COUPONS_ROUTE}>
                <Col xs={12} className="sidebar_col">
                  <Row>
                    <Col xs={6} className="sidebar_row_icons">
                      <MdCake size={"30px"} />
                    </Col>
                    <Col xs={6} className="sidebar_row_text">
                     coupon
                    </Col>
                  </Row>
                </Col>
              </Link>
            </Row>

            <Row className="sidebar_row">
              <Link to={ADMIN_ORDER_ROUTE}>
                <Col xs={12} className="sidebar_col">
                  <Row>
                    <Col xs={6} className="sidebar_row_icons">
                      <MdDocumentScanner size={"30px"} />
                    </Col>
                    <Col xs={6} className="sidebar_row_text">
                      commandes
                    </Col>
                  </Row>
                </Col>
              </Link>
            </Row>

            <Row className="sidebar_row">
              <Link to={ADMIN_EXCEL_ROUTE}>
                <Col xs={12} className="sidebar_col">
                  <Row>
                    <Col xs={6} className="sidebar_row_icons">
                      <MdTextSnippet size={"30px"} />
                    </Col>
                    <Col xs={6} className="sidebar_row_text">
                      documents
                    </Col>
                  </Row>
                </Col>
              </Link>
            </Row>

            <Row className="sidebar_row">
              <Link to={ADMIN_SLIDER_ROUTE}>
                <Col xs={12} className="sidebar_col">
                  <Row>
                    <Col xs={6} className="sidebar_row_icons">
                      <MdTabletMac size={"30px"} />
                    </Col>
                    <Col xs={6} className="sidebar_row_text">
                      slider
                    </Col>
                  </Row>
                </Col>
              </Link>
            </Row>

            <Row className="sidebar_row">
              <Link to={ADMIN_QUESTION_ROUTE}>
                <Col xs={12} className="sidebar_col">
                  <Row>
                    <Col xs={6} className="sidebar_row_icons">
                      <MdQuestionAnswer size={"30px"} />
                    </Col>
                    <Col xs={6} className="sidebar_row_text">
                      questions
                    </Col>
                  </Row>
                </Col>
              </Link>
            </Row>

            <Row className="sidebar_row">
              <Link to={ADMIN_REVIEW_ROUTE}>
                <Col xs={12} className="sidebar_col">
                  <Row>
                    <Col xs={6} className="sidebar_row_icons">
                      <MdReviews size={"30px"} />
                    </Col>
                    <Col xs={6} className="sidebar_row_text">
                      avis
                    </Col>
                  </Row>
                </Col>
              </Link>
            </Row>

            <Row className="sidebar_row">
              <Link to={ADMIN_RULES_ROUTE}>
                <Col xs={12} className="sidebar_col">
                  <Row>
                    <Col xs={6} className="sidebar_row_icons">
                      <MdQuiz size={"30px"} />
                    </Col>
                    <Col xs={6} className="sidebar_row_text">
                      questions principal
                    </Col>
                  </Row>
                </Col>
              </Link>
            </Row>

            <Row className="sidebar_row">
              <Link to={ADMIN_LOCATION_ROUTE}>
                <Col xs={12} className="sidebar_col">
                  <Row>
                    <Col xs={6} className="sidebar_row_icons">
                      <MdMap size={"30px"} />
                    </Col>
                    <Col xs={6} className="sidebar_row_text">
                      lieux principal
                    </Col>
                  </Row>
                </Col>
              </Link>
            </Row>

            <Row className="sidebar_row_dop">
              <Col xs={12} className="sidebar_col_dop">
                pour le dévellopeur
              </Col>
            </Row>

            <Row className="sidebar_row">
              <Link to={ADMIN_COLORS_ROUTE}>
                <Col xs={12} className="sidebar_col">
                  <Row>
                    <Col xs={6} className="sidebar_row_icons">
                      <MdColorLens size={"30px"} />
                    </Col>
                    <Col xs={6} className="sidebar_row_text">
                     couleur
                    </Col>
                  </Row>
                </Col>
              </Link>
            </Row>

            {/* <Row className="sidebar_row">
              <Col xs={12} className="sidebar_col">
                <Row>
                  <Col xs={6} className="sidebar_row_icons">
                    <MdPattern size={"30px"} />
                  </Col>
                  <Col xs={6} className="sidebar_row_text">
                    Шаблоны
                  </Col>
                </Row>
              </Col>
            </Row> */}

            <Row className="sidebar_row">
              <Link to={ADMIN_BUTTONS_ROUTE}>
                <Col xs={12} className="sidebar_col">
                  <Row>
                    <Col xs={6} className="sidebar_row_icons">
                      <MdSmartButton size={"30px"} />
                    </Col>
                    <Col xs={6} className="sidebar_row_text">
                      buttons
                    </Col>
                  </Row>
                </Col>
              </Link>
            </Row>

            <Row className="sidebar_row">
              <Link to={ADMIN_IMG_ROUTE}>
                <Col xs={12} className="sidebar_col">
                  <Row>
                    <Col xs={6} className="sidebar_row_icons">
                      <MdImage size={"30px"} />
                    </Col>
                    <Col xs={6} className="sidebar_row_text">
                      image
                    </Col>
                  </Row>
                </Col>
              </Link>
            </Row>

            <Row className="sidebar_row">
              <a href={process.env.REACT_APP_API_URL + "docs"}>
                <Col xs={12} className="sidebar_col">
                  <Row>
                    <Col xs={6} className="sidebar_row_icons">
                      <MdSubject size={"30px"} />
                    </Col>
                    <Col xs={6} className="sidebar_row_text">
                      API
                    </Col>
                  </Row>
                </Col>
              </a>
            </Row>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SideBar;
