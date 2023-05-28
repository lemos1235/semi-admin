import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@src": resolve(__dirname, "./src"),
      "@assets": resolve(__dirname, "./src/assets"),
      "@components": resolve(__dirname, "./src/components"),
      "@layout": resolve(__dirname, "./src/layout"),
      "@pages": resolve(__dirname, "./src/pages"),
      "@uitls": resolve(__dirname, "./src/uitls"),
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ""),
      },
    },
    hmr: {
      overlay: false,
    },
  },
});
