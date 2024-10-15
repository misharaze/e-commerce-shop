import React from "react";
import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Modal,
  Row,
  Form,
  Table,
} from "react-bootstrap";
import { AiFillFileExcel, AiOutlineDownload, AiOutlineMenuFold } from "react-icons/ai";
import SideBar from "../../../../components/UI/AdminSideBar/SideBar";
import {
  fetchBrandExcel,
  fetchOrderExcel,
  fetchProductExcel,
  fetchTypeExcel,
  fetchUserExcel,
} from "../../../../http/excelAPI";
import { createMoreProduct } from "../../../../http/productAPI";
import "./AdminDocument.scss";
import * as XLSX from "xlsx";
import ExcelItemAdmin from "../../../../components/AdminItems/ExcelItemAdmin";
import { Link } from "react-router-dom";

const AdminDocument = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const [showAlert, setShowAlert] = useState(true);

  const handleShowSidebar = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [showModalUpload, setShowModalUpload] = useState(false);
  const handleCloseModalUpload = () => setShowModalUpload(false);
  const handleShowModalUpload = () => setShowModalUpload(true);

  const [file, setFile] = useState(null);
  const selectFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = (e) => {
        setFile(null);
        setFile(e.target.result);
      };
    }
  };

  const [excelData, setExcelData] = useState(null);

  const getExcelData = () => {
    if (file) {
      const workbook = XLSX.read(file, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
    }
  };

  const uploadInDatabase = () => {
    createMoreProduct(excelData).then((data) => handleCloseModalUpload());
  };

  const getProductData = () => {
    fetchProductExcel().then((data) => {
      data.rows.forEach(function (element) {
        element.brand = element.product_brand?.name;
        element.type = element.product_type?.name;
        delete element.product_brand;
        delete element.product_type;
      });

      if (data) {
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(data.rows);
        XLSX.utils.book_append_sheet(wb, ws, "Product");
        XLSX.writeFile(wb, "ProductExcel.xlsx");
      }
    });
  };

  const getBrandData = () => {
    fetchBrandExcel().then((data) => {
      if (data) {
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "Brands");
        XLSX.writeFile(wb, "BrandExcel.xlsx");
      }
    });
  };

  const getUserData = () => {
    fetchUserExcel().then((data) => {
      if (data) {
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "User");
        XLSX.writeFile(wb, "UserExcel.xlsx");
      }
    });
  };

  const getTypeData = () => {
    fetchTypeExcel().then((data) => {
      if (data) {
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "Types");
        XLSX.writeFile(wb, "TypeExcel.xlsx");
      }
    });
  };

  const getOrderData = (complete) => {
    fetchOrderExcel({ complete: complete }).then((data) => {
      var all_data = [];

      data.rows.forEach(function (element) {
        var this_obj = {};
        this_obj = { ...element };

        element.order_products.forEach(function (in_obj) {
          let temp_obj = {};
          temp_obj = in_obj;
          this_obj = Object.assign({}, this_obj, { ...temp_obj });
          delete this_obj.order_products;
          all_data.push(this_obj);
        });
      });

      all_data.forEach(function (data) {
        data.status_livraison = data.status_commande ? "terminer" : "en cours";
        data.id_utilisateur = data.user.prénom + " " + data.user.nom_de_famille;
        delete data.user;
        delete data.ID;
        data.nom_du_produit = data.product.nom_du_produit;
        data.marque = data.product.product_brand.name;
        data.type = data.product.product_type.name;
        data.prix_produit = data.product.prix_produit;
        data.quantité_produit = data.quantité_produit;
        data.somme_total =
          Number(data.prix_produit) * Number(data.quantité_produit);
        delete data.status_commande;
        delete data.product;
      });

      if (data && all_data) {
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(all_data);
        XLSX.utils.book_append_sheet(wb, ws, "Orders");
        XLSX.writeFile(wb, "OrdersExcel.xlsx");
      }
    });
  };

  const downloadPatternProduct = () => {
    let data = [
      {
        name: "",
        price: "",
        productBrandId: "",
        productTypeId: "",
        description: "",
      },
    ];
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Product");
    XLSX.writeFile(wb, "ProductPattern.xlsx");
  };

  return (
    <>
      <Container className="admin_container">
        <Row className="admin_title">
          <Col xs={12}>
            <Button
              variant="success"
              onClick={() => handleShowSidebar()}
              className="me-2"
            >
              <AiOutlineMenuFold />
            </Button>
            cabinet de l'administrateur
          </Col>
        </Row>
        <Row className="admin_subtitle">
          <Col xs={12}>rubrique "documents"</Col>
        </Row>
        <Row>
          <Col xs={12}>
            {showAlert ? (
              <Alert
                variant="success"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>
                  cette rubrique est detinée a travailler avec les documents
                </Alert.Heading>
                <p>
                  ici tu peux obtenir les données en format .xlsx:
                </p>
                <ul>
                  <li>
                    rendez vous sur le tableau souhaiter et ensuit dans
                     la rubrique souhaiter
                    
                  </li>
                  <li>
                    si vous voulez charger des données, lisez la description et
                    appuyer sur le boutton "obtenir des informations sur..."
                  </li>
                  <li>
                    si vous voulez charger des données, lisez la description et,
                    télécharger le format souhaiter de document souhaiter, remplissez le  
                    et charger dans la fenetre qui va s'ouvrir .
                  </li>
                </ul>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Button
                    className="w-100"
                    variant="success"
                    onClick={() => getProductData()}
                  >
                    <AiFillFileExcel />
                    obtenir les informations sur les produits 
                  </Button>
                </td>
                <td>
                 vous pouvez obtenir une informations sur tout les produit, qui sont presenté sur la 
                 page du magasin afin d'effectuer des modifcations.
                </td>
              </tr>
              <tr>
                <td>
                  <Button
                    className="w-100"
                    variant="success"
                    onClick={handleShowModalUpload}
                  >
                    charger les informations sur les produits
                  </Button>
                </td>
                <td>
              vous pouvez charger les informations sur les produits grace au fichier en format
                  xlsx. pour ca:
                  <ol>
                    <li>
                      telecharger un fichier en format  .xlsx{" "}
                      <Button variant="success" onClick={() => downloadPatternProduct()}>
                      <AiOutlineDownload />
                      </Button>
                      .
                    </li>
                    <li>rentrer les paramétres des produits .</li>
                    <li>
                      appuyer sur le boutton telecharger les données de chaque produit et charger les 
                      garce au format .xlsx.
                    </li>
                    <li>
                       rend toi sur la page "produit" et
                      charge les paramétres manquant pour le produit en question .
                    </li>
                    <li>
                     montrer l'image du produit sur la page  "produit" et le produit s'affichera sur la page principal.
                    </li>
                  </ol>
                </td>
              </tr>
              <tr>
                <td>
                  <Button
                    className="w-100"
                    variant="success"
                    onClick={() => getUserData()}
                  >
                    <AiFillFileExcel />
                    obtenir informations sur l'utilisateur
                  </Button>
                </td>
                <td>
                 vous pouvez obtenir des informations sur tout les utilisateurs, qui sont inscrit sur le site.
                </td>
              </tr>
              <tr>
                <td>
                  <Button
                    className="w-100"
                    variant="success"
                    onClick={() => getTypeData()}
                  >
                    <AiFillFileExcel />
                   obtenir informations sur les catégories
                  </Button>
                </td>
                <td>
                  {" "}
                 vous pouvez obtneir les informations sur tout les catégorie de chaque produit , qui sont
                  presenter sur la page du site.
                </td>
              </tr>
              <tr>
                <td>
                  <Button
                    className="w-100"
                    variant="success"
                    onClick={() => getBrandData()}
                  >
                    <AiFillFileExcel />
                  obtneir informations sur les marques 
                  </Button>
                </td>
                <td>
                vous pouvez obtneir les informations sur tout les marques de chaque produit , qui sont
                  presenter sur la page du site.
                </td>
              </tr>
              <tr>
                <td>
                  <Button
                    className="w-100"
                    variant="success"
                    onClick={handleShowModal}
                  >
                    <AiFillFileExcel />
                    obtenir informations sur les commandes 
                  </Button>
                </td>
                <td>
                  {" "}
                 vous obtneir les détails de chaques commande faite sur le site 
                 pour cela:
                  <ol>
                    <li>appuyer sur le boutton "obtenir informations sur la commande ".</li>
                    <li>choisir le statut de la commande, qui vous intéresse.</li>
                  </ol>
                </td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>

      <SideBar show={showSidebar} handleClose={handleCloseSidebar} />

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            choisir  le statut de la commande
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button className="mr-2" onClick={() => getOrderData("all")}>
            Все
          </Button>
          <Button className="mr-2" onClick={() => getOrderData("completed")}>
            terminés
          </Button>
          <Button
            className="mr-2"
            onClick={() => getOrderData("not-completed")}
          >
            non termines 'en cours'
          </Button>
        </Modal.Body>
      </Modal>

      <Modal
        show={showModalUpload}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleCloseModalUpload}
      >
        <Modal.Header closeButton>
          <Modal.Title>import de donnnées</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          charger un fichier en format  XLSX ou XLS:
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
          <br />
          {!excelData ? (
            <div>pas de données </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">nom</th>
                    <th scope="col">prix</th>
                    <th scope="col">description</th>
                    <th scope="col">ID marques</th>
                    <th scope="col">ID catégorie</th>
                  </tr>
                </thead>
                <tbody>
                  <ExcelItemAdmin excelData={excelData} />
                </tbody>
              </table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => getExcelData()}>
            afficher les données 
          </Button>
          <Button
            onClick={() => uploadInDatabase()}
            variant="success"
            disabled={excelData != null ? false : true}
          >
            charger les donnnées
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AdminDocument;
