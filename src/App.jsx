import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { AvatarProvider } from './context/AvatarContext';

// Core Pages
import Landing from './pages/Landing/Landing';
import QuickSetup2D from './pages/AvatarSetup/QuickSetup2D';
import AvatarStudio3DSetup from './pages/AvatarSetup/AvatarStudio3DSetup';
import Home2D from './pages/Home/Home2D';
import Home3D from './pages/Home/Home3D';
import Wardrobe from './pages/Wardrobe/Wardrobe';
import TryOnStudio from './pages/TryOnStudio/TryOnStudio';
import AIStylist from './pages/AIStylist/AIStylist';
import InspirationFeed from './pages/InspirationFeed/InspirationFeed';
import Profile from './pages/Profile/Profile';
import Settings from './pages/Profile/Settings';

import './App.css';

function App() {
  return (
    <UserProvider>
      <AvatarProvider>
        <Router>
          <Routes>
            {/* Landing Page - First Screen */}
            <Route path="/" element={<Landing />} />
            
            {/* Avatar Setup */}
            <Route path="/setup/quick" element={<QuickSetup2D />} />
            <Route path="/setup/studio" element={<AvatarStudio3DSetup />} />
            
            {/* Home Routes */}
            <Route path="/home/2d" element={<Home2D />} />
            <Route path="/home/3d" element={<Home3D />} />
            
            {/* Main Features */}
            <Route path="/wardrobe" element={<Wardrobe />} />
            <Route path="/tryon" element={<TryOnStudio />} />
            <Route path="/stylist" element={<AIStylist />} />
            <Route path="/feed" element={<InspirationFeed />} />
            
            {/* Profile */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>
      </AvatarProvider>
    </UserProvider>
  );
}

export default App;
