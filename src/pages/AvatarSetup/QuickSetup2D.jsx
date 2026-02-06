import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAvatar } from '../../context/AvatarContext';
import './AvatarSetup.css';

function QuickSetup2D() {
  const navigate = useNavigate();
  const { create2DAvatar } = useAvatar();
  const [photos, setPhotos] = useState([]);
  const [height, setHeight] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files.slice(0, 2)); // Max 2 photos
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate processing
    setTimeout(() => {
      create2DAvatar({
        photos,
        height,
        createdAt: new Date()
      });
      navigate('/home/2d');
    }, 2000);
  };

  return (
    <div className="setup-container">
      <div className="setup-card">
        <h1>Quick Setup</h1>
        <p className="setup-subtitle">2D Body Snapshot - Fast & Simple</p>

        <form onSubmit={handleSubmit} className="setup-form">
          <div className="form-section">
            <label>Upload Photos</label>
            <p className="form-hint">Upload 1-2 front-facing photos</p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              required
            />
            {photos.length > 0 && (
              <div className="photo-preview">
                {photos.map((photo, index) => (
                  <div key={index} className="photo-item">
                    📷 {photo.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-section">
            <label>Height (Optional)</label>
            <input
              type="text"
              placeholder="e.g., 5'8&quot; or 173cm"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          <div className="setup-features">
            <div className="feature-item">✓ 2D body snapshot</div>
            <div className="feature-item">✓ Fast try-ons</div>
            <div className="feature-item">✓ Quick styling</div>
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            disabled={isProcessing}
          >
            {isProcessing ? 'Creating Your Avatar...' : 'Create 2D Avatar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default QuickSetup2D;
