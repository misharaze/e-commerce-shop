import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form, Image } from "react-bootstrap";
import { createBrand } from "../../http/productAPI";
import { useForm } from "react-hook-form";
import "../../pages/LocationPage/Location.scss";
import {
  createLocationApi,
  fetchOneLocations,
  updateLocation,
} from "../../http/locationAPI";

const ChangeLocation = ({ show, onHide, reRender, item }) => {
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchOneLocations(item.id).then((data) => setData(data));
  }, []);

  const {
    register,
    handleSubmit,
    watch,
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
      await updateLocation(item.id, formData).then((data) => {
        onHide();
        reRender();
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className="modal_create_location"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          modifier les paramétres de la localisation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Control
            placeholder={"indiquer le nom de la position"}
            defaultValue={data.title}
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
            defaultValue={data.description}
            name="description"
            as="textarea"
            {...register("description", {
              required: true,
            })}
          />
          {errors.description?.type === "required" && (
            <div className="alert_error_container">
              <p className="alert_error" role="alert_error">
                rentrer la description !
              </p>
            </div>
          )}
          <Form.Control
            placeholder={"rentrer l'adresse de la position"}
            defaultValue={data.text_address}
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
            defaultValue={data.x_coordination}
            name="x_coordination"
            {...register("x_coordination", {
              required: true,
            })}
          />
          {errors.x_coordination?.type === "required" && (
            <div className="alert_error_container">
              <p className="alert_error" role="alert_error">
                rentrer les coordonées!
              </p>
            </div>
          )}
          <Form.Control
            placeholder={"rentrer les coordonées Y de la position"}
            defaultValue={data.y_coordination}
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
          <Button type="submit" variant="outline-secondary" className="mt-3">
            modifier
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ChangeLocation;
