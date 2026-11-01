import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';
export default defineConfig({plugins:[react(),tailwindcss()],server:{watch:{usePolling:true,interval:1000,ignored:["**/public/assets/**","**/dist/**"]}},resolve:{alias:{'@':fileURLToPath(new URL('.',import.meta.url))}},build:{outDir:'dist',rollupOptions:{input:{home:fileURLToPath(new URL('./index.html',import.meta.url)),aiVideo:fileURLToPath(new URL('./ai-video.html',import.meta.url)),creativeSocial:fileURLToPath(new URL('./creative-social.html',import.meta.url)),ecommerce:fileURLToPath(new URL('./ecommerce.html',import.meta.url)),websites:fileURLToPath(new URL("./websites.html",import.meta.url)),elevn:fileURLToPath(new URL('./elevn.html',import.meta.url)),sora:fileURLToPath(new URL('./sora.html',import.meta.url))}}}});
