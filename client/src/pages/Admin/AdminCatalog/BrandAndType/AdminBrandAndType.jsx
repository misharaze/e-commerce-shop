import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Alert,
  Col,
  Container,
  Row,
  Button,
  Accordion,
  Table,
  FormControl,
  Toast,
  Card,
} from "react-bootstrap";
import { AiOutlineMenuFold, AiOutlinePlus } from "react-icons/ai";
import { FaFeather } from "react-icons/fa";
import BrandItemAdmin from "../../../../components/AdminItems/BrandItemAdmin";
import TypeItemAdmin from "../../../../components/AdminItems/TypeItemAdmin";
import CreateBrand from "../../../../components/modals/CreateBrand";
import CreateType from "../../../../components/modals/CreateType";
import SideBar from "../../../../components/UI/AdminSideBar/SideBar";
import { fetchBrands, fetchTypes } from "../../../../http/productAPI";
import "./AdminBrandAndType.scss";

const AdminBrandAndType = () => {
  const [showAlert, setShowAlert] = useState(true);

  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);

  const [brands, setBrands] = useState([]);

  const [rerender, setRerender] = useState(false);

  const [searchBrand, setSearchBrand] = useState("");

  const [types, setTypes] = useState([]);

  const [rerenderTypes, setRerenderTypes] = useState(false);

  const [searchType, setSearchType] = useState("");

  const [showSidebar, setShowSidebar] = useState(false);

  const handleShowSidebar = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  useEffect(() => {
    fetchBrands().then((data) => {
      setBrands(data);
    });
  }, []);

  useEffect(() => {
    fetchTypes().then((data) => {
      setTypes(data);
    });
  }, []);

  //re-render
  useEffect(() => {
    fetchBrands().then((data) => {
      setBrands(data);
    });
  }, [rerender]);

  const reRender = () => {
    setRerender(!rerender);
  };

  //re-render types
  useEffect(() => {
    fetchTypes().then((data) => {
      setTypes(data);
    });
  }, [rerenderTypes]);

  const reRenderTypes = () => {
    setRerenderTypes(!rerenderTypes);
  };

  const filterBrands = brands.rows?.filter((brand) => {
    if (searchBrand) {
      return brand.name.toLowerCase().includes(searchBrand.toLowerCase());
    }
    return brand.name;
  });

  const filterTypes = types.rows?.filter((type) => {
    if (searchType) {
      return type.name.toLowerCase().includes(searchType.toLowerCase());
    }
    return type.name;
  });

  return (
    <>
      <Container className="admin_container">
        <Row className="admin_title">
        <Col xs={12}>
          <Button variant="outline-info" onClick={() => handleShowSidebar()} className="me-2">
          <AiOutlineMenuFold />
        </Button>
        Cabinet de l'administrateur</Col>
        </Row>
        <Row className="admin_subtitle">
          <Col xs={12}>catégories et marques</Col>
        </Row>
        <Row>
          <Col xs={12}>
            {showAlert ? (
              <Alert
                variant="info"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>
                  cette rubriaque est reservé pour les marques et catégorie de chaque produit
                </Alert.Heading>
                <p>ici on peut modifier les marques et categorie de chaque produit:</p>
                <ul>
                  <li>
                    pour créer une marque ou une catégorie, appuye sur le boutton "créer 
                    une marque/catégorie".
                  </li>
                  <li>
                    pour supprimer marques/catégorie ,  choisis la position  dans un tableau 
               approprié et apppuye sur le boutton "suprpimer", confimer la suppression.
                  </li>
                  <li>
                  pour schnager marques/catégorie ,  choisis la position  dans un tableau 
               approprié et apppuye sur le boutton "changer", confimer la changement.
                  </li>
                </ul>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Row>
              <Card
                border="success"
                style={{ marginLeft: 0, marginBottom: 10 }}
              >
                <Card.Body>
                  <Row>
                    <Col
                      xs={2}
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <FaFeather size={40} />
                    </Col>
                    <Col
                      xs={10}
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <p style={{ fontSize: 21, textAlign: "center" }}>
                        nombre de catégories: {types.count}
                      </p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
            <Row>
              <Button
                variant={"outline-success"}
                className="w-100"
                onClick={() => setTypeVisible(true)}
              >
                <AiOutlinePlus />
                ajouter catégories
              </Button>
            </Row>
            <Row>
              <Accordion>
                <Accordion.Item eventKey="" className="mt-4 mb-4">
                  <Accordion.Header>liste de catégories</Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <FormControl
                        type="search"
                        placeholder="chercher la catégorie  grace a son nom"
                        className="me-2"
                        aria-label="Search"
                        onChange={(e) => setSearchType(e.target.value)}
                      />
                    </Row>
                    <Row>
                      <Table striped bordered hover className="mt-4 p-2">
                        <thead>
                          <tr>
                            <th>ID catégorie</th>
                            <th>nom</th>
                            <th>changer</th>
                            <th>supprimer</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filterTypes?.map((elem) => {
                            return (
                              <TypeItemAdmin
                                key={elem.id}
                                id={elem.id}
                                img_now={elem.img}
                                name={elem.name}
                                reRender={reRenderTypes}
                              />
                            );
                          })}
                        </tbody>
                      </Table>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Row>
          </Col>
          <Col xs={6}>
            <Row>
              <Card
                border="success"
                style={{ marginLeft: 0, marginBottom: 10 }}
              >
                <Card.Body>
                  <Row>
                    <Col
                      xs={2}
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <FaFeather size={40} />
                    </Col>
                    <Col
                      xs={10}
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <p style={{ fontSize: 21, textAlign: "center" }}>
                        quantité de marques: {brands.count}
                      </p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
            <Row>
              <Button
                variant={"outline-success"}
                className="w-100"
                onClick={() => setBrandVisible(true)}
              >
                <AiOutlinePlus />
                ajouter marque
              </Button>
            </Row>
            <Row>
              <Accordion>
                <Accordion.Item eventKey="" className="mt-4 mb-4">
                  <Accordion.Header>liste des marques</Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <FormControl
                        type="search"
                        placeholder="chercher la marques grace a son nom"
                        className="me-2"
                        aria-label="Search"
                        onChange={(e) => setSearchBrand(e.target.value)}
                      />
                    </Row>
                    <Row>
                      <Table striped bordered hover className="mt-4 p-2">
                        <thead>
                          <tr>
                            <th>ID marques</th>
                            <th>nom</th>
                            <th>changer</th>
                            <th>supprimer</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filterBrands?.map((elem) => {
                            return (
                              <BrandItemAdmin
                                key={elem.id}
                                id={elem.id}
                                name={elem.name}
                                reRender={reRender}
                                img_now={elem.img}
                              />
                            );
                          })}
                        </tbody>
                      </Table>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Row>

            {/* <Button
              variant={"outline-dark"}
              className="mt-4 p-2 w-100"
              onClick={() => setDeleteTypeBrandVisible(true)}
            >
              Удалить тип/бренд
            </Button> */}
          </Col>
        </Row>
      </Container>

      <CreateBrand
        reRender={reRender}
        show={brandVisible}
        onHide={() => setBrandVisible(false)}
      />
      <CreateType
        reRender={reRenderTypes}
        show={typeVisible}
        onHide={() => setTypeVisible(false)}
      />
      <SideBar show={showSidebar} handleClose={handleCloseSidebar} />
    </>
  );
};

export default AdminBrandAndType;
