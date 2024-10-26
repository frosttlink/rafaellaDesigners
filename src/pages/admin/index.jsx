import { Lock, Mail } from 'lucide-react';
import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

export default function Adm(){

    const [nome,setNome] = useState('');
    const [senha,setSenha] = useState('');

    const navigate = useNavigate()
    async function  entrar(){
        const usuario = {
            "nome": nome,
            "senha": senha
        }
        const url = `http://localhost:5050/entrar`
        let resp = await axios.post(url,usuario)

        if(resp.data.erro != undefined){
            toast.error(resp.data.erro);
            
        }
        else{
            toast.success('Login realizado');
            localStorage.setItem("usuario",resp.data.token)
            navigate('/')
            
        }
    
    }
    

    return(
        <div className='adm-pagina'>
            <Toaster
            position="top-center"
            reverseOrder={false}
            />
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
                        <input type="text" placeholder='Email' onChange={e => setNome(e.target.value)} />
                        <Mail className='iconen'/>
                    </div>
                    <div className='inputs'>
                        <input type="text" placeholder='Senha' onChange={e=>setSenha(e.target.value)}/>
                        <Lock className='iconem'/>
                    </div>
                    <button onClick={entrar}>Entrar</button>
                    <center>
                        <Link className='linkado'>Esqueceu a senha?</Link>
                    </center>
                </div>
            </div>
        </div>
    )
}