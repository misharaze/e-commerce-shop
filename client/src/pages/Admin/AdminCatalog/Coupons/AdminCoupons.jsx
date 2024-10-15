import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { AiOutlineMenuFold } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import CreateCoupon from "../../../../components/modals/CreateCoupon";
import SideBar from "../../../../components/UI/AdminSideBar/SideBar";
import { deleteCoupon, fetchCoupons } from "../../../../http/couponAPI";

import "./AdminCoupons.scss";

const AdminCoupons = () => {
  const [showAlert, setShowAlert] = useState(true);

  const [showSidebar, setShowSidebar] = useState(false);

  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetchCoupons().then((data) => {
      setCoupons(data.rows);
    });
  }, []);

  const [createModalState, setCreateModalState] = useState(false);

  const handleShowCreateModal = () => {
    setCreateModalState(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalState(false);
  };

  const handleShowSidebar = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    fetchCoupons().then((data) => {
      setCoupons(data.rows);
    });
  }, [rerender]);

  const reRender = () => {
    setRerender(!rerender);
  };

  const deleteCouponInAdmin =(id) => {
    deleteCoupon(id).then(() => {
        reRender()
    })
  }

  return (
    <>
      <Container className="admin_container">
        <Row className="admin_title">
          <Col xs={12}>
            <Button
              variant="outline-primary"
              onClick={() => handleShowSidebar()}
              className="me-2"
            >
              <AiOutlineMenuFold />
            </Button>
           cabinet de l'administrateur
          </Col>
        </Row>
        <Row className="admin_subtitle">
          <Col xs={12}>rubrique "coupon"</Col>
        </Row>
        <Row>
          <Col xs={12}>
            {showAlert ? (
              <Alert
                variant="primary"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>
                  cette rubrique est destiné  pour rajouter des coupons 
                </Alert.Heading>
                <p>ici tu peux rajouter des coupons:</p>
                <ul>
                  <li>
                    si tu as  besoin de rajouter un coupon appuye sur "ajouter" et 
                    rentre les données nécessaires.
                  </li>
                  <li>
                    si tu veux supprimer un coupon, choisis le coupn dans la liste 
                    et appuye sur le bouton suprimer du panier.
                  </li>
                </ul>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant="outline-success"
              onClick={() => handleShowCreateModal()}
            >
              ajouter
            </Button>
          </Col>
        </Row>
        <Row className="mt-3">
          {coupons?.map((item) => (
              <ButtonGroup size="mb" style={{width: 'min-content'}}key={item.id}>
                <Button variant="danger" disabled={true}>
                  {item.code} ({item.discount_percentage}%)
                </Button>
                <Button variant="danger">
                  <BsTrash onClick={() => deleteCouponInAdmin(item.id)}/>
                </Button>
              </ButtonGroup>
          ))}
        </Row>
      </Container>

      <SideBar show={showSidebar} handleClose={handleCloseSidebar} />
      <CreateCoupon
        show={createModalState}
        reRender={reRender}
        onHide={handleCloseCreateModal}
      />
    </>
  );
};
export default AdminCoupons;
