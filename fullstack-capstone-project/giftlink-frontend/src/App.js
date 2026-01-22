import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar/Navbar';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<MainPage />} />

        {/* Alias for home */}
        <Route path="/app" element={<MainPage />} />

        {/* Login */}
        <Route path="/app/login" element={<LoginPage />} />

        {/* Register */}
        <Route path="/app/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;