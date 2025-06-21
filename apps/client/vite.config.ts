import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";
import path from "path";
import { defineConfig } from "vite";
import type { VitePWAOptions } from "vite-plugin-pwa";
import { VitePWA } from "vite-plugin-pwa";

dotenv.config();

const pwaOptions: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  includeAssets: ["favicon.svg"],
  srcDir: "src",
  filename: "sw.ts",
  strategies: "injectManifest",
  injectManifest: {
    swDest: "dist/sw.js"
  },
  manifest: {
    name: "Телефонный справочник | Газпром информ",
    short_name: "Телефонный справочник",
    lang: "ru-RU",
    display: "standalone",
    orientation: "portrait",
    theme_color: "#ffffff",
    start_url: "/",
    icons: [
      { purpose: "maskable", sizes: "512x512", src: "icon512_maskable.png", type: "image/png" },
      { purpose: "any", sizes: "512x512", src: "icon512_rounded.png", type: "image/png" }
    ]
  },
  devOptions: {
    enabled: process.env.SW_DEV === "true"
  }
};

export default defineConfig({
  plugins: [react(), VitePWA(pwaOptions), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  define: {
    "process.env": process.env
  },
  envPrefix: ["VITE_", "BASE_"]
});
