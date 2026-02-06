import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [experienceMode, setExperienceMode] = useState(null); // '2d' or '3d'

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setExperienceMode(null);
  };

  const selectExperience = (mode) => {
    setExperienceMode(mode);
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        experienceMode,
        login, 
        logout,
        selectExperience
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
