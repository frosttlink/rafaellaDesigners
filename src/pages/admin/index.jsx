import { Lock, Mail } from 'lucide-react';
import './index.scss';
import { Link } from 'react-router-dom';

export default function Adm(){
    return(
        <div className='adm-pagina'>
            
            <div className='fundo'>
                <div className='borbo'>
                    <img className='brabu' src='/assets/images/borboleta.svg' alt="" />
                </div>
                <div className='login'>
                    <div className='foto'>
                        <img className='user' src="/assets/images/user.svg" alt="" />
                        <h1 className='usuario'>@usuario</h1>
                    </div>
                    
                    <div className='inputs'>
                        <input type="text" placeholder='Email'  />
                        <Mail className='iconen'/>
                    </div>
                    <div className='inputs'>
                        <input type="text" placeholder='Senha'/>
                        <Lock className='iconen'/>
                    </div>
                    <button> Entrar</button>
                    <Link>Esqueceu a senha?</Link>
                </div>
            </div>
        </div>
    )
}