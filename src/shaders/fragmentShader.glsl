precision mediump float;

varying vec2 texCoords;
uniform sampler2D uTexture;

void main() {
  gl_FragColor = texture2D(uTexture, texCoords); // Applique la texture
}
