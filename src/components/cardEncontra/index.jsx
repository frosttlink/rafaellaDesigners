import "./index.scss"

export default function CardEncontra(props) {
  return (
    <div className="card_encontra">
      {props.icone && <props.icone className="icon" />}
      <img src={"/assets/images/" + props.imagem }  alt="" />
      <p>{props.texto}</p>
    </div>
  )
}