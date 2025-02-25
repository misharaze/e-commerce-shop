import React, { useState, useContext, useEffect } from "react";
import Logo from './logo.jpg'
import { observer } from "mobx-react-lite";
import "./Header.scss";
import {
  Button,
  Badge,
  Container,
  Col,
  Row,
  InputGroup,
  Form,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import {
  BsBag,
  BsBasket,
  BsBell,
  BsHeart,
  BsPerson,
  BsPinMap,
  BsSearch,
  BsTruck,
} from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsGoogle } from "react-icons/bs";
import { FaVk } from "react-icons/fa";

import { MdOutlineLogin } from "react-icons/md";
import { Context } from "../..";
import {
  BASKET_ROUTE,
  LIKES_ROUTER,
  LOCATIONPLACES_ROUTE,
  LOGIN_ROUTE,
  NOTIFICATION_ROUTE,
  ORDERS_ROUTE,
  PRODUCT_ROUTE,
  SHOP_ROUTE,
  USERPROFILE_ROUTE,
} from "../../utils/consts";
import { Link } from "react-router-dom";
import { getData } from "../../http/userAPI";
import SocialHeader from "../UI/Social/Header/SocialHeader";
import { AiOutlineMenu } from "react-icons/ai";
import Sidebar from "../UI/SideBar/Sidebar";
import { fetchProduct, getAllProductSearch } from "../../http/productAPI";
import useDebounce from "../../hooks/useDebounce";

