import React, { useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  fetchChangeStatusOrder,
  fetchDeleteOrder,
  getOneOrderProducts,
} from "../../http/orderAPI";
import { fetchOneProduct } from "../../http/productAPI";
import { PRODUCT_ROUTE } from "../../utils/consts";
import { jsPDF } from "jspdf";
import { amiriFont } from "../../fonts/amirFont";
import autoTable from "jspdf-autotable";

const OrderItemAdmin = ({
  id,
  complete,
  createdAt,
  updatedAt,
  userId,
  reRender,
}) => {
  const [modalDelete, setShowDelete] = useState(false);
  const [modalStatus, setShowStatus] = useState(false);

  //modal delete
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const deleteOrder = () => {
    fetchDeleteOrder({ id }).then(() => {
      setShowStatus(false);
      setTimeout(() => reRender(), 250);
    });
  };

  //modal status
  const handleCloseStatus = () => setShowStatus(false);
  const handleShowStatus = () => setShowStatus(true);
  const changeStatusOrder = () => {
    fetchChangeStatusOrder({ complete: !complete, id }).then(() => {
      setShowStatus(false);
      setTimeout(() => reRender(), 250);
    });
  };

  //Format date (createdAt)
  const formatDate = (propsDate) => {
    const date = new Date(Date.parse(propsDate));
    const options = {
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      timezone: "UTC",
    };
    return date.toLocaleString("en-US", options);
  };

  const [modalInfo, setShowInfo] = useState(false);
  const [productInfo, setProductInfo] = useState([]);

  //modal delete
  const handleCloseInfo = () => setShowInfo(false);
  const handleShowInfo = () => {
    setShowInfo(true);
  };

  useEffect(() => {
    getOneOrderProducts(id).then((data) => {
      setProductInfo(data);
    });
  }, []);

  const getPDFDocument = () => {
    const doc = new jsPDF();

    doc.addFileToVFS("Amiri-Regular.ttf", amiriFont);
    doc.addFont("Amiri-Regular.ttf", "Amiri", "normal");
    doc.setFont("Amiri");
    doc.setFontSize(16);
    doc.text(`commande N°${id}`, 10, 10);
    doc.setFontSize(12);
    doc.text(`informations sur la commande`, 10, 20);
    doc.setFontSize(9);
    doc.text(`prénom: ${productInfo.detail?.name}`, 10, 30);
    doc.text(`nom de famille: ${productInfo.detail?.family}`, 10, 35);
    doc.text(`numéro de téléphone: ${productInfo.detail?.number_phone}`, 10, 40);
    doc.text(`pays: ${productInfo.detail?.country}`, 10, 45);
    doc.text(`ville: ${productInfo.detail?.city}`, 10, 50);
    doc.text(`rue: ${productInfo.detail?.street}`, 10, 55);
    doc.text(`numero d'immeuble: ${productInfo.detail?.number_home}`, 10, 60);
    doc.text(
      `numéro d'appartement: ${
        productInfo.detail?.number_apartment == null
          ? "-"
          : productInfo.detail?.number_apartment
      }`,
      10,
      65
    );
    doc.text(`code postale: ${productInfo.detail?.zip_code}`, 10, 70);
    doc.setFontSize(12);
    doc.text(`informations sur la commande:`, 100, 20);
    doc.setFontSize(9);
    doc.text(
      `somme total: ${productInfo.detail?.total_price} euros`,
      100,
      30
    );
    doc.text(
      `réduction: ${
        productInfo.detail?.sale == 100 ? 0 : productInfo.detail?.sale
      }%`,
      100,
      35
    );
    doc.text(
      `livraison: ${
        !productInfo.detail?.payment_delivery ? "gratuite" : "payante"
      }`,
      100,
      40
    );

    doc.setFontSize(12);
    doc.text(`liste de produits:`, 10, 90);
    doc.setFontSize(9);

    autoTable(doc, {
      startY: 95,
      styles: {
        font: "Amiri",
        fontStyle: "normal",
      },
      head: [["appelation",  "quantité", "prix"]],
      body: productInfo.prod?.map((item) => {
        return [item.descr.name, item.size, item.count, item.descr.price];
      }),
    });

    doc.save(`Order #${id}`);
  };

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{userId}</td>
        <td>
          <Button variant="outline-primary" onClick={() => handleShowInfo()}>
            informations
          </Button>
        </td>
        <td>{formatDate(createdAt)}</td>
        <td>{complete ? formatDate(updatedAt) : "commande pas terminée"}</td>
        <td>
          {complete ? (
            <Button variant="outline-success" onClick={handleShowStatus}>
              expédier
            </Button>
          ) : (
            <Button variant="outline-danger" onClick={handleShowStatus}>
              en cours de livraison
            </Button>
          )}
        </td>
        <td>
          <Button variant="danger" onClick={handleShowDelete}>
            supprimer
          </Button>
        </td>
      </tr>

      {/*modal confirm change status*/}
      <Modal show={modalStatus} onHide={handleCloseStatus}>
        <Modal.Header closeButton>
          <Modal.Title>confirmer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          vous etes sur de vouloir changer le statut du produit ? (numéro du produit: {id}),
          из {complete ? "'compléter'" : "'en cours'"} sur{" "}
          {complete ? "'en cours'" : "'compléter'"}?
          <br />
          <br />
          Données:
          <ul>
            <li>date de création du produit: {formatDate(createdAt)}</li>
            {complete ? `date de fin: ${formatDate(updatedAt)}` : false}
            <li>Statut: {complete ? "compléter" : `en cours`}</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseStatus}>
            Fermer
          </Button>
          <Button variant="success" onClick={changeStatusOrder}>
            Confirmer
          </Button>
        </Modal.Footer>
      </Modal>

      {/*modal confirm delete order*/}
      <Modal show={modalDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>confirmer cette action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          vous voulez supprimer cette commande (numéro de commande: {id})?
          <br />
          <br />
          Données:
          <ul>
            <li>date de création de la commande: {formatDate(createdAt)}</li>
            {complete ? `comande compléter: ${formatDate(updatedAt)}` : false}
            <li>Статус: {complete ? "compléter" : `en cours`}</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Fermer
          </Button>
          <Button variant="danger" onClick={deleteOrder}>
            Confirmer
          </Button>
        </Modal.Footer>
      </Modal>

      {/*modal confirm delete order*/}
      <Modal
        show={modalInfo}
        onHide={handleCloseInfo}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Informations utiles
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          informations sur la commande (numéro de la commande: {id})
          <hr />
          <Row className="ml-1">
            <Col>
              <Row>
                somme totale: {productInfo.detail?.total_price} euros
              </Row>
              <Row>
                livraison:{" "}
                {!productInfo.detail?.payment_delivery
                  ? "gratuite"
                  : "payante"}
              </Row>
              <Row>
                réduction:{" "}
                {productInfo.detail?.sale == 100 ? 0 : productInfo.detail?.sale}
                %
              </Row>
              <Row></Row>
              <Row></Row>
            </Col>
          </Row>
          <hr />
          <Row className="ml-1">
            <Col>
              <Row>prénom: {productInfo.detail?.name}</Row>
              <Row>nom de famille: {productInfo.detail?.family}</Row>
              <Row>numéro de téléphone: {productInfo.detail?.number_phone}</Row>
              <Row>pays: {productInfo.detail?.country}</Row>
              <Row> ville: {productInfo.detail?.city}</Row>
              <Row>rue: {productInfo.detail?.street}</Row>
              <Row>numéro d'immeuble: {productInfo.detail?.number_home}</Row>
              <Row>
                numéro d'appartement:{" "}
                {productInfo.detail?.number_apartment == null
                  ? "-"
                  : productInfo.detail?.number_apartment}
              </Row>
              <Row>code postale: {productInfo.detail?.zip_code}</Row>
            </Col>
          </Row>
          <hr />
          {productInfo.prod?.map((item) => {
            return (
              <Card className="mt-2" style={{ boxShadow: "none" }}>
                <Row>
                  <Col md={2}>
                    <img
                      style={{ width: "100%" }}
                      src={process.env.REACT_APP_API_URL + item.descr.imgMain}
                      alt=""
                    />
                  </Col>
                  <Col className="d-flex align-items-center">
                    <ul style={{ listStyle: "none" }}>
                      <li>code du produit: {item.descr.id}</li>
                      <li>
                        nom du produit:{" "}
                        <Link to={PRODUCT_ROUTE + "/" + item.descr.id}>
                          {" "}
                          {item.descr.name}{" "}
                        </Link>
                      </li>
                      <li>prix produit: {item.descr.price} euros</li>
                      <li>quantité: {item.count}</li>
                      </ul>
                  </Col>
                  <Col className="d-flex justify-content-center align-items-center"></Col>
                </Row>
              </Card>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => getPDFDocument()}>
            importer en format .PDF
          </Button>
          <Button variant="secondary" onClick={handleCloseInfo}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default OrderItemAdmin;
