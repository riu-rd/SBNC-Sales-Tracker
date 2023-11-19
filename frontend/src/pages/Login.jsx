import React from 'react';
import '../assets/css/style.css';
import logoImage from '../assets/images/logo2.png';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div>
            <style>
                {`
          body {
            background-color: #d9d9d9; 
          }
        `}
            </style>
            <div className="nav"></div>
            <div className="container">

                <div className="login_form">
                    <div className="logo">
                        <img src={logoImage} alt="" />
                    </div>
                    <div className="input">
                        <div className="inputEmail">
                            <label htmlFor="email" className="center">
                                Email
                            </label>
                            <input type="text" name="email" />
                        </div>
                        <div className="inputPass">
                            <label htmlFor="password" className="center">
                                Password
                            </label>
                            <input type="password" name="password" />
                        </div>
                    </div>
                    <div className="remember center">
                        <label className="checkbox ">
                            <input
                                type="checkbox"
                                value="remember-me"
                                id="rememberMe"
                                name="rememberMe"
                            />{' '}
                            Remember me
                        </label>
                    </div>
                    <div className="center">
                        <Link to="/home">
                            <button className="loginButton">Log In </button>
                        </Link>
                    </div>
                    <div className="center">
                        <Link to="/forgot-password" className="forgot">Forgot Password?{''}  </Link>
                    </div>
                    <div className="sign">
                        <p className="center">
                            New user? Sign up {' '}
                            <Link to="/register" className="sign-up">
                                here.
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;