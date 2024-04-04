import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Register from './page/Register';
import Login from './page/Login';
import Home from './page/Home';
import Dashboard from './page/Dashboard';
import NotFound from './page/NotFound';

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

  ProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired
  };

  const AuthRoute = ({ element }) => {
    return isAuthenticated ? <Navigate to="/" /> : element;
  };

  AuthRoute.propTypes = {
    element: PropTypes.element.isRequired // Add prop validation
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<AuthRoute element={<Register onRegister={handleRegister} />} />} />
        <Route path="/login" element={<AuthRoute element={<Login onLogin={handleLogin} />} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
