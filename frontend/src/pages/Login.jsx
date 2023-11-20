import React from 'react';
import '../assets/css/style.css';
import logoImage from '../assets/images/logo2.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const navigate = useNavigate();

    const loginUser = () => {
        axios.post("http://localhost:8080/login", {
                email: email,
                password: pass,
            }, {
                withCredentials: true
            }).then((res) => {
                console.log("User Authenticated Successfully: ", res.data);
                if (res.data) {
                    navigate("/home");
                }
            }).catch((err) => {
                console.error(err.message);
            });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            loginUser();
        }
    };

    useEffect(() => {
        axios.get('http://localhost:8080/user', { withCredentials: true })
            .then((res) => {
                if (res.data) {
                    navigate('/home');
                }
            })
            .catch((err) => {
                console.error(err.message);
            });
    }, [navigate]);

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
                            <label htmlFor="email" className="center">Email</label>
                            <input type="text" name="email" placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyPress} required/>
                        </div>
                        <div className="inputPass">
                            <label htmlFor="password" className="center">Password</label>
                            <input type="password" name="password" placeholder='Enter password' onChange={(e) => setPass(e.target.value)} onKeyDown={handleKeyPress} required/>
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
                        <button className="loginButton main-buttons" onClick={loginUser}>Log In </button>
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