import "./index.scss";

export default function Depoimentos() {
  return (
    <div className="depo">
      <img src="/assets/images/depo.svg" alt="" className="depoiments" />
      <img src="/assets/images/faixa.svg" alt="" className="line_one" />
      <img src="/assets/images/olho_depo.svg" alt="" className="olho_depo" />
      <p className="depoimento">
        Lorem ipsum dolor sit amet consectetur. At netus libero sit neque arcu.
        Lacus urna bibendum sagittis sit risus sagittis viverra mattis.
        Adipiscing risus nunc aliquet commodo eu tellus. Magnis pellentesque ut
        consequat posuere id.
        <br />
        <br />
        Lorem ipsum dolor sit amet consectetur. At netus libero sit neque arcu.
        Lacus urna bibendum sagittis sit risus sagittis viverra mattis.
        Adipiscing risus nunc aliquet commodo eu tellus. Magnis pellentesque ut
        consequat posuere id.
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
