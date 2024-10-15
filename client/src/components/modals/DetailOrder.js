import React from "react";
import { Button, Col, Image, Modal, Row, Table } from "react-bootstrap";

const DetailsOrder = ({ show, handleClose, detail }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>information sur la commande N°{detail?.orderId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Row className="ml-1">
              <h4 className="p-0">infomrations principal sur la commande</h4>
              <Col>
                <Row>prix total de la commande: {detail?.total_price} рублей</Row>
                <Row>
                  livraison:{" "}
                  {!detail?.payment_delivery ? "gratuite" : "payante"}
                </Row>
                <Row>Скидка: {detail?.sale == 100 ? 0 : detail?.sale}%</Row>
                <Row></Row>
                <Row></Row>
              </Col>
            </Row>
            <hr />

            <Row className="ml-1">
              <h4 className="p-0">informations sur le client</h4>

              <Col>
                <Row>Имя: {detail?.name}</Row>
                <Row>Фамилия: {detail?.family}</Row>
                <Row>Номер телефона: {detail?.number_phone}</Row>
                <Row>Страна: {detail?.country}</Row>
                <Row>Город: {detail?.city}</Row>
                <Row>Улица: {detail?.street}</Row>
                <Row>Номер дома: {detail?.number_home}</Row>
                <Row>
                  Номер квартиры:{" "}
                  {detail?.number_apartment == null
                    ? "-"
                    : detail?.number_apartment}
                </Row>
                <Row>Почтовый индекс: {detail?.zip_code}</Row>
              </Col>
            </Row>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => handleClose()}>
            fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default DetailsOrder;
