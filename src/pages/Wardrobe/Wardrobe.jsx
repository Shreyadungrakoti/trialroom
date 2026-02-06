import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAvatar } from '../../context/AvatarContext';
import './Wardrobe.css';

function Wardrobe() {
  const navigate = useNavigate();
  const { wardrobe, addToWardrobe, removeFromWardrobe } = useAvatar();
  const [activeTab, setActiveTab] = useState('all');
  const [isUploading, setIsUploading] = useState(false);

  const categories = ['all', 'tops', 'bottoms', 'dresses', 'footwear', 'accessories'];

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    setIsUploading(true);

    // Simulate upload and processing
    setTimeout(() => {
      files.forEach(file => {
        addToWardrobe({
          id: Date.now() + Math.random(),
          name: file.name,
          category: 'tops', // Auto-categorization would happen here
          image: URL.createObjectURL(file),
          addedAt: new Date()
        });
      });
      setIsUploading(false);
    }, 1500);
  };

  const filteredWardrobe = activeTab === 'all' 
    ? wardrobe 
    : wardrobe.filter(item => item.category === activeTab);

  return (
    <div className="wardrobe-container">
      <header className="page-header">
        <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
        <h1>My Wardrobe</h1>
        <div style={{ width: '44px' }}></div>
      </header>

      <div className="wardrobe-content">
        {/* Upload Section */}
        <div className="upload-section">
          <label className="upload-btn">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              hidden
            />
            {isUploading ? '⏳ Uploading...' : '+ Add Clothes'}
          </label>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.map(category => (
            <button
              key={category}
              className={`tab ${activeTab === category ? 'tab-active' : ''}`}
              onClick={() => setActiveTab(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Wardrobe Grid */}
        {wardrobe.length === 0 ? (
          <div className="empty-wardrobe">
            <div className="empty-icon">👔</div>
            <h3>Your wardrobe is empty</h3>
            <p>Upload your clothes to get started</p>
          </div>
        ) : (
          <div className="wardrobe-grid">
            {filteredWardrobe.map(item => (
              <div key={item.id} className="wardrobe-item">
                <div className="item-image">
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <div className="placeholder-image">👕</div>
                  )}
                </div>
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>{item.category}</p>
                </div>
                <div className="item-actions">
                  <button className="btn-icon" onClick={() => navigate('/tryon')}>
                    Try On
                  </button>
                  <button 
                    className="btn-icon btn-delete" 
                    onClick={() => removeFromWardrobe(item.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wardrobe;
