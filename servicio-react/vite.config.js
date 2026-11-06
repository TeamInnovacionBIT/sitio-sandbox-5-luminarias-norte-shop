import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// La app se publica en https://luminariasnorte.shop/diseno-de-iluminacion/
// Renderizado exclusivamente en el cliente: sin SSR, SSG ni prerenderizado.
export default defineConfig({
  base: '/diseno-de-iluminacion/',
  plugins: [react()],
  build: {
    outDir: '../public_html/diseno-de-iluminacion',
    emptyOutDir: true,
    assetsDir: 'assets',
    sourcemap: false,
  },
});
