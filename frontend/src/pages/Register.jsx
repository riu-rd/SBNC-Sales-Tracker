import React from 'react';
import '../assets/css/style.css';
import logoImage from '../assets/images/logo2.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confpass, setConfPass] = useState('');

    const registerUser = () => {
        if (pass === confpass) {
            axios.post("http://localhost:8080/register", {
                name: name,
                email: email,
                password: pass,
                access: 1
            }, {
                withCredentials: true
            }).then((res) => {
                console.log("User Registered Successfully: ", res.data);
            }).catch((err) => {
                console.error(err.message);
            });
        };
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
                    <div className="input">
                        <div className="inputName">
                            <label htmlFor="name" className="center">Name</label>
                            <input type="text" name="name" placeholder="Juan Dela Cruz" onChange={(e)=> setName(e.target.value)} required/>
                        </div>
                        <div className="inputEmail">
                            <label htmlFor="email" className="center">Email</label>
                            <input type="email" name="email"  placeholder="juan@gmail.com" onChange={(e)=> setEmail(e.target.value)}  required/>
                        </div>
                        {/*<div className="inputNumber">
                            <label htmlFor="number" className="center">Mobile Number</label>
                            <input type="tel" name="number" pattern="^[0-9]{11}$"  placeholder="09123456789" onChange={(e)=> setPhone(e.target.value)} required />
                        </div>*/}
                        <div className="inputPass">
                            <label htmlFor="password" className="center">Password</label>
                            <input type="password" name="password"  placeholder="password"  onChange={(e)=> setPass(e.target.value)} required/>
                        </div>
                        <div className="inputConfirmPass">
                            <label htmlFor="confirmPassword" className="center">Confirm Password</label>
                            <input type="password" name="confirmPassword"  placeholder="confirm password" onChange={(e)=> setConfPass(e.target.value)} required/>
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