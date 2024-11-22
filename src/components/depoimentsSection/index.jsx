import "./index.scss";

export default function Depoimentos() {
  return (
    <div className="depo">
      <img src="/assets/images/depo.svg" alt="" className="depoiments" />
      <img src="/assets/images/faixa.svg" alt="" className="line_one" />
      <p className="depoimento">
        Fiz meu design de sobrancelhas com a Rafaella Designers e o resultado superou todas as minhas expectativas! Ela é extremamente profissional, atenciosa e entende exatamente o que cada cliente precisa. As sobrancelhas ficaram perfeitas, com um formato natural e harmonioso. A qualidade do trabalho e a segurança me impressionar
        <br />
        <br />

      </p>

      <div className="depoidor">
        <div className="circle" />
        <div>
          <h5>Fulana de tal</h5>
          <h6>@instagram</h6>
        </div>
      </div>
    </div>
  );
}
