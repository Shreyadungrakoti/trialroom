import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './Profile.css';

function Settings() {
  const navigate = useNavigate();
  const { user, logout, experienceMode } = useUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSwitchMode = () => {
    navigate('/experience');
  };

  return (
    <div className="settings-container">
      <header className="page-header">
        <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
        <h1>Settings</h1>
        <div style={{ width: '44px' }}></div>
      </header>

      <div className="settings-content">
        {/* Account Section */}
        <div className="settings-section">
          <h3 className="section-title">Account</h3>
          <div className="settings-list">
            <div className="settings-item">
              <div className="item-info">
                <span className="item-label">Name</span>
                <span className="item-value">{user?.name || 'Not set'}</span>
              </div>
              <button className="btn-edit">Edit</button>
            </div>
            <div className="settings-item">
              <div className="item-info">
                <span className="item-label">Email</span>
                <span className="item-value">{user?.email || 'Not set'}</span>
              </div>
              <button className="btn-edit">Edit</button>
            </div>
            <div className="settings-item">
              <div className="item-info">
                <span className="item-label">Password</span>
                <span className="item-value">••••••••</span>
              </div>
              <button className="btn-edit">Change</button>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="settings-section">
          <h3 className="section-title">Experience</h3>
          <div className="settings-list">
            <div className="settings-item">
              <div className="item-info">
                <span className="item-label">Current Mode</span>
                <span className="item-value">
                  {experienceMode === '3d' ? '3D Avatar Studio' : '2D Quick Try-On'}
                </span>
              </div>
              <button className="btn-edit" onClick={handleSwitchMode}>
                Switch
              </button>
            </div>
            <div className="settings-item">
              <div className="item-info">
                <span className="item-label">Auto-Save Outfits</span>
                <span className="item-value">Enabled</span>
              </div>
              <button className="btn-edit">Toggle</button>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="settings-section">
          <h3 className="section-title">Preferences</h3>
          <div className="settings-list">
            <div className="settings-item">
              <div className="item-info">
                <span className="item-label">Notifications</span>
                <span className="item-value">On</span>
              </div>
              <button className="btn-edit">Manage</button>
            </div>
            <div className="settings-item">
              <div className="item-info">
                <span className="item-label">Privacy</span>
                <span className="item-value">Public</span>
              </div>
              <button className="btn-edit">Change</button>
            </div>
            <div className="settings-item">
              <div className="item-info">
                <span className="item-label">Language</span>
                <span className="item-value">English</span>
              </div>
              <button className="btn-edit">Change</button>
            </div>
          </div>
        </div>

        {/* Data Section */}
        <div className="settings-section">
          <h3 className="section-title">Data & Privacy</h3>
          <div className="settings-list">
            <button className="settings-btn">
              Export My Data
            </button>
            <button className="settings-btn">
              Delete My Avatar
            </button>
            <button className="settings-btn danger">
              Delete Account
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="settings-section">
          <h3 className="section-title">About</h3>
          <div className="settings-list">
            <button className="settings-btn">
              Terms of Service
            </button>
            <button className="settings-btn">
              Privacy Policy
            </button>
            <button className="settings-btn">
              Help & Support
            </button>
            <div className="version-info">
              Version 1.0.0
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Settings;
