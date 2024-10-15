import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Accordion,
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import { AiOutlineMenuFold } from "react-icons/ai";
import ProductItemAdmin from "../../../../components/AdminItems/productItemAdmin";
import CreateProduct from "../../../../components/modals/CreateProduct";
import SideBar from "../../../../components/UI/AdminSideBar/SideBar";
import { fetchProductsForAdmin } from "../../../../http/productAPI";
import "./AdminProduct.scss";

const AdminProduct = () => {
  const [showAlert, setShowAlert] = useState(true);

  const [showSidebar, setShowSidebar] = useState(false);

  const [stateAccordion, setStateAccordion] = useState(false);
  const [productVisible, setProductVisible] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [productData, setProductData] = useState([]);

  const handleShowSidebar = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  useEffect(() => {
    fetchProductsForAdmin().then((data) => {
      setProductData(data.rows);
      setCountProducts(data.rows.length)
    });
  }, []);

  useEffect(() => {
    fetchProductsForAdmin().then((data) => {
      setProductData(data.rows);
      setCountProducts(data.rows.length)
    });
  }, []);

  // useEffect(() => {
  //   fetchProductsForAdmin({
  //     page: currentPageProduct,
  //     limit: limitProduct,
  //   }).then((data) => {
  //     setProductData(data.rows);
  //   });
  // }, [currentPageProduct]);

  const filteredProduct = productData.filter((prod) => {
    if (searchValue) {
      return prod.name.toLowerCase().includes(searchValue.toLowerCase());
    }
    return prod.name;
  });

  const [rerenderProduct, setRerenderProduct] = useState(false);

  useEffect(() => {
    fetchProductsForAdmin().then((data) => {
      setProductData(data.rows);
      setCountProducts(data.rows.length)
    });
  }, [rerenderProduct]);

  const reRenderProduct = () => {
    setRerenderProduct(!rerenderProduct);
  };

  //Product pagination
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(6);
  const lastProductIndex = currentPage * productPerPage;
  const firstProductIndex = lastProductIndex - productPerPage;
  const [countProducts, setCountProducts] = useState(productData.length);
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(countProducts / productPerPage); i++) {
    pageNumber.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Container className="admin_container">
        <Row className="admin_title">
          <Col xs={12}>
            <Button
              variant="outline-primary"
              onClick={() => handleShowSidebar()}
              className="me-2"
            >
              <AiOutlineMenuFold />
            </Button>
            cabinet de l'administrateur
          </Col>
        </Row>
        <Row className="admin_subtitle">
          <Col xs={12}>rubrique "produit"</Col>
        </Row>
        <Row>
          <Col xs={12}>
            {showAlert ? (
              <Alert
                variant="primary"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>
                 cette rubrqiue est destiné a la création suppresion et changement d'un produit
                </Alert.Heading>
                <p>ici on peux modifier tout ce qui concerne les produits :</p>
                <ul>
                  <li>pour créer un produit, appuye sur le bouton "creér un produit".</li>
                  <li>
                    pour supprimer un produit , pour supprimer un produit , choisissez le tabeau 
                    approprier et appuyer sur le boutton "supprimer " confimer la surppresion.
                  </li>
                  <li>
                  pour chnager un produit , pour changer un produit , choisissez le tableau
                    approprier et appuyer sur le boutton "changer " confimer la surppresion.
                  </li>
                  <li>
                    pour changer les images sur la pages principal des produits, 
                    choisissez la position exacte du  tableau
                    et appuyer sur le boutton "changer l'image " confimer le changement .
                  </li>
                </ul>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Button
              variant={"outline-dark"}
              className="mt-4 p-2 w-100"
              onClick={() => setProductVisible(true)}
            >
              ajouter produit
            </Button>
            <Accordion>
              <Accordion.Item
                eventKey=""
                className="mt-4 mb-4"
                onClick={() => setStateAccordion(true)}
              >
                <AccordionHeader>liste de produit</AccordionHeader>
                <AccordionBody>
                  <Form className="d-flex">
                    <FormControl
                      type="search"
                      placeholder="recherche de produit grace à son nom"
                      className="me-2"
                      aria-label="Search"
                      onChange={(e) => setSearchValue(e.target.value)}
                      // value={searchDevice}
                      // onChange={e => setSearchDevice(e.target.value)}
                    />
                  </Form>
                  <Table striped bordered hover className="mt-4 p-2">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>nom</th>
                        <th>prix</th>
                        <th>rating</th>
                        <th>image principal</th>
                        <th>jour de l'ajout</th>
                        <th>supprimer</th>
                        <th>changer</th>
                       </tr>
                    </thead>
                    <tbody>
                      {filteredProduct.slice(firstProductIndex, lastProductIndex).map((productItem) => (
                        <ProductItemAdmin
                          productItem={productItem}
                          reRenderProduct={reRenderProduct}
                        />
                      ))}
                    </tbody>
                  </Table>
                  <Pagination className="mt-3">
                    {pageNumber.map((page) => (
                      <Pagination.Item
                        key={page}
                        active={currentPage === page}
                        onClick={() => paginate(page)}
                      >
                        {page}
                      </Pagination.Item>
                    ))}
                  </Pagination>
                </AccordionBody>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>

      <SideBar show={showSidebar} handleClose={handleCloseSidebar} />

      <CreateProduct
        show={productVisible}
        onHide={() => setProductVisible(false)}
        reRenderProduct={reRenderProduct}
      />
    </>
  );
};
export default AdminProduct;
