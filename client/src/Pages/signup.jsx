import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.css';


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
        <div>
            <h1>SignUp Page</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />


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


                <button type="submit">Sign Up</button>


                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
};


export default Signup;



