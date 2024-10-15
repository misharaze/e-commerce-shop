import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form, Image } from "react-bootstrap";
import { createBrand } from "../../http/productAPI";
import { useForm } from "react-hook-form";
import '../../pages/LocationPage/Location.scss'
import { createLocationApi } from "../../http/locationAPI";


const CreateLocation = ({ show, onHide, reRender }) => {
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    watch, reset,
    formState: { errors },
  } = useForm();
  

  const onSubmit = async (data_form) => {
    try {
      const formData = new FormData();
      formData.append("title", data_form.title);
      formData.append("description", data_form.description);
      formData.append("text_address", data_form.text_address);
      formData.append("x_coordination", data_form.x_coordination);
      formData.append("y_coordination", data_form.y_coordination);
      await createLocationApi(formData).then((data) => {
        onHide()
        reRender()
        reset({title: '', description: '', text_address: '', x_coordination: '', y_coordination: ''})
      });
    } catch (e) {
      console.log(e);
    }
    reset({})
  };

  return (
    <Modal show={show} onHide={onHide} centered className="modal_create_location">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          ajouter position
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Control
            placeholder={"rentrer le nom de la position"}
            name="title"
            {...register("title", {
              required: true,
            })}
          />
          {errors.title?.type === "required" && (
            <div className="alert_error_container">
              <p className="alert_error" role="alert_error">
                rentrer le nom!
              </p>
            </div>
          )}
          <Form.Control
            placeholder={"rentrer la description de la position"}
            as="textarea"
            name="description"
            {...register("description", {
              required: true,
            })}
          />
          {errors.description?.type === "required" && (
            <div className="alert_error_container">
              <p className="alert_error" role="alert_error">
                rentrer la description!
              </p>
            </div>
          )}
          <Form.Control
            placeholder={"rentrer l'adresse de la position"}
            name="text_address"
            {...register("text_address", {
              required: true,
            })}
          />
          {errors.text_address?.type === "required" && (
            <div className="alert_error_container">
              <p className="alert_error" role="alert_error">
                rentrer l'adresse!
              </p>
            </div>
          )}
          <Form.Control
            placeholder={"rentrer les coordonées X de la position"}
            name="x_coordination"
            {...register("x_coordination", {
              required: true,
            })}
          />
          {errors.x_coordination?.type === "required" && (
            <div className="alert_error_container">
              <p className="alert_error" role="alert_error">
                renter les coordonées!
              </p>
            </div>
          )}
          <Form.Control
            placeholder={"rentrer les coordonées Y de la position"}
            name="y_coordination"
            {...register("y_coordination", {
              required: true,
            })}
          />
          {errors.y_coordination?.type === "required" && (
            <div className="alert_error_container">
              <p className="alert_error" role="alert_error">
                rentrer les coordonées!
              </p>
            </div>
          )}
          <Button type="submit" variant="outline-success" className="mt-3">
            ajouter
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateLocation;
