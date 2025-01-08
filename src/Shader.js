// src/Shader.js
export const vertexShader = `
  precision mediump float;
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

export const fragmentShader = `
  precision mediump float;
  uniform float u_time;
  uniform vec2 u_resolution;

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec3 color = 0.5 + 0.5 * cos(u_time + uv.xyx + vec3(0, 2, 4));
    gl_FragColor = vec4(color, 1.0);
  }
`;
