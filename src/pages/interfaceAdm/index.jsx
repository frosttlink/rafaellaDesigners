import {
  ArrowLeftFromLine,
  Calendar,
  Layers,
  SquarePen,
  Undo2,
  Image,
  Search,
  Filter,
  Tag,
  Plus,
  Trash,
  X,
  Check,
  Pencil,
} from "lucide-react";
import "./index.scss";
import axios from "axios";
import { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Buffer } from "buffer";
import toast, { Toaster } from "react-hot-toast";
import InputMask from "react-input-mask";

export default function InterfaceAdm() {
  const [menuOpcao, setmenuOpcao] = useState("");
  const [menuCompacto, setMenuCompacto] = useState(false);
  const [verFormulario, setVerFormulario] = useState(false);
  const [nomeArquivo, setNomeArquivo] = useState("Nenhum arquivo selecionado");
  const [imagem, setImagem] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtroOrdenacao, setFiltroOrdenacao] = useState("alfabetico");
  const buttonRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      buttonRef.current.click();
    }
  };

  const servicos = [
    "Selecione o serviço",
    "Cílios - Volume Brasileiro",
    "Cílios - Volume Fio a Fio",
    "Cílios - Volume Fox",
    "Sobrancelha - Limpeza",
    "Sobrancelha - Design com Henna",
    "Epilação",
  ];
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    tipo: "",
    valor: "",
    quantidade: "",
    imagem: "" || "/assets/images/imagemFake.svg",
  });

  const [atendimentoDomicilio, setAtendimentoDomicilio] = useState(false);
  const [agendamentos, setAgendamentos] = useState([]);
  const [novoAgendamento, setNovoAgendamento] = useState({
    nomeCliente: "",
    cepCliente: "",
    servico: servicos[0],
    Hora: "",
    data: "",
    endereco: "",
    domicilio: false,
  });

  const [modalAberto, setModalAberto] = useState(false);
  const [modalClientesAberto, setModalClientesAberto] = useState(false);
  const [modalFormularioClientesAberto, setModalFormularioClientesAberto] =
    useState(false);
  const [modalCategoriaAberto, setModalCategoriaAberto] = useState(false);

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

  async function addProduto() {
    let paramCorpo = {
      nome: novoProduto.nome,
      tipo: novoProduto.tipo,
      valor: novoProduto.valor,
      quantidade: novoProduto.quantidade,
      imagem: imagem,
    };

    // Verificar se estamos adicionando um produto novo ou alterando um existente
    if (id === undefined) {
      // Produto novo
      const url = `http://localhost:5050/adicionar/pee?x-access-token=${token}`;
      let resp = await axios.post(url, paramCorpo);
      toast.success("Produto adicionado. Id: " + resp.data.novoID);

      // Adicionando o produto ao estado sem duplicar
      const produto = {
        id_produto: resp.data.novoID, // ID retornado do backend
        nome: novoProduto.nome,
        tipo: novoProduto.tipo,
        valor: novoProduto.valor,
        quantidade: novoProduto.quantidade,
        imagem: imagem || "/assets/images/imagemFake.svg",
      };

      setProdutos((prevProdutos) => [...prevProdutos, produto]);
    } else {
      // Produto existente, alterando
      const url = `http://localhost:5050/alterar/pee/${id}?x-access-token=${token}`;
      let resp = await axios.put(url, paramCorpo);
      toast.success("Produto alterado.");

      // Atualizando a lista de produtos sem duplicação
      setProdutos((prevProdutos) =>
        prevProdutos.map((produto) =>
          produto.id_produto === id ? { ...produto, ...paramCorpo } : produto,
        ),
      );
    }

    // Resetando formulário após a operação
    setVerFormulario(false);
    setNovoProduto({ nome: "", tipo: "", valor: "", quantidade: "" });
    setImagem(null);
    buscar(); 
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
      let resp;
      if (id === undefined) {
        const url = `http://localhost:5050/cliente?x-access-token=${token}`;
        resp = await axios.post(url, paramCorpo);
        toast.success("Cliente adicionado. Id: " + resp.data.idCliente);
      } else {
        const url = `http://localhost:5050/cliente/${id}?x-access-token=${token}`;
        resp = await axios.put(url, paramCorpo);
        toast.success("Cliente Alterado");
      }

      const cliente = {
        ...novoCliente,
        id: resp.data.idCliente,
      };
      setClientes((prevClientes) => [...prevClientes, cliente]);

      setModalFormularioClientesAberto(false);
      setNovoCliente({
        nome: "",
        telefone: "",
        cep: "",
        rua: "",
        casaNumero: "",
      });

      buscarCliente();
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
  }

  const buscarEnderecoPorCEP = async (cep) => {
    if (!cep || cep.length !== 8) {
      toast.error("CEP inválido.");
      return;
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      if (response.data.erro) {
        toast.error("CEP não encontrado.");
        return;
      }

      setNovoAgendamento((prev) => ({
        ...prev,
        rua: response.data.logradouro,
        bairro: response.data.bairro,
        cidade: response.data.localidade,
        uf: response.data.uf,
      }));
    } catch (error) {
      console.log(error);
      toast.error("Erro ao buscar o endereço.");
    }
  };

  const addAgendamento = async () => {
    try {
      const clienteData = {
        nome: novoAgendamento.nomeCliente,
        telefone: novoAgendamento.telefone,
        cep: novoAgendamento.cepCliente,
        rua: novoAgendamento.rua,
        casaNumero: novoAgendamento.numeroCasa,
      };

      let clienteId;
      if (novoAgendamento.idCliente) {
        clienteId = novoAgendamento.idCliente;
      } else {
        const urlCliente = `http://localhost:5050/cliente?x-access-token=${token}`;
        const clienteResponse = await axios.post(urlCliente, clienteData);
        clienteId = clienteResponse.data.id;
      }

      const agendamentoData = {
        data: novoAgendamento.dataHora,
        domicilio: atendimentoDomicilio,
        servico: novoAgendamento.servico,
        idCliente: clienteId,
      };

      const urlAgendamento = `http://localhost:5050/agendamento?x-access-token=${token}`;
      await axios.post(urlAgendamento, agendamentoData);

      const agendamento = {
        ...novoAgendamento,
        id: agendamentos.length + 1,
      };

      setAgendamentos([...agendamentos, agendamento]);
      setVerFormulario(false);
      setNovoAgendamento({
        nomeCliente: "",
        telefone: "",
        cepCliente: "",
        rua: "",
        numeroCasa: "",
        servico: "",
        dataHora: "",
      });

      toast.success("Agendamento realizado com sucesso!");
      buscar();
    } catch (error) {
      console.error("Erro ao agendar:", error);
      toast.error("Erro ao agendar. Tente novamente.");
    }
  };

  async function buscar() {
    try {
      const response = await axios.get(
        `http://localhost:5050/procurar/inner?x-access-token=${token}`,
      );
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }

  async function buscarCliente() {
    try {
      const response = await axios.get(
        `http://localhost:5050/cliente?x-access-token=${token}`,
      );
      setClientes(response.data);
    } catch (error) {
      console.error("Erro ao buscar cliente:", error);
      toast.error("Erro ao buscar cliente.");
    }
  }

  function preencherFormularioComCliente(cliente) {
    setNovoAgendamento({
      ...novoAgendamento,
      nomeCliente: cliente.nm_cliente,
      telefone: cliente.ds_telefone,
    });
    fecharModalClientes();
  }

  function handleAgendamentoChange(e) {
    const { name, value } = e.target;
    setNovoAgendamento({ ...novoAgendamento, [name]: value });
  }

  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => setModalAberto(false);

  const abrirModalClientes = () => setModalClientesAberto(true);
  const fecharModalClientes = () => setModalClientesAberto(false);

  const abrirModalCategoria = () => setModalCategoriaAberto(true);
  const fecharModalCategoria = () => setModalCategoriaAberto(false);

  const abrirModalFormularioClientesAberto = () =>
    setModalFormularioClientesAberto(true);

  const fecharModalFormularioClientesAberto = () => {
    setModalFormularioClientesAberto(false);
    setNovoCliente({
      id_cliente: null,
      nome: "",
      telefone: "",
    });
  };

  const [token, setToken] = useState(null);

  useEffect(() => {
    async function verificarToken() {
      try {
        const token = localStorage.getItem("usuario");
        let url = `http://localhost:5050/verificarToken?x-access-token=${token}`;
        await axios.get(url);

        setToken(token);
      } catch (error) {
        navigate("/");
      }
    }

    verificarToken();
  }, []);

  async function sair() {
    localStorage.setItem("usuario", null);
    navigate("/");
  }

  async function carregarAgendamentos() {
    try {
      let url = `http://localhost:5050/agendamento?x-access-token=${token}`;
      let resp = await axios.get(url);
      setAgendamentos(resp.data);
      console.log(resp.data);
    } catch (erro) {
      alert(erro);
    }
  }

  useEffect(() => {
    if (modalAberto) {
      carregarAgendamentos();
    }
  }, [modalAberto]);

  async function deletarCliente(idCliente) {
    try {
      await axios.delete(
        `http://localhost:5050/cliente/${idCliente}?x-access-token=${token}`,
      );
      toast.success("Cliente deletado com sucesso!");

      setClientes((prev) =>
        prev.filter((cliente) => cliente.id_cliente !== idCliente),
      );

      abrirModalClientes();
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      toast.error("Erro ao deletar cliente.");
    }
  }

  async function deletarProduto(id) {
    try {
      // Excluindo o produto no backend
      await axios.delete(
        `http://localhost:5050/deletar/pee/${id}?x-access-token=${token}`,
      );
      toast.success("Produto deletado com sucesso!");

      // Atualizando o estado local para remover o produto deletado
      setProdutos((prev) => prev.filter((produto) => produto.id !== id));

      // Rebuscando os produtos atualizados do backend
      buscar(); // Essa chamada pode ser redundante se você já tiver atualizado o estado local
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      toast.error("Erro ao deletar produto.");
    }
  }

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5050/procurar/inner?x-access-token=${token}`,
        );
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        toast.error("Erro ao carregar produtos.");
      }
    };

    fetchProdutos();
  }, []);

  async function alterarCliente(id, clienteAtualizado) {
    try {
      await axios.put(`http://localhost:5050/cliente/${id}`, clienteAtualizado);

      setClientes((prevClientes) =>
        prevClientes.map((cliente) =>
          cliente.id_cliente === id
            ? { ...cliente, ...clienteAtualizado }
            : cliente,
        ),
      );

      toast.success("Cliente alterado com sucesso!");

      abrirModalClientes();
      fecharModalFormularioClientesAberto();
    } catch (error) {
      console.error("Erro ao alterar cliente:", error);
      toast.error("Erro ao alterar cliente.");
    }
  }

  async function alterarProduto(id, produtoAtualizado) {
    try {
      await axios.put(
        `http://localhost:5050/alterar/pee/${id}`,
        produtoAtualizado,
      );

      setProdutos((prevProdutos) =>
        prevProdutos.map((produto) =>
          produto.id_produto === id
            ? { ...produto, ...produtoAtualizado }
            : produto,
        ),
      );

      toast.success("Produto alterado com sucesso!");

      setVerFormulario(true);
      setVerFormulario(false);
    } catch (error) {
      console.error("Erro ao alterar produto:", error);
      toast.error("Erro ao alterar produto.");
    }
  }

  const enviarAlteracaoProduto = () => {
    if (novoProduto.id_produto) {
      alterarProduto(novoProduto.id_produto, {
        qtd_produto: novoProduto.quantidade,
        nm_produto: novoProduto.nome,
        tp_produto: novoProduto.tipo,
        vl_produto: novoProduto.valor,
        img_produto: novoProduto.imagem,
      });
    } else {
      addProduto();
    }
  };

  const enviarAlteracao = () => {
    if (novoCliente.id_cliente) {
      alterarCliente(novoCliente.id_cliente, {
        nm_cliente: novoCliente.nome,
        ds_telefone: novoCliente.telefone,
      });
    } else {
      addCliente();
    }
  };

  // Função chamada quando o botão de edição for clicado
  function abrirFormularioAlteracao(idCliente) {
    const clienteParaAlterar = clientes.find(
      (cliente) => cliente.id_cliente === idCliente,
    );

    if (clienteParaAlterar) {
      setNovoCliente({
        id_cliente: clienteParaAlterar.id_cliente,
        nome: clienteParaAlterar.nm_cliente,
        telefone: clienteParaAlterar.ds_telefone,
      });
      abrirModalFormularioClientesAberto();
    }
  }

  function abrirFormularioAlteracaoProduto(idProduto) {
    const produtoParaAlterar = produtos.find(
      (produto) => produto.id_produto === idProduto,
    );

    if (produtoParaAlterar) {
      setNovoProduto({
        id_produto: produtoParaAlterar.id_produto,
        quantidade: produtoParaAlterar.qtd_produto,
        nome: produtoParaAlterar.nm_produto,
        tipo: produtoParaAlterar.tp_produto,
        valor: produtoParaAlterar.vl_produto,
        imagem: produtoParaAlterar.img_produto,
      });
      setVerFormulario(true);
    }
  }

  const marcarComoRealizado = async (idAgendamento, servico) => {
    try {
      await axios.put(`http://localhost:5050/agendamento/${idAgendamento}`, {
        realizado: true,
      });

      await axios.put(`http://localhost:5050/estoque/atualizar`, {
        servico,
      });

      toast.success("Agendamento marcado como realizado e estoque atualizado!");
    } catch (error) {
      console.error(error);
      toast.success("Agendamento reaçizado");
    }
  };

  useEffect(() => {
    if (abrirModalCategoria) {
      async function fetchCategoria() {
        try {
          const resp = await axios.get(
            `http://localhost:5050/categoria?x-access-token=${token}`,
          );
          setCategorias(resp.data);
        } catch (err) {
          console.error("Erro ao buscar categorias", err);
        }
      }
      fetchCategoria();
    }
  }, [abrirModalCategoria]);

  const categoriaClick = async (categoriaSelecionada) => {
    try {
      await axios.delete(`http://localhost:5050/produtos/deletarPorCategoria`, {
        data: { categoria: categoriaSelecionada },
      });

      setProdutos((prevProdutos) =>
        prevProdutos.filter(
          (produto) => produto.categoria !== categoriaSelecionada,
        ),
      );

      toast.success(
        `Produtos da categoria "${categoriaSelecionada}" deletados com sucesso!`,
      );
    } catch (error) {
      console.error("Erro ao deletar os produtos:", error);
      toast.error("Ocorreu um erro ao deletar os produtos da categoria.");
    }
  };

  return (
    <div className="interface-adm">
      <Toaster position="top-center" reverseOrder={false} />
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
                      key={agendamentos[agendamentos.length - 1].id_agendamento}
                      className="container-agendamento"
                    >
                      <div className="data">
                        <h1>
                          {agendamentos[agendamentos.length - 1].dt_agendamento
                            ? new Date(
                                agendamentos[
                                  agendamentos.length - 1
                                ].dt_agendamento,
                              ).getDate()
                            : "Sem data"}
                        </h1>
                        <p>
                          {agendamentos[agendamentos.length - 1].dt_agendamento
                            ? new Date(
                                agendamentos[
                                  agendamentos.length - 1
                                ].dt_agendamento,
                              ).toLocaleString("pt-BR", { month: "long" })
                            : "Sem mês"}
                        </p>
                      </div>
                      <div className="content">
                        <h1>
                          {agendamentos[agendamentos.length - 1].nm_servico ||
                            "Sem serviço"}
                        </h1>
                        {agendamentos[agendamentos.length - 1].bl_domicilio && (
                          <div className="atend">
                            <p>Atendimento a domicilio</p> <Check />
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
                <button className="listar" onClick={abrirModal}>
                  Listar todos
                </button>
              </div>

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
                          <th onClick={buscarCliente}>
                            <Link className="add">
                              <Search className="icon" /> Buscar
                            </Link>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {clientes.map((cliente) => (
                          <tr
                            className="clientesAdd"
                            key={cliente.id_cliente}
                            onClick={() =>
                              preencherFormularioComCliente(cliente)
                            }
                          >
                            <td>{cliente.nm_cliente}</td>
                            <td>{cliente.ds_telefone}</td>
                            <td className="action">
                              <button
                                className="iconAcation"
                                onClick={() =>
                                  abrirFormularioAlteracao(cliente.id_cliente)
                                }
                              >
                                <SquarePen className="iconAcation" />
                              </button>

                              <button
                                className="iconAcation"
                                onClick={() =>
                                  deletarCliente(cliente.id_cliente)
                                }
                              >
                                <Trash className="iconAcation" />
                              </button>
                            </td>
                            <td></td>
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
                      <InputMask
                        mask="(99) 99999-9999"
                        value={novoCliente.telefone}
                        placeholder="Número do cliente"
                        onChange={(e) =>
                          setNovoCliente((prev) => ({
                            ...prev,
                            telefone: e.target.value,
                          }))
                        }
                      >
                        {(inputProps) => (
                          <input
                            {...inputProps}
                            type="text"
                            className="numero"
                            required
                          />
                        )}
                      </InputMask>
                    </div>
                    <center>
                      <button onClick={enviarAlteracao} className="cad">
                        {novoCliente.id_cliente ? "Alterar" : "Cadastrar"}
                      </button>
                    </center>
                  </div>
                </div>
              )}

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
                      <div
                        className={`agendamentos-lista ${
                          agendamentos.length > 5 ? "scrollable" : ""
                        }`}
                      >
                        {agendamentos.map((agendamento) => (
                          <div
                            key={agendamento.id_agendamento}
                            className="container-agendamento"
                          >
                            <div className="data">
                              <h1>
                                {agendamento.dt_agendamento
                                  ? new Date(
                                      agendamento.dt_agendamento,
                                    ).getDate()
                                  : "Sem data"}
                              </h1>
                              <p>
                                {agendamento.dt_agendamento
                                  ? new Date(
                                      agendamento.dt_agendamento,
                                    ).toLocaleString("pt-BR", { month: "long" })
                                  : "Sem mês"}
                              </p>
                            </div>
                            <div className="content">
                              <h1>{agendamento.nm_servico || "Sem serviço"}</h1>
                              {agendamento.bl_domicilio && (
                                <div className="atend">
                                  <p>Atendimento a domicilio</p> <Check />
                                </div>
                              )}
                              <div>
                                <h3>
                                  Nome do cliente: {agendamento.nm_cliente}
                                </h3>
                                <p>
                                  Endereço:{" "}
                                  {agendamento.nm_endereco || "No salão"}
                                </p>
                              </div>
                            </div>
                            <button
                              className="realizado"
                              onClick={() =>
                                marcarComoRealizado(agendamento.id_agendamento)
                              }
                            >
                              Realizado
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="adicionar-agenda">
                <form
                  className="agenda-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    addAgendamento();
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
                    name="telefone"
                    placeholder="Número do cliente"
                    className="nome"
                    required
                    value={novoAgendamento.telefone}
                    onChange={handleAgendamentoChange}
                  />

                  {atendimentoDomicilio && (
                    <div className="inputs-atendimento">
                      <input
                        type="text"
                        name="cepCliente"
                        placeholder="CEP do cliente"
                        className="input-nome"
                        value={novoAgendamento.cepCliente}
                        onChange={(e) => {
                          const cep = e.target.value;
                          setNovoAgendamento((prev) => ({
                            ...prev,
                            cepCliente: cep,
                          }));

                          if (cep.length === 8) {
                            buscarEnderecoPorCEP(cep);
                          }
                        }}
                      />

                      <input
                        type="text"
                        name="rua"
                        placeholder="Nome da rua"
                        className="input-nome-maior"
                        value={novoAgendamento.rua}
                        onChange={handleAgendamentoChange}
                      />

                      <input
                        type="text"
                        name="numeroCasa"
                        placeholder="Número da casa"
                        className="input-nome"
                        value={novoAgendamento.numeroCasa}
                        onChange={handleAgendamentoChange}
                      />
                    </div>
                  )}

                  <div className="ser-dat">
                    <select
                      name="servico"
                      value={novoAgendamento.servico}
                      onChange={(e) =>
                        setNovoAgendamento({
                          ...novoAgendamento,
                          servico: e.target.value,
                        })
                      }
                      className="servico"
                    >
                      {servicos.map((servico, index) => (
                        <option key={index} value={servico}>
                          {servico}
                        </option>
                      ))}
                    </select>

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
                    <button type="submit" className="age">
                      Agendar
                    </button>
                  </center>
                </form>
              </div>
            </div>
          )}

          {menuOpcao === "estoque" && (
            <div className="listagem-estoque">
              {/* Barra de Pesquisa e Filtros */}
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
                    <select
                      className="filtros"
                      value={filtroOrdenacao}
                      onChange={(e) => setFiltroOrdenacao(e.target.value)}
                    >
                      <option value="alfabetico">Ordenar Alfabético</option>
                      <option value="maiorQuantidade">Maior Quantidade</option>
                      <option value="menorQuantidade">Menor Quantidade</option>
                      <option value="maiorPreco">Maior Preço</option>
                      <option value="menorPreco">Menor Preço</option>
                    </select>
                  </div>
                  <button onClick={() => setVerFormulario(true)}>
                    <Plus /> Adicionar Produto
                  </button>
                </div>
              )}

              {/* Modal de Categoria */}
              {modalCategoriaAberto && (
                <div className="modal-overlay">
                  <div className="modal">
                    <h2>Escolha uma Categoria</h2>
                    <ul>
                      {categorias.map((categoria) => (
                        <li
                          key={categoria.categoria}
                          onClick={() => categoriaClick(categoria.categoria)}
                        >
                          {categoria.categoria}
                        </li>
                      ))}
                    </ul>
                    <button onClick={fecharModalCategoria}>Fechar</button>
                  </div>
                </div>
              )}

              {/* Formulário para Adicionar/Alterar Produto */}
              <div className="adicionar-estoque">
                {verFormulario && (
                  <form
                    className="estoque-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      enviarAlteracaoProduto();
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
                      <select
                        name="categoria"
                        required
                        value={novoProduto.tipo}
                        onChange={(e) =>
                          setNovoProduto((prev) => ({
                            ...prev,
                            tipo: e.target.value,
                          }))
                        }
                        className="categoria"
                      >
                        {servicos.map((servico, index) => (
                          <option key={index} value={servico}>
                            {servico}
                          </option>
                        ))}
                      </select>

                      <input
                        type="number"
                        name="preco"
                        placeholder="Preço"
                        className="preco"
                        required
                        value={novoProduto.valor}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          if (value >= 0 || e.target.value === "") {
                            setNovoProduto((prev) => ({
                              ...prev,
                              valor: e.target.value,
                            }));
                          }
                        }}
                      />

                      <input
                        type="number"
                        name="quantidade"
                        placeholder="Quantidade"
                        required
                        className="qtd"
                        value={novoProduto.quantidade}
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10);
                          if (value >= 0 || e.target.value === "") {
                            setNovoProduto((prev) => ({
                              ...prev,
                              quantidade: e.target.value,
                            }));
                          }
                        }}
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
                    <button onClick={enviarAlteracaoProduto} className="reg">
                      {novoProduto.id_produto ? "Alterar" : "Registrar"}
                    </button>
                  </form>
                )}

                {/* Exibição de Imagem do Produto */}
                {imagem && (
                  <div className="imagem">
                    <h4>Imagem do produto:</h4>
                    <img
                      id="produto"
                      src={imagem || "/assets/images/imagemFake.svg"}
                      alt="foto"
                    />
                  </div>
                )}
              </div>

              {/* Lista de Produtos */}
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
                      {produtos.length > 0 &&
                        produtos.map((produto) => (
                          <tr key={produto.id_produto}>
                            <td className="produto">
                              <img
                                src={
                                  produto.img_produto &&
                                  produto.img_produto.data
                                    ? `data:image/jpeg;base64,${Buffer.from(
                                        produto.img_produto.data,
                                      ).toString("base64")}`
                                    : "/assets/images/imagemFake.svg" // Exibe imagem padrão se não houver imagem
                                }
                                alt=""
                              />
                              {produto.nm_produto || "Produto sem nome"}
                            </td>
                            <td>
                              {produto.tp_produto || "Categoria não definida"}
                            </td>
                            <td className="qtd">{produto.qtd_produto || 0}</td>
                            <td>
                              R${Number(produto.vl_produto || 0).toFixed(2)}
                            </td>
                            <td className="action">
                              <button
                                className="iconAcation"
                                onClick={() =>
                                  abrirFormularioAlteracaoProduto(
                                    produto.id_produto,
                                  )
                                }
                              >
                                <SquarePen className="iconAcation" />
                              </button>

                              <button
                                className="iconAcation"
                                onClick={() =>
                                  deletarProduto(produto.id_produto)
                                }
                              >
                                <Trash className="iconAcation" />
                              </button>
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
