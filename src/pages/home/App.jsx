import { Link } from "react-router-dom";
import Cabecalho from "../components/header";
import "./App.scss";
import { ChevronDown } from "lucide-react";

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
        <Link className="veja">Veja mais</Link>
      </div>

      <center>
        <Link>
          <ChevronDown className="roll" />
        </Link>
      </center>

      <div className="dicas">
        <img src="/assets/images/square.svg" alt="" />
        <div className="pele">
          <img src="/assets/images/dica.svg" alt="" />
          <p>
            Mantenha sua pele hidratada! Beba pelo menos 2 litros de água por
            dia para manter a pele elástica. Use um hidratante adequado ao seu
            tipo de pele diariamente, especialmente após o banho.
          </p>
          <p className="ult">
            Máscaras hidratantes com ingredientes como aloe vera ou óleo de coco
            são ótimas uma ou duas vezes por semana. Evite banhos quentes, que
            podem ressecar a pele, e prefira banhos mornos. Inclua frutas e
            vegetais ricos em água na sua dieta para ajudar a manter a pele
            saudável. Seguindo essas dicas, você terá uma pele mais radiante!
          </p>
          <Link className="veja">Veja mais</Link>
        </div>
      </div>

      <img src="/assets/images/line_one.svg" alt="" className="line_one" />

      <div className="slogan-service">
        <img src="/assets/images/services.svg" alt=""/>
        <p>
          Oferecemos cuidados especializados para realçar sua beleza, desde alongamento de cílios, design de sobrancelhas até epilação. Usamos produtos de alta qualidade para garantir resultados duradouros e naturais.
        </p>
      </div>
      <div className="cards">
        <div className="card">
          <img src="/assets/images/image.png" alt="" className="img_card"/>
          <p className="preco">R$0</p>
          <div className="circle"/>
              <img src="/assets/images/cilios.svg" alt="" className="cilio"/>
          <p>Serviço de estética de cílios envolve alongamento, lifting ou tintura para realçar os cílios, tornando-os mais longos, volumosos e definidos, com resultados naturais e duradouros.</p>
        </div>

        <div className="card">
        <img src="/assets/images/image2.png" alt="" className="img_card"/>
        <p className="preco">R$0</p>
        <div className="circle"/>
          <img src="/assets/images/sobrancelha.svg" alt="" className="cilio"/>
          <p>Serviço de estética de sobrancelhas inclui design, micropigmentação ou tintura para definir e realçar o formato das sobrancelhas, garantindo uma aparência harmoniosa e bem cuidada.</p>
        </div>

        <div className="card">
        <img src="/assets/images/imag3.png" alt="" className="img_card"/>
        <p className="preco">R$0</p>
        <div className="circle"/>
          <img src="/assets/images/epilacao.svg" alt="" className="cilio"/>
          <p>A epilação é o processo de remoção dos pelos pela raiz, utilizando métodos como cera quente, pinça, ou aparelhos elétricos. Ao contrário da depilação, que apenas corta o pelo na superfície.</p>
        </div>
      </div>
      <center>
        <Link className="veja_detalhes">Veja os detalhes</Link>
      </center>

      <img src="/assets/images/faixa.svg" alt="" className="line_one" />

    </div>
  );
}
