import { Link } from 'react-router-dom';
import { useAvatar } from '../../context/AvatarContext';
import './Home.css';

function Home2D() {
  const { avatar2D, currentOutfit } = useAvatar();

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Quick Try-On</h1>
        <Link to="/settings" className="settings-btn">⚙️</Link>
      </header>

      <div className="home-content">
        {/* Avatar Preview Section */}
        <div className="avatar-section">
          <div className="avatar-preview avatar-2d">
            {avatar2D ? (
              <div className="avatar-placeholder-2d">
                <div className="avatar-silhouette">
                  👤
                </div>
                {currentOutfit && (
                  <div className="outfit-overlay">
                    Current Outfit
                  </div>
                )}
              </div>
            ) : (
              <div className="no-avatar">
                <p>No avatar created yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-grid">
          <Link to="/tryon" className="action-card">
            <div className="action-icon">👗</div>
            <h3>Try Outfits</h3>
            <p>Browse & try clothes</p>
          </Link>

          <Link to="/wardrobe" className="action-card">
            <div className="action-icon">👔</div>
            <h3>My Wardrobe</h3>
            <p>View your collection</p>
          </Link>

          <Link to="/stylist" className="action-card">
            <div className="action-icon">✨</div>
            <h3>AI Stylist</h3>
            <p>Get outfit suggestions</p>
          </Link>

          <Link to="/feed" className="action-card">
            <div className="action-icon">📸</div>
            <h3>Inspiration</h3>
            <p>Discover looks</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home2D;
