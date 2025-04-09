import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 🚀 add this
import '../styles/authModal.css';

const AuthModal = ({ isLogin, onClose, switchMode, onLoginSuccess }) => {
  const navigate = useNavigate(); // ✅ init here

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint = isLogin ? 'login' : 'register';
      const response = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email.toLowerCase(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Authentication failed');
        return;
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // ✅ Set auth context if needed (e.g., useAuth().login(data.user))

        onLoginSuccess?.();
        onClose?.();

        // ✅ Navigate to dashboard after login/signup success
        navigate('/dashboard');
      }
    } catch (error) {
      setError('Authentication failed. Please try again.');
    }
  };

  const handleClose = () => {
    setError('');
    setFormData({ name: '', email: '', password: '' });
    onClose?.();
  };

  return (
    <div className="auth-modal-overlay" onClick={handleClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                minLength={2}
              />
            </div>
          )}
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={6}
            />
          </div>
          <button type="submit" className="auth-button">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="switch-mode">
          {isLogin ? "Need an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              switchMode?.();
            }}
            className="switch-button"
          >
            
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
        <button type="button" onClick={handleClose} className="close-button">
          ×
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
