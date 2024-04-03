// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUserContext } from '../UserContext';
// import './Sidebar.css';
import './Home.css'; 
const Sidebar = () => {
    const { logout } = useUserContext(); 
    const handlelogout=()=>{
        logout();
    };
  return (
    <div className='dropdown'>

    
      <ul>
        <li><Link to="/" className="link1">Home</Link></li>
        <li><a  href="#footer" className="link1" >About</a></li>
        <li onClick={handlelogout}><Link to="/" className="link1">Logout</Link></li>
      </ul>
      </div>
  );
};

export default Sidebar;