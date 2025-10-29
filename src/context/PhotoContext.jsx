import { createContext, useState, useEffect } from "react";

export const PhotoContext = createContext();

export function PhotoProvider({ children }) {
  const [photos, setPhotos] = useState(() => {
    // Inicialmente tenta carregar URLs guardadas localmente
    const saved = localStorage.getItem("photos");
    return saved ? JSON.parse(saved) : [];
  });

  const addPhoto = (newPhoto) => {
    setPhotos((prev) => {
      const updated = [newPhoto, ...prev];
      localStorage.setItem("photos", JSON.stringify(updated)); // opcional: só URLs
      return updated;
    });
  };

  const removePhoto = (index) => {
    setPhotos((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      localStorage.setItem("photos", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <PhotoContext.Provider value={{ photos, addPhoto, removePhoto }}>
      {children}
    </PhotoContext.Provider>
  );
}
