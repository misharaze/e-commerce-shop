import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, Row, Col } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { createRules } from "../../http/rulesAPI";
import { useForm } from "react-hook-form";
import "./modal.scss";
import { createCoupon } from "../../http/couponAPI";

const CreateCoupon = observer(({ show, reRender, onHide }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("code", data.code);
    formData.append("discount_percentage", data.discount_percentage);
    createCoupon(formData).then(() => {
      onHide();
      reRender();
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          ajouter un coupon
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Label>rentrer le code du coupon:</Form.Label>
          <Form.Control type="text" {...register("code", { required: true })} />
          {errors.code && (
            <div className="alert_error_container">
              <p className="error_alert" role="error_alert">
                rentrer le code du coupon!
              </p>
            </div>
          )}
          <Form.Label>rentrer le pourcentage de la réduction:</Form.Label>
          <Form.Control
            type="number"
            {...register("discount_percentage", { required: true })}
          />
          {errors.discount_percentage && (
            <div className="alert_error_container">
              <p className="error_alert" role="error_alert">
                rentrer le pourcentage de la réduction!
              </p>
            </div>
          )}
          <Button variant="outline-success" type="submit">
            ajouter
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateCoupon;
