// import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Pages/login";
import Signup from "./Pages/signup";
import Home from "./components/Home";
import ProgramsDashboard from "./components/ProgramsDashboard";
import ProgramForm from './components/ProgramForm';
import {UserContextProvider} from "./UserContext";
import Navbar from "./components/navbar";
import {AnimatePresence} from "framer-motion";


export default function App() {
  return (
    <UserContextProvider>
    
    <Router>
      <Routes>
        {/* Route for the login page */}
        <Route path="/login" element={<Login />} />

        {/* Route for the signup page */}
        <Route path="/signup" element={<Signup />} />

        {/* Route for the program dashboard */} 
        <Route path="/" element={ <Home />} />

        <Route path="/program" element={   
          
        // <div className="App">
        //     {/* <Navbar /> */}
        //     <ProgramsDashboard />
        // </div>} />
        <ProgramsDashboard />
      } />
      </Routes>
    </Router>
    
   </UserContextProvider>
 
 

   
  );
}
