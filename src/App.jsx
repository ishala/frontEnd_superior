import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './page/Register';
import Login from './page/Login';
import Home from './page/Home';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if there is an access token in localStorage
    const accessToken = localStorage.getItem('accessToken');
    setIsAuthenticated(!!accessToken);
  }, []);

  const handleLogin = () => {
    // Set isAuthenticated to true
    setIsAuthenticated(true);
  };

  const handleRegister = () => {
    // Set isAuthenticated to true
    setIsAuthenticated(true);
  };

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  const AuthRoute = ({ element }) => {
    return isAuthenticated ? <Navigate to="/" /> : element;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<AuthRoute element={<Register onRegister={handleRegister} />} />} />
        <Route path="/login" element={<AuthRoute element={<Login onLogin={handleLogin} />} />} />
      </Routes>
    </Router>
  );
}

export default App;
