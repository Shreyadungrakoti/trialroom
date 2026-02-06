import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAvatar } from '../../context/AvatarContext';
import './Home.css';

function Home3D() {
  const { avatar3D, currentOutfit } = useAvatar();
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pose, setPose] = useState('neutral');

  const handleRotate = (direction) => {
    setRotation(rotation + (direction === 'left' ? -45 : 45));
  };

  const poses = ['neutral', 'casual', 'confident', 'walking'];

  return (
    <div className="home-container home-3d">
      <header className="home-header">
        <h1>Avatar Studio</h1>
        <Link to="/settings" className="settings-btn">⚙️</Link>
      </header>

      <div className="home-content">
        {/* 3D Avatar Section */}
        <div className="avatar-section-3d">
          <div className="avatar-viewer">
            {avatar3D ? (
              <div 
                className="avatar-3d"
                style={{ 
                  transform: `rotate(${rotation}deg) scale(${zoom})`,
                  transition: 'transform 0.3s ease'
                }}
              >
                <div className="avatar-model">
                  🧍
                  <div className="avatar-label">3D Avatar</div>
                  {currentOutfit && (
                    <div className="outfit-badge">Styled</div>
                  )}
                </div>
              </div>
            ) : (
              <div className="no-avatar">
                <p>No 3D avatar created yet</p>
              </div>
            )}
          </div>

          {/* Avatar Controls */}
          <div className="avatar-controls">
            <div className="control-group">
              <label>Rotate</label>
              <div className="button-group">
                <button onClick={() => handleRotate('left')}>⬅️</button>
                <button onClick={() => handleRotate('right')}>➡️</button>
              </div>
            </div>

            <div className="control-group">
              <label>Zoom</label>
              <input 
                type="range" 
                min="0.8" 
                max="1.5" 
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
              />
            </div>

            <div className="control-group">
              <label>Pose</label>
              <select value={pose} onChange={(e) => setPose(e.target.value)}>
                {poses.map(p => (
                  <option key={p} value={p}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-grid">
          <Link to="/tryon" className="action-card">
            <div className="action-icon">👗</div>
            <h3>Try Outfits</h3>
            <p>Full 3D try-on</p>
          </Link>

          <Link to="/wardrobe" className="action-card">
            <div className="action-icon">👔</div>
            <h3>My Wardrobe</h3>
            <p>Your collection</p>
          </Link>

          <Link to="/stylist" className="action-card">
            <div className="action-icon">✨</div>
            <h3>AI Stylist</h3>
            <p>Smart suggestions</p>
          </Link>

          <Link to="/feed" className="action-card">
            <div className="action-icon">📸</div>
            <h3>Inspiration</h3>
            <p>Fashion feed</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home3D;
