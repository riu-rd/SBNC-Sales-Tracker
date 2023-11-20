import React from 'react';
import '../assets/css/style.css';
import logoImage from '../assets/images/logo2.png';
import { Link } from 'react-router-dom';

function ForgotPassword() {
    return (
        <div>
            <div className="nav">
            
            </div>
            <div className="container">
                <div className="form">
                    <div className="logo">
                        <img src={logoImage} alt="" />
                    </div>

                    <p className="center tl">Trouble logging in?</p>
                    <hr />
                    <p className="instruction">
                        Enter your email or username, and we'll send you a code to get back into your account.
                    </p>
                    <div className="input">
                        <div className="inputEmailUsername">
                            <label htmlFor="emailUsername" className="center">
                                Email or Username
                            </label>
                            <input type="text" name="emailUsername" />
                        </div>
                    </div>
                    <div className="center">
                        <Link to="/security-code" ><button className='main-buttons'>Send a code</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
