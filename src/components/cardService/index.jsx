import "./index.scss"

export default function CardService(props) {
  return (
    <div className="card">
      <img src={props.caminho || "/assets/images/image.png"} alt="" className="img_card"/>
      <p className="preco">{props.preco || "R$0"}</p>
      <div className="circle"/>
          <img src={props.caminhoServico || "/assets/images/cilios.svg"} alt="" className="cilio"/>
      <p>{props.texto || "Serviço de estética de cílios envolve alongamento, lifting ou tintura para realçar os cílios, tornando-os mais longos, volumosos e definidos, com resultados naturais e duradouros."}</p>
    </div>
  )
}