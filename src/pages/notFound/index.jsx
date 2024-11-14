import "./index.scss";
import ButtonVeja from "../../components/vejaButton";

export default function NotFound() {
  return (
    <div className="pagina-notfound">
      <h1>404</h1>
      <p>Pagina não encontrada</p>
      <ButtonVeja linkDestino="/" texto="Voltar a página inicial" />
    </div>
  );
}
