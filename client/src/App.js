// import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Pages/login";
import Signup from "./Pages/signup";
import ProgramsDashboard from "./components/ProgramsDashboard";
import {UserContextProvider} from "./UserContext";

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
        <Route path="/program" element={   
        <div className="App">
            <ProgramsDashboard />
        </div>} />

        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
   </UserContextProvider>
  );
}
