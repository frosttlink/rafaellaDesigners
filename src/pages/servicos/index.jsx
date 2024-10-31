import Cabecalho from "../../components/header";
import "./index.scss";

export default function DetalhesServicos() {
  return (
    <div className="pagina-servicos">
      <Cabecalho />

      <div className="container">
        <img src="/assets/images/imgServicePage.svg" alt="" />
        <img src="/assets/images/ciliosServicePage.svg" alt="" />
        <p>
          Lorem ipsum dolor sit amet consectetur. Felis nunc proin pellentesque
          mauris in parturient convallis ridiculus. Non pretium sed eu duis
          libero neque arcu mi. Vestibulum tempor lacus morbi a odio imperdiet
          gravida ultricies viverra. Et sagittis sapien nullam scelerisque. In
          egestas sed lectus sed accumsan. Velit enim iaculis id pharetra purus
          aliquet pulvinar elit ac. Venenatis semper commodo non ut leo duis
          fermentum.
        </p>
        <p>
          Pellentesque lacus ligula cras lacus faucibus posuere netus laoreet
          quis. Rhoncus nulla risus urna augue metus placerat volutpat volutpat.
          Purus gravida feugiat sit id viverra ut id aliquam. Morbi iaculis
          feugiat fermentum arcu nulla accumsan amet ut. Aliquam nisl diam id
          blandit tellus fermentum a. Mauris ultrices magna in massa at.
          Volutpat mi consectetur non fringilla leo egestas. Porta egestas
          tortor habitant habitant purus venenatis at accumsan. Risus lacus nisi
          ut vitae. Nulla velit morbi nibh nulla fringilla arcu aliquet. Id
          lacinia mi sit pharetra.
        </p>
        <button>Agendar</button>
      </div>
    </div>
  );
}
