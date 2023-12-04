import React from 'react';
import '../assets/css/style.css';
// @ts-ignore
import logoImage from '../assets/images/sbnc_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../axios-config.js';

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    const loginUser = () => {
        axios.post("/login", {
                email: email,
                password: pass,
            }, {
                withCredentials: true
            }).then((res) => {
                console.log("User Authenticated Successfully: ", res.data);
                setIsError(false);
                if (res.data) {
                    navigate("/home");
                }
            }).catch((err) => {
                setIsError(true);
                console.error(err.message);
            });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            loginUser();
        }
    };

    useEffect(() => {
        axios.get('/user', { withCredentials: true })
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
                    {isError && <p className='error-message'>Error: Invalid username or password.</p>}
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
                            {/*<input
                                type="checkbox"
                                value="remember-me"
                                id="rememberMe"
                                name="rememberMe"
                            />{' '}
                            Remember me*/}
                        </label>
                    </div>
                    <div className="center">
                        <button className="loginButton main-buttons" onClick={loginUser}>Log In </button>
                    </div>
                    <div className="center">
                        {/*<Link to="/forgot-password" className="forgot">Forgot Password?{''}  </Link>*/}
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