import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Context } from "../..";
import { changePassword, checkResetPasswordToken } from "../../http/userAPI";
import { LOGIN_ROUTE, SHOP_ROUTE } from "../../utils/consts";
import passwordHandler from '../../pages/Auth/Auth'
import "./ForgotPassword.scss";

export default function ForgotPasswordIndividualPage() {
  
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useContext(Context);
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data_form) => {
    try {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("password", data_form.password);
      await changePassword(formData).then((data) => {
        window.location.href = LOGIN_ROUTE;
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const formData = new FormData();
    formData.append("token", token);
    checkResetPasswordToken(formData).then((data) => {
      if (data && !user.isAuth) {
        setLoading(false);
      } else {
        window.location.href = SHOP_ROUTE;
      }
    });
  }, []);

  if (loading) {
    return (
      <div
        style={{ height: "100vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <h1 className="spinner__text">vous y etes presque...</h1>
        <Spinner animation="border" variant="danger" />
      </div>
    );
  } else {
    return (
      <>
        <Container className="forgot_container">
          <Row className="d-flex flex-row justify-content-center align-items-center mt-5">
            <Col xs={6}>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-3">
                  <FloatingLabel
                    controlId="floatingPassword1"
                    className="label_form"
                    label="mot de passe"
                    defaultValue=""
                  >
                    <Form.Control
                      className="auth_card_input"
                      type="password"
                      placeholder="*******"
                      
                       defaultValue={password}
                       onChange={(e) => passwordHandler(e)}
                      {...register("password", { required: true })}
                    />
                  </FloatingLabel>
                  {errors.password?.type === "required" && (
                    <div className="alert_error_container">
                      <p className="alert_error" role="alert">
                        rentrer votre mot de passe !
                      </p>
                    </div>
                  )}
                </Row>
                <Row className="mb-3">
                  <FloatingLabel
                    controlId="floatingPassword2"
                    className="label_form"
                    label="rerentrer votre mot de passe "
                  >
                    <Form.Control
                      className="auth_card_input"
                      
                      type='password' 
                      placeholder="*******"
                      defaultValue={password}
                      
                       onChange={(e) => passwordHandler(e)}
                      {...register("confirm_password", {
                        required: true,
                        validate: (val) => {
                          if (watch("password") !== val) {
                            return "Your passwords do no match";
                          }
                        },
                      })}
                    />
                  </FloatingLabel>
                  {errors.confirm_password?.type === "required" && (
                    <div className="alert_error_container">
                      <p className="alert_error" role="alert">
                      rentrer votre mot de passe!
                      </p>
                    </div>
                  )}
                  {errors.confirm_password?.type === "validate" && (
                    <div className="alert_error_container">
                      <p className="alert_error" role="alert">
                        les mots de passes ne correspondent pas  !
                      </p>
                    </div>
                  )}
                </Row>
                <Col className="d-flex flex-row justify-content-center align-items-center">
                  <Button className="login_btn" type="submit">
                    changer son mot de passe 
                  </Button>
                </Col>
              </Form>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
