import React from 'react';
import '../assets/css/style.css';
// @ts-ignore
import logoImage from '../assets/images/sbnc_logo.png';
import { Link } from 'react-router-dom';

function EmailVerification() {
  return (
    <div>
      <div className="nav"></div>
      <div className="container">
        <div className="form">
          <div className="logo">
            <img src={logoImage} alt="" />
          </div>

          <p className="center tl">Email Verification Request Sent</p>
          <hr />
          <center><p className="instruction">
          To complete your registration, please check your email for a verification link.
            This link will validate your email address and activate your account.
          </p></center>
          <div className="center">
            <Link to='/'><button className='main-buttons'>Proceed to Log In</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
