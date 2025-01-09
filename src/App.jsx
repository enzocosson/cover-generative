import React, { useEffect, useState, useRef } from "react";
import ScrollReveal from "scrollreveal";
import styles from "./App.module.scss";
import { initializeCanvasP5 } from "./CanvasP5";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Pochette from "./Pochette";
import Header from "./component/Header/Header";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  EffectComposer,
  Vignette,
  Bloom,
  HueSaturation,
  SMAA,
} from "@react-three/postprocessing";
import Disque from "./Disque";

const App = () => {
  const [textureUrl, setTextureUrl] = useState(null);
  const [resetKey, setResetKey] = useState(0);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const cleanup = initializeCanvasP5((canvas) => {
      if (canvas) {
        console.log(canvas);
        setTextureUrl(canvas);
      }
    });

    return cleanup;
  }, [resetKey]);

  const handleReset = () => {
    setTextureUrl(null);
    setResetKey((prevKey) => prevKey + 1);
  };
  const titre_jul = useRef(null)
  const titre_cover = useRef(null)
  const titre_txt = useRef(null)
  const titre_button = useRef(null)
  const planet = useRef(null);
  const planet2 = useRef(null)
  const word1 = useRef(null)
  const word2 = useRef(null);
  const word3 = useRef(null);
  const word4 = useRef(null);
  const word5 = useRef(null);
  const word6 = useRef(null);
  const word7 = useRef(null);
  const titre_apropos = useRef(null);
  const texte_apropos = useRef(null);
  const track = useRef(null);
  const track_img = useRef(null);
  const track_h2 = useRef(null);
  const track_p1 = useRef(null);
  const track_p2 = useRef(null);
  const track_p3 = useRef(null);
  const track_p4 = useRef(null);
  const track_p5 = useRef(null);
  const rectangle = useRef(null);
  
  
  useEffect(() => {
    if (titre_jul.current) {
      gsap.fromTo(
        [titre_jul.current],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 1.6,
          ease: "power2.inOut",
        }
      );
    };
    if (titre_cover.current) {
      gsap.fromTo(
        [titre_cover.current],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 1.8,
          ease: "power2.inOut",
        }
      );
    };
    if (titre_txt.current) {
      gsap.fromTo(
        [titre_txt.current],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 2,
          ease: "power2.inOut",
        }
      );
    };
    if (titre_button.current) {
      gsap.fromTo(
        [titre_button.current],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 2.2,
          ease: "power2.inOut",
        }
      );
    };
  

    gsap.fromTo(
      [planet.current, planet2.current],
      { opacity: 1, scale: 0.5, rotation: 60 },
      {
        opacity: 1,
        scale: 1,
        rotation: 120, 
        duration: 2,
        delay: 0,
        ease: "power4.out",
    
        scrollTrigger: {
          trigger: planet.current,
          start: "top 90%",
          end: "bottom center",
          scrub: 1,
          toggleActions: "play reset play reset",
        },
      }
    );


    gsap.fromTo(
      [word1.current, word2.current, word3.current, word4.current, word5.current, word6.current, word7.current],
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        delay: 0, 
        ease: "power2.inOut",
        stagger: 0.1, // L'intervalle entre chaque animation (100ms ici)
        scrollTrigger: {
          trigger: planet.current,
          start: "top 60%",
          end: "bottom center",
          scrub: 1,
          toggleActions: "play reset play reset",
        },
      }
    );

    gsap.fromTo(
      [titre_apropos.current, texte_apropos.current],
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        delay: 0, 
        ease: "power2.inOut",
        stagger: 0.1, // L'intervalle entre chaque animation (100ms ici)
        scrollTrigger: {
          trigger: titre_apropos.current,
          start: "top 90%",
          end: "bottom center",
          scrub: 1,
          toggleActions: "play reset play reset",
        },
      }
    );
    gsap.fromTo(
      [track_img.current],
      { x: -300, opacity: 1 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0, 
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: track.current,
          start: "top 90%",
          end: "bottom center",
          scrub: 1,
          toggleActions: "play reset play reset",
        },
      }
    );
    gsap.fromTo(
      [track_h2.current, track_p1.current, track_p2.current, track_p3.current, track_p4.current, track_p5.current],
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0, 
        stagger: 0.1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: track.current,
          start: "top 90%",
          end: "bottom center",
          scrub: 1,
          toggleActions: "play reset play reset",
        },
      }
    );

    gsap.fromTo(
      [rectangle.current],
      { width: "100%", opacity: 1 },
      {
        width: "0%",
        opacity: 1,
        duration: 1,
        delay: 0, 
        stagger: 0.1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: rectangle.current,
          start: "top 90%",
          end: "bottom center",
          scrub: 1,
          toggleActions: "play reset play reset",
        },
      }
    );
    
    
  }, []);


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
        <div className={styles.title}>
          <h1 ref={titre_jul} className="titre_jul">JUL</h1>
          <h2 ref={titre_cover} className="titre_cover">purple gogh</h2>
          <p ref={titre_txt} className="titre_txt">
            Découvrez Purple Gogh, l'univers unique où le flow urbain de JUL
            rencontre la magie des étoiles de Van Gogh. Une expérience musicale
            et artistique inédite.
          </p>
          <a ref={titre_button} href="#" className="title__button">
            Créer sa cover
          </a>
        </div>
        <img
          ref={planet}
          className={`${styles.planet__off} planet`}
          src="/images/planet_off.png"
          alt=""
        />
        <img
          ref={planet2}
          className={`${styles.planet__on} planet2`}
          src="/images/planet_on.png"
          alt=""
        />
        <h1 className={styles.accroche}>
          <span ref={word1}>"Une</span> <span ref={word2}>rencontre</span> <span ref={word3}>inattendue</span> <span ref={word4}>entre</span> <span ref={word5} className={styles.gras}>musique</span> <span ref={word6}>et</span>{" "}
          <span ref={word7} className={styles.gras}>peinture"</span> 
        </h1>
      </div>

      <div className={styles.apropos}>
        <h2 ref={titre_apropos}>À propos de Purple Gogh</h2>
        <p ref={texte_apropos}>
          Avec Purple Gogh, JUL réinvente son univers en s'inspirant de l'audace
          artistique de Van Gogh. Cet album explore la dualité entre la rue et
          les étoiles, entre la brutalité des mots et la douceur des couleurs.
          Chaque morceau est une toile sonore, chaque clip est un tableau
          vivant.
        </p>
      </div>

      <div ref={track} className={styles.track__list}>
        <img
        ref={track_img}
          className={styles.purple_art}
          src="/images/purple_art.png"
          alt=""
        />
        <h2 ref={track_h2}>Une tracklist qui résonne comme une galerie d’art</h2>
        <p ref={track_p1}>#1 Nuit étoilée sur Marseille</p>
        <p ref={track_p2}>#2 Flow et pinceaux</p>
        <p ref={track_p3}>#3 Coups de pinceau, coups de cœur</p>
        <p ref={track_p4}>#4 Purple Dream</p>
        <p ref={track_p5}>#5 Le ciel te regarde</p>
      </div>

      <div className={styles.clip}>
        <div ref={rectangle} className={styles.rectangle}></div>
        <video
          src="/video/clip.mp4"
          className={styles.video}
          autoPlay
          muted
          loop
        />
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
          {textureUrl && (
            <>
              <Pochette
                textureURL={textureUrl}
                rotation={[0.2, -2.1, -0.1]}
                position={[0, -1.5, 0]}
                scale={1.5}
              />
              <Disque
                rotation={[0, -1.8, -0.3]}
                position={[1.3, 0, 0.6]}
                scale={1.5}
              />
            </>
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
