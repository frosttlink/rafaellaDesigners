import { Link, useLocation } from "react-router-dom";
import "./index.scss";

export default function Cabecalho() {
  const location = useLocation();

  return (
    <div className="comp-cabecalho">
      <img src="/assets/images/logo.svg" alt="" />
      <div className="navigation">
        <Link className={location.pathname === '/' ? 'active' : ''} to="/">Home</Link>
        <Link className={location.pathname === '/servicos' ? 'active' : ''} to="/servicos">Serviços</Link>
        <Link className={location.pathname === '/sobre' ? 'active' : ''} to="/sobre">Sobre</Link>
      </div>
      <img src="/assets/images/user.svg" alt="" />
    </div>
  );
}
