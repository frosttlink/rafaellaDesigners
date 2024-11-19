import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./index.scss";

export default function Cabecalho() {
  const location = useLocation();
  const [home, setHome] = useState(true);

  useEffect(() => {
    setHome(location.pathname === "/");
  }, [location.pathname]);

  return (
    <div className={`comp-cabecalho ${home ? "" : "not-home"}`}>
      <img className="logo" src="/assets/images/logo.svg" alt="Logo" />
      <div className="navigation">
        <Link className={home ? "active" : ""} to="/">
          Home
        </Link>
        <Link
          className={location.pathname === "/servicos" ? "active" : ""}
          to="/servicos"
        >
          Serviços
        </Link>
        <Link
          className={location.pathname === "/sobre" ? "active" : ""}
          to="/sobre"
        >
          Sobre
        </Link>
      </div>
      <Link className="adm" to="/adm">
        <img src="/assets/images/user.svg" alt="Admin" />
      </Link>
    </div>
  );
}
