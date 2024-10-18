import { Facebook, Instagram, Twitter } from "lucide-react";
import "./index.scss"

export default function Rodape() {
  return (
    <div className="comp-rodape">
      <div className="icons">
        <Instagram/>
        <Twitter/>
        <Facebook/>
      </div>
      <p>© Copyright CodeNebula 2024 - Todos os direitos reservados</p>
    </div>
  );
}