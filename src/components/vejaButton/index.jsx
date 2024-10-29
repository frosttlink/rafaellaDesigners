import { Link } from "react-router-dom";
import "./index.scss";

export default function ButtonVeja(props) {
  const vejaDetalhes = {
    width: props.tamBotao || "323px",
    marginBottom: "280px",
  };

  return (
    <Link to={props.linkDestino || "/"} style={vejaDetalhes} className="veja">
      {props.texto || "textoaqui"}
    </Link>
  );
}
