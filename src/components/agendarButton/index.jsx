import { Send } from "lucide-react";
import "./index.scss";

export default function AgendarButton() {
  return (
    <button className="agendar">
      <Send className="icon" />
      <a
        target="_blank"
        href="https://api.whatsapp.com/send/?phone=5511975220906&text&type=phone_number&app_absent=0"
      >
        Vamos Agendar
      </a>
    </button>
  );
}
