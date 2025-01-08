import p5 from "p5";

export const initializeCanvasP5 = (onTextureReady) => {
  let image; // Variable pour stocker l'image
  let isImageLoaded = false; // Indicateur de chargement de l'image
  let isCanvasReady = false; // Indicateur que le canvas est prêt
  
  
  const sketch = (p) => {
    let particlesA = [];
    let particlesB = [];
    let particlesC = [];
    const numParticles = 1500;
    const noiseScale = 500;
    let frameCount = 0;

    let containerWidth = 500; // Largeur par défaut
    let containerHeight = 500; // Hauteur par défaut

    const planetA = {
      radius: 150,
      position: p.createVector(p.random(0, 250), p.random(0, 250)),
      gradient: ["#7209B7", "#4CC9F0"],
    };

    const planetB = {
      radius: 60,
      position: p.createVector(p.random(250, 500), p.random(250, 500)),
      gradient: ["#3A0CA3", "#F72585"],
    };

    // Initialisation des particules
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

    // Préchargement des ressources
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
    
    

    // Configuration initiale du sketch
    p.setup = () => {
      const container = document.querySelector(".couverture");
      if (container) {
        containerWidth = container.offsetWidth;
        containerHeight = container.offsetHeight;
      }

      const canvas = p.createCanvas(containerWidth, containerHeight);
      p.background(21, 8, 50);
      initializeParticles();

      isCanvasReady = true;

      // Si l'image est déjà chargée, transmettre le canvas
      if (isImageLoaded && onTextureReady) {
        console.log(canvas.elt);
        
        onTextureReady(canvas.elt);
      }
    };

    // Dessin principal
    p.draw = () => {
      frameCount++;
      p.noStroke();
      p.smooth();

      // Afficher l'image si elle est chargée
      if (isImageLoaded) {
        const imgWidth = containerWidth * 0.4;
        const imgHeight = containerHeight * 0.4;
        const imgX = (containerWidth - imgWidth) / 2;
        const imgY = (containerHeight - imgHeight) / 2;

        p.image(image, imgX, imgY, imgWidth, imgHeight);
      }

      // Dessiner les planètes
      drawPlanet(p, planetA);
      drawPlanet(p, planetB);

      // Dessiner ou animer les particules
      if (frameCount > 500) {
        drawParticles(p, particlesA, [69, 33, 124]);
        drawParticles(p, particlesB, [7, 153, 242]);
        drawParticles(p, particlesC, [255, 255, 255]);
      } else {
        moveAndDrawParticles(p, particlesA, [69, 33, 124]);
        moveAndDrawParticles(p, particlesB, [7, 153, 242]);
        moveAndDrawParticles(p, particlesC, [255, 255, 255]);
      }
    };

    // Ajuster la taille du canvas lors du redimensionnement de la fenêtre
    p.windowResized = () => {
      const container = document.querySelector(".couverture");
      if (container) {
        containerWidth = container.offsetWidth;
        containerHeight = container.offsetHeight;
        p.resizeCanvas(containerWidth, containerHeight);
      }
    };

    // Classe pour les particules
    function Particle(p, x, y) {
      this.pos = p.createVector(x, y);
      this.vel = p.createVector(0, 0);
      this.dir = p.createVector(0, 0);
      this.speed = 0.4;

      this.move = function () {
        const angle =
          p.noise(this.pos.x / noiseScale, this.pos.y / noiseScale) * p.TWO_PI * noiseScale;
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
        p.ellipse(this.pos.x, this.pos.y, radius, radius);
      };
    }

    // Dessiner une planète avec un dégradé
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

    // Déplacer et dessiner les particules
    function moveAndDrawParticles(p, particles, color) {
      for (const particle of particles) {
        p.fill(...color, 150);
        particle.move();
        particle.display(2);
        particle.checkEdge();
      }
    }

    // Dessiner uniquement les particules
    function drawParticles(p, particles, color) {
      for (const particle of particles) {
        p.fill(...color, 150);
        particle.display(2);
      }
    }
  };

  // Créer une instance P5
  const p5Instance = new p5(sketch);

  // Fonction de nettoyage
  return () => {
    p5Instance.remove();
  };
};
