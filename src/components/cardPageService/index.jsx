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
        <a
        href="https://api.whatsapp.com/send/?phone=5511975220906&text&type=phone_number&app_absent=0">Agendar</a>
        </div>
        
      </div>
    </div>
  );
}
