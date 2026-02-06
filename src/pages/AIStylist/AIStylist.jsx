import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAvatar } from '../../context/AvatarContext';
import './AIStylist.css';

function AIStylist() {
  const navigate = useNavigate();
  const { wardrobe, tryOutfit } = useAvatar();
  const [occasion, setOccasion] = useState('');
  const [mood, setMood] = useState('');
  const [source, setSource] = useState('wardrobe'); // 'wardrobe' or 'new'
  const [suggestions, setSuggestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const occasions = [
    'Casual', 'Party', 'Wedding', 'Business', 'Date Night', 
    'Gym', 'Beach', 'Formal Event', 'Brunch', 'Travel'
  ];

  const moods = [
    'Elegant', 'Sporty', 'Cozy', 'Bold', 'Minimal', 
    'Romantic', 'Edgy', 'Vintage', 'Trendy', 'Classic'
  ];

  const handleGenerate = () => {
    if (!occasion) {
      alert('Please select an occasion');
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const mockSuggestions = [
        {
          id: 1,
          items: ['White Tee', 'Blue Jeans', 'Sneakers'],
          description: 'Perfect casual look for everyday comfort',
          confidence: 95
        },
        {
          id: 2,
          items: ['Black Dress', 'Heels', 'Statement Necklace'],
          description: 'Elegant outfit for special occasions',
          confidence: 88
        },
        {
          id: 3,
          items: ['Blazer', 'White Shirt', 'Trousers'],
          description: 'Professional and polished ensemble',
          confidence: 92
        }
      ];
      setSuggestions(mockSuggestions);
      setIsGenerating(false);
    }, 2000);
  };

  const handleTryOutfit = (suggestion) => {
    tryOutfit(suggestion.items);
    navigate('/tryon');
  };

  return (
    <div className="stylist-container">
      <header className="page-header">
        <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
        <h1>AI Stylist</h1>
        <div style={{ width: '44px' }}></div>
      </header>

      <div className="stylist-content">
        {/* Input Section */}
        <div className="input-section">
          <h2>Tell me about your plans</h2>

          <div className="input-group">
            <label>Occasion *</label>
            <div className="chip-group">
              {occasions.map(occ => (
                <button
                  key={occ}
                  className={`chip ${occasion === occ ? 'chip-active' : ''}`}
                  onClick={() => setOccasion(occ)}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label>Mood / Vibe (Optional)</label>
            <div className="chip-group">
              {moods.map(m => (
                <button
                  key={m}
                  className={`chip ${mood === m ? 'chip-active' : ''}`}
                  onClick={() => setMood(m)}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label>Choose From</label>
            <div className="source-toggle">
              <button
                className={`toggle-btn ${source === 'wardrobe' ? 'active' : ''}`}
                onClick={() => setSource('wardrobe')}
              >
                My Wardrobe
              </button>
              <button
                className={`toggle-btn ${source === 'new' ? 'active' : ''}`}
                onClick={() => setSource('new')}
              >
                Suggest New Clothes
              </button>
            </div>
          </div>

          <button 
            className="btn-generate"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? '✨ Generating...' : '✨ Generate Outfits'}
          </button>
        </div>

        {/* Suggestions Section */}
        {suggestions.length > 0 && (
          <div className="suggestions-section">
            <h2>Suggested Outfits</h2>
            <div className="suggestions-grid">
              {suggestions.map(suggestion => (
                <div key={suggestion.id} className="suggestion-card">
                  <div className="suggestion-preview">
                    <div className="outfit-items">
                      {suggestion.items.map((item, idx) => (
                        <div key={idx} className="outfit-item-badge">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="suggestion-info">
                    <p className="suggestion-description">{suggestion.description}</p>
                    <div className="confidence-bar">
                      <div className="confidence-label">
                        <span>Match</span>
                        <span>{suggestion.confidence}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${suggestion.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                    <button 
                      className="btn-try"
                      onClick={() => handleTryOutfit(suggestion)}
                    >
                      Try This Look
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIStylist;
