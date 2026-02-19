import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Qiita Reader",
        short_name: "QiitaReader",
        description: "Qiita記事閲覧アプリ",
        theme_color: "#55c500",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],
        screenshots: [
          {
            src: "/icon-512.png",
            sizes: "512x512",
            form_factor: "wide",
            type: "image/png",
            label: "kaeru"
          }
        ]
      }
    })
  ]
});
