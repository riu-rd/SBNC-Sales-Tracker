import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import SecurityCode from './pages/SecurityCode';
import Home from './pages/Home';
import EmailVerification from './pages/EmailVerification';
import UserManagement from './pages/UserManagement';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          {/*<Route path="/forgot-password" element={<ForgotPassword />} />*/}
          {/*<Route path="/security-code" element={<SecurityCode />} />*/}
          <Route path="/home" element={<Home />} /> 
          <Route path='/email-verification' element={<EmailVerification />} />
          <Route path='/user-management' element={<UserManagement />} />
          <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
