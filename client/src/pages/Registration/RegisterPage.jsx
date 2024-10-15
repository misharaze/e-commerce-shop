/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import "./RegisterPage.scss";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import { Formik } from "formik";
import { Context } from "../..";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, SHOP_ROUTE } from "../../utils/consts";
import { registration } from "../../http/userAPI";
import { Card, Col, Container, FloatingLabel, Row } from "react-bootstrap";
import { AiFillGoogleCircle } from "react-icons/ai";
import {  social_Google_auth } from "../../http/userAPI";
function Register() {
  const { user } = useContext(Context);
  const location = useLocation();
  const history = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  window.gapi.load("auth2", function () {
    window.gapi.auth2.init({
      client_id:
        "959674891521-9lrj5b087uh2lb0jr1umc5s17juas9d2.apps.googleusercontent.com",
      plugin_name: "naturalia.com",
    });
  });


  const GoogleAuthClick = () => {
    const auth2 = window.gapi.auth2?.getAuthInstance();
    auth2?.signIn({ prompt: "consent" }).then((googleUser) => {
      const profile = googleUser.getBasicProfile();
      // console.log(profile);
      console.log("ID: " + profile.getId());
      // console.log("Full Name: " + profile.getName());
      // console.log("Given Name: " + profile.getGivenName());
      // console.log("Family Name: " + profile.getFamilyName());
      // console.log("Image URL: " + profile.getImageUrl());
      // console.log("Email: " + profile.getEmail());
      // const id_token = googleUser.getAuthResponse().id_token;
      // console.log("ID Token: " + id_token);

      try {
        let email = profile.getEmail();
        let password = profile.getId() + "google";
        let name = profile.getGivenName();
        let family = profile.getFamilyName();
        let allowSpam = false;
        let id_social = profile.getId() + "";
        let img_user = profile.getImageUrl();

        let data = social_Google_auth(
          email,
          password,
          name,
          family,
          allowSpam,
          id_social,
          img_user
        ).then((data) => {
          user.setUser(user);
          user.setIsAuth(true);
          window.location.href = SHOP_ROUTE;
        });
      } catch (e) {
        setErrorMessage(e.response.data.message);
        setShowToast(true);
      }
    });
  };

  const schema = yup.object().shape({
    name: yup.string().required("entrer votre prénom!"),
    lastName: yup.string().required("entrer votre nom de famille!"),
    date: yup.string().required("entrer votre année de naissance "),
    gender: yup.string().required("renseigner votre genre!"),
    email: yup
      .string()
      .required("entrer votre email!")
      .email("entrer une adresse email valide!"),
    password: yup
      .string()
      .required("entrer votre mot de passe!")
      .min(5, "mot de passe trop court !")
      .max(30, "mot de passe trop longs!"),
    phone: yup.string().required("entrer votre numéro de téléphone!"),
    allowSpam: yup.bool(),
    confidential: yup.bool().required().oneOf([true], "confirmer vos données !"),
  });

  return (
    <>
      <Container className="reg_container">
        <Row>
          <Col xs={12}>
            <Card className="reg_card">
              <Formik
                validationSchema={schema}
                enableReinitialize={true}
                validateOnBlur={false}
                onSubmit={(values) => {
                  if (
                    // eslint-disable-next-line eqeqeq
                    values.email != "" &&
                    values.password != "" &&
                    values.name != "" &&
                    values.lastName != "" &&
                    values.date != "" &&
                    values.phone != ""
                  ) {
                    try {
                      let data;
                      data = registration(
                        values.email,
                        values.password,
                        values.name,
                        values.lastName,
                        values.date,
                        values.phone,
                        values.gender,
                        values.allowSpam
                      ).then(() => {
                        user.setUser(user);
                        user.setIsAuth(true);
                        history(SHOP_ROUTE);
                      });
                    } catch (e) {
                      alert(e.response.data.message);
                    }
                  }
                }}
                initialValues={{
                  email: "",
                  password: "",
                  name: "",
                  lastName: "",
                  date: "",
                  gender: true,
                  phone: "",
                  allowSpam: false,
                  confidential: false,
                }}
              >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Row
                      className="d-flex justify-center w-100"
                      style={{ "--bs-gutter-x": 0 }}
                    >
                      <Col
                        lg={7}
                        xl={7}
                        xxl={7}
                        className="reg_card_left d-none d-lg-flex"
                      >
                        <Row className="img_row h-100 w-100">
                          <Col className="img_col h-100 w-100">
                            <p className="register_text">
                              rejoigner notre communauté
                            </p>
                          </Col>
                        </Row>
                      </Col>
                      <Col
                        xs={12}
                        sm={12}
                        md={12}
                        lg={5}
                        xl={5}
                        xxl={5}
                        className="reg_card_right flex-column pr-5 pl-5"
                      >
                        <Row>
                          <Col>
                            <p className="title">
                              Créer un compte chez{" "}
                              <span className="name_shop">
                                NATURALIA
                               </span>
                            </p>
                          </Col>
                        </Row>
                        <Row className="d-flex flex-row justify-center w-100 mb-3">
                          <Col xs={12} md={12}>
                            <Button className="auth_google_btn"
                            onClick={() => GoogleAuthClick()}>
                              <AiFillGoogleCircle /> Google
                            </Button>
                          </Col>
                          <Col>
                          
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <p className="sub_text">
                              rentrer toutes les informations pour pouvoir créer un compte  :)
                            </p>
                          </Col>
                        </Row>
                        <Row>
                          <p className="title_form">informations personnel</p>
                        </Row>
                        <Row>
                          <FloatingLabel controlId="floatingInputq" label="prénom">
                            <Form.Control
                              type="text"
                              className="reg_card_input"
                              placeholder="jean"
                              name="name"
                              value={values.name}
                              onChange={handleChange}
                              isValid={touched.name && !errors.name}
                              isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                              {errors.name}
                            </Form.Control.Feedback>
                          </FloatingLabel>

                          <FloatingLabel
                            controlId="floatingInputw"
                            label="nom de famille"
                          >
                            <Form.Control
                              type="text"
                              name="lastName"
                              className="reg_card_input"
                              placeholder="gérard"
                              value={values.lastName}
                              onChange={handleChange}
                              isValid={touched.lastName && !errors.lastName}
                              isInvalid={!!errors.lastName}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                              {errors.lastName}
                            </Form.Control.Feedback>
                          </FloatingLabel>

                          <FloatingLabel
                            controlId="floatingInpute"
                            label="date de naissance "
                          >
                            <Form.Control
                              type="date"
                              name="date"
                              className="reg_card_input"
                              placeholder="02.06.1999"
                              value={values.date}
                              onChange={handleChange}
                              isValid={touched.date && !errors.date}
                              isInvalid={!!errors.date}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                              {errors.date}
                            </Form.Control.Feedback>
                          </FloatingLabel>

                          <FloatingLabel controlId="floatingInputr" label="genre">
                            <Form.Select
                              required
                              name="gender"
                              onChange={handleChange}
                              aria-label="Default select example"
                              isValid={touched.gender && !errors.gender}
                              isInvalid={!!errors.gender}
                            >
                              <option value={true}>masculin</option>
                              <option value={false}>féminin</option>
                            </Form.Select>
                          </FloatingLabel>
                        </Row>
                        <Row>
                          {" "}
                          <p className="title_form">
                            informations pour rentrer sur votre compte
                          </p>
                        </Row>
                        <Row>
                          <FloatingLabel
                            controlId="floatingInputt"
                            label="email"
                          >
                            <Form.Control
                              type="mail"
                              name="email"
                              className="reg_card_input"
                              placeholder="jean@hotmail.com"
                              value={values.email}
                              onChange={handleChange}
                              isValid={touched.email && !errors.email}
                              isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                              {errors.email}
                            </Form.Control.Feedback>
                          </FloatingLabel>

                          <FloatingLabel
                            controlId="floatingInputy"
                            label="mot de passe"
                          >
                            <Form.Control
                              name="password"
                              type="password"
                              className="reg_card_input"
                              placeholder="*********"
                              value={values.password}
                              onChange={handleChange}
                              isValid={touched.password && !errors.password}
                              isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                              {errors.password}
                            </Form.Control.Feedback>
                          </FloatingLabel>

                          <FloatingLabel
                            controlId="floatingInputu"
                            label="numéro de téléphone"
                          >
                            <Form.Control
                              name="phone"
                              type="tel"
                              className="reg_card_input"
                              placeholder="89999993737"
                              value={values.phone}
                              onChange={handleChange}
                              isValid={touched.phone && !errors.phone}
                              isInvalid={!!errors.phone}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                              {errors.phone}
                            </Form.Control.Feedback>
                          </FloatingLabel>
                        </Row>
                        <Row className="mt-3">
                          <Form.Group>
                            <Form.Check
                              required
                              inline
                              label="* je suis d'accord avec la politque de confidentialité"
                              name="confidentiel"
                              onChange={handleChange}
                              isValid={
                                touched.confidential && !errors.confidential
                              }
                              isInvalid={!!errors.confidential}
                            />
                          </Form.Group>

                          <Form.Group>
                            <Form.Check
                              inline
                              label="je veux m'abonner à la newsletter"
                              name="allowSpam"
                              checked={values.allowSpam}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Row>
                        <Row className="d-flex justify-content-center mt-3">
                          <Button type="submit" className="register_btn">
                       
                            Créer un compte
                            </Button>
                        
                        </Row>
                        
                        <Row className="d-flex justify-content-center mt-3">
                          <Link className="remove_login" to={LOGIN_ROUTE}>
                            vous avez deja un compte...
                          </Link>
                        </Row>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;
