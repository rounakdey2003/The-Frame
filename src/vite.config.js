import glsl from "vite-plugin-glsl";

export default {
  plugins: [glsl()],
  root: "src",
  base: './',
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  envDir: "../",
  server: {
    host: '0.0.0.0',
  },
};
