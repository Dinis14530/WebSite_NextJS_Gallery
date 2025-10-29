import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("no-scroll");
    document.body.classList.remove("scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <>
      {/* Container da Home fixo */}
      <div className="page-container">
        <div className="page-frame">
          <div className="home-container">
            <h1>Álbum Digital &lt;3</h1>
            <button className="btn" onClick={() => navigate("/galeria")}>
              Ver Galeria
            </button>
          </div>
        </div>
      </div>

      {/* Relva sempre visível no fundo */}
      <div className="grass"></div>

      {/* Animação fogueira */}
      <dotlottie-wc
        class="lottie-animation"
        src="https://lottie.host/897a0ee9-e863-4a66-90c3-a03cfa59dfd4/ojiKbiNRED.lottie"
        autoplay
        loop
      ></dotlottie-wc>

        <img
        src="/images/imagem1.png"
        alt="Decoração"
        className="home-content"
      />
    </>
  );
}
