import { ShieldCheckIcon } from "lucide-react"
import "./index.scss"

export default function CardEncontra() {
  return (
    <div className="card_encontra">
      <ShieldCheckIcon className="icon" />
      <img src="/assets/images/certi.svg" alt="" />
      <p>Tenho certificação em design de sobrancelhas e extensão de cílios, garantindo um atendimento profissional e qualificado.</p>
    </div>
  )
}