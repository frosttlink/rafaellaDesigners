import { Send } from "lucide-react"
import "./index.scss"

export default function AgendarButton() {
  return (
    <button className="agendar">
      <Send className="icon" />
      Vamos agendar
    </button>
  )
}