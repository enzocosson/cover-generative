import React, { useState, useEffect } from "react";
import styles from "./App.module.scss";
import { initializeCanvasP5 } from "./CanvasP5";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Pochette from "./Pochette";
import Header from "./component/Header/Header";
import {
  EffectComposer,
  Vignette,
  Bloom,
  HueSaturation,
  SMAA,
  BrightnessContrast,
} from "@react-three/postprocessing";
import Disque from "./Disque";

const App = () => {
  const [textureUrl, setTextureUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // État de chargement
  const [resetKey, setResetKey] = useState(0); // Clé pour réinitialiser le sketch

  useEffect(() => {
    setIsLoading(true); // Démarrage du chargement
    const cleanup = initializeCanvasP5((canvas) => {
      if (canvas) {
        console.log(canvas);
        setTextureUrl(canvas);
        setIsLoading(false);
      }
    });

    return cleanup;
  }, [resetKey]);

  const handleReset = () => {
    setTextureUrl(null); // Réinitialiser la texture
    setResetKey((prevKey) => prevKey + 1); // Changer la clé pour redémarrer le sketch
  };

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.loader}>
        <img className={styles.hand} src="/images/lhand.png" alt="" />
        <img className={styles.hand} src="/images/rhand.png" alt="" />
      </div>

      <div className={styles.couverture}>
        <div className={styles.gradient}></div>
        <img className={styles.bg} src="/images/bg.png" alt="" />

        {/* <div className={styles.controls}>
        <button onClick={handleReset} className={styles.resetButton}>
          Réinitialiser le Sketch
        </button>
      </div>*/}

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
        <img
          className={styles.purple_art}
          src="/images/purple_art.png"
          alt=""
        />
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

        <Canvas className={styles.canvas__pochette}>
          <directionalLight
            position={[5, 5, 5]}
            intensity={1.5}
            color="white"
          />
          <ambientLight intensity={3.0} color="white" />
          <pointLight position={[0, 5, 0]} intensity={4} color="white" />

          <EffectComposer disableNormalPass multisampling={false}>
            <Bloom
              luminanceThreshold={0.1}
              radius={0.9}
              levels={3}
              intensity={1}
              mipmapBlur
            />
            <Vignette offset={0.3} darkness={0.7} eskil={false} />
            <HueSaturation hue={0} saturation={0.2} />
            <SMAA />
          </EffectComposer>

          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            target={[0, 0, 0]}
          />

          {isLoading ? (
            <mesh>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial color="gray" />
            </mesh>
          ) : (
            textureUrl && (
              <>
                <Pochette
                  textureURL={textureUrl}
                  rotation={[0.2, -2.1, -0.1]}
                  position={[0, -2, 0]}
                  scale={1.5}
                />
                <Disque
                  rotation={[0, -1.8, -0.3]}
                  position={[1.3, -0.6, 0.6]}
                  scale={1.5}/>
              </>
            )
          )}
        </Canvas>
        <button onClick={handleReset} className={styles.button}>
          Générer sa cover
        </button>
      </div>
    </div>
  );
};

export default App;
