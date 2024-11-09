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
  X,
} from "lucide-react";
import "./index.scss";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Buffer } from "buffer";
import toast from "react-hot-toast";

export default function InterfaceAdm() {
  const [menuOpcao, setmenuOpcao] = useState("");
  const [menuCompacto, setMenuCompacto] = useState(false);
  const [verFormulario, setVerFormulario] = useState(false);
  const [nomeArquivo, setNomeArquivo] = useState("Nenhum arquivo selecionado");
  const [imagem, setImagem] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    tipo: "",
    valor: "",
    quantidade: "",
    imagem: "",
  });

  const [atendimentoDomicilio, setAtendimentoDomicilio] = useState(false);
  const [agendamentos, setAgendamentos] = useState([]);
  const [novoAgendamento, setNovoAgendamento] = useState({
    nomeCliente: "",
    cepCliente: "",
    servico: "",
    Hora: "",
    data: "",
    endereco: "",
    domicilio: false,
  });

  const [modalAberto, setModalAberto] = useState(false);
  const [modalClientesAberto, setModalClientesAberto] = useState(false);
  const [modalFormularioClientesAberto, setModalFormularioClientesAberto] =
    useState(false);

  const [novoCliente, setNovoCliente] = useState({
    nome: "",
    telefone: "",
    cep: "",
    rua: "",
    casaNumero: "",
  });

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

  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  async function addProduto() {
    let paramCorpo = {
      nome: novoProduto.nome,
      tipo: novoProduto.tipo,
      valor: novoProduto.valor,
      quantidade: novoProduto.quantidade,
      imagem: imagem,
    };
    if (id == undefined) {
      const url = `http://localhost:5050/adicionar/pee?x-access-token=${token}`;
      let resp = await axios.post(url, paramCorpo);
      alert("Produto adicionado. Id: " + resp.data.novoID);
    } else {
      const url = `http://localhost:5050/alterar/pee/${id}?x-access-token=${token}`;
      let resp = await axios.put(url, paramCorpo);

      alert("Produto alterado.");
    }

    const produto = {
      ...novoProduto,
      id: produtos.length + 1,
      preco: parseFloat(novoProduto.valor),
      quantidade: parseInt(novoProduto.quantidade, 10),
      imagem: imagem || "/assets/images/imagemFake.svg",
    };
    setProdutos([...produtos, produto]);
    setVerFormulario(false);
    setNovoProduto({ nome: "", tipo: "", valor: "", quantidade: "" });
    setImagem(null);
  }

  async function addCliente() {
    let paramCorpo = {
      nome: novoCliente.nome,
      telefone: novoCliente.telefone,
      cep: novoCliente.cep,
      rua: novoCliente.rua,
      casaNumero: novoCliente.casaNumero,
    };

    try {
      if (id == undefined) {
        const url = `http://localhost:5050/cliente/pee?x-access-token=${token}`;
        let resp = await axios.post(url, paramCorpo);
        alert("Cliente adicionado. Id: " + resp.data.novoID);
      } else {
        const url = `http://localhost:5050/cliente/pee/${id}?x-access-token=${token}`;
        let resp = await axios.put(url, paramCorpo);
        alert("Cliente Alterado");
      }
    } catch (error) {
      console.log("Erro na requisição:", error);
      if (error.response) {
        console.log("Resposta do servidor:", error.response.data);
        console.log("Status do erro:", error.response.status);
      } else if (error.request) {
        console.log("Erro na requisição:", error.request);
      } else {
        console.log("Erro desconhecido:", error.message);
      }
    }
    

    const cliente = {
      ...novoCliente,
      id: clientes.length + 1,
      nome: (novoCliente.nome),
      celular: parseFloat(novoCliente.telefone),
      cep: parseFloat(novoCliente.cep),
      rua: (novoCliente.rua),
      numero: parseFloat(novoCliente.casaNumero),
    };
    setClientes([... clientes, cliente])
    setModalFormularioClientesAberto(false);
    setNovoProduto({ nome: "", celular: "", cep: "", rua: "", numero: "" });
  }

  // async function addAgendamento() {
  //   try {
  //     let paramCorpo = {
  //       cliente: novoAgendamento.nomeCliente,
  //       cepCliente: novoAgendamento.cepCliente,
  //       servico: novoAgendamento.servico,
  //       Hora: novoAgendamento.Hora,
  //       data: novoAgendamento.data,
  //       domicilio: novoAgendamento.domicilio,
  //     };
  
  //     if (id == undefined) {
  //       // CRIAR
  //       const url = `http://localhost:5050/agendamento/?x-access-token=${token}`;
  //       await axios.post(url, paramCorpo);
  
  //       navigate("/consultar");
  //     } else {
  //       // ALTERAR
  //       const url = `http://localhost:5050/agendamento/${id}?x-access-token=${token}`;
  //       await axios.put(url, paramCorpo);
  
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // }

  async function buscar() {
    const url = `http://localhost:5050/procurar/inner/?x-access-token=${token}`;
    let resp = await axios.get(url);
    console.log(resp.data);
    setNovoProduto(resp.data);
    console.log(produtos);
  }

  function inputChange(e) {
    const { name, value } = e.target;
    setNovoProduto({ ...novoProduto, [name]: value });
  }

  function handleAgendamentoChange(e) {
    const { name, value } = e.target;
    setNovoAgendamento({ ...novoAgendamento, [name]: value });
  }

  function handleClienteChange(e) {
    const { name, value } = e.target;
    setNovoCliente({ ...novoCliente, [name]: value });
  }

  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => setModalAberto(false);

  const abrirModalClientes = () => setModalClientesAberto(true);
  const fecharModalClientes = () => setModalClientesAberto(false);

  const abrirModalFormularioClientesAberto = () =>
    setModalFormularioClientesAberto(true);

  const fecharModalFormularioClientesAberto = () =>
    setModalFormularioClientesAberto(false);

  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("usuario");

    if (token) setToken(token);
  }, []);

  async function sair() {
    localStorage.setItem("usuario", null);
    navigate("/");
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
              onClick={() => setmenuOpcao("clientes")}
              className={menuOpcao === "clientes" ? "active" : ""}
            >
              <UserRound className="icon" /> {!menuCompacto && "Clientes"}
            </li>
          </ul>

          <button onClick={sair} className="sair">
            {!menuCompacto && "Sair"}
          </button>
        </div>

        <div className="formularios">
          {menuOpcao === "agenda" && (
            <div className="listagem-agenda">
              <div className="agendamentos">
                {agendamentos.length === 0 ? (
                  <h4>Nenhum agendamento encontrado</h4>
                ) : (
                  <>
                    <div
                      key={agendamentos[agendamentos.length - 1].id}
                      className="container-agendamento"
                    >
                      <div className="data">
                        <h1>
                          {new Date(
                            agendamentos[agendamentos.length - 1].dataHora,
                          ).getDate()}
                        </h1>
                        <p>
                          {new Date(
                            agendamentos[agendamentos.length - 1].dataHora,
                          ).toLocaleString("pt-BR", { month: "long" })}
                        </p>
                      </div>
                      <div className="content">
                        <h1>{agendamentos[agendamentos.length - 1].servico}</h1>
                        <h3>
                          {agendamentos[agendamentos.length - 1].nomeCliente}
                        </h3>
                        {agendamentos[agendamentos.length - 1].domicilio && (
                          <p>Atendimento a domicilio</p>
                        )}
                      </div>
                    </div>
                  </>
                )}
                <button className="listar" onClick={abrirModal}>
                  Listar todos
                </button>
              </div>

              {modalAberto && (
                <div className="modal">
                  <div className="modal-content">
                    <span className="close" onClick={fecharModal}>
                      <X className="icon-close" />
                    </span>

                    <h2>Todos os Agendamentos</h2>
                    {agendamentos.length === 0 ? (
                      <p>Nenhum agendamento encontrado.</p>
                    ) : (
                      <div className="agendamentos-lista">
                        {agendamentos.map((agendamento) => (
                          <div
                            key={agendamento.id}
                            className="container-agendamento"
                          >
                            <div className="data">
                              <h1>
                                {new Date(agendamento.dataHora).getDate()}
                              </h1>
                              <p>
                                {new Date(agendamento.dataHora).toLocaleString(
                                  "pt-BR",
                                  { month: "long" },
                                )}
                              </p>
                            </div>
                            <div className="content">
                              <h1>{agendamento.servico}</h1>
                              <h3>{agendamento.nomeCliente}</h3>
                              {agendamento.domicilio && (
                                <p>Atendimento a domicilio</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {modalClientesAberto && (
                <div className="listagem-clientes">
                  <div className="lista-produto">
                    <span className="close" onClick={fecharModalClientes}>
                      <X className="icon-close" />
                    </span>
                    <table>
                      <thead>
                        <tr>
                          <th>Nome</th>
                          <th>Celular</th>
                          <th>Ações</th>
                          <th onClick={abrirModalFormularioClientesAberto}>
                            <Link className="add">
                              <Plus className="icon" /> Adicionar
                            </Link>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {novoCliente.length > 0 && 
                          novoCliente?.map((cliente) => (
                            <tr key={cliente.id}>
                            <td>{cliente.nm_cliente}</td>
                            <td>{cliente.ds_telefone}</td>
                            <td className="action">
                              <SquarePen /> <Trash />
                            </td>
                            <td></td>
                          </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {modalFormularioClientesAberto && (
                <div className="listagem-clientes">
                  <div className="lista-produtos">
                    <span
                      className="close"
                      onClick={fecharModalFormularioClientesAberto}
                    >
                      <X className="icon-close" />
                    </span>
                    <div className="inputs">
                      <input
                        type="text"
                        name="nomeClienteModal"
                        placeholder="Nome do cliente"
                        className="nome"
                        required
                        value={novoCliente.nome}
                        onChange={(e) =>
                          setNovoCliente((prev) => ({
                            ...prev,
                            nome: e.target.value,
                          }))
                        }
                      />
                      <input
                        type="text"
                        name="numeroClienteModal"
                        placeholder="Numero do cliente"
                        className="numero"
                        required
                        value={novoCliente.telefone}
                        onChange={(e) =>
                          setNovoCliente((prev) => ({
                            ...prev,
                            telefone: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <center>
                      <button onClick={addCliente} className="cad">
                        Cadastrar
                      </button>
                    </center>
                  </div>
                </div>
              )}

              <div className="adicionar-agenda">
                <form
                  className="agenda-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <input
                    type="text"
                    name="nomeCliente"
                    placeholder="Nome do cliente"
                    className="nome"
                    required
                    value={novoAgendamento.nomeCliente}
                    onChange={handleAgendamentoChange}
                    onClick={abrirModalClientes}
                  />
                  <input
                    type="text"
                    name="numeroCliente"
                    placeholder="Numero do cliente"
                    className="nome"
                    required
                    value={novoAgendamento.numeroCliente}
                    onChange={handleAgendamentoChange}
                  />

                  {atendimentoDomicilio && (
                    <div className="inputs-atendimento">
                      <input
                        type="text"
                        name="cepCliente"
                        placeholder="Nome da rua"
                        className="input-nome-maior"
                        value={novoAgendamento.cepCliente}
                        onChange={handleAgendamentoChange}
                      />

                      <input
                        type="text"
                        name="cepCliente"
                        placeholder="Cep do cliente"
                        className="input-nome"
                        value={novoAgendamento.cepCliente}
                        onChange={handleAgendamentoChange}
                      />

                      <input
                        type="text"
                        name="cepCliente"
                        placeholder="Numero da casa"
                        className="input-nome"
                        value={novoAgendamento.cepCliente}
                        onChange={handleAgendamentoChange}
                      />
                    </div>
                  )}

                  <div className="ser-dat">
                    <input
                      type="text"
                      name="servico"
                      placeholder="Serviço do cliente"
                      className="servico"
                      required
                      value={novoAgendamento.servico}
                      onChange={handleAgendamentoChange}
                    />
                    <input
                      type="datetime-local"
                      name="dataHora"
                      placeholder="Data e hora do serviço"
                      className="dt-hr"
                      required
                      value={novoAgendamento.dataHora}
                      onChange={handleAgendamentoChange}
                    />
                  </div>

                  <div className="atend-for">
                    <div className="int-wrapper">
                      <span className="int-label">Atendimento a domicilio</span>
                      <label className="int">
                        <input
                          type="checkbox"
                          checked={atendimentoDomicilio}
                          onChange={() =>
                            setAtendimentoDomicilio(!atendimentoDomicilio)
                          }
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                  <center>
                    <button className="age">Agendar</button>
                  </center>
                </form>
              </div>
            </div>
          )}

          {menuOpcao === "estoque" && (
            <div className="listagem-estoque">
              {!verFormulario && (
                <div className="barra-pesquisa">
                  <div className="barra">
                    <input type="text" placeholder="Pesquisar..." />
                    <button className="buscar" onClick={buscar}>
                      <Search className="icon" />
                    </button>
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
                      required
                      value={novoProduto.nome}
                      onChange={(e) =>
                        setNovoProduto((prev) => ({
                          ...prev,
                          nome: e.target.value,
                        }))
                      }
                    />
                    <div className="osDiferentes">
                      <input
                        type="text"
                        name="categoria"
                        placeholder="Categoria"
                        className="categoria"
                        required
                        value={novoProduto.tipo}
                        onChange={(e) =>
                          setNovoProduto((prev) => ({
                            ...prev,
                            tipo: e.target.value,
                          }))
                        }
                      />
                      <input
                        type="number"
                        name="preco"
                        placeholder="Preço"
                        className="preco"
                        required
                        value={novoProduto.valor}
                        onChange={(e) =>
                          setNovoProduto((prev) => ({
                            ...prev,
                            valor: e.target.value,
                          }))
                        }
                      />
                      <input
                        type="number"
                        name="quantidade"
                        placeholder="Quantidade"
                        required
                        className="qtd"
                        value={novoProduto.quantidade}
                        onChange={(e) =>
                          setNovoProduto((prev) => ({
                            ...prev,
                            quantidade: e.target.value,
                          }))
                        }
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
                    <button className="reg" onClick={addProduto}>
                      Registrar
                    </button>
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
                      {novoProduto.length > 0 &&
                        novoProduto?.map((produto) => (
                          <tr key={produto.id}>
                            <td className="produto">
                              <img
                                src={
                                  produto.img_produto == null
                                    ? null
                                    : Buffer.from(
                                        produto.img_produto.data,
                                      ).toString()
                                }
                                alt=""
                              />
                              {produto.nm_produto}
                            </td>
                            <td>{produto.tp_produto}</td>
                            <td className="qtd">{produto.qtd_produto}</td>
                            <td>R${Number(produto.vl_produto).toFixed(2)}</td>
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
        </div>
      </div>
    </div>
  );
}
