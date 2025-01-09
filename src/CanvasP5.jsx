import p5 from "p5";

export const initializeCanvasP5 = (onTextureReady) => {
  let image;
  let isImageLoaded = false;
  let isCanvasReady = false;
  
  const sketch = (p) => {
    let particlesA = [];
    let particlesB = [];
    let particlesC = [];
    const numParticles = 1500;
    const noiseScale = 500;
    let frameCount = 0;

    let containerWidth = 500;
    let containerHeight = 500;

    let planetA;
    let planetB;

    const initializePlanets = () => {
      const palette = [
        "#4CC9F0", // Bleu clair
        "#4361EE", // Bleu
        "#3A0CA3", // Violet foncé
        "#7209B7", // Violet
        "#F72585", // Rose
      ];
    
      // Fonction pour obtenir deux couleurs aléatoires de la palette
      const getRandomGradient = () => {
        const color1 = palette[Math.floor(p.random(palette.length))];
        let color2;
        do {
          color2 = palette[Math.floor(p.random(palette.length))];
        } while (color1 === color2); // Assure que la deuxième couleur est différente de la première
        return [color1, color2];
      };
    
      planetA = {
        radius: p.random(100, 200), // Taille aléatoire
        position: p.createVector(p.random(0, containerWidth / 2), p.random(0, containerHeight / 2)),
        gradient: getRandomGradient(),
      };
    
      planetB = {
        radius: p.random(50, 100), // Taille aléatoire
        position: p.createVector(p.random(containerWidth / 2, containerWidth), p.random(containerHeight / 2, containerHeight)),
        gradient: getRandomGradient(),
      };
    };
    

    const initializeParticles = () => {
      particlesA = [];
      particlesB = [];
      particlesC = [];
      for (let i = 0; i < numParticles; i++) {
        particlesA.push(new Particle(p, p.random(0, containerWidth), p.random(0, containerHeight)));
        particlesB.push(new Particle(p, p.random(0, containerWidth), p.random(0, containerHeight)));
        particlesC.push(new Particle(p, p.random(0, containerWidth), p.random(0, containerHeight)));
      }
    };

    p.preload = () => {
      console.log("Préchargement de l'image commencé...");
      console.log("onTextureReady reçu :", onTextureReady);
    
      image = p.loadImage(
        "/jul.png",
        () => {
          isImageLoaded = true;
          console.log("Image chargée avec succès !", isCanvasReady, "test", onTextureReady);
          
          if (isCanvasReady && onTextureReady) {
            console.log("Canvas prêt et image chargée. Envoi du canvas...");
            onTextureReady(p.canvas.elt);
          }
        },
        () => {
          console.error("Erreur lors du chargement de l'image !");
        }
      );
    };

    p.setup = () => {
      const container = document.querySelector(".couverture");
      if (container) {
        containerWidth = container.offsetWidth;
        containerHeight = container.offsetHeight;
      }

      const canvas = p.createCanvas(containerWidth, containerHeight);
      p.background(21, 8, 50);
      initializePlanets(); // Initialisation des planètes avec des propriétés aléatoires
      initializeParticles();

      isCanvasReady = true;

      if (isImageLoaded && onTextureReady) {
        console.log(canvas.elt);
        onTextureReady(canvas.elt);
      }
    };

    p.draw = () => {
      frameCount++;
      p.noStroke();
      p.smooth();

      drawPlanet(p, planetA);
      drawPlanet(p, planetB);

      if (frameCount > 500) {
        drawParticles(p, particlesA);
        drawParticles(p, particlesB);
        drawParticles(p, particlesC);
      } else {
        moveAndDrawParticles(p, particlesA);
        moveAndDrawParticles(p, particlesB);
        moveAndDrawParticles(p, particlesC);
      }

      if (isImageLoaded) {
        const imgWidth = containerWidth * 1;
        const imgHeight = containerHeight * 1;
        const imgX = (containerWidth - imgWidth) / 2;
        const imgY = containerHeight - imgHeight;

        p.image(image, imgX, imgY, imgWidth, imgHeight);
      }
    };

    p.windowResized = () => {
      const container = document.querySelector(".couverture");
      if (container) {
        containerWidth = container.offsetWidth;
        containerHeight = container.offsetHeight;
        p.resizeCanvas(containerWidth, containerHeight);
      }
    };

    function Particle(p, x, y) {
      this.pos = p.createVector(x, y);
      this.vel = p.createVector(0, 0);
      this.dir = p.createVector(0, 0);
      this.speed = 0.4;
      this.color = randomColor(); // Couleur par défaut

      this.move = function () {
        const angle = p.noise(this.pos.x / noiseScale, this.pos.y / noiseScale) * p.TWO_PI * noiseScale;
        this.dir.set(p.cos(angle), p.sin(angle));
        this.vel = this.dir.copy().mult(this.speed);
        this.pos.add(this.vel);
      };

      this.checkEdge = function () {
        if (
          this.pos.x > containerWidth ||
          this.pos.x < 0 ||
          this.pos.y > containerHeight ||
          this.pos.y < 0
        ) {
          this.pos.set(p.random(50, containerWidth), p.random(50, containerHeight));
        }
      };

      this.display = function (radius) {
        p.fill(this.color); // Couleur de la particule
        p.ellipse(this.pos.x, this.pos.y, radius, radius);
      };
    }

    function randomColor() {
      // Sélection d'une couleur de base parmi une palette
      const baseColors = [
        "#4CC9F0", // Bleu clair
        "#4361EE", // Bleu
        "#3A0CA3", // Violet foncé
        "#7209B7", // Violet
        "#F72585", // Rose
      ];

      const baseColor = baseColors[Math.floor(p.random(baseColors.length))];
      const colorVariation = p.random(0.5, 1.5); // Variation d'intensité
      return p.color(p.red(baseColor) * colorVariation, p.green(baseColor) * colorVariation, p.blue(baseColor) * colorVariation);
    }

    function drawPlanet(p, planet) {
      const grad = p.drawingContext.createLinearGradient(
        planet.position.x - planet.radius,
        planet.position.y - planet.radius,
        planet.position.x + planet.radius,
        planet.position.y + planet.radius
      );
      grad.addColorStop(0, planet.gradient[0]);
      grad.addColorStop(1, planet.gradient[1]);
      p.drawingContext.fillStyle = grad;

      p.ellipse(planet.position.x, planet.position.y, planet.radius * 2);
    }

    function moveAndDrawParticles(p, particles) {
      for (const particle of particles) {
        particle.move();
        particle.display(3);
        particle.checkEdge();
      }
    }

    function drawParticles(p, particles) {
      for (const particle of particles) {
        particle.display(3);
      }
    }
  };

  const p5Instance = new p5(sketch);

  return () => {
    p5Instance.remove();
  };
};