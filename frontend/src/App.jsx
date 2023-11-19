import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import SecurityCode from './pages/SecurityCode';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/security-code" element={<SecurityCode />} />
          <Route path="/home" element={<Home />} /> 
      </Routes>
    </div>
  );
};

export default App;
