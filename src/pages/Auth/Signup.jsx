import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './Auth.css';

function Signup() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    // Simulate signup
    login({ email, name });
    navigate('/experience');
  };

  const handleSocialSignup = (provider) => {
    // Simulate social signup
    login({ email: `user@${provider}.com`, name: 'User', provider });
    navigate('/experience');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p className="auth-subtitle">Start your virtual fashion journey</p>

        <form onSubmit={handleSignup} className="auth-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">Create Account</button>
        </form>

        <div className="divider">
          <span>or sign up with</span>
        </div>

        <div className="social-login">
          <button onClick={() => handleSocialSignup('google')} className="btn-social">
            Google
          </button>
          <button onClick={() => handleSocialSignup('apple')} className="btn-social">
            Apple
          </button>
        </div>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
