import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Accordion,
  Alert,
  Button,
  Col,
  Container,
  Dropdown,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import { AiOutlineMenuFold } from "react-icons/ai";
import QuestionItemAdmin from "../../../../components/AdminItems/QuestionItemAdmin";
import SideBar from "../../../../components/UI/AdminSideBar/SideBar";
import { fetchQuestion } from "../../../../http/questionAPI";

const AdminQuestion = () => {
  const [showAlert, setShowAlert] = useState(true);

  const [showSidebar, setShowSidebar] = useState(false);
  const [stateAccordion, setStateAccordion] = useState(false);

  const handleShowSidebar = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  const [questions, setQuestions] = useState([]);
  const [currentPageQuestion, setCurrentPageQuestion] = useState(1);
  const [countQuestion, setCountQuestion] = useState(0);
  const [filterQuestion, setFilterQuestion] = useState("all");
  const [rerenderQuestions, setRerenderQuestion] = useState(false);

  //Question pagination
  const limitQuestion = 5;
  const pageCountQuestion = Math.ceil(Number(countQuestion) / limitQuestion);
  const pagesQuestion = [];

  useEffect(() => {
    fetchQuestion({ limit: limitQuestion, page: 1 }).then((data) => {
      setQuestions(data);
      setCountQuestion(data.count);
    });
  }, []);

  useEffect(() => {
    fetchQuestion({ limit: limitQuestion, page: 1 }).then((data) => {
      setQuestions(data);
      setCountQuestion(data.count);
    });
  }, []);

  useEffect(() => {
    fetchQuestion({ limit: limitQuestion, page: currentPageQuestion }).then(
      (data) => {
        setQuestions(data);
      }
    );
  }, [currentPageQuestion]);

  useEffect(() => {
    fetchQuestion({
      limit: limitQuestion,
      page: 1,
      complete: filterQuestion,
    }).then((data) => {
      setQuestions(data);
      setCountQuestion(data.count);
      setCurrentPageQuestion(1);
      console.log(data);
    });
  }, [filterQuestion]);

  //re-render after change status, or delete some order
  useEffect(() => {
    fetchQuestion({
      limit: limitQuestion,
      page: currentPageQuestion,
      complete: filterQuestion,
    }).then((data) => {
      setQuestions(data);
      setCountQuestion(data.count);
      setCurrentPageQuestion(1);
    });
  }, [rerenderQuestions]);

  const reRenderQuestion = () => {
    setRerenderQuestion(!rerenderQuestions);
  };

  //Question pagination
  for (
    let numberQuestion = 1;
    numberQuestion < pageCountQuestion + 1;
    numberQuestion++
  ) {
    pagesQuestion.push(
      <Pagination.Item
        key={numberQuestion}
        active={numberQuestion === currentPageQuestion}
        onClick={() => setCurrentPageQuestion(numberQuestion)}
      >
        {numberQuestion}
      </Pagination.Item>
    );
  }

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
          <Col xs={12}>rubrique "question"</Col>
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
                  cette rubrique concerne les questions poser par les utilisateurs
                </Alert.Heading>
                <p>ici tu peux consulter les questions :</p>
                <ul>
                  <li> si la question n'est pas en adéquation  avec le théme ou  contient des insultes ou autre divagations ,
                    alors on peut la supprimer , en appuyant sur le boutton "supprimer" dans 
                    la ligne qui correspond à la question .
                  </li>
                  <li>
                    si il est nécessaire de changer la réponse à la question  , alors appuyer sur le boutton
                    "changer" dans la ligne qui correspond à la question .
                  </li>
                  <li>
                   pour consulter le texte de la question et la supprimer, consulter toute l'informations sur la 
                    question, appuyer sur le boutton "informations" dans la ligne qui correspond à la question.
                  </li>
                </ul>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Accordion>
            <Accordion.Item
              eventKey=""
              className="mt-4 mb-4"
              onClick={() => setStateAccordion(true)}
            >
              <Accordion.Header>liste de questions</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col
                    xs={12}
                    className="mt-3 d-flex justify-content-center align-items-center"
                  >
                    <div className="mr-3">filtre:</div>
                    <Dropdown>
                      <Dropdown.Toggle variant="success">
                        {filterQuestion == "all"
                          ? "tout"
                          : filterQuestion == "completed"
                          ? "ferméеs"
                          : "non fermées"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {filterQuestion === "all" ? (
                          <Dropdown.Item disabled>tout</Dropdown.Item>
                        ) : (
                          <Dropdown.Item
                            onClick={() => setFilterQuestion("all")}
                          >
                            tout
                          </Dropdown.Item>
                        )}
                        {filterQuestion === "completed" ? (
                          <Dropdown.Item disabled>fermées</Dropdown.Item>
                        ) : (
                          <Dropdown.Item
                            onClick={() => setFilterQuestion("completed")}
                          >
                            fermées
                          </Dropdown.Item>
                        )}
                        {filterQuestion === "not-completed" ? (
                          <Dropdown.Item disabled>non fermées</Dropdown.Item>
                        ) : (
                          <Dropdown.Item
                            onClick={() => setFilterQuestion("not-completed")}
                          >
                            non fermées
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
                <Table striped bordered hover className="mt-4 p-2">
                  <thead>
                    <tr>
                      <th>ID question</th>
                      <th>ID produit</th>
                      <th>ID utilisateur</th>
                      <th>non du produit</th>
                      <th>date  de la question </th>
                      <th>statut</th>
                      <th>date de changement</th>
                      <th>plus de détails</th>
                      <th>terminés</th>
                      <th>supprimer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questions.rows?.map(
                      ({
                        id_question,
                        userId,
                        productId,
                        createdAt,
                        updatedAt,
                        complete_question,
                        question_text,
                        product,
                        answer_to_question,
                      }) => (
                        <QuestionItemAdmin
                          key={id_question}
                          id_question={id_question}
                          userId={userId}
                          productId={productId}
                          question_text={question_text}
                          product_name={productId}
                          completeQuestion={complete_question}
                          updatedAt={updatedAt}
                          createdAt={createdAt}
                          product={product}
                          answer={answer_to_question}
                          reRenderQuestion={reRenderQuestion}
                        />
                      )
                    )}
                  </tbody>
                </Table>
                <Pagination
                  size="sm"
                  className="mt-4 mb-4"
                  style={{ margin: "0 auto" }}
                >
                  {pagesQuestion}
                </Pagination>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
      </Container>

      <SideBar show={showSidebar} handleClose={handleCloseSidebar} />
    </>
  );
};
export default AdminQuestion;
