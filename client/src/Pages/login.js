import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserContext.jsx';
import './login.css'; 
import AnimatedPage from "../components/AnimatedPage.jsx";

const Login = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
  
    const { login } = useUserContext();
    const navigate = useNavigate();
  
    const handleChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await fetch('http://localhost:3000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.status === 201) {
          // Handle successful login, 
          const userData = await response.json();
          login(userData.username);
  
          // Redirect to the program dashboard
          navigate('/');
        } else {
          // Handle login error
          console.error('Login failed');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    };
  
    return (
      <AnimatedPage>
      <div className="parent">
      {/* <div id="circle"></div> */}
      <div className="login">
        <h1>Login</h1>
        <form className="login-form"onSubmit={handleSubmit}>
          
          <label className="label-email" htmlFor="email">Email:</label>
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
  
          <label className="label-password" htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
  
          <button type="submit" className="login-button">Login</button>
  
          <p>
            Don't have an account? <Link to="/signup" className="link">Sign Up</Link>
          </p>
        </form>
      </div>
      <h5>@UniquePanghal</h5>
      </div>
      </AnimatedPage>
    );
  };
  
  export default Login;
  



