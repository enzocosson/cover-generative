import React, { useRef, useEffect } from "react";
import p5 from "p5";

// Classe Complexe
class Complex {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }

  // Additionner des nombres complexes
  add(other) {
    return new Complex(this.real + other.real, this.imaginary + other.imaginary);
  }

  // Soustraire des nombres complexes
  subtract(other) {
    return new Complex(this.real - other.real, this.imaginary - other.imaginary);
  }

  // Multiplier des nombres complexes
  multiply(other) {
    return new Complex(
      this.real * other.real - this.imaginary * other.imaginary,
      this.real * other.imaginary + this.imaginary * other.real
    );
  }

  // Diviser des nombres complexes
  divide(other) {
    const denominator = other.real * other.real + other.imaginary * other.imaginary;
    return new Complex(
      (this.real * other.real + this.imaginary * other.imaginary) / denominator,
      (this.imaginary * other.real - this.real * other.imaginary) / denominator
    );
  }
}

const CanvasP5 = () => {
  const canvasRef = useRef(null); // Référence au canvas

  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasRef.current); // Attacher le canvas au DOM de React
        p.pixelDensity(1);
        p.noLoop();
      };

      p.draw = () => {
        p.loadPixels();

        // Parcourir chaque pixel de l'écran
        for (let x = 0; x < p.width; x++) {
          for (let y = 0; y < p.height; y++) {
            const a = p.map(x, 0, p.width, -2, 2);
            const b = p.map(y, 0, p.height, -2, 2);
            const c = new Complex(a, b); // Créer un nombre complexe c pour chaque pixel
            const n = mandelbrot(c); // Calculer la valeur de Mandelbrot pour c

            const color = p.map(n, 0, 100, 0, 255);
            const index = (x + y * p.width) * 4;

            p.pixels[index] = color; // Rouge
            p.pixels[index + 1] = color; // Vert
            p.pixels[index + 2] = color; // Bleu
            p.pixels[index + 3] = 255; // Alpha
          }
        }

        p.updatePixels(); // Appliquer les changements de pixels
      };

      // Fonction de calcul de Mandelbrot pour un nombre complexe
      const mandelbrot = (c) => {
        let z = new Complex(0, 0);
        let n = 0;

        // Calculer le nombre d'itérations avant que le nombre complexe dépasse la valeur limite
        while (n < 100) {
          z = z.multiply(z).add(c);

          // Si le carré du module dépasse 4, on arrête les calculs
          if (z.real * z.real + z.imaginary * z.imaginary > 4) {
            break;
          }

          n++;
        }

        return n;
      };
    };

    const p5Instance = new p5(sketch); // Crée une nouvelle instance de p5.js

    return () => {
      p5Instance.remove(); // Nettoyer l'instance de p5.js à la destruction du composant
    };
  }, []);

  return <div ref={canvasRef}></div>; // Le canvas sera rendu ici
};

export default CanvasP5;
