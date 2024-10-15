
import { Badge, Button, Dropdown, Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  ABOUT_ROUTE,
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LIKES_ROUTER,
  LOCATIONPLACES_ROUTE,
  LOGIN_ROUTE,
  ORDERS_ROUTE,
  PRODUCT_ROUTE,
  QUESTION_ROUTE,
  RULES_ROUTE,
  SHOP_ROUTE,
} from "../../../utils/consts";
import "./Sidebar.scss";

const Sidebar = ({ show, handleClose, isAuth, isAdmin, basket, likes }) => {
  const navigate = useNavigate();



  function logOut() {
    localStorage.clear();
    window.location.href = SHOP_ROUTE;
  }

  return (
    <>
      <Offcanvas
      
        className="offcanvas"
        placement="end"
        show={show}
        onHide={handleClose}
      >
        <Offcanvas.Header className="offcanvas_header">
          <p className="text_logo">
            <span>NATURALIA</span>
          </p>
        </Offcanvas.Header>
        <Offcanvas.Body className="offcanvas_body">
          <Link to={SHOP_ROUTE}>
            <Button variant="none" className="off_navigation_btn" type="button">
              Page principal
            </Button>
          </Link>
          <Dropdown className="off_navigation_dropdown">
            <Dropdown.Toggle
              variant="none"
              className="off_navigation_dropdown-toggle"
              drop={"start"}
            >
              Produits
            </Dropdown.Toggle>
            <Dropdown.Menu className="off_navigation_dropdown-menu">
              <Dropdown.Item
                className="off_navigation_dropdown-item"
                href={PRODUCT_ROUTE}
              >
                Tout les produits
              </Dropdown.Item>
          
            
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="off_navigation_dropdown">
            <Dropdown.Toggle
              variant="none"
              className="off_navigation_dropdown-toggle"
            >
              Autres
            </Dropdown.Toggle>
            <Dropdown.Menu className="off_navigation_dropdown-menu">
              <Dropdown.Item
                className="off_navigation_dropdown-item"
                href={ABOUT_ROUTE}
              >
                A propos de nous 
              </Dropdown.Item>
              <Dropdown.Item
                className="off_navigation_dropdown-item"
                href="#/action-2"
              >
                
              </Dropdown.Item>
              <Dropdown.Item
                className="off_navigation_dropdown-item"
                href={LOCATIONPLACES_ROUTE}
              >
                Adresse Principal
              </Dropdown.Item>
              <Dropdown.Item
                className="off_navigation_dropdown-item"
                href={RULES_ROUTE}
              >
                Régles
              </Dropdown.Item>
              <Dropdown.Item
                className="off_navigation_dropdown-item"
                href={QUESTION_ROUTE}
              >
                Questions et réponses
              </Dropdown.Item>
              {isAuth && isAdmin == true ? (
                <Dropdown.Item
                  className="off_navigation_dropdown-item"
                  href={ADMIN_ROUTE}
                >
                  Admin
                </Dropdown.Item>
              ) : (
                <div></div>
              )}
            </Dropdown.Menu>
          </Dropdown>

          {isAuth ? (
            <Button
              variant="none"
              className="off_navigation_btn_simple"
              type="button"
              href="/myprofile"
            >
              Espace personnel 
            </Button>
          ) : (
            <div></div>
          )}

          {isAuth ? (
            <Button
              variant="none"
              className="off_navigation_btn_simple"
              type="button"
              href={BASKET_ROUTE}
            >
              Panier{" "}
              <Badge pill bg="success" className="basket_badge">
                {basket.Price} EUR
              </Badge>{" "}
            </Button>
          ) : (
            <div></div>
          )}

          {isAuth ? (
            <Button
              variant="none"
              className="off_navigation_btn_simple"
              type="button"
              href={LIKES_ROUTER}
            >
              aimer{" "}
              <Badge pill bg="success" className="basket_badge">
                {likes._likes.length} Produit
              </Badge>{" "}
            </Button>
          ) : (
            <div></div>
          )}

          {isAuth ? (
            <Button
              variant="none"
              className="off_navigation_btn_simple"
              type="button"
              href={ORDERS_ROUTE}
            >
               Commande{" "}
              {/* <Badge pill bg="success" className="basket_badge">
                {basket.Price} РУБ
              </Badge>{" "} */}
            </Button>
          ) : (
            <div></div>
          )}

          <hr></hr>

          {isAuth ? (
            <Button
              variant="none"
              id="exit"
              className="off_navigation_btn_logout"
              type="button"
              onClick={() => logOut()}
            >
              Sortir
            </Button>
          ) : (
            <Button
              variant="none"
              className="off_navigation_btn_login"
              type="button"
              href={LOGIN_ROUTE}
            >
              Entrer / s'enregistrer
            </Button>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
export default Sidebar;
