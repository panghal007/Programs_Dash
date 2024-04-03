import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.css';
import AnimatedPage from "../components/AnimatedPage.jsx";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                // Successful signup
                console.log('Signup successful!');
                // Redirect to login page
                // console.log(response.cookie);
                window.location.href = '/login';
            }
            else {
                // Failed signup
                console.error('Signup failed:', response.statusText);         
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };


    return (
        <AnimatedPage>
        <div className="parent">
        {/* <div id="circle"></div> */}
        <div className="signup">
            <h1>Register</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                <label className="label-username" htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />


                <label className="label-email" htmlFor="email">Email:</label>
                <input
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


                <button type="submit" className="signup-button">Sign Up</button>


                <p>Already have an account? <Link to="/login" className="link">Login</Link></p>
            </form>
        </div>
        <h5>@UniquePanghal</h5>
        </div>
        </AnimatedPage>
    );
};


export default Signup;



