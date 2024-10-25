
import { ArrowLeftFromLine, Calendar, Layers, SquarePen, Undo2, UserRound, Image } from "lucide-react"
import "./index.scss"
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Estoque() {
    const [menuOpcao, setmenuOpcao] = useState('');
    const [nomeArquivo, setNomeArquivo] = useState("Nenhum arquivo selecionado")

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setNomeArquivo(file ? file.name : "Nenhuma arquivo selecionado")
    }
    return (
        <div className="estoque-pagina">
            <div className="secao">
                <div className="menu">
                    <header>
                        <img src="/assets/images/borboleta2.svg" alt="" className="borboleta" /> <ArrowLeftFromLine className="min"/>
                    </header>

                    <ul>
                        <li
                            onClick={() => setmenuOpcao('agenda')}
                            className={menuOpcao === 'agenda' ? 'active' : ''}>
                            <Calendar className="icon" />  Agenda
                        </li>
                        <li
                            onClick={() => setmenuOpcao('estoque')}
                            className={menuOpcao === 'estoque' ? 'active' : ''}>
                            <Layers className="icon" />  Estoque
                        </li>
                        <li
                            onClick={() => setmenuOpcao('editar')}
                            className={menuOpcao === 'editar' ? 'active' : ''}>
                            <SquarePen className="icon" />  Editar site
                        </li>
                        <li
                            onClick={() => setmenuOpcao('clientes')}
                            className={menuOpcao === 'clientes' ? 'active' : ''}>
                            <UserRound className="icon" />  Clientes
                        </li>
                    </ul>


                    <button className="sair">Sair</button>

                </div>

                <div className="formularios">
                    {menuOpcao == 'estoque' && (
                        <form className="estoque-form">
                            <Link>
                                <Undo2 className="icon" />
                            </Link>
                            <input type="text" placeholder="Nome do produto" className="nome" />
                            <input type="text" placeholder="Desrcrição do produto" className="descricao" />
                            <div className="osDiferentes">
                                <input type="number" placeholder="Categoria" className="categoria" />
                                <input type="number" placeholder="Preço" className="preco" />
                                <input type="number" placeholder="Quantidade" className="qtd" />
                            </div>
                            <div className="custom-file-input">
                                <input type="file" id="fileInput" className="file-input" onChange={handleFileChange} />
                                <label htmlFor="fileInput">
                                    <span>{nomeArquivo}</span>
                                    <Image className="icon" />
                                </label>
                            </div>
                            <button className="reg">Registrar</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}