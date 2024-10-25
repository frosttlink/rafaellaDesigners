
import { ArrowLeftFromLine, Calendar } from "lucide-react"
import "./index.scss"
import { useState } from "react";

export default function Estoque(){
    const [menuOpcao,setmenuOpcao] = useState('');
    return(
        <div className="estoque-pagina">
            <div className="menu">
                <header><img src="/assets/images/borboleta2.svg" alt="" /><ArrowLeftFromLine /></header>
                
                    <ul>
                        <li onClick={() => setmenuOpcao('estoque')}><Calendar/>  Estoqye</li>
                        <li onClick={() => setmenuOpcao('agenda')}><Calendar/>  Agenda</li>
                        <li><Calendar/>  Agenda</li>
                        <li><Calendar/>  Agenda</li>
                    </ul>


                    

                    <button>Sair</button>
                
            </div>

            <div className="formularios">
                {menuOpcao == 'estoque' && (
                    <form className="estoque-form">
                        <button>voltar</button>
                        <input type="text" placeholder="Nome do produto" />
                        <input type="text" placeholder="Nome do produto" />
                        <input type="text" placeholder="Nome do produto" />
                        <input type="text" placeholder="Nome do produto" />
                        <input type="text" placeholder="Nome do produto" />
                        <input type="text" placeholder="Nome do produto" />
                        <button>Registrar</button>
                    </form>
                )}
            </div>
        </div>
    )
}