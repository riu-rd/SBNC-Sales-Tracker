import React from 'react';
import '../assets/css/style.css';
import logoImage from '../assets/images/logo2.png';
// import { Link } from 'react-router-dom';

function SecurityCode() {
  return (
    <div>
      <div className="nav"></div>
      <div className="container">
        <div className="form">
          <div className="logo">
            <img src={logoImage} alt="" />
          </div>

          <p className="center tl">Enter security code</p>
          <hr />
          <p className="instruction">
            Please check your email for a message with your code. Your code is 6 numbers long.
          </p>
          <div className="input">
            <div className="inputCode">
              <label htmlFor="code" className="center">
                Enter code
              </label>
              <input type="text" name="code" />
            </div>
          </div>
          <div className="center">
            <button>Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecurityCode;
