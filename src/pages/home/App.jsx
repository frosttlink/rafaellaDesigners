import "./App.scss";
import { Toaster } from "react-hot-toast";
import Cabecalho from "../../components/header";
import {
  ChevronDown,
  CircleDollarSign,
  ShieldCheckIcon,
  ShoppingBasket,
} from "lucide-react";
import Rodape from "../../components/footer";
import ButtonVeja from "../../components/vejaButton";
import CardService from "../../components/cardService";
import DicasSection from "../../components/dicasSection";
import CardEncontra from "../../components/cardEncontra";
import AgendarButton from "../../components/agendarButton";
import Depoimentos from "../../components/depoimentsSection";

import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <div className="pagina-home">
      <Toaster position="top-center" reverseOrder={false} />
      <Cabecalho />
      <AgendarButton />
      <div className="slogan">
        <img src="/assets/images/busque.svg" alt="" className="busque" />
        <img src="/assets/images/busqueMin.svg" alt="" className="busqueMin" />
        <p>
          Transforme seu olhar com cílios e sobrancelhas perfeitos
          <br />
          Realçamos sua beleza natural, destacando o que há de mais encantador
          em você.
        </p>
        <ButtonVeja
          linkDestino="/galeria"
          tamBotao="140px"
          texto="Veja mais"
          marginBottom="150px"
          className="vejamais"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
         >
          <center>
            <a href="#dicas">
              <ChevronDown className="roll" />
            </a>
          </center>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <DicasSection />
      </motion.div>

      <img src="/assets/images/line_one.svg" alt="" className="line_one" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="slogan-service"
      >
        <img src="/assets/images/services.svg" alt="" />
        <p className="prg-service">
          Oferecemos cuidados especializados para realçar sua beleza, desde
          alongamento de cílios, design de sobrancelhas até epilação. Usamos
          produtos de alta qualidade para garantir resultados duradouros e
          naturais.
        </p>
      </motion.div>

      {isMobile ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="cards"
        >
          <Swiper
            slidesPerView={1}
            spaceBetween={250}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
            }}
          >
            <SwiperSlide>
              <CardService
                caminho="/assets/images/image.svg"
                preco="R$1"
                caminhoServico="/assets/images/cilios.svg"
                texto="Serviço de estética de cílios envolve alongamento, lifting ou tintura para realçar os cílios, tornando-os mais longos, volumosos e definidos, com resultados naturais e duradouros."
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardService
                caminho="/assets/images/image2.svg"
                preco="R$1"
                caminhoServico="/assets/images/sobrancelha.svg"
                texto="Serviço de estética de sobrancelhas inclui design, micropigmentação ou tintura para definir e realçar o formato das sobrancelhas, garantindo uma aparência harmoniosa e bem cuidada."
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardService
                caminho="/assets/images/image3.svg"
                preco="R$1"
                caminhoServico="/assets/images/epilacao.svg"
                texto="A epilação é o processo de remoção dos pelos pela raiz, utilizando métodos como cera quente, pinça, ou aparelhos elétricos. Ao contrário da depilação, que apenas corta o pelo na superfície."
              />
            </SwiperSlide>
          </Swiper>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="cards"
        >
          <CardService
            caminho="/assets/images/image.svg"
            preco="R$1"
            caminhoServico="/assets/images/cilios.svg"
            texto="Serviço de estética de cílios envolve alongamento, lifting ou tintura para realçar os cílios, tornando-os mais longos, volumosos e definidos, com resultados naturais e duradouros."
          />
          <CardService
            caminho="/assets/images/image2.svg"
            preco="R$1"
            caminhoServico="/assets/images/sobrancelha.svg"
            texto="Serviço de estética de sobrancelhas inclui design, micropigmentação ou tintura para definir e realçar o formato das sobrancelhas, garantindo uma aparência harmoniosa e bem cuidada."
          />
          <CardService
            caminho="/assets/images/image3.svg"
            preco="R$1"
            caminhoServico="/assets/images/epilacao.svg"
            texto="A epilação é o processo de remoção dos pelos pela raiz, utilizando métodos como cera quente, pinça, ou aparelhos elétricos. Ao contrário da depilação, que apenas corta o pelo na superfície."
          />
        </motion.div>
      )}
      <center>
        <ButtonVeja linkDestino="/servicos" texto="Veja os detalhes" />
      </center>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Depoimentos />
      </motion.div>

      <img src="/assets/images/line_two.svg" alt="" className="line_two" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="vantagens"
      >
        <div className="encontra">
          <center><img src="/assets/images/encontra.svg" alt="Imagem Encontra"  /></center>
        </div>
          
   

        {isMobile ? (
          <Swiper
            slidesPerView={1}
            spaceBetween={200}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
            }}
            className="cards_encontra"
          >
            <SwiperSlide>
              <CardEncontra
                icone={ShieldCheckIcon}
                imagem="certi.svg"
                texto="Tenho certificação em design de sobrancelhas e extensão de cílios, garantindo um atendimento profissional e qualificado."
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardEncontra
                icone={CircleDollarSign}
                imagem="preco.svg"
                texto="Ofereço serviços de sobrancelhas e cílios com preços acessíveis, sem comprometer a qualidade e o cuidado."
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardEncontra
                icone={ShoppingBasket}
                imagem="produto.svg"
                texto="Uso produtos de qualidade para garantir os melhores resultados em sobrancelhas e cílios, sempre mantendo preços acessíveis."
              />
            </SwiperSlide>
          </Swiper>
        ) : (
          <div className="cards_encontra">
            <CardEncontra
              icone={ShieldCheckIcon}
              imagem="certi.svg"
              texto="Tenho certificação em design de sobrancelhas e extensão de cílios, garantindo um atendimento profissional e qualificado."
            />
            <CardEncontra
              icone={CircleDollarSign}
              imagem="preco.svg"
              texto="Ofereço serviços de sobrancelhas e cílios com preços acessíveis, sem comprometer a qualidade e o cuidado."
            />
            <CardEncontra
              icone={ShoppingBasket}
              imagem="produto.svg"
              texto="Uso produtos de qualidade para garantir os melhores resultados em sobrancelhas e cílios, sempre mantendo preços acessíveis."
            />
          </div>
        )}
      </motion.div>

      <Rodape/>
    </div>
  );
}
