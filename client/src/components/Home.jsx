import React, { useState, useEffect } from 'react';
import ProgramList from './ProgramList.jsx';
import ProgramForm from './ProgramForm.jsx';
import programApi from '../api/programApi.js';
import ProgramDetails from './ProgramDetails.jsx'; 

import { useUserContext } from '../UserContext.jsx';
import './Home.css'; 
import Navbar from "./navbar.jsx";
import WebFont from 'webfontloader';
import {ReactTyped} from "react-typed";
import {Link} from "react-router-dom";
import AnimatedPage from "./AnimatedPage.jsx";
import { motion } from "framer-motion"

import Sidebar from './Sidebar.jsx';





const Home = () => {

  
  useEffect(()=>{
    WebFont.load({
        google:{
            families:['Gilroy','Chilanka','Madimi One', 'Kode Mono','Baloo 2']
        }
    });
},[])




  return (
    <AnimatedPage>
    <div className="top">
      {/* <div id="circle"></div> */}
      
      <div className="header">
      <Navbar />
            
      </div>
      <div className='inf'>
      <a href="https://github.com/panghal007"><img src="gihub2.png"  /></a>
            <a href="https://www.linkedin.com/in/uniquepanghal/"><img className="img2" src="linkedin.jpg" /></a>  
      </div>
     <div className="content1">
        <div className="right">
            <img src="./theme_img2.jpg" alt=""></img>
        </div>
        <div className="left">
          
            <h1 >Learn from the <span >coolest
              {/* <ReactTyped strings={["coolest"]}
                          typeSpeed={200}
                          cursorChar="#"
                          showCursor={false}/> */}
            </span> learning platform of India.</h1>
            <p >Unlock Your Potential with Our Programs.
            </p>
          
            <Link to="/program"> <button>Explore</button></Link>
        </div>
        
      </div>
      <div className="content3">
            
      </div>
      <div className="content2">
      
        <div className="left1">
          
            <h1 >You can learn anything.</h1>
            <p >Empowering learners, shaping leaders. Let's embark on a journey of discovery
            </p>
          
            <Link to="/program"> <button>Learners,start here</button></Link>
        </div>
        <div className="right1">
            <img src="./laptop.png" alt=""></img>
        </div>
            
      </div>
      
      <div id="footer" className="footer">
            {/* <img src="download.png" className="header--image"/> */}
            <div className='foot-child1'>
            <h1>Programs Dashboard
              {/* <ReactTyped strings={["Programs Dashboard"]}
                          typeSpeed={50}
                          cursorChar="#"
                          showCursor={false}/> */}
            </h1>
            <h3>-by Unique Panghal</h3> 
            </div>
            
            <div className="foot-child2">
            <h2>Get in Touch:</h2> 
            <a href="https://github.com/panghal007"><img src="gihub2.png"  /></a>
            <a href="https://www.linkedin.com/in/uniquepanghal/"><img className="img2" src="linkedin.jpg" /></a>    
            {/* <h4>-by Unique Panghal</h4>  */}
                
            </div>
        </div>

      
      
   
    </div>
    </AnimatedPage>
   

  );
};

export default Home;