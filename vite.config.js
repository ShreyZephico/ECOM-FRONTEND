import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const proxyTarget = env.VITE_DEV_PROXY_TARGET || "http://localhost:9000";

  return {
    plugins: [react()],
    base: "/",
    server: {
      proxy: {
        // Store backend endpoints
        "/store": {
          target: proxyTarget,
          changeOrigin: true,
        },

        // Static assets served by the backend (e.g. /static/*.png)
        "/static": {
          target: proxyTarget,
          changeOrigin: true,
        },

        // Prefer using "/api" as the frontend base URL (same-origin in prod).
        "/api": {
          target: proxyTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
