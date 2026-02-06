import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './AuthModal.css';

function AuthModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { login } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email: formData.email, name: formData.name || formData.email.split('@')[0] });
    onClose();
    // User will be on landing page, they can choose experience after login
  };

  const handleSocialLogin = (provider) => {
    login({ email: `user@${provider}.com`, name: 'User', provider });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Sign in to continue' : 'Start your fashion journey'}</p>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required={!isLogin}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          <button type="submit" className="btn-submit">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="modal-divider">
          <span>or continue with</span>
        </div>

        <div className="social-buttons">
          <button onClick={() => handleSocialLogin('google')} className="social-btn">
            <span>G</span> Google
          </button>
          <button onClick={() => handleSocialLogin('apple')} className="social-btn">
            <span></span> Apple
          </button>
        </div>

        <p className="modal-switch">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="switch-link">
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthModal;
