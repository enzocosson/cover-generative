attribute vec2 position;
varying vec2 texCoords;

void main() {
  texCoords = (position + 1.0) * 0.5; // Transforme les coordonnées de [-1,1] à [0,1]
  gl_Position = vec4(position, 0.0, 1.0);
}
