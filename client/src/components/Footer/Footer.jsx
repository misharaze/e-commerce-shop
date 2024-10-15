import React from "react";
import { Col, Row , Card} from "react-bootstrap";
import Visa from '../img/visa.svg'
import Amex from '../img/amex.svg'
import Maestro from '../img/maestro.svg'
import { Link } from "react-router-dom";
import "./Footer.scss";
import {
  AiFillFacebook,
  AiFillGoogleCircle,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";
import {ABOUT_ROUTE} from "../../utils/consts";
import {RULES_ROUTE} from '../../utils/consts';
import {QUESTION_ROUTE} from '../../utils/consts';
import {LOCATIONPLACES_ROUTE} from '../../utils/consts';
export default function Footer() {
  return (
    <>
    
     <footer >
      
      <Card className='footer-card' style={{"height" : "100%", 'width': '100%', display:'flex'}}>
       
     
         <div style={{display:'flex', marginTop:30, marginLeft:40,justifyContent:'space-around'  }}>
         <div style={{marginRight:50}}> 


<div style={{fontSize:20, marginTop:6, fontFamily:'fantasy'}}>type de carte accepté</div>

<div className='payment' style={{fontSize:17, textDecoration:'underline', marginTop:20}}  >Paiement sécurisé</div>

<div style={{display:'flex', flexDirection:'row', width:200, justifyContent:'space-between',marginTop:20}}> 
<img style={{width:50, height:50}} src={Visa} alt='payment'></img>
<img style={{width:50, height:50}} src={Amex} alt='payment'></img>
<img style={{width:50, height:50}} src={Maestro} alt='payment'></img>
</div>
</div>
      
   <div  className='footer-wrappers'>
           <h2 className="footer-title">A propos</h2>
           <nav className="footer-nav">
           <Link to={ABOUT_ROUTE}>
             <li>
               <a style={{textDecoration:'none'}}className="footer-link"href='ffg'>A propos de nous</a>
             </li>
           </Link>
            <Link to={LOCATIONPLACES_ROUTE}>
            <li>
               <a style={{textDecoration:'none'}} className="footer-link"href='ffg'>Adresse principal</a>
             </li>
             </Link>
           </nav>
        </div>
         <div className="footer-wrapper">
           <h2 className="footer-title">Aide & mentions </h2>
           
           <nav className="footer-nav">
           <Link to={RULES_ROUTE}>
             <li>
               <a style={{textDecoration:'none'}}className="footer-link"href='ffg'>régles</a>
             </li>
            </Link>
            <Link to={QUESTION_ROUTE}>
             <li>
               <a style={{textDecoration:'none'}}className="footer-link"href='ffg'>questions et réponses</a>
             </li>
            </Link>
           </nav>
          </div>

           <div className="footer-wrapper">
           <h2 className="footer-title"> Contactez-nous </h2>
          <p>Notre équipe est disponible 7 jours sur 7 par email, nous <br/> répondons 
          à toutes vos questions concernant nos produits et vos commandes:</p>
          <div className="informations">
         <p>Email: contact@epices.com </p>
         <p>Adresse: 9 rue des moulins, Paris, France</p>
          
          
             </div>
           </div>
         </div>
     
      
      
        <Row className="social-footer">
        <Col>
          <a className="top_social_link" href="http://google.com">
            <AiFillYoutube className="social_icon" size={25}/>
          </a>
        </Col>
        <Col>
          <a className="top_social_link" href="http://google.com">
            <AiFillFacebook className="social_icon" size={25}/>
          </a>
        </Col>
        <Col>
          <a className="top_social_link" href="http://google.com">
            <AiFillTwitterCircle className="social_icon" size={25}/>
          </a>
        </Col>
        <Col>
          <a className="top_social_link" href="http://google.com">
            <AiFillInstagram className="social_icon" size={25}/>
          </a>
        </Col>
        <Col>
          <a className="top_social_link" href="http://google.com">
            <AiFillGoogleCircle className="social_icon" size={25}/>
          </a>
        </Col>
      </Row>
    


    </Card>  
    <Row className="copyright">
            <Col>
              <p className="copyright_text">
                Copyright © 2023 All rights reserved 
              </p>
            </Col>
          </Row>
       </footer>
       
    </>
  );
}
