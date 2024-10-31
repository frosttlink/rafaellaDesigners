import ButtonVeja from "../vejaButton"
import "./index.scss"

export default function DicasSection() {
  return (
    <div className="dicas" id="dicas">

      <img src="/assets/images/square.svg" alt="" />
      <div className="pele">
        <img src="/assets/images/dica.svg" alt="" />
        
        <p>
          Mantenha sua pele hidratada! Beba pelo menos 2 litros de água por
          dia para manter a pele elástica. Use um hidratante adequado ao seu
          tipo de pele diariamente, especialmente após o banho.
        </p>
        <p className="ult">
          Máscaras hidratantes com ingredientes como aloe vera ou óleo de coco
          são ótimas uma ou duas vezes por semana. Evite banhos quentes, que
          podem ressecar a pele, e prefira banhos mornos. Inclua frutas e
          vegetais ricos em água na sua dieta para ajudar a manter a pele
          saudável. Seguindo essas dicas, você terá uma pele mais radiante!
        </p>

        <ButtonVeja linkDestino="/galeria" tamBotao="140px" texto="Veja mais" />

      </div>

    </div>
  )
}