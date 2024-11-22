import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import "./index.scss";
import Cabecalho from "../../components/header";
import Rodape from "../../components/footer";

export default function Dicas() {
  const location = useLocation();
  const [home, setHome] = useState(true);

  useEffect(() => {
    setHome(location.pathname === "/");
  }, [location.pathname]);

  return (
    <div className={`pagina-dicas ${home ? "" : "not-home"}`}>
      <div className="cabeçalho">
        <Cabecalho/>
      </div>
      
      <div className="secao">

      <div className="cartao-dicas">
        <h1>Cuidados Essenciais para Sua Pele no Verão</h1>
        <img src="/assets/images/rafaela.png" alt="Imagem ilustrativa" />
        <p>
          O verão chegou! E com ele, a necessidade de cuidados extras com a pele. 
          Confira 5 cuidados essenciais para garantir que sua pele fique protegida e saudável:
        </p>
        
        <h2>1 - Protetor solar sempre!</h2>
        <p>
          O protetor solar facial deve ser utilizado todos os dias, especialmente no verão, 
          para proteger a pele dos danos causados pelos raios UVA e UVB. Reaplique de 2 em 2 horas para garantir a proteção.
        </p>

        <h2>2 - Mantenha a rotina de limpeza e hidratação da pele</h2>
        <p>
          A limpeza dupla e a hidratação são fundamentais para garantir uma pele purificada e com viço. 
          Use Água Micelar e Gel de Limpeza Facial, e para hidratação, aposte no Revitalift Hialurônico Sérum Facial.
        </p>

        <h2>3 - Utilize chapéu e guarda-sol</h2>
        <p>
          Proteja sua pele do contato direto com o sol, especialmente nas praias e parques, utilizando acessórios como chapéus e guarda-sóis.
        </p>

        <h2>4 - Beba água e se alimente corretamente</h2>
        <p>
          Manter-se hidratada e consumir alimentos ricos em nutrientes são essenciais para a saúde da pele. 
          Aposte em uma alimentação balanceada e beba bastante água.
        </p>

        <h2>5 - Evite o contato com água quente</h2>
        <p>
          Evite lavar o rosto com água quente, pois ela pode irritar a pele. Prefira água fria ou em temperatura ambiente.
        </p>

       
      
      </div>
    </div>
    
    <Rodape/>
    </div>
  );
}
