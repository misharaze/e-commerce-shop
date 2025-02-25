import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  InputGroup,
  Modal,
  ProgressBar,
  Row,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Context } from "../..";
import {
  fetchOneProduct,
  addProductToBasket,
  getProductDescription,
  getProductFromBasket,
} from "../../http/productAPI";
import { BASKET_ROUTE } from "../../utils/consts";
import { BsCheckLg, BsHeart } from "react-icons/bs";
import { BsCartPlus } from "react-icons/bs";
import "./Simple.scss";
import RatingStars from "../../components/RatingStar";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Nav from "react-bootstrap/Nav";
import {
  createQuestion,
  fetchQuestion,
  fetchQuestionProduct,
  getBoolUserUnCompleteQuestion,
} from "../../http/questionAPI";
import { fetchReviewsProduct } from "../../http/reviewsAPI";
import ReviewUI from "../../components/UI/Review/ReviewUI";
import { addProductToLikes } from "../../http/likesAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import QuestionModal from "../../components/UI/Modals/AddQuestionModal/QuestionModal";
import ErrorAuthModalQuestion from "../../components/UI/Modals/ErrorAuthModalQuestion/ErrorAuthModalQuestion";
import ErrorAddQuestionModal from "../../components/UI/Modals/ErrorAddQuestionModal/ErrorAddQuestionModal";
import { Rating } from "@material-ui/lab";

import { addHistoryView } from "../../http/historyAPI";

