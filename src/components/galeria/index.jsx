import React, { useState, useEffect, useCallback } from "react";
import "./index.scss";
import ButtonVeja from "../vejaButton";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function Galeria() {
  const [indiceAtual, setIndiceAtual] = useState(0);

  const fotos = [
    { url: "/assets/images/1.svg" },
    { url: "/assets/images/2.svg" },
    { url: "/assets/images/3.svg" },
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
        <ChevronLeftIcon />

      </button>

      <button onClick={irParaProxima} className="btn-proxima">
      <ChevronRightIcon />

      </button>
      
    </div>
  );
}
