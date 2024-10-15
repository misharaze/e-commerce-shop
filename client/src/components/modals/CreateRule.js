import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, Row, Col } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { createSlider, fetchSlider } from "../../http/sliderAPI";
import { createRules } from "../../http/rulesAPI";

const CreateRule = observer(({ show, reRender, onHide }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const addRules = () => {
    const formData = new FormData();
    formData.append("name_rules", title);
    formData.append("information_rules", text);
    createRules(formData).then((data) => {
      onHide();
      reRender();
      setText("")
      setTitle("")
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          ajouter des régles
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-3"
            placeholder="rentrer le titre du produit"
          />
          <Form.Control
            as="textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-3"
            placeholder="rentrer la description de la régle "
            type="text"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          fermer
        </Button>
        <Button variant="outline-success" onClick={() => addRules()}>
          ajouter
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateRule;
