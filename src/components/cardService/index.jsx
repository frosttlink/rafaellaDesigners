import "./index.scss"

export default function CardService() {
  return (
    <div className="card">
      <img src="/assets/images/image.png" alt="" className="img_card"/>
      <p className="preco">R$0</p>
      <div className="circle"/>
          <img src="/assets/images/cilios.svg" alt="" className="cilio"/>
      <p>Serviço de estética de cílios envolve alongamento, lifting ou tintura para realçar os cílios, tornando-os mais longos, volumosos e definidos, com resultados naturais e duradouros.</p>
    </div>
  )
}