import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useAvatar } from '../../context/AvatarContext';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const { user, experienceMode } = useUser();
  const { wardrobe, avatar2D, avatar3D } = useAvatar();

  const stats = [
    { label: 'Wardrobe Items', value: wardrobe.length, icon: '👔' },
    { label: 'Outfits Created', value: 0, icon: '✨' },
    { label: 'Looks Saved', value: 0, icon: '💾' },
    { label: 'Followers', value: 0, icon: '👥' }
  ];

  return (
    <div className="profile-container">
      <header className="page-header">
        <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
        <h1>Profile</h1>
        <button onClick={() => navigate('/settings')} className="settings-icon">
          ⚙️
        </button>
      </header>

      <div className="profile-content">
        {/* User Info Card */}
        <div className="profile-card">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {user?.name?.charAt(0).toUpperCase() || '👤'}
            </div>
          </div>
          <h2 className="profile-name">{user?.name || 'Guest User'}</h2>
          <p className="profile-email">{user?.email}</p>
          
          <div className="mode-badge">
            {experienceMode === '3d' ? '🎨 3D Avatar Studio' : '⚡ Quick Try-On'}
          </div>

          <div className="avatar-status">
            <div className="status-item">
              <span className="status-label">2D Avatar</span>
              <span className={`status-indicator ${avatar2D ? 'active' : ''}`}>
                {avatar2D ? '✓' : '○'}
              </span>
            </div>
            <div className="status-item">
              <span className="status-label">3D Avatar</span>
              <span className={`status-indicator ${avatar3D ? 'active' : ''}`}>
                {avatar3D ? '✓' : '○'}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button 
            className="action-btn"
            onClick={() => navigate('/wardrobe')}
          >
            <span>👔</span>
            Manage Wardrobe
          </button>
          <button 
            className="action-btn"
            onClick={() => navigate('/feed')}
          >
            <span>📸</span>
            My Shared Looks
          </button>
          <button 
            className="action-btn"
            onClick={() => navigate('/experience')}
          >
            <span>🔄</span>
            Switch Experience
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
