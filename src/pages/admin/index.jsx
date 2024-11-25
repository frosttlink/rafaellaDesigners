import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

export default function Adm() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visualização da senha

  const buttonRef = useRef(null);

  // Função para capturar a tecla "Enter"
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      buttonRef.current.click(); // Simula o clique no botão
    }
  };

  const navigate = useNavigate();

  async function entrar() {
    const usuario = {
      nome: nome,
      senha: senha,
    };
    const url = `http://localhost:5050/entrar`;
    let resp = await axios.post(url, usuario);

    if (resp.data.erro !== undefined) {
      toast.error(resp.data.erro);
    } else {
      toast.success("Login realizado");
      localStorage.setItem("usuario", resp.data.token);
      navigate("/interfaceAdm");
    }
  }

  return (
    <div
      className="adm-pagina"
      tabIndex="0" // Permite que o contêiner capture eventos de teclado
      onKeyDown={handleKeyDown} // Adiciona o evento de teclado
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="fundo">
        <div className="borbo">
          <img className="brabu" src="/assets/images/borboleta.svg" alt="" />
        </div>
        <div className="login">
          <div className="foto">
            <img className="user" src="/assets/images/user.svg" alt="" />
          </div>

          <div className="inputs">
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setNome(e.target.value)}
            />
            <Mail className="iconen" />
          </div>
          <div className="inputs">
            <input
              type={showPassword ? "text" : "password"} // Alterna entre "password" e "text"
              placeholder="Senha"
              onChange={(e) => setSenha(e.target.value)}
            />
            <Lock className="iconem" />
            {/* Ícone para visualizar/ocultar senha */}
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? (
                <EyeOff className="icon-toggle" />
              ) : (
                <Eye className="icon-toggle" />
              )}
            </span>
          </div>
          <button ref={buttonRef} onClick={entrar}>
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}
