import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use react-router for navigation
import '../styles/login.css'; // Ensure this CSS file includes the necessary styles

const Login = () => {
  const [profileImage, setProfileImage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use navigate for redirection

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin' && password === 'admin') {
      // Successful login for admin credentials
      localStorage.setItem('token', 'admin-token'); // Simulate a token
      navigate('/dashboard'); // Redirect to admin dashboard
    } else {
      setError('Invalid login credentials. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Username:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your username"
            required
          />
          
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          {error && <p className="error-message">{error}</p>} {/* Show error message */}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
