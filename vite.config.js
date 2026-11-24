import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(process.cwd(), 'index.html'),
        research: resolve(process.cwd(), 'research/index.html'),
        projects: resolve(process.cwd(), 'projects/index.html'),
        projectCoFwhm: resolve(process.cwd(), 'projects/co-fwhm-cosmology/index.html'),
        projectInflation: resolve(process.cwd(), 'projects/stochastic-inflation/index.html'),
        projectKleinGordon: resolve(process.cwd(), 'projects/klein-gordon-lattice/index.html'),
        projectHpc: resolve(process.cwd(), 'projects/hpc-solvers/index.html'),
        outreach: resolve(process.cwd(), 'outreach/index.html'),
        contact: resolve(process.cwd(), 'contact/index.html'),
      },
    },
  },
});
