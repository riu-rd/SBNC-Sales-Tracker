import React from 'react';
import '../assets/css/style.css';
import logoImage from '../assets/images/logo2.png';
import { Link } from 'react-router-dom';


function Register() {
    return (
        <div>
            <style>
                {`
          body {
            background-color: #d9d9d9; /* Light Blue */
          }
        `}
            </style>
            <div className="nav"></div>
            <div className="container">
                <div className="login_form">
                    <div className="logo">
                        <img src={logoImage} alt="" /> {/* Use the imported image */}
                    </div>
                    <div className="input">
                        <div className="inputName">
                            <label htmlFor="name" className="center">
                                Name
                            </label>
                            <input type="text" name="name" />
                        </div>
                        <div className="inputEmail">
                            <label htmlFor="email" className="center">
                                Email
                            </label>
                            <input type="text" name="email" />
                        </div>
                        <div className="inputNumber">
                            <label htmlFor="number" className="center">
                                Mobile Number
                            </label>
                            <input type="text" name="number" />
                        </div>
                        <div className="inputUsername">
                            <label htmlFor="username" className="center">
                                Username
                            </label>
                            <input type="text" name="username" />
                        </div>
                        <div className="inputPass">
                            <label htmlFor="password" className="center">
                                Password
                            </label>
                            <input type="password" name="password" />
                        </div>
                        <div className="inputConfirmPass">
                            <label htmlFor="confirmPassword" className="center">
                                Confirm Password
                            </label>
                            <input type="password" name="confirmPassword" />
                        </div>
                    </div>

                    <div className="center">
                        <button className="signUpbtn">Sign Up</button>
                    </div>
                    <div className="login">
                        <p className="center">
                            Already have an account? Log in{' '}
                            <Link to="/" className="log-in">
                                here.
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;