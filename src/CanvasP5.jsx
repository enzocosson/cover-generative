import React, { useRef, useState, useEffect } from "react";
import p5 from "p5";
import styles from './Canvas.module.scss';

const CanvasP5 = () => {
  const canvasRef = useRef(null); // Référence au canvas
  const [seed, setSeed] = useState(42); // Graine initiale
  const imageRef = useRef(null); // Utiliser une référence pour l'image

  useEffect(() => {
    const sketch = (p) => {
      let particles_a = [];
      let particles_b = [];
      let particles_c = [];
      const nums = 1500;
      const noiseScale = 500;
      let frameCount = 0;

      // Taille de la première planète et position aléatoire
      const planetRadius = 150; 
      const planetPos = p.createVector(
        p.random(0, 250), 
        p.random(0, 250)
      );

      // Taille de la deuxième planète et position aléatoire
      const planetRadiusB = 60; // Planète plus petite
      const planetPosB = p.createVector(
        p.random(250, 500), 
        p.random(250, 500)
      );

      const initializeParticles = () => {
        particles_a = [];
        particles_b = [];
        particles_c = [];
        for (let i = 0; i < nums; i++) {
          particles_a[i] = new Particle(p, p.random(0, p.width), p.random(0, p.height));
          particles_b[i] = new Particle(p, p.random(0, p.width), p.random(0, p.height));
          particles_c[i] = new Particle(p, p.random(0, p.width), p.random(0, p.height));
        }
      };

      p.setup = () => {
        p.randomSeed(seed); 
        p.noiseSeed(seed); 
        p.createCanvas(500, 500).parent(canvasRef.current);
        p.background(21, 8, 50);
        initializeParticles();

        // Charger l'image une seule fois et la stocker dans la référence
        imageRef.current = p.loadImage('/jul.png');
      };

      p.draw = () => {
        p.noStroke();
        p.smooth();
        frameCount++;

        // Dessiner la première planète avec un gradient linéaire
        const grad = p.drawingContext.createLinearGradient(
          planetPos.x - planetRadius, 
          planetPos.y - planetRadius, 
          planetPos.x + planetRadius, 
          planetPos.y + planetRadius
        );
        grad.addColorStop(0, "#7209B7"); 
        grad.addColorStop(1, "#4CC9F0"); 
        p.drawingContext.fillStyle = grad;
        p.beginShape();
        p.ellipse(planetPos.x, planetPos.y, planetRadius * 2, planetRadius * 2);
        p.endShape(p.CLOSE);

        // Dessiner la deuxième planète avec un gradient linéaire
        const gradB = p.drawingContext.createLinearGradient(
          planetPosB.x - planetRadiusB, 
          planetPosB.y - planetRadiusB, 
          planetPosB.x + planetRadiusB, 
          planetPosB.y + planetRadiusB
        );
        gradB.addColorStop(0, "#3A0CA3"); // Couleur de début du dégradé
        gradB.addColorStop(1, "#F72585"); // Couleur de fin du dégradé
        p.drawingContext.fillStyle = gradB;
        p.beginShape();
        p.ellipse(planetPosB.x, planetPosB.y, planetRadiusB * 2, planetRadiusB * 2);
        p.endShape(p.CLOSE);

        // Après 500 frames, les particules sont figées
        if (frameCount > 500) {
          for (let i = 0; i < nums; i++) {
            const radius = p.map(i, 0, nums, 1, 2);
            const alpha = p.map(i, 0, nums, 0, 250);

            p.fill(69, 33, 124, alpha);
            particles_a[i].display(radius);

            p.fill(7, 153, 242, alpha);
            particles_b[i].display(radius);

            p.fill(255, 255, 255, alpha);
            particles_c[i].display(radius);
          }
        } else {
          for (let i = 0; i < nums; i++) {
            const radius = p.map(i, 0, nums, 1, 2);
            const alpha = p.map(i, 0, nums, 0, 250);

            p.fill(69, 33, 124, alpha);
            particles_a[i].move();
            particles_a[i].display(radius);
            particles_a[i].checkEdge();

            p.fill(7, 153, 242, alpha);
            particles_b[i].move();
            particles_b[i].display(radius);
            particles_b[i].checkEdge();

            p.fill(255, 255, 255, alpha);
            particles_c[i].move();
            particles_c[i].display(radius);
            particles_c[i].checkEdge();
          }
        }

        if (imageRef.current) {
          const imageX = (p.width - imageRef.current.width / 2) - 70; 
          const imageY = (p.height - imageRef.current.height / 2) - 60; 
        
          const newWidth = 500;
          const newHeight = (imageRef.current.height / imageRef.current.width) * newWidth;
        
          p.image(imageRef.current, imageX, imageY, newWidth, newHeight);
        }
      };

      function Particle(p, x, y) {
        this.dir = p.createVector(0, 0);
        this.vel = p.createVector(0, 0);
        this.pos = p.createVector(x, y);
        this.speed = 0.4;

        this.move = function () {
          const angle = p.noise(this.pos.x / noiseScale, this.pos.y / noiseScale) * p.TWO_PI * noiseScale;
          this.dir.x = p.cos(angle);
          this.dir.y = p.sin(angle);
          this.vel = this.dir.copy();
          this.vel.mult(this.speed);
          this.pos.add(this.vel);
        };

        this.checkEdge = function () {
          if (this.pos.x > p.width || this.pos.x < 0 || this.pos.y > p.height || this.pos.y < 0) {
            this.pos.x = p.random(50, p.width);
            this.pos.y = p.random(50, p.height);
          }
        };

        this.display = function (r) {
          p.ellipse(this.pos.x, this.pos.y, r, r);
        };
      }
    };

    const p5Instance = new p5(sketch);

    return () => {
      p5Instance.remove();
    };
  }, [seed]); 

  const handleReset = () => {
    setSeed(Math.floor(Math.random() * 100000)); 
  };

  return (
    <div>
      <div ref={canvasRef} className={styles.canvas}></div>
      <button onClick={handleReset} className={styles.regenerateButton}>Régénérer</button>
    </div>
  );
};

export default CanvasP5;
