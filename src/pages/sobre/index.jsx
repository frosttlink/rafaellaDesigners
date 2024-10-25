import '../sobre/index.scss';
import Cabecalho from '../../components/header/index.jsx'
import Rodape from '../../components/footer/index.jsx'
import { Instagram, Send } from 'lucide-react';
import ButtonVeja from '../../components/vejaButton/index.jsx';


export default function Sobre() {

  return (
    <div className='pagina-sobre'>
      <Cabecalho />
      <center>
        <div className='container'>
          <img src="/assets/images/rafaela.svg" alt="" />
          <div className='sobre'>
            <img src="/assets/images/sobreMim.svg" alt="" className='textoSobre' />
            <p>
              Me chamo Rafaella, tenho 18 anos, atualmente
              trabalho na área da beleza como designer de
              sobrancelha e lash designer.
            </p>
            <p>
              Fiz meu curso de designer de sobrancelha em
              janeiro de 2024 e depois de alguns meses fiz o
              curso de extensão de cílios, abri o meu próprio
              salão com 17 anos com muita força de vontade e a
              minha missão é realçar olhares!
            </p>
            <p>“Fazer sobrancelha e cílios é a minha terapia diária ❤”</p>

            <div className="containerRedes">
              <img src="/assets/images/rede.svg" alt="" className='textoSobre' />
              <div className="redes">
                <div>
                  <Instagram className='icon' />
                </div>
                <div>
                  <Send className='icon' />
                </div>
              </div>
            </div>
          </div>
        </div>

        <ButtonVeja texto="Voltar ao site"/>

      </center>
      <Rodape />

    </div>
  )
}