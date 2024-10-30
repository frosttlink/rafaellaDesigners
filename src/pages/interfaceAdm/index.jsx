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
import { Link, useNavigate } from "react-router-dom";

export default function InterfaceAdm() {
  const [menuOpcao, setmenuOpcao] = useState("");
  const [nomeArquivo, setNomeArquivo] = useState("Nenhum arquivo selecionado");
  const [menuCompacto, setMenuCompacto] = useState(false);
  const [verFormulario, setVerFormulario] = useState(false);
  const [imagem, setImagem] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    categoria: "",
    preco: "",
    quantidade: "",
  });

  const navigate = useNavigate();

  const escolherArquivo = (e) => {
    const file = e.target.files[0];
    setNomeArquivo(file ? file.name : "Nenhum arquivo selecionado");
  };

  function alterarImagem(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagem(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function multiFunction(e) {
    escolherArquivo(e);
    alterarImagem(e);
  }

  function inputChange(e) {
    const { name, value } = e.target;
    setNovoProduto({ ...novoProduto, [name]: value });
  }

  function addProduto() {
    const produto = {
      ...novoProduto,
      id: produtos.length + 1,
      preco: parseFloat(novoProduto.preco),
      quantidade: parseInt(novoProduto.quantidade, 10),
      imagem: imagem || "/assets/images/imagemFake.svg",
    };
    setProdutos([...produtos, produto]);
    setVerFormulario(false);
    setNovoProduto({ nome: "", categoria: "", preco: "", quantidade: "" });
    setImagem(null);
  }

  return (
    <div className="interface-adm">
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

          <button onClick={() => navigate("/")} className="sair">
            {!menuCompacto && "Sair"}
          </button>
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

              <div className="adicionar-estoque">
                {verFormulario && (
                  <form
                    className="estoque-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      addProduto();
                    }}
                  >
                    <Link onClick={() => setVerFormulario(false)}>
                      <Undo2 className="icon" />
                    </Link>
                    <input
                      type="text"
                      name="nome"
                      placeholder="Nome do produto"
                      className="nome"
                      value={novoProduto.nome}
                      onChange={inputChange}
                    />
                    <div className="osDiferentes">
                      <input
                        type="text"
                        name="categoria"
                        placeholder="Categoria"
                        className="categoria"
                        value={novoProduto.categoria}
                        onChange={inputChange}
                      />
                      <input
                        type="number"
                        name="preco"
                        placeholder="Preço"
                        className="preco"
                        value={novoProduto.preco}
                        onChange={inputChange}
                      />
                      <input
                        type="number"
                        name="quantidade"
                        placeholder="Quantidade"
                        className="qtd"
                        value={novoProduto.quantidade}
                        onChange={inputChange}
                      />
                    </div>
                    <div className="custom-file-input">
                      <input
                        type="file"
                        id="fileInput"
                        className="file-input"
                        accept="image/*"
                        onChange={multiFunction}
                      />
                      <label htmlFor="fileInput">
                        <span>{nomeArquivo}</span>
                        <Image className="icon" />
                      </label>
                    </div>
                    <button className="reg">Registrar</button>
                  </form>
                )}

                {imagem && (
                  <div className="imagem">
                    <h4>Imagem do produto:</h4>
                    <img id="produto" src={imagem} alt="foto" />
                  </div>
                )}
              </div>

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
                      {produtos.map((produto) => (
                        <tr key={produto.id}>
                          <td className="produto">
                            <img src={produto.imagem} alt="" />
                            {produto.nome}
                          </td>
                          <td>{produto.categoria}</td>
                          <td className="qtd">{produto.quantidade}</td>
                          <td>R${Number(produto.preco).toFixed(2)}</td>
                          <td className="action">
                            <SquarePen /> <Trash />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {menuOpcao === "agenda" && (
            <div className="listagem-agenda">
              <div className="agendamentos">
                <h4>Nenhum horário agendado</h4>
              </div>
              <div className="adicionar-agenda">
                <form className="agenda-form">
                  <input
                    type="text"
                    placeholder="Nome do cliente"
                    className="nome"
                  />
                  <div className="ser-dat">
                    <input
                      type="text"
                      placeholder="Serviço do cliente"
                      className="servico"
                    />
                    <input
                      type="datetime-local"
                      placeholder="Data e hora do serviço"
                      className="dt-hr"
                    />
                  </div>
                  <div className="atend-for">
                    <div className="int-wrapper">
                      <span className="int-label">Atendimento a domicilio</span>
                      <label className="int">
                        <input type="checkbox" value={false} />
                        <span className="slider"></span>
                      </label>
                    </div>
                    <input
                      type="number"
                      placeholder="Forma de pagamento"
                      className="forma"
                    />
                  </div>
                  <center>
                    <button className="age">Agendar</button>
                  </center>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
