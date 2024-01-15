import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserContext';
import './login.css'; 


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
          navigate('/program');
        } else {
          // Handle login error
          console.error('Login failed');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    };
  
    return (
      <div>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
          
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
  
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
  
          <button type="submit">Login</button>
  
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    );
  };
  
  export default Login;
  



