import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form, Image } from "react-bootstrap";
import { createBrand } from "../../http/productAPI";

const CreateBrand = ({ show, onHide, reRender }) => {
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addBrand = () => {
    const formData = new FormData();
    formData.append("name", value);
    formData.append("img", file);
    createBrand(formData).then((data) => {
      setValue("");
      onHide();
      reRender();
    });
  };
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          ajouter une marque
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"rentrer le nom de la marque"}
          />
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
        </Form>
        {file ? <Image src={URL.createObjectURL(file)} width={150} /> : ""}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          fermer
        </Button>
        <Button variant="outline-success" onClick={addBrand}>
          ajouter
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateBrand;
