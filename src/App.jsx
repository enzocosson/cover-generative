import React, { useState, useEffect } from "react";
import styles from "./App.module.scss";
import { initializeCanvasP5 } from "./CanvasP5";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Pochette from "./Pochette";

const App = () => {
  const [textureUrl, setTextureUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // État de chargement
  const [resetKey, setResetKey] = useState(0); // Clé pour réinitialiser le sketch

  useEffect(() => {
    // Initialisation de P5
    setIsLoading(true); // Démarrage du chargement
    const cleanup = initializeCanvasP5((canvas) => {
      if (canvas) {
        console.log(canvas);
        setTextureUrl(canvas); // Mettre à jour la texture
        setIsLoading(false); // Terminer le chargement
      }
    });

    return cleanup; // Nettoyage lors de la réinitialisation ou du démontage
  }, [resetKey]); // Réinitialise lorsque la clé change

  const handleReset = () => {
    setTextureUrl(null); // Réinitialiser la texture
    setResetKey((prevKey) => prevKey + 1); // Changer la clé pour redémarrer le sketch
  };

  return (
    <div className={styles.app}>
      <div className={styles.controls}>
        <button onClick={handleReset} className={styles.resetButton}>
          Réinitialiser le Sketch
        </button>
      </div>
      <div className={styles.couverture}>
        <Canvas>
          <directionalLight position={[5, 5, 5]} intensity={1.5} color="white" />
          <ambientLight intensity={3.0} color="white" />
          <pointLight position={[0, 5, 0]} intensity={2.0} color="white" />

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            target={[0, 1, -2]}
          />

          {/* Rendre la pochette ou un indicateur de chargement */}
          {isLoading ? (
            <mesh>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial color="gray" />
            </mesh>
          ) : (
            textureUrl && <Pochette textureURL={textureUrl} position={[0, 1, -2]} />
          )}
        </Canvas>
      </div>
    </div>
  );
};

export default App;
