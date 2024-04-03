import React from "react"
import {useState,useRef, useEffect} from "react";
import { Link } from 'react-router-dom';

import { useUserContext } from '../UserContext';
import './navbar.css'; 
import Sidebar from './Sidebar';
const Navbar = () => {   
    const { user } = useUserContext(); 
    const [openProfile, setOpenProfile] = useState(false);
    const btnRef=useRef();
    useEffect(() => {
        if (user) {
            const closeDrop = e => {
                if (!btnRef.current.contains(e.target)) {
                    setOpenProfile(false);
                }
                console.log(e);
            };
            document.body.addEventListener('click', closeDrop);
            return () => document.body.removeEventListener('click', closeDrop);
        }
    }, [user, btnRef, setOpenProfile]);

    return (
        
        <div className="header">
            {
                user && openProfile &&(
                    <Sidebar />
                )
            }
             
            {/* <img src="download.png" className="header--image"/> */}
            <Link to="/" className="link1"><h2>Programs Dashboard</h2></Link>
              {/* <ReactTyped strings={["Programs Dashboard"]}
                          typeSpeed={50}
                          cursorChar="#"
                          showCursor={false}/> */}
            
            <div className="nav-child2">
                
                
                    <a  href="#footer" className="link1">
                    <h4>Contact</h4> 
                    </a>
                
               
                { !user  &&(<Link to="/login"><button >Sign In</button></Link>)}
                {user && (<a  ref={btnRef}  onClick={() => setOpenProfile((prev)=> !prev)}><h4  className='user'>Hi! {user.username}</h4></a>)}
            </div>
        </div>
    );
};
export default Navbar;