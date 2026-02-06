import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAvatar } from '../../context/AvatarContext';
import './AvatarSetup.css';

function AvatarStudio3DSetup() {
  const navigate = useNavigate();
  const { create3DAvatar } = useAvatar();
  const [photos, setPhotos] = useState({ front: null, side: null, back: null });
  const [measurements, setMeasurements] = useState({
    height: '',
    weight: '',
    bodyType: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePhotoUpload = (position, e) => {
    const file = e.target.files[0];
    setPhotos({ ...photos, [position]: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate 3D avatar generation
    setTimeout(() => {
      create3DAvatar({
        photos,
        measurements,
        createdAt: new Date()
      });
      navigate('/home/3d');
    }, 3000);
  };

  return (
    <div className="setup-container">
      <div className="setup-card setup-card-wide">
        <h1>Avatar Studio Setup</h1>
        <p className="setup-subtitle">3D Avatar - Full Immersive Experience</p>

        <form onSubmit={handleSubmit} className="setup-form">
          <div className="form-section">
            <label>Upload Photos</label>
            <p className="form-hint">Upload 3-6 photos for best results</p>
            
            <div className="photo-upload-grid">
              <div className="upload-box">
                <label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload('front', e)}
                    required
                    hidden
                  />
                  <div className="upload-placeholder">
                    {photos.front ? '✓ Front' : '📷 Front'}
                  </div>
                </label>
              </div>

              <div className="upload-box">
                <label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload('side', e)}
                    required
                    hidden
                  />
                  <div className="upload-placeholder">
                    {photos.side ? '✓ Side' : '📷 Side'}
                  </div>
                </label>
              </div>

              <div className="upload-box">
                <label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload('back', e)}
                    required
                    hidden
                  />
                  <div className="upload-placeholder">
                    {photos.back ? '✓ Back' : '📷 Back'}
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-section">
              <label>Height (Optional)</label>
              <input
                type="text"
                placeholder="e.g., 5'8&quot;"
                value={measurements.height}
                onChange={(e) => setMeasurements({...measurements, height: e.target.value})}
              />
            </div>

            <div className="form-section">
              <label>Weight (Optional)</label>
              <input
                type="text"
                placeholder="e.g., 150 lbs"
                value={measurements.weight}
                onChange={(e) => setMeasurements({...measurements, weight: e.target.value})}
              />
            </div>
          </div>

          <div className="form-section">
            <label>Body Type (Optional)</label>
            <select 
              value={measurements.bodyType}
              onChange={(e) => setMeasurements({...measurements, bodyType: e.target.value})}
            >
              <option value="">Select body type</option>
              <option value="athletic">Athletic</option>
              <option value="slim">Slim</option>
              <option value="average">Average</option>
              <option value="curvy">Curvy</option>
            </select>
          </div>

          <div className="setup-features">
            <div className="feature-item">✓ Body detection & segmentation</div>
            <div className="feature-item">✓ Measurement extraction</div>
            <div className="feature-item">✓ 3D avatar generation</div>
            <div className="feature-item">✓ Persistent avatar</div>
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            disabled={isProcessing}
          >
            {isProcessing ? 'Generating Your 3D Avatar...' : 'Create 3D Avatar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AvatarStudio3DSetup;
