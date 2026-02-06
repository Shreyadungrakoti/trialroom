import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import AuthModal from '../../components/AuthModal';
import './Landing.css';

function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated, selectExperience } = useUser();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleExperienceSelect = (mode) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      // Store the selected mode to use after login
      sessionStorage.setItem('selectedMode', mode);
      return;
    }

    selectExperience(mode);
    if (mode === '2d') {
      navigate('/setup/quick');
    } else {
      navigate('/setup/studio');
    }
  };

  const handleAuthModalClose = () => {
    setShowAuthModal(false);
    // After login, if mode was selected, proceed with setup
    const selectedMode = sessionStorage.getItem('selectedMode');
    if (selectedMode && isAuthenticated) {
      selectExperience(selectedMode);
      if (selectedMode === '2d') {
        navigate('/setup/quick');
      } else {
        navigate('/setup/studio');
      }
      sessionStorage.removeItem('selectedMode');
    }
  };

  return (
    <div className="landing-container">
      {/* Floating Login Button */}
      {!isAuthenticated && (
        <button 
          className="floating-login-btn"
          onClick={() => setShowAuthModal(true)}
          title="Sign In"
        >
          <span className="login-icon">👤</span>
          <span className="login-text">Sign In</span>
        </button>
      )}

      {/* Profile Button for authenticated users */}
      {isAuthenticated && (
        <button 
          className="floating-login-btn"
          onClick={() => navigate('/profile')}
          title="Profile"
        >
          <span className="login-icon">👤</span>
        </button>
      )}

      {/* Main Content */}
      <div className="landing-content">
        <div className="landing-header">
          <h1 className="landing-title">
            <span className="gradient-text">Virtual Try-On</span>
            <br />
            Fashion Platform
          </h1>
          <p className="landing-subtitle">
            Create your digital avatar and try outfits in 2D or immersive 3D
          </p>
        </div>

        <h2 className="experience-heading">How do you want to try outfits?</h2>

        <div className="experience-options">
          {/* Quick Try-On (2D) */}
          <div 
            className="experience-card"
            onClick={() => handleExperienceSelect('2d')}
          >
            <div className="card-icon">⚡</div>
            <h3>Quick Try-On</h3>
            <p className="card-description">2D Experience</p>
            <ul className="card-features">
              <li>Fast outfit previews</li>
              <li>Minimal setup</li>
              <li>Best for daily styling</li>
            </ul>
            <div className="card-cta">Start Quick Try-On →</div>
          </div>

          {/* Avatar Studio (3D) */}
          <div 
            className="experience-card experience-card-premium"
            onClick={() => handleExperienceSelect('3d')}
          >
            <div className="card-badge">Premium</div>
            <div className="card-icon">🎨</div>
            <h3>Avatar Studio</h3>
            <p className="card-description">3D Experience</p>
            <ul className="card-features">
              <li>Full 3D avatar experience</li>
              <li>Rotate, pose, and style</li>
              <li>Premium / immersive mode</li>
            </ul>
            <div className="card-cta">Enter Avatar Studio →</div>
          </div>
        </div>

        <p className="landing-note">
          {isAuthenticated ? 'You can switch modes later from settings' : 'Sign in to get started'}
        </p>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={handleAuthModalClose}
      />
    </div>
  );
}

export default Landing;
