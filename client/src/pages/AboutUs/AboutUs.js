import './AboutUs.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import AnimatedNumber from "animated-number-react";

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import {GiCoffeeCup} from 'react-icons/gi'
import {IoIosPeople} from 'react-icons/io';
import {AiOutlineLike} from 'react-icons/ai';
import {FaAward} from 'react-icons/fa';

import {MdDoubleArrow} from "react-icons/md"

import {FaReact} from 'react-icons/fa';
import {BsBootstrap, BsGithub} from 'react-icons/bs';
import {FaSass} from 'react-icons/fa';




function about_us() {

    return (
      <div className="about_us">

          <div className='first_null_section'>

          </div>

          <div className='main_about'>
              <div className='container d-flex h-100'>
                  <div className='row d-flex align-items-center justify-content-center align-middle'>
                      <div className='col-6'>
                        <img className='imgLogo' src='img/header/logo-eco.png' />
                      </div>

                      <div className='col-6'>
                        <p> Chez Bien Epicerie Bio, vous trouverez une grande diversité de produits bio de qualité, tout au long de l’année au rythme des saisons, que nous sélectionnons exclusivement chez des producteurs et des artisans passionnés par leur métier et amoureux de la terre.</p>

                        <p> Ils partagent nos valeurs et nos engagements : le respect de l’environnement et celui des cycles de la nature.</p>

                        <p> Notre mission est de vous accompagner, de vous guider et de vous conseiller dans cette recherche de bien-être et de vous faire ressentir tous les bienfaits d’une alimentation bio, saine et adaptée. Nous recherchons constamment des nouveaux produits écologiques et locaux, parfois rares ou oubliés, mais toujours authentiques… des trésors d’ici et ailleurs.</p>
                      </div>
                  </div>
              </div>

          </div>

          <div id='count_data' className='count_data'>
          <div class="about-counter-area d-flex h-100">
		<div className="container h-100 d-flex align-items-center justify-content-center align-middle">
			<div className="row align-items-center justify-content-center align-middle">
				<div className="col-md-3 text-center">
        <IoIosPeople className='icon_count' size={'60px'}/>

					<div classname="single-counter">
                        <AnimatedNumber className='countNumberA'
                        value={1444}
                        formatValue={v=>v.toFixed(0)}
                        duration={7000}
                        />			
                        <p className='countNumber'>client content</p>
					</div>
				</div>

				<div className="col-md-3 text-center">
        <FaAward className='icon_count' size={'60px'}/>


					<div className="single-counter">
                        <AnimatedNumber className='countNumberA'
                        value={5}
                        formatValue={v=>v.toFixed(0)}
                        duration={3000}
                        />							
                        <p className='countNumber'>récompense</p>
					</div>
				</div>

				<div className="col-md-3 col-sm-3 text-center">
        <AiOutlineLike className='icon_count' size={'60px'}/>

					<div className="single-counter">
						<AnimatedNumber className='countNumberA'
                        value={11}
                        formatValue={v=>v.toFixed(0)}
                        duration={2000}
                        />	
						<p className='countNumber'>projet accomplis</p>
					</div>
				</div>

				<div className="col-md-3 col-sm-3 text-center">
        <GiCoffeeCup className='icon_count' size={'60px'}/>

					<div className="single-counter">
                        <AnimatedNumber className='countNumberA'
                        value={5689}
                        formatValue={v=>v.toFixed(0)}
                        duration={5500}
                        />							
                        <p className='countNumber'>tasse de café</p>
					</div>
				</div>
			</div>
		</div>
	</div>
              
          </div>

          <div className='info_data'>

            <div className='container  d-flex h-100'>
              <div className='row align-items-center justify-content-center align-middle'>
                <div className='col-md-2'>
              
                </div>

               
                <div className='col-md-2'>
             
             
                </div>
               
                <div className='col-md-3'>
           
                </div>
              
                <div className='col-md-2'>
              
                </div>
              </div>
            </div>
              
          </div>

          <div className='tools_data'>
          <div className='container  d-flex h-100'>
              <div className='row align-items-center justify-content-center align-middle'>
                <div className='col-md-3 text-center'>
             
                </div>
                <div className='col-md-3 text-center'>
              
              
                </div>
                <div className='col-md-3 text-center'>
               
            
                </div>
                <div className='col-md-3 text-center'>
               
             
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
  
  export default about_us;
  