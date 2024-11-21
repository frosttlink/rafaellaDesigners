import "./index.scss";

export default function Service(props) {
  return (
    <div className="conteudos">
      <div className={props.classNam}>
        <div className="imge">
          <img src={props.imgBanner} alt="Imagem de fundo" className={props.imgclasse || "img"}  />
        </div>

        <div className="textos">
        <img src={props.imgTexto} alt="Texto da imagem" className="cilio" />
        <p>{props.texto1}</p>
        <p>{props.texto2}</p>
        <button>Agendar</button>
        </div>
        
      </div>
    </div>
  );
}
