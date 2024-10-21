import { Link } from "react-router-dom";
import Cabecalho from "../../components/header";
import "./App.scss";
import { ChevronDown, Send, } from "lucide-react";
import Rodape from "../../components/footer";
import ButtonVeja from "../../components/vejaButton";
import CardService from "../../components/cardService";
import DicasSection from "../../components/dicasSection";
import CardEncontra from "../../components/cardEncontra";
import AgendarButton from "../../components/agendarButton";
import Depoimentos from "../../components/depoimentsSection";

export default function Home() {
  return (
    <div className="pagina-home">
      <Cabecalho />
      <div className="slogan">
        <img src="/assets/images/busque.svg" alt="" className="busque" />
        <p>
          Transforme seu olhar com cílios e sobrancelhas perfeitos
          <br />
          Realçamos sua beleza natural, destacando o que há de mais encantador
          em você.
        </p>
        <ButtonVeja tamBotao="140px" texto="Veja mais"/>
        <center>
          <Link>
            <ChevronDown className="roll" />
          </Link>
        </center>
      </div>

      <DicasSection/>
      

      <img src="/assets/images/line_one.svg" alt="" className="line_one" />

      <div className="slogan-service">
        <img src="/assets/images/services.svg" alt=""/>
        <p>
          Oferecemos cuidados especializados para realçar sua beleza, desde alongamento de cílios, design de sobrancelhas até epilação. Usamos produtos de alta qualidade para garantir resultados duradouros e naturais.
        </p>
      </div>
      <div className="cards">
        <CardService/>
        <CardService/>
      </div>
      <center> <ButtonVeja texto="Veja os detalhes"/> </center>

      <div><Depoimentos/></div>
      <img src="/assets/images/line_two.svg" alt="" className="line_two" />
      
      <div className="vantagens">
        <center><img src="/assets/images/encontra.svg" alt="" className="encontra"/></center>

        <div className="cards_encontra">
          <CardEncontra/>
          <CardEncontra/>
          <CardEncontra/>
      <AgendarButton/>
        </div>
      </div>


      <Rodape/>

    </div>
  );
}
