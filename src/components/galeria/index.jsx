import React, { useState, useEffect, useCallback } from "react";
import "./index.scss";
import ButtonVeja from "../vejaButton";

export default function Galeria() {
  const [indiceAtual, setIndiceAtual] = useState(0);

  const fotos = [
    { url: "/assets/images/olho_depo.svg" },
    { url: "/assets/images/square.svg" },
    { url: "/assets/images/image2.svg" },
    { url: "/assets/images/image3.svg" },
  ];


  const irParaProxima = useCallback(() => {
    setIndiceAtual((indiceAnterior) =>
      indiceAnterior === fotos.length - 1 ? 0 : indiceAnterior + 1
    );
  }, [fotos.length]);


  const irParaAnterior = useCallback(() => {
    setIndiceAtual((indiceAnterior) =>
      indiceAnterior === 0 ? fotos.length - 1 : indiceAnterior - 1
    );
  }, [fotos.length]);

 
  useEffect(() => {
    const intervalo = setInterval(irParaProxima, 3000);
    return () => clearInterval(intervalo);
  }, [irParaProxima]); 

  return (
    <div className="galeria">

      
      {fotos.map((foto, indice) => (
        <img
          key={indice}
          src={foto.url}
          alt={`Foto ${indice + 1}`}
          className={`foto ${indice === indiceAtual ? "ativa" : ""}`}
        />
      ))}

    
      <button onClick={irParaAnterior} className="btn-anterior">
        &#8592;
      </button>

      <button onClick={irParaProxima} className="btn-proxima">
        &#8594;
      </button>
      
    </div>
  );
}