const Header = observer(() => {
  const { user, basket, likes, notifications } = useContext(Context);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [load, setload] = useState(false);
  useEffect(() => {
    getData(user.user.id).then((data) => {
      user.setUserProf(data);
    });
  }, [load]);

  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(false);

  const [focused, setFocused] = useState(false);
  const onFocus = () => {
    setTimeout(() => {
      setFocused(true);
    }, 200);
  } 
  const onBlur = () => {
    setTimeout(() => {
      setFocused(false);
    }, 200);
  }

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setProduct([]);

      const data = await getAllProductSearch(search);
      setProduct(data.rows);
      setLoading(false);
    }
    if (debouncedSearch) fetchData();
  }, [debouncedSearch]);

  if (user.isAuth) {
    return (
      <>
        <header className="header">
          <Container  fluid className="header_container">
            <Row className="header_top">
              <Col
                className="header_top_left"
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={4}
                xxl={4}
              >
                <SocialHeader />
              </Col>
              <Col
                className="header_top_center d-none d-xl-flex"
                xl={4}
                xxl={4}
              >
                <p className="top_text">
                  vous avez le choix...
                </p>
              </Col>
              <Col
                className="header_top_right d-none d-md-flex"
                md={6}
                lg={6}
                xl={4}
                xxl={4}
              >
                <a className="right_text" href="tel: 06-76-78-89-34">
                     06-76-78-89-34
                </a>
                <a className="right_text" href="misha0202-15@hotmail.com">
                misha0202-15@hotmail.com
                </a>
              </Col>
            </Row>
            <Row className="header_main">
              <Container>
              <img style={{height:60, width:60 }} className="logo" src={Logo} alt="" />
                <Row>
                  <Col
                    className="header_logo"
                    
                    xs={6}
                    sm={6}
                    md={6}
                    lg={6}
                    xl={4}
                    xxl={4}
                  
                  >
                      
                    <Link to={SHOP_ROUTE}>
                      <p className="text_logo">
                       
                     
          <span>Naturalia</span>
                      
                      </p>
                    </Link>
                  </Col>
                  <Col
                    className="header_search d-none d-xl-flex"
                    xl={4}
                    xxl={4}
                  >
                    <InputGroup>
                      <InputGroup.Text
                        id="basic-addon1"
                        className="search_text"
                      >
                        <BsSearch />
                      </InputGroup.Text>
                      <Form.Control
                        className="search_input"
                        placeholder="que cherchez vous?"
                        aria-label="search"
                        aria-describedby="basic-addon1"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onFocus={onFocus}
                        onBlur={onBlur}
                      />
                    </InputGroup>
                    {search != null && focused && product != [] && !loading ? (
                      <div className="seach_item">
                        <ul>
                          {product.length == 0 ? (
                            <li>rien a était trouver!</li>
                          ) : (
                            product?.map((item) => (
                              <Link
                                to={PRODUCT_ROUTE + "/" + item.id}
                              >
                                <li>{item.name}</li>
                              </Link>
                            ))
                          )}
                        </ul>
                      </div>
                    ) : (
                      ""
                    )}
                  </Col>
                  <Col
                    className="header_user_navigation"
                    xs={6}
                    md={6}
                    sm={6}
                    lg={6}
                    xl={4}
                    xxl={4}
                  >
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip id="button-tooltip">notifications</Tooltip>
                      }
                    >
                      <Link to={NOTIFICATION_ROUTE}>
                        <BsBell className="user_icon" size={25} />
                        {notifications.count != 0 ? (
                          <Badge pill={true}>{notifications.count}</Badge>
                        ) : (
                          ""
                        )}
                      </Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id="button-tooltip">panier</Tooltip>}
                    >
                      <Link to={BASKET_ROUTE}>
                        <BsBasket className="user_icon" size={25} />
                        {basket._count != 0 ? (
                          <Badge pill={true}>{basket._count}</Badge>
                        ) : (
                          ""
                        )}
                      </Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id="button-tooltip">commandes</Tooltip>}
                    >
                      <Link to={ORDERS_ROUTE}>
                        <BsBag className="user_icon" size={25} />
                      </Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id="button-tooltip">liste de souhait</Tooltip>}
                    >
                      <Link to={LIKES_ROUTER}>
                        <BsHeart className="user_icon" size={25} />
                        {likes._likes.length != 0 ? (
                          <Badge pill={true}>{likes._likes.length}</Badge>
                        ) : (
                          ""
                        )}
                      </Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id="button-tooltip">cabinet personnel</Tooltip>}
                    >
                      <Link to={USERPROFILE_ROUTE}>
                        <BsPerson className="user_icon" size={25} />
                      </Link>
                    </OverlayTrigger>
                    <Button
                      variant="outline-dark"
                      className="off_btn"
                      onClick={handleShow}
                    >
                      <AiOutlineMenu className="off_icons" />
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Row>
          </Container>
        </header>

        <Sidebar
          show={show}
          handleClose={handleClose}
          isAdmin={user.isAdmin}
          isAuth={user.isAuth}
          basket={basket}
          likes={likes}
        />
      </>
    );
  } else {
    return (
      <>
        <header className="header">
          <Container fluid className="header_container">
            <Row className="header_top">
              <Col
                className="header_top_left"
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={4}
                xxl={4}
              >
                <SocialHeader />
              </Col>
              <Col
                className="header_top_center d-none d-xl-flex"
                xl={4}
                xxl={4}
              >
                <p className="top_text">
                  les produits produit avec amour ...
                </p>
              </Col>
              <Col
                className="header_top_right d-none d-md-flex"
                md={6}
                lg={6}
                xl={4}
                xxl={4}
              >
                <a className="right_text" href="tel: 06-09-89-09-78">
                  06-09-89-09-78
                </a>
                <a className="right_text" href="mailto:naturalia@gmail.com">
                naturalia@gmail.com
                </a>
              </Col>
            </Row>
            <Row className="header_main">
              <Container>
                <Row>
                  <Col
                    className="header_logo"
                    xs={6}
                    sm={6}
                    md={6}
                    lg={6}
                    xl={4}
                    xxl={4}
                  >
                    <Link to={SHOP_ROUTE}>
                      <p className="text_logo">
                        <span>NATURALIA</span>
                      </p>
                    </Link>
                  </Col>
                  <Col
                    className="header_search d-none d-xl-flex"
                    xl={4}
                    xxl={4}
                  >
                    <InputGroup>
                      <InputGroup.Text
                        id="basic-addon1"
                        className="search_text"
                      >
                        <BsSearch />
                      </InputGroup.Text>
                      <Form.Control
                        className="search_input"
                        placeholder="que recherchez vous?"
                        aria-label="search"
                        aria-describedby="basic-addon1"
                      />
                    </InputGroup>
                  </Col>
                  <Col
                    className="header_user_navigation"
                    xs={6}
                    md={6}
                    sm={6}
                    lg={6}
                    xl={4}
                    xxl={4}
                  >
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id="button-tooltip">rentrer</Tooltip>}
                    >
                      <Link to={LOGIN_ROUTE}>
                        <MdOutlineLogin className="user_icon" size={25} />
                      </Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip id="button-tooltip">ou aller?</Tooltip>
                      }
                    >
                      <Link to={LOCATIONPLACES_ROUTE}>
                        <BsPinMap className="user_icon" size={25} />
                      </Link>
                    </OverlayTrigger>
                    <Button
                      variant="outline-dark"
                      className="off_btn"
                      onClick={handleShow}
                    >
                      <AiOutlineMenu className="off_icons" />
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Row>
          </Container>
        </header>

        <Sidebar
          show={show}
          handleClose={handleClose}
          isAdmin={user.isAdmin}
          isAuth={user.isAuth}
          basket={basket}
          likes={likes}
        />
      </>
    );
  }
});

export default Header;
