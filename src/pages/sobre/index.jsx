import '../sobre/index.scss';
import Cabecalho from '../../components/header/index.jsx'
import Rodape from '../../components/footer/index.jsx';


export default function Sobre(){

    return(
         <div className='pagina-sobre'>
           <Cabecalho/>
         <div className='texto-sobre'>
            <img src="/assets/images/rafaela.svg" alt="" />
         <div className='text'>
         Sobre Mim<br/>
       
         Me chamo Rafaella, tenho 18 anos, atualmente
         trabalho na área da beleza como designer de
         sobrancelha e lash designer.
         <br />
         Fiz meu curso de designer de sobrancelha em
         janeiro de 2024 e depois de alguns meses fiz o
         curso de extensão de cílios, abri o meu próprio
         salão com 17 anos com muita força de vontade e a
         minha missão é realçar olhares!
        <br />  
         “Fazer sobrancelha e cílios é a minha terapia diária ❤”
         </div>
         </div>

        </div>
    )
}