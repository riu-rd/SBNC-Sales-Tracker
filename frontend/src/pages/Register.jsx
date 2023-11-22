import React from 'react';
import '../assets/css/style.css';
// @ts-ignore
import logoImage from '../assets/images/sbnc_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confpass, setConfPass] = useState('');
    const [isError, setIsError] = useState([false, ""]);

    const navigate = useNavigate();

    const registerUser = () => {
        if (!name || !email || !pass || !confpass) {
            setIsError([true, "Error: Fill up all fields"]);
        } else {
            if (pass === confpass) {
                axios.post("http://localhost:8080/register", {
                    name: name,
                    email: email,
                    password: pass
                }, {
                    withCredentials: true
                }).then((res) => {
                    console.log("User Registered Successfully: ", res.data);
                    setIsError([false, ""]);
                    navigate('/email-verification');
                }).catch((err) => {
                    setIsError([true, "Error: Email already exists"]);
                    console.error(err.message);
                });
            } else {
                setIsError([true, "Error: Password and Confirm Password do not match"]);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            registerUser();
        }
    };

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
                    {isError[0] && <p className='error-message'>{isError[1]}</p>}
                    <div className="input">
                        <div className="inputName">
                            <label htmlFor="name" className="center">Name</label>
                            <input type="text" name="name" placeholder="Juan Dela Cruz" onChange={(e)=> setName(e.target.value)} onKeyDown={handleKeyPress} required/>
                        </div>
                        <div className="inputEmail">
                            <label htmlFor="email" className="center">Email</label>
                            <input type="email" name="email"  placeholder="juan@gmail.com" onChange={(e)=> setEmail(e.target.value)} onKeyDown={handleKeyPress} required/>
                        </div>
                        {/*<div className="inputNumber">
                            <label htmlFor="number" className="center">Mobile Number</label>
                            <input type="tel" name="number" pattern="^[0-9]{11}$"  placeholder="09123456789" onChange={(e)=> setPhone(e.target.value)} required />
                        </div>*/}
                        <div className="inputPass">
                            <label htmlFor="password" className="center">Password</label>
                            <input type="password" name="password"  placeholder="password"  onChange={(e)=> setPass(e.target.value)} onKeyDown={handleKeyPress} required/>
                        </div>
                        <div className="inputConfirmPass">
                            <label htmlFor="confirmPassword" className="center">Confirm Password</label>
                            <input type="password" name="confirmPassword"  placeholder="confirm password" onChange={(e)=> setConfPass(e.target.value)} onKeyDown={handleKeyPress} required/>
                        </div>
                    </div>
                    <div className="center">
                        <button className="signUpbtn main-buttons" onClick={registerUser}>Sign Up</button>
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