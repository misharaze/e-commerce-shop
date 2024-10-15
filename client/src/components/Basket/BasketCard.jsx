//import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import OneItemInBasket from "./OneItemBasket";
//import { Context } from "../../index";
import "./BasketCard.scss";
import { CHECKOUTING_ROUTE } from "../../utils/consts";
import { useState } from "react";
import { getProductFromBasket } from "../../http/productAPI";
import { useEffect } from "react";
import { fetchOneCoupon } from "../../http/couponAPI";
import AddOrderDetails from "../modals/AddOrderDetails";
import { Link } from "react-router-dom";
import { SHOP_ROUTE } from "../../utils/consts";

const BasketCard = observer(() => {


  const [stateModal, setStateModal] = useState(false);

  const handleShow = () => {
    setStateModal(true);
  };
  const handleClose = () => {
    setStateModal(false);
  };

  const [orderPrice, setOrderPrice] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [sale, setSale] = useState(1);

  const [couponText, setCouponText] = useState("");

  const [paymentDelivery, setPaymentDelivery] = useState(false);

  const setDeliveryPayment = (bool) => {
    setPaymentDelivery((e) => !e);

    if (paymentDelivery == false) {
      setDeliveryPrice(600);
    } else {
      setDeliveryPrice(0);
    }
  };

  useEffect(() => {
    setOrderPrice((totalPrice + deliveryPrice) * sale);
  }, [deliveryPrice, sale]);

  const checkCoupon = () => {
    if (couponText.length != 0) {
      fetchOneCoupon(couponText).then((data) => {
        if (data) {
          setSale(1 - data.discount_percentage / 100);
        } else {
          setSale(1);
        }
      });
    }
  };

  const [basket, setBasket] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    getProductFromBasket().then((data) => {
      setBasket(data);
      const total =
        data.length !== 1
          ? data.reduce((a, c) => (a += c.price * c.count), 0)
          : data[0].price * data[0].count;
      setTotalPrice(total);
      setOrderPrice((total + deliveryPrice) * sale);
    });
  }, []);

  const [rerender, setRerender] = useState(false);
  const [rerenderPrice, setRerenderPrice] = useState(false);

  const getTotalPrice = () => {
    const total =
      basket.length !== 1
        ? basket.reduce((a, c) => (a += c.price * c.count), 0)
        : basket[0].price * basket[0].count;
    setTotalPrice(total);
    setOrderPrice((total + deliveryPrice) * sale);
  };

  useEffect(() => {
    getProductFromBasket().then((data) => {
      setBasket(data);
    });
    getTotalPrice();
  }, [rerender]);

  useEffect(() => {
    if (basket.length !== 0) {
      getProductFromBasket().then((data) => {
        setBasket(data);
        const total =
          data.length !== 1
            ? data.reduce((a, c) => (a += c.price * c.count), 0)
            : data[0].price * data[0].count;
        setTotalPrice(total);
        setOrderPrice((total + deliveryPrice) * sale);
      });
      getTotalPrice();
    }
  }, [rerenderPrice]);

  const reRender = () => {
    setRerender(!rerender);
  };

  const reRenderPrice = () => {
    setRerenderPrice(!rerenderPrice);
  };

  const sortFunc = (a, b) => {
    var aname = a.name;
    var bname = b.name;
    var asize = a.sizeId;
    var bsize = b.sizeId;

    if (aname == bname) {
      return asize < bsize ? -1 : asize > bsize ? 1 : 0;
    } else {
      return aname < bname ? -1 : 1;
    }
  };

  if (basket.length == 0) {
    return (
      <div className="d-flex flex-column align-items-center mt-5">
        <Image
          src={process.env.PUBLIC_URL + "/img/basket/basketEmpty.png"}
          width="200"
        />
        <div
          className="text-center mt-5"
          style={{ fontSize: 28, marginBottom: 200 }}
        >
          <b>Votre panier est vide...</b>
        </div>
        <Link to={SHOP_ROUTE}>
        <Button>
        Retour vers le magasin
        </Button>
       </Link>
      </div>
   
    );
  }

  return (
    <>
      <div className="entry-header-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="entry-header">
                <h1 className="entry-title mt-3 mb-3">Panier de commande </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cart-main-area">
        <div className="contaNameiner">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <form action="#">
                <div className="table-content table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th className="product-thumbnail">Image</th>
                        <th className="product-name">nom du produit</th>
                        <th className="product-price">Prix</th>
                        <th className="product-quantity">quantité</th>
                        <th className="product-subtotal">Prix globale</th>
                        <th className="product-remove">Supprimer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {basket
                        .sort((a, b) => sortFunc(a, b))
                        .map((product) => (
                          <OneItemInBasket
                            key={product.id }
                            product={product}
                            reRender={reRender}
                            reRenderPrice={reRenderPrice}
                          />
                        ))}
                    </tbody>
                  </table>
                </div>
                 <div className="row">
                  <div className="col-md-8 col-sm-7 col-xs-12">
                    <div className="coupon">
                      <h3>Coupon</h3>
                      <p>
                       si vous avez un coupon merci de le renseigner
                      </p>
                      <input type="text" placeholder="rentrer votre coupon" />
                      <input type="submit" value="utiliser son coupon" />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-5 col-xs-12">
                    <div className="cart_totals">
                      <h2>prix gobale</h2>
                      <table>
                        <tbody>
                          <tr className="cart-subtotal">
                            <th>achat:</th>
                            <td>
                              <span className="amount">{totalPrice} EURO</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="livraison payante"
                              />
                            </td>
                          </tr>
                          <tr className="shipping">
                            <th>livraison:</th>
                            <td>
                              <strong>
                                <span className="amount">{deliveryPrice} EURO</span>
                              </strong>{" "}
                            </td>
                          </tr>
                          <tr className="order-total">
                            <th>prix finale:</th>
                            <td>
                              <strong>
                                <span className="amount">{orderPrice} EURO</span>
                              </strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="wc-proceed-to-checkout">
                        <a
                          onClick={() =>
                            (window.location.href = CHECKOUTING_ROUTE)
                          }
                        >
                          Acheter
                        </a>
                      </div>
                    </div>
                  </div>
                </div> 
                <Row>
                  <Col xs={12} md={6}>
                    <Row>
                      <Col>
                        <div className="coupon">
                          <h3>Coupon</h3>
                          <p>
                            Si vous avez un coupon rentrer le et obtenez une réduction
                          </p>
                          <input
                            type="text"
                            value={couponText}
                            placeholder="montrer le coupon"
                            onChange={(e) => setCouponText(e.target.value)}
                          />
                          <Button
                            variant="outline-danger"
                            onClick={() => checkCoupon()}
                          >
                            Utiliser son coupon 
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={12} md={6}>
                    <Row>
                      <h2>prix apres réduction</h2>
                    </Row>
                    <hr />

                    <Row>
                      <Col>Prix total:</Col>
                      <Col className="d-flex justify-content-end">
                        <span className="amount">{totalPrice} EURO</span>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Row className="pl-4">
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          label="livraison payante"
                          value={paymentDelivery}
                          onChange={(e) => setDeliveryPayment(e.target.value)}
                        />
                      </Row>
                      <Row className="pr-0">
                        <Col>Livraison:</Col>
                        <Col className="d-flex justify-content-end">
                          <span className="amount">{deliveryPrice} Euro</span>
                        </Col>
                      </Row>
                    </Row>
                    <hr />
                    <Row>
                      <Col>Réduction:</Col>
                      <Col className="d-flex justify-content-end">
                        <span className="amount">
                          {" "}
                          {sale == 1 ? 0 : 100 - sale * 100} %
                        </span>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col>Prix total:</Col>
                      <Col className="d-flex justify-content-end">
                        <span class="amount">
                          {orderPrice.toFixed(1)} EURO
                        </span>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Button variant="danger" onClick={() => handleShow()}>
                        Acheter
                      </Button>
                    </Row>
                  </Col>
                </Row>
              </form>
            </div>
          </div>
        </div>
      </div>

      <AddOrderDetails show={stateModal} onHide={handleClose} sale={sale} payment_delivery={paymentDelivery} total_price={orderPrice}/>
    </>
  );
});

export default BasketCard;
