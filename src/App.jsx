// src/App.jsx
import React from "react";
import { useEffect } from "react";
import Canvas from "./Canvas";
import styles from "./App.module.scss";
import CanvasP5 from "./CanvasP5";
import Header from "./component/Header/Header";
import Lenis from "lenis";

const App = () => {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className={styles.app}>
      {/* <CanvasP5 /> */}
      <div className={styles.couverture}>
        <div className={styles.gradient}></div>
        <img className={styles.bg} src="/images/bg.png" alt="" />
        <Header />

        <div className={styles.title}>
          <h1>JUL</h1>
          <h2>purple gogh</h2>
          <p>
            Découvrez Purple Gogh, l'univers unique où le flow urbain de JUL
            rencontre la magie des étoiles de Van Gogh. Une expérience musicale
            et artistique inédite.
          </p>
          <a href="#" className={styles.button}>
            Créer sa cover
          </a>
        </div>

        <img
          className={styles.planet__off}
          src="/images/planet_off.png"
          alt=""
        />
        <img className={styles.planet__on} src="/images/planet_on.png" alt="" />

        <h1 className={styles.accroche}>
          "Une rencontre inattendue entre <span>musique</span> et{" "}
          <span>peinture</span> "
        </h1>
      </div>

      <div className={styles.apropos}>
        <h2>À propos de Purple Gogh</h2>
        <p>
          Avec Purple Gogh, JUL réinvente son univers en s'inspirant de l'audace
          artistique de Van Gogh. Cet album explore la dualité entre la rue et
          les étoiles, entre la brutalité des mots et la douceur des couleurs.
          Chaque morceau est une toile sonore, chaque clip est un tableau
          vivant.
        </p>
      </div>

      <div className={styles.track__list}>
        <img className={styles.purple_art} src="/images/purple_art.png" alt="" />
        <h2>Une tracklist qui résonne comme une galerie d’art</h2>
        <p>#1 Nuit étoilée sur Marseille</p>
        <p>#2 Flow et pinceaux</p>
        <p>#3 Coups de pinceau, coups de cœur</p>
        <p>#4 Purple Dream</p>
        <p>#4 Purple Dream</p>
        <p>#5 Le ciel te regarde</p>
      </div>

      <div className={styles.clip}>
        <img src="/images/play.svg" alt="" />
      </div>

      <div className={styles.cover}>
        <h2>Personnalise ta propre cover lors de la précommande !</h2>
        <a href="#" className={styles.button}>
            Créer sa cover
          </a>
      </div>
    </div>
  );
};

export default App;
