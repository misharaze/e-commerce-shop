import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { AiOutlineMenuFold } from "react-icons/ai";
import { Link } from "react-router-dom";
import SideBar from "../../components/UI/AdminSideBar/SideBar";
import {
  fetchBadge,
  fetchBrands,
  fetchProduct,
  fetchTypes,
} from "../../http/productAPI";
import { fetchQuestion } from "../../http/questionAPI";
import { fetchSlider } from "../../http/sliderAPI";
import {
  getAllUser,
  getMoneyUserApi,
  getNewUserApi,
  getUserRoleAdminApi,
} from "../../http/userAPI";
import {

  ADMIN_BRANDANDTYPE_ROUTE,
  ADMIN_PRODUCT_ROUTE,
  ADMIN_QUESTION_ROUTE,
  ADMIN_SLIDER_ROUTE,
} from "../../utils/consts";
import "./Admin.scss";

const Admin = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleShowSidebar = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  const [countProduct, setCountProduct] = useState(0);
  const [countType, setCountType] = useState(0);
  const [countBrand, setCountBrand] = useState(0);
  const [countQuestion, setCountQuestion] = useState(0);

 

  const [countUser, setCountUser] = useState(0);
  const [countSlide, setCountSlide] = useState(0);
  const [adminUser, setAdminUser] = useState([]);
  const [adminUserCount, setAdminUserCount] = useState(0);
  const [newUser, setNewUser] = useState([]);
  const [moneyUser, setMoneyUser] = useState([]);

  useEffect(() => {
    fetchProduct().then((data) => {
      setCountProduct(data.count);
    });
    fetchTypes().then((data) => {
      setCountType(data.count);
    });
    fetchBrands().then((data) => {
      setCountBrand(data.count);
    });
    fetchQuestion({ limit: 1000, page: 1000 }).then((data) => {
      setCountQuestion(data.count);
    });
    
   
   
    // fetchBrands().then(data => {
    //   setCountBrand(data.count)
    // })
    fetchSlider().then((data) => {
      setCountSlide(data.length);
    });
    getUserRoleAdminApi().then((data) => {
      setAdminUser(data.rows);
      setAdminUserCount(data.count);
    });
    getNewUserApi().then((data) => {
      setNewUser(data);
    });
    getMoneyUserApi().then((data) => {
      setMoneyUser(data);
    });
    getAllUser().then((data) => {
      setCountUser(data.count);
    });
  }, []);

  console.log(moneyUser);
  const [resultMoneyUser, setResultMoneyUser] = useState([]);

  useEffect(() => {
    let resultArray = [];
    moneyUser.map((item) => {
      if (resultArray.find((obj) => obj.user_id == item.user.id) != undefined) {
        resultArray.map((res) => {
          item.order_products.map((res_o) => {
            if (res.user_id == item.user.id) {
              return (res.totalPrice = res.totalPrice + res_o.totalPrice);
            } else {
              return res;
            }
          });
        });
      } else {
        let total;
        if (item.order_products.length == 1) {
          total = item.order_products[0].totalPrice;
        } else {
          total = item.order_products.reduce((a, c) => (a += c.totalPrice), 0);
        }
        resultArray.push({
          user_id: item.user.id,
          user_name: item.user.name,
          user_family: item.user.family,
          user_img: item.user.img_user,
          isVK: item.user.isVK,
          isGoogle: item.user.isGoogle,
          totalPrice: total,
        });
      }
    });
    setResultMoneyUser(resultArray);
  }, [moneyUser]);

  console.log(resultMoneyUser);

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
          <Col xs={12}>rubrique "principal"</Col>
        </Row>
        <Row>
          <Col xs={12} md={6} xl={3}>
            <Link to={ADMIN_PRODUCT_ROUTE}>
              <Alert variant="success">
                <Alert.Heading>{countProduct}</Alert.Heading>
                quantités de produits
              </Alert>
            </Link>
          </Col>

          <Col xs={12} md={6} xl={3}>
            <Link to={ADMIN_BRANDANDTYPE_ROUTE}>
              <Alert variant="danger">
                <Alert.Heading>{countType}</Alert.Heading>
                quantités de catégories
              </Alert>
            </Link>
          </Col>

          <Col xs={12} md={6} xl={3}>
            <Link to={ADMIN_BRANDANDTYPE_ROUTE}>
              <Alert variant="warning">
                <Alert.Heading>{countBrand}</Alert.Heading>
                quantités de marques
              </Alert>
            </Link>
          </Col>

          <Col xs={12} md={6} xl={3}>
            <Link to={ADMIN_QUESTION_ROUTE}>
              <Alert variant="info">
                <Alert.Heading>{countQuestion}</Alert.Heading>
                quantités de questions 
              </Alert>
            </Link>
          </Col>

         


          <Col xs={12} md={6} xl={3}>
            <Link to={ADMIN_PRODUCT_ROUTE}>
              <Alert variant="danger">
                <Alert.Heading>{countUser}</Alert.Heading>
                quantités d'utilisateurs
              </Alert>
            </Link>
          </Col>

          <Col xs={12} md={6} xl={3}>
            <Link to={ADMIN_PRODUCT_ROUTE}>
              <Alert variant="success">
                <Alert.Heading>{adminUserCount}</Alert.Heading>
                quantités d'administrateur
              </Alert>
            </Link>
          </Col>

          <Col xs={12} md={6} xl={3}>
            <Link to={ADMIN_SLIDER_ROUTE}>
              <Alert variant="warning">
                <Alert.Heading>{countSlide}</Alert.Heading>
                quantités de slide
              </Alert>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6} xl={4}>
            <ListGroup as="ol" numbered>
              <ListGroup.Item variant="danger">
                liste d'administrateur
              </ListGroup.Item>
              {adminUser?.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row className="d-flex flex-row justify-content-center align-items-center">
                    <Col className="d-flex flex-row align-items-center">
                      {item.isVK || item.isGoogle ? (
                        <div
                          className="avatar_profile"
                          style={{
                            backgroundImage: `url(${item.img_user})`,
                          }}
                        ></div>
                      ) : (
                        <div
                          className="avatar_profile"
                          style={{
                            backgroundImage: `url(${
                              process.env.REACT_APP_API_URL + item.img_user
                            })`,
                          }}
                        ></div>
                      )}{" "}
                      {item.name} {item.family}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          <Col xs={12} md={6} xl={4}>
            <ListGroup as="ol" numbered>
              <ListGroup.Item variant="danger">
                liste des nouveaux utilisateurs
              </ListGroup.Item>
              {newUser?.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row className="d-flex flex-row justify-content-center align-items-center">
                    <Col className="d-flex flex-row align-items-center">
                      {item.isVK || item.isGoogle ? (
                        <div
                          className="avatar_profile"
                          style={{
                            backgroundImage: `url(${item.img_user})`,
                          }}
                        ></div>
                      ) : (
                        <div
                          className="avatar_profile"
                          style={{
                            backgroundImage: `url(${
                              process.env.REACT_APP_API_URL + item.img_user
                            })`,
                          }}
                        ></div>
                      )}{" "}
                      {item.name} {item.family}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          <Col xs={12} md={6} xl={4}>
            <ListGroup as="ol" numbered>
              <ListGroup.Item variant="danger">
                liste des utilisateurs par produit
              </ListGroup.Item>
              {resultMoneyUser
                ?.sort((a, b) => {
                  return b.totalPrice - a.totalPrice;
                })
                .slice(0, 5)
                .map((item) => (
                  <ListGroup.Item key={item.user_id}>
                    <Row className="d-flex flex-row justify-content-center align-items-center">
                      <Col className="d-flex flex-row align-items-center">
                        {item.isVK || item.isGoogle ? (
                          <div
                            className="avatar_profile"
                            style={{
                              backgroundImage: `url(${item.user_img})`,
                            }}
                          ></div>
                        ) : (
                          <div
                            className="avatar_profile"
                            style={{
                              backgroundImage: `url(${
                                process.env.REACT_APP_API_URL + item.user_img
                              })`,
                            }}
                          ></div>
                        )}{" "}
                        {item.user_name} {item.user_family}
                      </Col>

                      <Col
                        xs={4}
                        className="d-flex flex-row justify-content-end"
                      >
                        {item.totalPrice} EURO
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>

      <SideBar show={showSidebar} handleClose={handleCloseSidebar} />
    </>
  );
};

export default Admin;
