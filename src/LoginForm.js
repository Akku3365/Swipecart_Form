// LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if user data exists in localStorage
    const userData = JSON.parse(localStorage.getItem('user'));

    // Validate email and password
    if (!userData || userData.email !== formData.email || userData.password !== formData.password) {
      setError('Invalid email or password. Please try again.');
      return;
    }

    // If validation passes, redirect to /welcome path
    navigate('/welcome');
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSinpuBack = () => {
      navigate('/')
  }

  return (
    <div className='container text-center'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='fs-4'>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className='fs-4 mt-2'>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {error && <p>{error}</p>}
        <button className='btn btn-info mt-4' type="submit">Login</button>
      </form>
      <p className='fs-5 mt-4'>New user?? Your most welcome but <button className='btn btn-dark' onClick={handleSinpuBack} >Signup</button> first!!</p>
    </div>
  );
};

export default LoginForm;
