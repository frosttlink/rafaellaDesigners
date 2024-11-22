import Cabecalho from "../../components/header";
import "./index.scss";

export default function DetalhesServicos() {
      return (
            <div className="pagina-servicos">
                  <Cabecalho />

                  <div className="conteudos">
                        <div className="container">
                              <img src="/assets/images/imgServicePage.svg" alt="Extensão de Cílios" />
                              <img
                                    src="/assets/images/ciliosServicePage.svg"
                                    alt="Extensão de Cílios"
                                    className="cilio"
                              />
                              <p>
                                    Realçamos sua beleza natural com as melhores técnicas de extensão de cílios. Escolha entre o Volume Brasileiro, Fio a Fio ou Volume Fox para destacar seu olhar com elegância e estilo. Cada técnica é personalizada para atender às suas preferências.
                              </p>
                              <p>
                                    Trabalhamos com materiais de alta qualidade para garantir durabilidade, conforto e segurança. O resultado são cílios perfeitos que se adaptam ao seu dia a dia, seja para um visual discreto ou impactante.
                              </p>
                              
                              <button className="agendare">Agendar</button>
                        </div>
                  </div>

                  <div className="conteudos">
                        <div className="container">
                              <img src="/assets/images/o.svg" alt="Design de Sobrancelhas" />
                              <img
                                    src="/assets/images/sobrancelha.svg"
                                    alt="Design de Sobrancelhas"
                                    className="sobra"
                              />
                              <p>
                                    Nossas técnicas de design de sobrancelhas são pensadas para harmonizar com o formato do seu rosto. Oferecemos o Design Personalizado para moldar suas sobrancelhas com precisão e o Design com Henna para uma definição ainda mais destacada.
                              </p>
                              <p>
                                    Garantimos um atendimento cuidadoso, proporcionando resultados que valorizam sua expressão facial e refletem sua personalidade. Confie em nosso trabalho e sinta-se ainda mais confiante.
                              </p>
                              
                              <button className="agendare">Agendar</button>
                        </div>
                  </div>

                  <div className="conteudos">
                        <div className="container">
                              <img src="/assets/images/t.svg" alt="Epilação" />
                              <img
                                    src="/assets/images/epilacao.svg"
                                    alt="Epilação"
                                    className="epi"
                              />
                              <p>
                                    Nossa epilação é realizada com técnicas suaves e precisas, garantindo a remoção eficaz dos pelos enquanto cuidamos da saúde da sua pele. Utilizamos métodos que minimizam desconfortos e deixam sua pele macia e livre de irritações.
                              </p>
                              <p>
                                    Seja para uma epilação completa ou de áreas específicas, nosso objetivo é oferecer um resultado impecável, respeitando suas preferências e necessidades. Aproveite a sensação de uma pele renovada e bem cuidada.
                              </p>
                              
                              <button className="agendare">Agendar</button>
                        </div>
                  </div>


            </div>
      );
}