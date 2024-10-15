import React, { useEffect, useState } from "react";
import { useContext } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { Context } from "../..";
import { createAnswer, updateAnswerText } from "../../http/answerAPI";
import { changeStatusQuestion, deleteQuestion } from "../../http/questionAPI";
import { PRODUCT_ROUTE } from "../../utils/consts";

const QuestionItemAdmin = ({
  id_question,
  userId,
  productId,
  product_name,
  createdAt,
  updatedAt,
  completeQuestion,
  product,
  answer,
  reRenderQuestion,
  question_text,
}) => {


  const {user} = useContext(Context);

  const [modalInfo, setShowInfo] = useState(false);
  const [modalDelete, setShowDelete] = useState(false);

  //modal info
  const handleCloseInfo = () => setShowInfo(false);
  const handleShowInfo = () => setShowInfo(true);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const watchInfo = () => {
    handleShowInfo();
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

  const [modalAnswer, setShowAnswer] = useState(false);

  // //modal delete
  const handleCloseAnswer = () => setShowAnswer(false);
  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const [stateAnswer, setStateAnswer] = useState("");

  const addAnswer = (id_question, name_user, answer) => {
    const formDataAnswer = new FormData();
    formDataAnswer.append("id_question", id_question);
    formDataAnswer.append("id_user_answer", name_user);
    formDataAnswer.append("text_answer", answer);
    createAnswer(formDataAnswer);
    changeStatusQuestion({
      complete_question: !completeQuestion,
      id_question,
    }).then(() => {
      handleCloseAnswer();
      setTimeout(() => reRenderQuestion(), 250);
    });
  };

  const [modalChangeAnswer, setShowChangeAnswer] = useState(false);

  const handleCloseChangeAnswer = () => setShowChangeAnswer(false);
  const handleShowChangeAnswer = () => {
    setShowChangeAnswer(true);
  };

  const openChangeModal = () => {
    handleShowChangeAnswer();
    setChangeText(answer.answer_text);
  };

  const [changeText, setChangeText] = useState("");

  const changeAnswerText = (id_answer, text_answer) => {
    updateAnswerText({ id_answer, text_answer }).then(() => {
      handleCloseChangeAnswer();
      setTimeout(() => reRenderQuestion(), 250);
    });
  };

  const deleteQA = (id) => {
    deleteQuestion({ id }).then(() => {
      handleCloseDelete();
      setTimeout(() => reRenderQuestion(), 250);
    });
  };

  return (
    <>
      <tr>
        <td>{id_question}</td>
        <td>
          <a href={PRODUCT_ROUTE + "/" + productId}>{productId}</a>
        </td>
        <td>{userId}</td>
        <td>{product.name}</td>
        <td>{formatDate(createdAt)}</td>
        <td>{completeQuestion ? "réponse existante" : "pas de réponse"}</td>
        <td>{completeQuestion ? formatDate(updatedAt) : "-"}</td>
        <td>
          <Button variant="info" onClick={() => watchInfo()}>
            plus de détails
          </Button>
        </td>
        <td>
          {answer != null ? (
            <Button variant="success" onClick={() => openChangeModal()}>
              modifier
            </Button>
          ) : (
            <Button variant="success" onClick={() => handleShowAnswer()}>
              répondre
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
      <Modal show={modalInfo} onHide={handleCloseInfo}>
        <Modal.Header closeButton>
          <Modal.Title>informations sur la questions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>ID question: {id_question}</li>
            <li>ID produit: {productId}</li>
            <li>ID utilisateur: {userId}</li>
            <li>nom du produit: {product.name}</li>
            <li>questions: {question_text}</li>
            <li>date de la question: {formatDate(createdAt)}</li>
            <li>
              réponse a la question : {answer != null ? answer.answer_text : "-"}
            </li>
            <li>
              jour de la réponse : {answer != null ? formatDate(answer.updatedAt) : "-"}
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseInfo}>
            fermer
          </Button>
        </Modal.Footer>
      </Modal>

      {/*modal confirm answer order*/}
      <Modal show={modalAnswer} onHide={handleCloseAnswer}>
        <Modal.Header closeButton>
          <Modal.Title>fenetre pour répondre a la question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          questions: {question_text}
          <br />
          rentrer la réponse:
          <InputGroup>
            <Form.Control
              value={stateAnswer}
              as="textarea"
              onChange={(e) => setStateAnswer(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAnswer}>
            fermer
          </Button>
          <Button
            variant="danger"
            onClick={() => addAnswer(id_question, user.user.id, stateAnswer)}
          >
            rajouter une réponse
          </Button>
        </Modal.Footer>
      </Modal>

      {/*modal confirm change order*/}
      <Modal
        show={modalChangeAnswer}
        onHide={handleCloseChangeAnswer}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            fenetre pour modifier la réponse 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>ID question: {id_question}</li>
            <li>ID produit: {productId}</li>
            <li>ID utilisateur: {userId}</li>
            <li>nom du produit: {product.name}</li>
            <li>question: {question_text}</li>
            <li>jour de la question: {formatDate(createdAt)}</li>
          </ul>
          Ответ:
          <InputGroup>
            <Form.Control
              value={changeText}
              as="textarea"
              onChange={(e) => setChangeText(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => changeAnswerText(answer.id_answer, changeText)}
          >
            enregirstrer les modifications
          </Button>
          <Button variant="secondary" onClick={handleCloseChangeAnswer}>
            fermer
          </Button>
        </Modal.Footer>
      </Modal>

      {/*modal confirm delete order*/}
      <Modal
        show={modalDelete}
        onHide={handleCloseDelete}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            confirmer la suppression de la question
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>vous etes sur de vouloir supprimer la question?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteQA(id_question)}>
            supprimer
          </Button>
          <Button variant="secondary" onClick={handleCloseDelete}>
            fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default QuestionItemAdmin;
