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
    </div>
  );
}
