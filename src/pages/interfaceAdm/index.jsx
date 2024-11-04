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
  Edit,
} from "lucide-react";
import "./index.scss";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from 'react';
import { Buffer } from "buffer";


export default function InterfaceAdm() {
  const [menuOpcao, setmenuOpcao] = useState("");
  const [menuCompacto, setMenuCompacto] = useState(false);
  const [verFormulario, setVerFormulario] = useState(false);
  const [nomeArquivo, setNomeArquivo] = useState("Nenhum arquivo selecionado");
  const [imagem, setImagem] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    tipo: "",
    valor: "",
    quantidade: "",
    imagem:""
  });

  const [atendimentoDomicilio, setAtendimentoDomicilio] = useState(false);
  const [agendamentos, setAgendamentos] = useState([]);
  const [novoAgendamento, setNovoAgendamento] = useState({
    nomeCliente: "",
    cepCliente: "",
    servico: "",
    Hora: "",
    data:"",
    endereco: "",
    domicilio: false,
  });

  const [modalAberto, setModalAberto] = useState(false);
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

  const { id } = useParams();
  console.log(id);

  async function addProduto() {
    let paramCorpo = {
      "nome": novoProduto.nome,
      "tipo": novoProduto.tipo,
      "valor": novoProduto.valor,
      "quantidade": novoProduto.quantidade,
      "imagem": imagem
    }
    if (id == undefined){
      const url = `http://4.172.207.208:5009/adicionar/pee?x-access-token=${token}`;
      let resp = await axios.post(url, paramCorpo);
      alert('Produto adicionado. Id: ' + resp.data.novoID);

    } 
    else{
      const url = `http://4.172.207.208:5009/alterar/pee/${id}?x-access-token=${token}`;
      let resp = await axios.put(url, paramCorpo);

      alert("Produto alterado.")
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

  async function addAgendamento() {
    try {
        let paramCorpo = {
          "cliente":novoAgendamento.nomeCliente,
          "cepCliente": novoAgendamento.cepCliente,
          "servico": novoAgendamento.servico,
          "Hora": novoAgendamento.Hora,
          "data": novoAgendamento.data,
          "domicilio": novoAgendamento.domicilio
        }

        if (id == undefined) {
            // CRIAR
            const url = `http://4.172.207.208:5009//agendamento/?x-access-token=${token}`;
            await axios.post(url, paramCorpo);

            navigate('/consultar')
        } else {
            // ALTERAR
            const url = `http://4.172.207.208:5009/agendamento/${id}?x-access-token=${token}`;
            await axios.put(url, paramCorpo);

            navigate('/')
        }
    } catch (error) {
        alert(error.message)
    }
}
  async function buscar(){
    const url = `http://4.172.207.208:5009/procurar/inner/?x-access-token=${token}`;
    let resp = await axios.get(url);
    console.log(resp.data);
    setNovoProduto(resp.data);
    console.log(produtos);
    
  };


  function inputChange(e) {
    const { name, value } = e.target;
    setNovoProduto({ ...novoProduto, [name]: value });
  }

  function handleAgendamentoChange(e) {
    const { name, value } = e.target;
    setNovoAgendamento({ ...novoAgendamento, [name]: value });
  }

  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => setModalAberto(false);

  const [token, setToken] = useState(null); 


  
  useEffect(() => {
    const token = localStorage.getItem('usuario');

    if (token) setToken(token);
}, []);


async function sair(){
  localStorage.setItem("usuario", null)
  navigate('/')
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
                    <div key={agendamentos[agendamentos.length - 1].id} className="container-agendamento" >
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
                    value={novoAgendamento.nomeCliente}
                    onChange={handleAgendamentoChange}
                  />
                  <input
                    type="text"
                    name="numeroCliente"
                    placeholder="Numero do cliente"
                    className="nome"
                    value={novoAgendamento.numeroCliente}
                    onChange={handleAgendamentoChange}
                  />

                  {atendimentoDomicilio && (
                    <input
                      type="text"
                      name="cepCliente"
                      placeholder="CEP do cliente"
                      className="nome"
                      value={novoAgendamento.cepCliente}
                      onChange={handleAgendamentoChange}
                    />
                  )}

                  <div className="ser-dat">
                    <input
                      type="text"
                      name="servico"
                      placeholder="Serviço do cliente"
                      className="servico"
                      value={novoAgendamento.servico}
                      onChange={handleAgendamentoChange}
                    />
                    <input
                      type="datetime-local"
                      name="dataHora"
                      placeholder="Data e hora do serviço"
                      className="dt-hr"
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
                    <input
                      type="text"
                      name="formaPagamento"
                      placeholder="Forma de pagamento"
                      className="forma"
                      value={novoAgendamento.formaPagamento}
                      onChange={handleAgendamentoChange}
                    />
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
                    <button className="buscar" onClick={buscar}><Search className="icon" /></button>
                    
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
                      value={novoProduto.nome} 
                      onChange={e => setNovoProduto(prev => ({ ...prev, nome: e.target.value }))}

                    />
                    <div className="osDiferentes">
                      <input
                        type="text"
                        name="categoria"
                        placeholder="Categoria"
                        className="categoria"
                        value={novoProduto.tipo}
                        onChange={e => setNovoProduto(prev => ({ ...prev, tipo: e.target.value }))}

                      />
                      <input
                        type="number"
                        name="preco"
                        placeholder="Preço"
                        className="preco"
                        value={novoProduto.valor}
                        onChange={e => setNovoProduto(prev => ({ ...prev, valor: e.target.value }))}

                      />
                      <input
                        type="number"
                        name="quantidade"
                        placeholder="Quantidade"
                        className="qtd"
                        value={novoProduto.quantidade}
                        onChange={e => setNovoProduto(prev => ({ ...prev, quantidade: e.target.value }))}

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
                    <button className="reg" onClick={addProduto}>Registrar</button>
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
                  {novoProduto.length > 0 && novoProduto?.map((produto) => (
                    <tr key={produto.id}>
                      <td className="produto">
                        <img src={produto.img_produto == null ? null : Buffer.from(produto.img_produto.data).toString()} alt="" />
                        {produto.nm_produto}
                      </td>
                      <td>{produto.ds_tipo}</td> {/* Mudado de categoria para tipo */}
                      <td className="qtd">{produto.qtd_produto}</td>
                      <td>R${Number(produto.vl_produto).toFixed(2)}</td> {/* Mudado de preco para valor */}
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

          {menuOpcao === "clientes" && (
            <div className="listagem-clientes">
              <div className="lista-produto">
                <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Celular</th>
                      <th>Ações</th>
                      <th>
                        <Link className="add">
                          <Plus className="icon" /> Adicionar
                        </Link>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Leonardo Debora Henrique</td>
                      <td>11 9999-9999</td>
                      <td className="action">
                        <SquarePen /> <Trash />
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
