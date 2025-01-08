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
        <Header />
      </div>
    </div>
  );
};

export default App;
