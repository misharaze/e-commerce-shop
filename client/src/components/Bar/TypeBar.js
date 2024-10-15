import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Context } from "../..";
import { ListGroup } from "react-bootstrap";
import "./bar.scss";

const TypeBar = observer(({inFirstPage, state}) => {
  const { product } = useContext(Context);

  const changeType = (type) => {
    product.setSelectedType(type)
    inFirstPage()
  }

  useEffect(() => {
    if(state){
      product.setSelectedType(state)
    }
  },[product])

  return (
    <ListGroup>
      <ListGroup.Item variant="danger">catégorie du produit</ListGroup.Item>
      <ListGroup.Item
        style={{ cursor: "pointer" }}
        active={"all" === product.selectedType}
        onClick={() => changeType("all")}
        key={"all"}
      >
        toutes les catégories
      </ListGroup.Item>
      { product.type?.map((type) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={type.id === product.selectedType.id}
          onClick={() => changeType(type)}
          key={type.id}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default TypeBar;
