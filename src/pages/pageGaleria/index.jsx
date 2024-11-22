import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./index.scss"; // Certifique-se de que o caminho para o arquivo SCSS está correto
import ButtonVeja from "../../components/vejaButton"; // Importação correta
import Galeria from "../../components/galeria"; // Importação correta
import Cabecalho from "../../components/header";

export default function GaleriaPage() {
  return (
    <div className="pagina-galeria">
      <div className="conteudo-galeria">
        <Cabecalho/>
        <Galeria />
        <ButtonVeja
          linkDestino="http://instagram.com/rafaella_designers"
          texto="@rafaella_designers"
          className="veja"
        />
      </div>
    </div>
  );
}
