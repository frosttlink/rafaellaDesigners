import {
  ArrowLeftFromLine,
  Calendar,
  Layers,
  SquarePen,
  Undo2,
  UserRound,
  Image,
  Search,
  Filter,
  Tag,
  Plus,
  Trash,
} from "lucide-react";
import "./index.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Estoque() {
  const [menuOpcao, setmenuOpcao] = useState("");
  const [nomeArquivo, setNomeArquivo] = useState("Nenhum arquivo selecionado");
  const [menuCompacto, setMenuCompacto] = useState(false);
  const [verFormulario, setVerFormulario] = useState(false); 

  const escolherArquivo = (e) => {
    const file = e.target.files[0];
    setNomeArquivo(file ? file.name : "Nenhuma arquivo selecionado");
  };

  return (
    <div className="estoque-pagina">
      <div className="secao">
        <div className={`menu ${menuCompacto ? "compacto" : ""}`}>
          <header onClick={() => setMenuCompacto(!menuCompacto)}>
            <img
              src="/assets/images/borboleta2.svg"
              alt=""
              className="borboleta"
            />
            <ArrowLeftFromLine className="min" />
          </header>

          <ul>
            <li
              onClick={() => setmenuOpcao("agenda")}
              className={menuOpcao === "agenda" ? "active" : ""}
            >
              <Calendar className="icon" /> {!menuCompacto && "Agenda"}
            </li>
            <li
              onClick={() => setmenuOpcao("estoque")}
              className={menuOpcao === "estoque" ? "active" : ""}
            >
              <Layers className="icon" /> {!menuCompacto && "Estoque"}
            </li>
            <li
              onClick={() => setmenuOpcao("editar")}
              className={menuOpcao === "editar" ? "active" : ""}
            >
              <SquarePen className="icon" /> {!menuCompacto && "Editar site"}
            </li>
            <li
              onClick={() => setmenuOpcao("clientes")}
              className={menuOpcao === "clientes" ? "active" : ""}
            >
              <UserRound className="icon" /> {!menuCompacto && "Clientes"}
            </li>
          </ul>

          <button className="sair">{!menuCompacto && "Sair"}</button>
        </div>

        <div className="formularios">
          {menuOpcao === "estoque" && (
            <div className="listagem-estoque">
              {!verFormulario && (
                <div className="barra-pesquisa">
                  <div className="barra">
                    <input type="text" placeholder="Pesquisar..." />
                    <Search className="icon" />
                  </div>
                  <div className="acao">
                    <h4>
                      <Filter /> Filtros
                    </h4>
                    <h4>
                      <Tag /> Categorias
                    </h4>
                  </div>
                  <button onClick={() => setVerFormulario(true)}>
                    <Plus /> Adicionar Produto
                  </button>
                </div>
              )}


              {verFormulario && (
                <form className="estoque-form">
                  <Link onClick={() => setVerFormulario(false)}>
                    <Undo2 className="icon" />
                  </Link>
                  <input
                    type="text"
                    placeholder="Nome do produto"
                    className="nome"
                  />
                  <input
                    type="text"
                    placeholder="Descrição do produto"
                    className="descricao"
                  />
                  <div className="osDiferentes">
                    <input
                      type="text"
                      placeholder="Categoria"
                      className="categoria"
                    />
                    <input type="number" placeholder="Preço" className="preco" />
                    <input type="number" placeholder="Quantidade" className="qtd" />
                  </div>
                  <div className="custom-file-input">
                    <input
                      type="file"
                      id="fileInput"
                      className="file-input"
                      onChange={escolherArquivo}
                    />
                    <label htmlFor="fileInput">
                      <span>{nomeArquivo}</span>
                      <Image className="icon" />
                    </label>
                  </div>
                  <button className="reg">Registrar</button>
                </form>
              )}

              {!verFormulario && (
                <div className="lista-produto">
                  <table>
                    <thead>
                      <tr>
                        <th>Produtos</th>
                        <th>Categoria</th>
                        <th>Estoque</th>
                        <th>Preço</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td className="produto">
                          <img src="/assets/images/imagemFake.svg" alt="" />
                          Extensão de cílios
                        </td>
                        <td>Cílios</td>
                        <td className="qtd">21</td>
                        <td>R$70,50</td>
                        <td className="action">
                          <SquarePen /> <Trash />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
