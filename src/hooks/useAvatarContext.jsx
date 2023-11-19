/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import { Images } from "../images/Images/Images";

// Crear context
const AvatarContext = createContext();

// Crear provider
export const AvatarProvider = ({ children }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(
    localStorage.getItem("selectedAvatar") || Images.avatar_1
  );

  // Actualizar el almacenamiento local cuando cambie el avatar seleccionado
  useEffect(() => {
    localStorage.setItem("selectedAvatar", selectedAvatar);
  }, [selectedAvatar]);

  return (
    <AvatarContext.Provider value={{ selectedAvatar, setSelectedAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
};

// hook personalizado para usar el contexto de avatar
export const useAvatarContext = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error("useAvatar must be used within an AvatarProvider");
  }
  return context;
};