import React, { useState, useEffect } from "react";
import "./index.scss";
import ButtonVeja from "../vejaButton";

export default function Galeria() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const photos = [
    { url: "/assets/images/olho_depo.svg" },
    { url: "/assets/images/.svg" },
    { url: "/assets/images/.svg" },
    { url: "/assets/images/.svg" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === photos.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <div className="gallery">
      {photos.map((photo, index) => (
        <img
          key={index}
          src={photo.url}
          alt={`Foto ${index + 1}`}
          className={`photo ${index === currentIndex ? "active" : ""}`}
        />
      ))}

      <ButtonVeja
        linkDestino="http://instagram.com/rafaella_designers"
        texto="@rafaella_designers"
        className="veja"
      />
    </div>
  );
}
