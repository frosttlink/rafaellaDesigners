  import { Link } from "react-router-dom";
  import Cabecalho from "../../components/header";
  import "./App.scss";
  import { ChevronDown, CircleDollarSign, ShieldCheckIcon, ShoppingBasket } from "lucide-react";
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
          <ButtonVeja tamBotao="140px" texto="Veja mais" />
          <center>
            <Link>
              <ChevronDown className="roll" />
            </Link>
          </center>
        </div>

        <DicasSection />

        <img src="/assets/images/line_one.svg" alt="" className="line_one" />

        <div className="slogan-service">
          <img src="/assets/images/services.svg" alt="" />
          <p>
            Oferecemos cuidados especializados para realçar sua beleza, desde
            alongamento de cílios, design de sobrancelhas até epilação. Usamos
            produtos de alta qualidade para garantir resultados duradouros e
            naturais.
          </p>
        </div>
        <div className="cards">
          <CardService
            caminho="/assets/images/image.png"
            preco="R$1"
            caminhoServico="/assets/images/cilios.svg"
            texto="Serviço de estética de cílios envolve alongamento, lifting ou tintura para realçar os cílios, tornando-os mais longos, volumosos e definidos, com resultados naturais e duradouros."
          />
          <CardService
            caminho="/assets/images/image2.png"
            preco="R$1"
            caminhoServico="/assets/images/sobrancelha.svg"
            texto="Serviço de estética de sobrancelhas inclui design, micropigmentação ou tintura para definir e realçar o formato das sobrancelhas, garantindo uma aparência harmoniosa e bem cuidada."
          />
          <CardService
            caminho="/assets/images/imag3.png"
            preco="R$1"
            caminhoServico="/assets/images/epilacao.svg"
            texto="A epilação é o processo de remoção dos pelos pela raiz, utilizando métodos como cera quente, pinça, ou aparelhos elétricos. Ao contrário da depilação, que apenas corta o pelo na superfície."
          />
        </div>
        <center>
          {" "}
          <ButtonVeja texto="Veja os detalhes" />{" "}
        </center>

        <div>
          <Depoimentos />
        </div>
        <img src="/assets/images/line_two.svg" alt="" className="line_two" />

        <div className="vantagens">
          <center>
            <img src="/assets/images/encontra.svg" alt="" className="encontra" />
          </center>

          <div className="cards_encontra">
            <CardEncontra 
              icone={ShieldCheckIcon}
              imagem="certi.svg" 
              texto="Tenho certificação em design de sobrancelhas e extensão de cílios, garantindo um atendimento profissional e qualificado." 
            />
            <CardEncontra 
              icone={CircleDollarSign}
              imagem="preco.svg" 
              texto="Ofereço serviços de sobrancelhas e cílios com preços acessíveis, sem comprometer a qualidade e o cuidado." 
            />
            <CardEncontra 
              icone={ShoppingBasket}
              imagem="produto.svg" 
              texto="Uso produtos de qualidade para garantir os melhores resultados em sobrancelhas e cílios, sempre mantendo preços acessíveis."
            />

            <AgendarButton />
          </div>
        </div>

        <Rodape />
      </div>
    );
  }
