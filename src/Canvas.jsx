import React, { useRef, useEffect } from "react";
import vertexShaderSource from "./shaders/vertexShader.glsl";
import fragmentShaderSource from "./shaders/fragmentShader.glsl";

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");

    if (!gl) {
      console.error("WebGL not supported");
      return;
    }
    console.log("WebGL context initialized");

    // Charger l'image
    const image = new Image();
    image.src = "/jujujul.png"; // Chemin de l'image
    console.log("Image path:", image.src);

    image.onload = () => {
      console.log("Image loaded:", image);

      // Création de la texture
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);

      // Configurer les paramètres de la texture
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      // Charger l'image dans la texture
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image
      );

      console.log("Texture created and image bound");

      // Dessiner un rectangle et appliquer la texture
      const vertices = new Float32Array([
        -1.0, 1.0, 0.0, // Haut gauche
        -1.0, -1.0, 0.0, // Bas gauche
        1.0, -1.0, 0.0, // Bas droit
        1.0, 1.0, 0.0, // Haut droit
      ]);

      const vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      const positionLocation = gl.getAttribLocation(program, "position");
      gl.vertexAttribPointer(
        positionLocation,
        3,
        gl.FLOAT,
        false,
        3 * Float32Array.BYTES_PER_ELEMENT,
        0
      );
      gl.enableVertexAttribArray(positionLocation);

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    };

    image.onerror = (e) => {
      console.error("Error loading image:", e);
    };

    // Shaders et programme (inchangés)
    const compileShader = (source, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Error compiling shader:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Error linking program:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

  }, []);

  return <canvas ref={canvasRef} width={500} height={500}></canvas>;
};

export default Canvas;
