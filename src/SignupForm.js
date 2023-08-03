/** @format */

// // Import necessary libraries
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// // SignupForm component
// const SignupForm = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const [errors, setErrors] = useState({});

//   const navigFunc = useNavigate()

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validate form fields
//     const validationErrors = {};
//     if (!formData.username) {
//       validationErrors.username = 'Username is required';
//     }
//     if (!formData.email) {
//       validationErrors.email = 'Email is required';
//     } else if (!isValidEmail(formData.email)) {
//       validationErrors.email = 'Invalid email address';
//     }
//     if (!formData.password) {
//       validationErrors.password = 'Password is required';
//     } else if (formData.password !== formData.confirmPassword) {
//       validationErrors.confirmPassword = 'Passwords do not match';
//     }

//     // If there are errors, don't proceed with form submission
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     // If validation passes, save data to localStorage
//     localStorage.setItem('user', JSON.stringify(formData));

//     // Reset form fields and errors
//     setFormData({
//       username: '',
//       email: '',
//       password: '',
//       confirmPassword: '',
//     });
//     setErrors({});
//     navigFunc('/user');
//   };

//   // Handle form field changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Email validation function
//   const isValidEmail = (email) => {
//     // Simple email validation using regular expression
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   return (
//     <div>
//       <h2>Signup Form</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username:</label>
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//           />
//           {errors.username && <p>{errors.username}</p>}
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           {errors.email && <p>{errors.email}</p>}
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//           {errors.password && <p>{errors.password}</p>}
//         </div>
//         <div>
//           <label>Confirm Password:</label>
//           <input
//             type="password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//           />
//           {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
//         </div>
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// };

// export default SignupForm;

// Import necessary libraries
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// SignupForm component
const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    const navigFunc = useNavigate();

    // Check if the user is already registered
    const isUserRegistered = () => {
        const userData = localStorage.getItem("user");
        return !!userData;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // If the user is already registered, show an error message
        if (isUserRegistered()) {
            setErrors({ global: "You are already a registered user. Please log in." });
            return;
        }

        // Validate form fields
        const validationErrors = {};
        if (!formData.username) {
            validationErrors.username = "Username is required";
        }
        if (!formData.email) {
            validationErrors.email = "Email is required";
        } else if (!isValidEmail(formData.email)) {
            validationErrors.email = "Invalid email address";
        }
        if (!formData.password) {
            validationErrors.password = "Password is required";
        } else if (formData.password !== formData.confirmPassword) {
            validationErrors.confirmPassword = "Passwords do not match";
        }

        // If there are errors, don't proceed with form submission
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // If validation passes, save data to localStorage
        localStorage.setItem("user", JSON.stringify(formData));

        // Reset form fields and errors
        setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
        setErrors({});
        navigFunc("/welcome");
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Email validation function
    const isValidEmail = (email) => {
        // Simple email validation using regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLoginBack = () => {
        navigFunc("/login");
    };

    return (
        <div className="container text-center">
            <h2>Signup Form</h2>
            {errors.global && <p>{errors.global}</p>}
            <form onSubmit={handleSubmit}>
                <div className="fs-4 ">
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                    {errors.username && <p>{errors.username}</p>}
                </div>
                <div className="fs-4 mt-2">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div className="fs-4 mt-2">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <div className="fs-4 mt-2">
                    <label>Confirm Password:</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                    {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                </div>
                <button className="btn btn-info mt-4" type="submit">
                    Sign Up
                </button>
            </form>
            <p className="fs-5 mt-4">
                Old user? Okk{" "}
                <button className="btn btn-dark" onClick={handleLoginBack}>
                    Login
                </button>
            </p>
        </div>
    );
};

export default SignupForm;
