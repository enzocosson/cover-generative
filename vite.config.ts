import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  plugins: [glsl()],
  optimizeDeps: {
    exclude: ['path', 'os', 'process', 'fs'], // Ignore ces modules lors de l'optimisation
  },
  define: {
    'process.env.NODE_VERSION': JSON.stringify('v14.17.0'), // Remplace par ta version de Node.js
  },
  
});
