import { defineConfig } from "vite"

export default defineConfig ({server: {
    proxy: {
      "/api": {
        target: "coinbase url here",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})

