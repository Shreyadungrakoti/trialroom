import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './ExperienceSelection.css';

function ExperienceSelection() {
  const navigate = useNavigate();
  const { selectExperience } = useUser();

  const handleExperienceSelect = (mode) => {
    selectExperience(mode);
    if (mode === '2d') {
      navigate('/setup/quick');
    } else {
      navigate('/setup/studio');
    }
  };

  return (
    <div className="experience-container">
      <div className="experience-content">
        <h1>How do you want to try outfits?</h1>
        <p className="experience-subtitle">Choose your preferred experience</p>

        <div className="experience-options">
          {/* Quick Try-On (2D) */}
          <div className="experience-card" onClick={() => handleExperienceSelect('2d')}>
            <div className="card-icon">⚡</div>
            <h2>Quick Try-On</h2>
            <p className="card-description">2D Experience</p>
            <ul className="card-features">
              <li>Fast outfit previews</li>
              <li>Minimal setup</li>
              <li>Best for daily styling</li>
            </ul>
            <button className="btn-card">Start Quick Try-On</button>
          </div>

          {/* Avatar Studio (3D) */}
          <div className="experience-card experience-card-premium" onClick={() => handleExperienceSelect('3d')}>
            <div className="card-badge">Premium</div>
            <div className="card-icon">🎨</div>
            <h2>Avatar Studio</h2>
            <p className="card-description">3D Experience</p>
            <ul className="card-features">
              <li>Full 3D avatar experience</li>
              <li>Rotate, pose, and style</li>
              <li>Premium / immersive mode</li>
            </ul>
            <button className="btn-card btn-card-premium">Enter Avatar Studio</button>
          </div>
        </div>

        <p className="experience-note">You can switch modes later from settings</p>
      </div>
    </div>
  );
}

export default ExperienceSelection;
