/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";

import { compression } from "vite-plugin-compression2";
import viteCompression from "vite-plugin-compression";
import * as path from "path";
import { createHtmlPlugin } from "vite-plugin-html";

import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const pwaOptions: Partial<VitePWAOptions> = {
  mode: "production",
  base: "/",
  includeAssets: ["logo.png"],
  registerType: "autoUpdate",
  workbox: {
    clientsClaim: false,
    skipWaiting: true,
    disableDevLogs: true
  },
  manifest: {
    name: "Updater App",
    short_name: "Updater App",
    theme_color: "#ffffff",
    description: "Updater App.",
    start_url: "/?utm_medium=PWA&utm_source=launcher",
    display: "standalone",
    orientation: "any",
    background_color: "#fff",
    lang: "id",
    icons: [
      {
        src: "/icons/logo-192.png", // <== don't add slash, for testing
        sizes: "192x192",
        type: "image/png"
      },

      {
        src: "/icons/logo-512.png", // <== don't add slash, for testing
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/icons/logo-1024.png", // <== don't add slash, for testing
        sizes: "1024x1024",
        type: "image/png"
      }
    ],

    share_target: {
      action: "/?utm_medium=PWA&utm_source=share-target&share-target",
      method: "POST",
      enctype: "multipart/form-data",
      params: { files: [{ name: "file", accept: ["image/*"] }] }
    }
  },

  devOptions: {
    enabled: process.env.SW_DEV === "true",
    /* when using generateSW the PWA plugin will switch to classic */
    type: "module",
    navigateFallback: "index.html"
  }
};

const replaceOptions = { __DATE__: new Date().toISOString() };
const claims = process.env.CLAIMS === "true";
const reload = process.env.RELOAD_SW === "true";
const selfDestroying = process.env.SW_DESTROY === "true";

if (claims) pwaOptions.registerType = "autoUpdate";

if (reload) {
  // @ts-expect-error just ignore
  replaceOptions.__RELOAD_SW__ = "true";
}

if (selfDestroying) pwaOptions.selfDestroying = selfDestroying;

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      VitePWA(pwaOptions),
      compression({
        algorithm: "brotliCompress"
      }),
      createHtmlPlugin({
        minify: {
          minifyCSS: true,
          minifyJS: true,
          collapseWhitespace: true,
          removeComments: true,
          removeAttributeQuotes: true
        },
        entry: "./src/main.tsx",
        template: "index.html"
      }),
      splitVendorChunkPlugin(),
      viteCompression()
    ],
    cacheControl: "max-age=3600",
    resolve: {
      alias: {
        "@": path.join(__dirname, "./src"),
        "@assets": path.resolve(__dirname, "./src/assets/*"),
        "@components": path.resolve(__dirname, "./src/components/index.ts")
      }
    },
    css: {
      modules: {
        localsConvention: "camelCase",
        generateScopedName: "[local]_[hash:base64:2]"
      }
    },
    build: {
      base: "/updater-app",
      emptyOutDir: true,
      outDir: "build",
      sourcemap: false,
      minify: true,
      cssCodeSplit: true,
      modulePreload: true,
      cacheControl: "max-age=3600",
      chunkSizeWarningLimit: 1600,
      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/[hash].js",
          entryFileNames: "assets/js/[hash].js",
          assetFileNames: ({ name }) => {
            if (/\.(gif|jpe?g|png|svg|webp|avif)$/.test(name ?? "")) {
              return "assets/images/[hash][extname]";
            }
            if (/\.(ttf|woff2|svg)$/.test(name ?? "")) {
              return "assets/font/[hash][extname]";
            }
            if (/\.css$/.test(name ?? "")) {
              return "assets/css/[hash][extname]";
            }
            return "assets/[hash][extname]";
          }
        }
      }
    }
  };
});
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import viteCompression from "vite-plugin-compression";
// import EnvironmentPlugin from "vite-plugin-environment";
// import { VitePWA } from "vite-plugin-pwa";

// // const { ASSET_URL } = import.meta.env;
// export default defineConfig(() => {
//   const timestamp = new Date().getTime();
//   return {
//     base: "/updater-app",
//     plugins: [
//       react({ devTarget: "es2021" }),
//       viteCompression(),
//       VitePWA(),
//       EnvironmentPlugin("all", { prefix: "VITE_APP_" })
//     ],
//     cacheControl: "max-age=3600",
//     css: {
//       modules: {
//         localsConvention: "camelCase",
//         generateScopedName: "[local]_[hash:base64:5]"
//       }
//     },
//     build: {
//       minify: "esbuild",
//       emptyOutDir: true,
//       outDir: "build",
//       sourcemap: false,
//       // minify: mode === "production",
//       cssCodeSplit: true,
//       modulePreload: true,
//       chunkSizeWarningLimit: 1000000,
//       // cacheControl: "max-age=3600",
//       rollupOptions: {
//         output: {
//           manualChunks(id) {
//             if (id.includes("node_modules")) {
//               return "vendor";
//             }
//           },
//           chunkFileNames: `assets/js/[hash]-${timestamp}.js`,
//           entryFileNames: `assets/js/[hash]-${timestamp}.js`,
//           assetFileNames: ({ name }) => {
//             if (/\.(gif|jpe?g|png|svg|webp|avif)$/.test(name ?? "")) {
//               return `assets/images/[hash]-${timestamp}[extname]`;
//             }
//             if (/\.(ttf|woff2|svg)$/.test(name ?? "")) {
//               return `assets/font/[hash]-${timestamp}[extname]`;
//             }
//             if (/\.css$/.test(name ?? "")) {
//               return `assets/css/[hash]-${timestamp}[extname]`;
//             }
//             return `assets/[hash]-${timestamp}[extname]`;
//           }
//         }
//       }
//     }
//   };
// });