const SimpleProduct = observer(() => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { user, basket, likes } = useContext(Context);

  const [product, setProduct] = useState({ info: [] });
  const { id } = useParams();

  const [showSizeProductModal, setShowSizeProductModal] = useState(false);
  const [changedSize, setChangedSize] = useState("");


  const handlerCloseSizeProduct = () => {
    setShowSizeProductModal(false);
  };

  useEffect(() => {
    if (user.isAuth && user.user.id != undefined) {
      const formDataHistory = new FormData();
      formDataHistory.append("productId", id);
      formDataHistory.append("userId", user.user.id);
      addHistoryView(formDataHistory);
    }
  }, []);

  useEffect(() => {
    fetchOneProduct(id).then((data) => setProduct(data));
    getProductFromBasket().then((data) => {
      setDataBasket(data);
    });
  }, []);

  const [dataBasket, setDataBasket] = useState([]);

  const isProductInBasket = () => {
    const findProduct = dataBasket.findIndex(
      (item) =>
        Number(item.id) == Number(id) &&
        Number(item.sizeId) == Number(changedSize)
    );
    return findProduct < 0;
  };

  const isProductInLikes = () => {
    const findProduct = likes.Likes.findIndex(
      (item) => Number(item.id) === Number(id)
    );
    return findProduct < 0;
  };

  const addProductInBasket = (product) => {
    if (user.isAuth) {
      const formData = new FormData();
      formData.append("id", product.id);
      formData.append("size_product", changedSize);
      addProductToBasket(formData).then(() => {
        basket.setCount(basket._count + 1);
        basket.setBasket(product, true);
        getProductFromBasket().then((data) => {
          setDataBasket(data);
        });
      });console.log(addProductInBasket)
    } else {
      basket.setBasket(product);
    }
  };

  const addProductInLikes = (product) => {
    if (user.isAuth) {
      addProductToLikes(product).then(() => likes.setLikes(product, true));
    } else {
      likes.setLikes(product);
    }
  };

  //////////

  useEffect(() => {
    fetchOneProduct(id).then((data) => setProduct(data));
  }, [id]);

  
  ////

  const [showErrorModal, setShowErrorModal] = useState(false);
  const handleCloseErrorModal = () => setShowErrorModal(false);
  const handleShowErrorModal = () => setShowErrorModal(true);

  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const handleCloseQuestionModal = () => setShowQuestionModal(false);
  const handleShowQuestionModal = () => {
    if (user.isAuth) {
      getBoolUserUnCompleteQuestion({ id: user.user.id, product_id: id }).then(
        (data) => {
          console.log(data);
          if (data) {
            handleShowErrorModal();
          } else {
            setShowQuestionModal(true);
          }
        }
      );
    } else {
      handleShowErrorAuthModal();
    }
  };

  const [showErrorAuthModal, setShowErrorAuthModal] = useState(false);
  const handleCloseErrorAuthModal = () => setShowErrorAuthModal(false);
  const handleShowErrorAuthModal = () => setShowErrorAuthModal(true);

  const [stateQuestion, setStateQuestion] = useState("");

  const createQuestionUser = () => {
    // id_product, id_user_question, text_question
    const formData = new FormData();
    formData.append("text_question", stateQuestion);
    formData.append("id_product", id);
    formData.append("id_user_question", user.user.id);
    createQuestion(formData).then((data) => setShowQuestionModal(false));
  };

  const [QA, setQA] = useState();

  useEffect(() => {
    fetchQuestionProduct({ id }).then((data) => setQA(data));
  }, [product]);

  const [reviews, setReviews] = useState();

  useEffect(() => {
    fetchReviewsProduct({ id }).then((data) => setReviews(data));
  }, [product]);

  const sortSize = (arr) => {
    //Sort
    let numbers = [];
    let strings = [];

    arr.forEach((e) => (isNaN(e.size.number_size) ? strings : numbers).push(e));

    numbers = numbers.sort(
      (a, b) => Number(a.size.number_size) - Number(b.size.number_size)
    );
    strings = strings.sort();

    return numbers.concat(strings);
  };

  return (
    <>
      <Container className="product_container">
        <Row>
          <Col xs={12} md={12} xl={6} className="slider_product">
            <Swiper
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              }}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
            >
              <SwiperSlide>
                <img alt="" src={process.env.REACT_APP_API_URL + product.imgMain} />
              </SwiperSlide>
              <SwiperSlide>
                <img alt="" src={process.env.REACT_APP_API_URL + product.imgFirst} />
              </SwiperSlide>
              <SwiperSlide>
                <img alt=""src={process.env.REACT_APP_API_URL + product.imgSecond} />
              </SwiperSlide>
              <SwiperSlide>
                <img alt=""src={process.env.REACT_APP_API_URL + product.imgThird} />
              </SwiperSlide>
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img alt=""  src={process.env.REACT_APP_API_URL + product.imgMain} />
              </SwiperSlide>
              <SwiperSlide>
                <img alt=""  src={process.env.REACT_APP_API_URL + product.imgFirst} />
              </SwiperSlide>
              <SwiperSlide>
                <img alt=""  src={process.env.REACT_APP_API_URL + product.imgSecond} />
              </SwiperSlide>
              <SwiperSlide>
                <img  alt="" src={process.env.REACT_APP_API_URL + product.imgThird} />
              </SwiperSlide>
            </Swiper>
          </Col>
          <Col xs={12} md={12} xl={6} className="main_info_product">
            <Row>
              <p className="title_product">{product.name}</p>
              <p className="product_code">code du produit: {product.id}</p>
            </Row>
            <Row>
              <p className="price_product">{product.price} EURO</p>
            </Row>
            
             
            
            <Row className="mt-3">
              <Col xs={12} md={6} className="add_btn_container">
                {isProductInBasket(product) ? (
                  <button
                    class="cart_btn"
                    onClick={() => addProductInBasket(product)}
                    disabled={!user.isAuth ? true : false}
                  >
                    <BsCartPlus /> ajouter au panier
                  </button>
                ) : (
                  <a href={BASKET_ROUTE}>
                    <button class="cart_btn_success">
                      <BsCheckLg /> déja dans le panier
                    </button>
                  </a>
                )}
              </Col>
              <Col xs={12} md={6} className="add_btn_container">
                {isProductInLikes(product) ? (
                  <button
                    class="likes_btn"
                    onClick={() => addProductInLikes(product)}
                    disabled={!user.isAuth ? true : false}
                  >
                    <BsHeart /> ajouter au favoris
                  </button>
                ) : (
                  <button
                    class="likes_btn_success"
                    onClick={() => likes.setDeleteItemLikes(product, true)}
                    disabled={!user.isAuth ? true : false}
                  >
                    <BsHeart /> déja dans les favoris 
                  </button>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-5">
          <Tabs
            defaultActiveKey="description"
            id="justify-tab-example"
            className="mb-3"
            justify
          >
            <Tab eventKey="description" title="description">
              {<p>{product.description}</p>}
            </Tab>
            <Tab eventKey="characteristics" title="charactéristiques">
              {product.info.length == 0 ? (
                <p>aucun commentaire sur ce produit...</p>
              ) : (
                product.info.map((item) => (
                  <p>
                    <b>{item.title}</b> : {item.description}
                  </p>
                ))
              )}
            </Tab>
            <Tab eventKey="reviews" title="avis">
              {reviews?.length == 0 ? (
                <p>aucun commentaire sur ce produit...</p>
              ) : (
                reviews?.map((rew) => {
                  return (
                    <ReviewUI
                      name_user={rew.review.user.name}
                      family_user={rew.review.user.family}
                      img_user={rew.review.user.img_user}
                      text_review={rew.text_reviews}
                      img_review={rew.img_reviews}
                      description_true={rew.description_true}
                      size_true={rew.size_true}
                      delivery_true={rew.delivery_true}
                      isVk={rew.review.user.isVK}
                      rate={rew.rate}
                      size={rew.size}
                      isGoogle={rew.review.user.isGoogle}
                    />
                  );
                })
              )}
            </Tab>
            <Tab
              eventKey="question"
              title={
                <>
                  Question{" "}
                  {QA?.length != 0 ? (
                    <span className="badge_span">{QA?.length}</span>
                  ) : (
                    ""
                  )}
                </>
              }
            >
              <Row>
                <Col xs={12} md={12} xl={7}>
                  {QA?.length == 0 ? (
                    <p>aucune questions a propos de ce produit...</p>
                  ) : (
                    QA?.map((question) => {
                      return (
                        <>
                          <Container fluid>
                            <Row>
                              <Card className="card_qa p-1">
                                <Card.Body>
                                  <Row className="w-100">
                                    <Col xs={12} md={12}>
                                      <Card className="card_question">
                                        <Card.Header className="d-flex flex-row align-items-center">
                                          {question.question.user.isVk ||
                                          question.question.user.isGoogle ? (
                                            <div
                                              className="avatar_profile"
                                              style={{
                                                backgroundImage: `url(${question.question.user.img_user})`,
                                              }}
                                            ></div>
                                          ) : (
                                            <div
                                              className="avatar_profile"
                                              style={{
                                                backgroundImage: `url(${
                                                  process.env
                                                    .REACT_APP_API_URL +
                                                  question.question.user
                                                    .img_user
                                                })`,
                                              }}
                                            ></div>
                                          )}{" "}
                                          {question.question.user.name}{" "}
                                          {question.question.user.family}
                                        </Card.Header>
                                        <Card.Body className="p-1">
                                          <p className="text">
                                            {question.question.question_text}
                                          </p>
                                        </Card.Body>
                                      </Card>
                                    </Col>
                                    <Col xs={12} md={12}>
                                      <Card className="card_answer">
                                        <Card.Header className="d-flex flex-row align-items-center">
                                          {question.answer.user.isVk ||
                                          question.answer.user.isGoogle ? (
                                            <div
                                              className="avatar_profile"
                                              style={{
                                                backgroundImage: `url(${question.answer.user.img_user})`,
                                              }}
                                            ></div>
                                          ) : (
                                            <div
                                              className="avatar_profile"
                                              style={{
                                                backgroundImage: `url(${
                                                  process.env
                                                    .REACT_APP_API_URL +
                                                  question.answer.user.img_user
                                                })`,
                                              }}
                                            ></div>
                                          )}{" "}
                                          {question.answer.user.name}{" "}
                                          {question.answer.user.family}
                                        </Card.Header>
                                        <Card.Body className="p-1">
                                          <p className="text">
                                            {question.answer.answer_text}
                                          </p>
                                        </Card.Body>
                                      </Card>
                                    </Col>
                                  </Row>
                                </Card.Body>
                              </Card>
                            </Row>
                          </Container>
                        </>
                      );
                    })
                  )}
                </Col>
                <Col
                  xs={12}
                  md={12}
                  xl={5}
                  className="flex align-items-center text-center"
                >
                  <p className="title_add">poser votre question</p>
                  <Image
                    src={
                      process.env.PUBLIC_URL +
                      "/img/productcard/question_sticker.png"
                    }
                    width={250}
                  />
                  <p className="quest_about_text">
                    si vous avez une questions , vous pouvez la posez 
                   en apuyant sur le bouton 'posez votre question' )
                  </p>
                  <Button
                    className="question_btn"
                    onClick={handleShowQuestionModal}
                  >
                    poser votre question au sujet du produit
                  </Button>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="rating" title="note produit">
              <Row>
                <Col xs={7}>
                  <p className="title_add">avis utilisateur </p>
                  <Rating
                    name="size-large"
                    readOnly
                    defaultValue={5}
                    size="large"
                  />
                  <ProgressBar
                    className="mt-2"
                    striped
                    variant="success"
                    now={
                      (reviews?.filter((item) => item.rate == 5).length /
                        reviews?.length) *
                      100
                    }
                  />
                  <Rating
                    name="size-large"
                    readOnly
                    defaultValue={4}
                    size="large"
                  />
                  <ProgressBar
                    className="mt-2"
                    striped
                    variant="info"
                    now={
                      (reviews?.filter((item) => item.rate == 4).length /
                        reviews?.length) *
                      100
                    }
                  />
                  <Rating
                    name="size-large"
                    readOnly
                    defaultValue={3}
                    size="large"
                  />

                  <ProgressBar
                    className="mt-2"
                    striped
                    variant="warning"
                    now={
                      (reviews?.filter((item) => item.rate == 3).length /
                        reviews?.length) *
                      100
                    }
                  />
                  <Rating
                    name="size-large"
                    readOnly
                    defaultValue={2}
                    size="large"
                  />

                  <ProgressBar
                    className="mt-2"
                    striped
                    variant="danger"
                    now={
                      (reviews?.filter((item) => item.rate == 2).length /
                        reviews?.length) *
                      100
                    }
                  />
                  <Rating
                    name="size-large"
                    readOnly
                    defaultValue={1}
                    size="large"
                  />

                  <ProgressBar
                    className="mt-2"
                    striped
                    variant="secondary"
                    now={
                      (reviews?.filter((item) => item.rate == 1).length /
                        reviews?.length) *
                      100
                    }
                  />
                </Col>
                <Col xs={5}>
                  <Row className="d-flex flex-row justify-content-center">
                    <Col className="d-flex flex-row justify-content-center">
                      <Image
                        src={
                          process.env.PUBLIC_URL +
                          "/img/productcard/video-calling.png"
                        }
                        width={250}
                      />
                    </Col>
                  </Row>
                  <Row>
                    {reviews?.length != 0 ? (
                      <p className="quest_about_text text-center">
                        le ratio est de  {Number(product.rating).toFixed(1)}est basé 
                        sur les {reviews?.length} réponse (-е)...
                      </p>
                    ) : (
                      <p className="quest_about_text text-center">
                         utilisateur n'a donné aucune note a ce produit
                      </p>
                    )}
                  </Row>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </Row>
      </Container>

      <QuestionModal
        id_user={user.user.id}
        id_product={id}
        showQuestionModal={showQuestionModal}
        handleCloseQuestionModal={handleCloseQuestionModal}
      />
      <ErrorAuthModalQuestion
        stateModal={showErrorAuthModal}
        handleCloseModal={handleCloseErrorAuthModal}
      />
      <ErrorAddQuestionModal
        stateModal={showErrorModal}
        handleCloseModal={handleCloseErrorModal}
      />

     
      
    </>
  );
});

export default SimpleProduct;
