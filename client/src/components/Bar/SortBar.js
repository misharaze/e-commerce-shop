import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Dropdown, ListGroup } from "react-bootstrap";
import { Context } from "../..";
import { fetchProduct } from "../../http/productAPI";
import "./bar.scss";

const SortBar = observer(
  ({ onChange}) => {
    const { product } = useContext(Context);
    const [valueMethod, setValueMethod] = useState("");
    const handlerChangeSortMethod = (value) => {
      fetchProduct(product.selectedType.id, product.selectedBrand.id).then((data) => {
        product.setProduct(data.rows);
        product.setTotalCount(data.count);
      });
      onChange(value);
      setValueMethod(value);
    };

    return (
      <Dropdown>
        <Dropdown.Toggle
          variant="danger"
          id="dropdown-basic"
          style={{ width: "100%" }}
        >
          {valueMethod ? valueMethod : "trier"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => handlerChangeSortMethod("les plus chéres")}
          >
            plus chéres en premier
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handlerChangeSortMethod("les moins chéres")}
          >
            moins chéres en premier
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handlerChangeSortMethod("de A à Z (A - Z)")}
          >
            de A à Z (A - Z)
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handlerChangeSortMethod(" de Z à A (Z - A)")}
          >
            de Z à A (Z - A)
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
);

export default SortBar;
