import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAvatar } from '../../context/AvatarContext';
import './InspirationFeed.css';

function InspirationFeed() {
  const navigate = useNavigate();
  const { tryOutfit } = useAvatar();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = ['all', 'casual', 'formal', 'party', 'street', 'vintage'];

  // Mock feed data
  const feedItems = [
    {
      id: 1,
      user: 'FashionLover_23',
      avatar: '👤',
      outfit: ['Oversized Blazer', 'White Tee', 'Mom Jeans'],
      likes: 234,
      saves: 89,
      category: 'casual',
      description: 'Effortless chic for weekend vibes'
    },
    {
      id: 2,
      user: 'StyleIcon',
      avatar: '👤',
      outfit: ['Black Dress', 'Statement Belt', 'Heels'],
      likes: 567,
      saves: 203,
      category: 'formal',
      description: 'Classic elegance never goes out of style'
    },
    {
      id: 3,
      user: 'UrbanVibes',
      avatar: '👤',
      outfit: ['Leather Jacket', 'Band Tee', 'Ripped Jeans'],
      likes: 432,
      saves: 156,
      category: 'street',
      description: 'Rock and roll attitude'
    },
    {
      id: 4,
      user: 'MinimalChic',
      avatar: '👤',
      outfit: ['Beige Trench', 'Turtleneck', 'Tailored Pants'],
      likes: 789,
      saves: 301,
      category: 'casual',
      description: 'Less is more'
    },
    {
      id: 5,
      user: 'PartyQueen',
      avatar: '👤',
      outfit: ['Sequin Top', 'Leather Skirt', 'Strappy Heels'],
      likes: 923,
      saves: 412,
      category: 'party',
      description: 'Ready to dance the night away'
    },
    {
      id: 6,
      user: 'RetroStyle',
      avatar: '👤',
      outfit: ['Vintage Blazer', 'High-Waist Jeans', 'Loafers'],
      likes: 345,
      saves: 167,
      category: 'vintage',
      description: '70s inspired perfection'
    }
  ];

  const filteredFeed = activeFilter === 'all' 
    ? feedItems 
    : feedItems.filter(item => item.category === activeFilter);

  const handleTryLook = (outfit) => {
    tryOutfit(outfit.outfit);
    navigate('/tryon');
  };

  const handleSave = (id) => {
    alert('Outfit saved to your collection!');
  };

  return (
    <div className="feed-container">
      <header className="page-header">
        <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
        <h1>Inspiration Feed</h1>
        <div style={{ width: '44px' }}></div>
      </header>

      <div className="feed-content">
        {/* Filters */}
        <div className="feed-filters">
          {filters.map(filter => (
            <button
              key={filter}
              className={`filter-chip ${activeFilter === filter ? 'filter-active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Feed Grid */}
        <div className="feed-grid">
          {filteredFeed.map(item => (
            <div key={item.id} className="feed-card">
              {/* User Info */}
              <div className="feed-card-header">
                <div className="user-info">
                  <div className="user-avatar">{item.avatar}</div>
                  <span className="username">{item.user}</span>
                </div>
                <button className="btn-follow">Follow</button>
              </div>

              {/* Outfit Preview */}
              <div className="outfit-display">
                <div className="outfit-visual">
                  <div className="visual-icon">👗</div>
                  <div className="outfit-items-list">
                    {item.outfit.map((piece, idx) => (
                      <div key={idx} className="outfit-piece-tag">
                        {piece}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="feed-card-body">
                <p className="outfit-description">{item.description}</p>
                
                {/* Actions */}
                <div className="feed-actions">
                  <div className="action-stats">
                    <span>❤️ {item.likes}</span>
                    <span>💾 {item.saves}</span>
                  </div>
                  <div className="action-buttons">
                    <button 
                      className="btn-icon-action"
                      onClick={() => handleSave(item.id)}
                    >
                      Save
                    </button>
                    <button 
                      className="btn-try-look"
                      onClick={() => handleTryLook(item)}
                    >
                      Try This Look
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InspirationFeed;
