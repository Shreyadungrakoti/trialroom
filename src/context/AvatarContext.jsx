import { createContext, useContext, useState } from 'react';

const AvatarContext = createContext();

export const useAvatar = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('useAvatar must be used within AvatarProvider');
  }
  return context;
};

export const AvatarProvider = ({ children }) => {
  const [avatar2D, setAvatar2D] = useState(null);
  const [avatar3D, setAvatar3D] = useState(null);
  const [wardrobe, setWardrobe] = useState([]);
  const [currentOutfit, setCurrentOutfit] = useState(null);

  const create2DAvatar = (avatarData) => {
    setAvatar2D(avatarData);
  };

  const create3DAvatar = (avatarData) => {
    setAvatar3D(avatarData);
  };

  const addToWardrobe = (clothing) => {
    setWardrobe([...wardrobe, clothing]);
  };

  const removeFromWardrobe = (clothingId) => {
    setWardrobe(wardrobe.filter(item => item.id !== clothingId));
  };

  const tryOutfit = (outfit) => {
    setCurrentOutfit(outfit);
  };

  return (
    <AvatarContext.Provider 
      value={{ 
        avatar2D,
        avatar3D,
        wardrobe,
        currentOutfit,
        create2DAvatar,
        create3DAvatar,
        addToWardrobe,
        removeFromWardrobe,
        tryOutfit
      }}
    >
      {children}
    </AvatarContext.Provider>
  );
};
