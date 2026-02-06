import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAvatar } from '../../context/AvatarContext';
import { useUser } from '../../context/UserContext';
import './TryOnStudio.css';

function TryOnStudio() {
  const navigate = useNavigate();
  const { experienceMode } = useUser();
  const { wardrobe, currentOutfit, tryOutfit } = useAvatar();
  const [selectedItems, setSelectedItems] = useState({
    top: null,
    bottom: null,
    dress: null,
    footwear: null
  });
  const [viewMode, setViewMode] = useState('owned'); // 'owned' or 'new'

  const handleSelectItem = (category, item) => {
    setSelectedItems({
      ...selectedItems,
      [category]: item
    });
  };

  const handleTryOutfit = () => {
    const outfit = Object.values(selectedItems).filter(Boolean);
    if (outfit.length > 0) {
      tryOutfit(outfit);
      alert('Outfit applied to your avatar!');
    }
  };

  const handleShopLink = () => {
    alert('Shopping link would open here');
  };

  return (
    <div className="tryon-container">
      <header className="page-header">
        <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
        <h1>Try-On Studio</h1>
        <button onClick={handleTryOutfit} className="apply-btn">
          Apply Outfit
        </button>
      </header>

      <div className="tryon-content">
        {/* Avatar Preview */}
        <div className="preview-section">
          <div className="avatar-display">
            <div className="avatar-icon">
              {experienceMode === '3d' ? '🧍' : '👤'}
            </div>
            {Object.values(selectedItems).some(item => item) && (
              <div className="outfit-preview">
                {selectedItems.top && <div className="outfit-piece">👕 Top</div>}
                {selectedItems.bottom && <div className="outfit-piece">👖 Bottom</div>}
                {selectedItems.dress && <div className="outfit-piece">👗 Dress</div>}
                {selectedItems.footwear && <div className="outfit-piece">👞 Shoes</div>}
              </div>
            )}
          </div>
          <p className="preview-mode">{experienceMode?.toUpperCase()} Mode</p>
        </div>

        {/* Selection Panel */}
        <div className="selection-panel">
          {/* View Mode Tabs */}
          <div className="view-mode-tabs">
            <button 
              className={`mode-tab ${viewMode === 'owned' ? 'active' : ''}`}
              onClick={() => setViewMode('owned')}
            >
              My Wardrobe
            </button>
            <button 
              className={`mode-tab ${viewMode === 'new' ? 'active' : ''}`}
              onClick={() => setViewMode('new')}
            >
              Try New
            </button>
          </div>

          {viewMode === 'owned' ? (
            <>
              {wardrobe.length === 0 ? (
                <div className="empty-selection">
                  <p>No clothes in wardrobe</p>
                  <button onClick={() => navigate('/wardrobe')} className="btn-secondary">
                    Add Clothes
                  </button>
                </div>
              ) : (
                <div className="clothes-grid">
                  {wardrobe.map(item => (
                    <div 
                      key={item.id}
                      className={`clothes-item ${selectedItems[item.category]?.id === item.id ? 'selected' : ''}`}
                      onClick={() => handleSelectItem(item.category, item)}
                    >
                      <div className="clothes-image">
                        {item.image ? (
                          <img src={item.image} alt={item.name} />
                        ) : (
                          <div className="placeholder">👕</div>
                        )}
                      </div>
                      <p className="clothes-name">{item.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="new-clothes-section">
              <div className="coming-soon">
                <div className="icon">🛍️</div>
                <h3>Browse New Clothes</h3>
                <p>Try clothes from partnered brands before buying</p>
                <button onClick={handleShopLink} className="btn-secondary">
                  Coming Soon
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TryOnStudio;
