import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import "./index.scss";

export default function Dicas(){
    const location = useLocation();
    const [home, setHome] = useState(true);
  
    useEffect(() => {
      setHome(location.pathname === "/");
    }, [location.pathname]);
    return(
        <div className={`pagina-dicas ${home ? "" : "not-home"}`}>
            <div className="cabeçalho">
            <img className="logo" src="/assets/images/logo.svg" alt="Logo" />
            </div>
            <div className="cartao-dicas">
                <img src="/assets/images/rafaela.png" alt="" />
            </div>

        </div>
    )
}