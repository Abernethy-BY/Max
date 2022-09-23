// vite.config.ts
import path from "path";
import Vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import Pages from "vite-plugin-pages";
import generateSitemap from "vite-ssg-sitemap";
import VueI18n from "@intlify/vite-plugin-vue-i18n";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Inspect from "vite-plugin-inspect";
import { VitePWA } from "vite-plugin-pwa";
import Layouts from "vite-plugin-vue-layouts";
import UnoCss from "unocss/vite";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import pxToRem from "postcss-pxtorem";
import autoPreFixer from "autoprefixer";
import { ElementPlusResolve, createStyleImportPlugin } from "vite-plugin-style-import";
var __vite_injected_original_dirname = "E:\\WorkSpace\\big-screen";
var loader_pxToRem = pxToRem({ rootValue: 37.5, unitPrecision: 2, propList: ["*"], exclude: /(node_module)/, selectorBlackList: [], mediaQuery: true, minPixelValue: 1 });
var loader_autoPreFixer = autoPreFixer({ overrideBrowserslist: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 8", "last 10 versions"], grid: true });
var vite_config_default = defineConfig({
  resolve: { alias: { "~/": `${path.resolve(__vite_injected_original_dirname, "src")}/` } },
  server: {
    host: "localhost",
    cors: true,
    open: true,
    hmr: true
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true
    }),
    Pages({ extensions: ["vue"], exclude: ["**/components/*.vue"] }),
    Layouts({
      layoutsDirs: "src/layouts",
      defaultLayout: "screen"
    }),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "vue-i18n",
        "vue/macros",
        "@vueuse/head",
        "@vueuse/core",
        { axios: [["default", "axios"]] },
        { consola: [["default", "consola"]] },
        { "axios-mapper": [["default", "HttpClient"]] },
        { pinia: [["default", "pinia"]] },
        { nprogress: [["default", "nprogress"]] },
        { "big.js": [["default", "Big"]] },
        { echarts: [["*", "eCharts"]] },
        { "d3-geo": [["*", "d3"]] },
        { "@amap/amap-jsapi-loader": [["default", "AMapLoader"]] },
        { "js-md5": [["default", "md5"]] },
        { animejs: [["default", "anime"]] }
      ],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/composables", "src/store", "src/utils", "src/api", "src/model"],
      vueTemplate: true,
      resolvers: [IconsResolver({ prefix: "Icon" }), ElementPlusResolver()]
    }),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      libs: [{
        libraryName: "element-plus",
        esModule: true,
        resolveStyle: (name) => {
          return `element-plus/theme-chalk/${name}.css`;
        }
      }]
    }),
    Components({
      extensions: ["vue", "md"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: "src/components.d.ts",
      resolvers: [IconsResolver({ enabledCollections: ["ep"] }), ElementPlusResolver()]
    }),
    UnoCss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "safari-pinned-tab.svg"],
      manifest: {
        name: "Vitesse",
        short_name: "Vitesse",
        theme_color: "#ffffff",
        icons: [
          { src: "/pwa-192x192.png", dark: "192x192", type: "image/png" },
          { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png" },
          { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" }
        ]
      }
    }),
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__vite_injected_original_dirname, "locales/**")]
    }),
    Icons({
      compiler: "vue3",
      autoInstall: true
    }),
    Inspect()
  ],
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" }
  },
  ssgOptions: {
    script: "async",
    formatting: "minify",
    onFinished() {
      generateSitemap();
    }
  },
  test: {
    include: ["test/**/*.test.ts"],
    environment: "jsdom",
    deps: { inline: ["@vue", "@vueuse", "vue-demi"] }
  },
  css: {
    preprocessorOptions: {},
    postcss: {
      plugins: [loader_pxToRem, loader_autoPreFixer]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxXb3JrU3BhY2VcXFxcYmlnLXNjcmVlblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcV29ya1NwYWNlXFxcXGJpZy1zY3JlZW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1dvcmtTcGFjZS9iaWctc2NyZWVuL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IFZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCBQYWdlcyBmcm9tICd2aXRlLXBsdWdpbi1wYWdlcydcclxuaW1wb3J0IGdlbmVyYXRlU2l0ZW1hcCBmcm9tICd2aXRlLXNzZy1zaXRlbWFwJ1xyXG5pbXBvcnQgVnVlSTE4biBmcm9tICdAaW50bGlmeS92aXRlLXBsdWdpbi12dWUtaTE4bidcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IEluc3BlY3QgZnJvbSAndml0ZS1wbHVnaW4taW5zcGVjdCdcclxuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSdcclxuaW1wb3J0IExheW91dHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWxheW91dHMnXHJcbmltcG9ydCBVbm9Dc3MgZnJvbSAndW5vY3NzL3ZpdGUnXHJcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gJ3VucGx1Z2luLWljb25zL3Jlc29sdmVyJ1xyXG5pbXBvcnQgSWNvbnMgZnJvbSAndW5wbHVnaW4taWNvbnMvdml0ZSdcclxuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcclxuaW1wb3J0IHB4VG9SZW0gZnJvbSAncG9zdGNzcy1weHRvcmVtJ1xyXG5pbXBvcnQgYXV0b1ByZUZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcidcclxuLy8gaW1wb3J0IHN3aXBlciBmcm9tICdzd2lwZXInXHJcbi8vIGltcG9ydCBhbmltZSBmcm9tICdhbmltZWpzJ1xyXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmUsIGNyZWF0ZVN0eWxlSW1wb3J0UGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3R5bGUtaW1wb3J0J1xyXG4vLyBpbXBvcnQgeyBjb25zb2xhIH0gZnJvbSAnY29uc29sYSdcclxuXHJcbmNvbnN0IGxvYWRlcl9weFRvUmVtID0gcHhUb1JlbSh7IHJvb3RWYWx1ZTogMzcuNSwgdW5pdFByZWNpc2lvbjogMiwgcHJvcExpc3Q6IFsnKiddLCBleGNsdWRlOiAvKG5vZGVfbW9kdWxlKS8sIHNlbGVjdG9yQmxhY2tMaXN0OiBbXSwgbWVkaWFRdWVyeTogdHJ1ZSwgbWluUGl4ZWxWYWx1ZTogMSB9KVxyXG5jb25zdCBsb2FkZXJfYXV0b1ByZUZpeGVyID0gYXV0b1ByZUZpeGVyKHsgb3ZlcnJpZGVCcm93c2Vyc2xpc3Q6IFsnQW5kcm9pZCA0LjEnLCAnaU9TIDcuMScsICdDaHJvbWUgPiAzMScsICdmZiA+IDMxJywgJ2llID49IDgnLCAnbGFzdCAxMCB2ZXJzaW9ucyddLCBncmlkOiB0cnVlIH0pXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHJlc29sdmU6IHsgYWxpYXM6IHsgJ34vJzogYCR7cGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpfS9gIH0gfSxcclxuXHJcbiAgc2VydmVyOiB7XHJcbiAgICBob3N0OiAnbG9jYWxob3N0JyxcclxuICAgIGNvcnM6IHRydWUsXHJcbiAgICBvcGVuOiB0cnVlLFxyXG4gICAgaG1yOiB0cnVlLFxyXG4gIH0sXHJcblxyXG4gIHBsdWdpbnM6IFtcclxuICAgIFZ1ZSh7XHJcbiAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC5tZCQvXSxcclxuICAgICAgcmVhY3Rpdml0eVRyYW5zZm9ybTogdHJ1ZSxcclxuICAgIH0pLFxyXG4gICAgUGFnZXMoeyBleHRlbnNpb25zOiBbJ3Z1ZSddLCBleGNsdWRlOiBbJyoqL2NvbXBvbmVudHMvKi52dWUnXSB9KSxcclxuICAgIExheW91dHMoe1xyXG4gICAgICBsYXlvdXRzRGlyczogJ3NyYy9sYXlvdXRzJyxcclxuICAgICAgZGVmYXVsdExheW91dDogJ3NjcmVlbicsXHJcbiAgICB9KSxcclxuXHJcbiAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgaW1wb3J0czogWyd2dWUnLCAndnVlLXJvdXRlcicsICd2dWUtaTE4bicsICd2dWUvbWFjcm9zJywgJ0B2dWV1c2UvaGVhZCcsICdAdnVldXNlL2NvcmUnLFxyXG4gICAgICAgIHsgYXhpb3M6IFtbJ2RlZmF1bHQnLCAnYXhpb3MnXV0gfSxcclxuICAgICAgICB7IGNvbnNvbGE6IFtbJ2RlZmF1bHQnLCAnY29uc29sYSddXSB9LFxyXG4gICAgICAgIHsgJ2F4aW9zLW1hcHBlcic6IFtbJ2RlZmF1bHQnLCAnSHR0cENsaWVudCddXSB9LFxyXG4gICAgICAgIHsgcGluaWE6IFtbJ2RlZmF1bHQnLCAncGluaWEnXV0gfSxcclxuICAgICAgICB7IG5wcm9ncmVzczogW1snZGVmYXVsdCcsICducHJvZ3Jlc3MnXV0gfSxcclxuICAgICAgICB7ICdiaWcuanMnOiBbWydkZWZhdWx0JywgJ0JpZyddXSB9LFxyXG4gICAgICAgIHsgZWNoYXJ0czogW1snKicsICdlQ2hhcnRzJ11dIH0sXHJcbiAgICAgICAgeyAnZDMtZ2VvJzogW1snKicsICdkMyddXSB9LFxyXG4gICAgICAgIHsgJ0BhbWFwL2FtYXAtanNhcGktbG9hZGVyJzogW1snZGVmYXVsdCcsICdBTWFwTG9hZGVyJ11dIH0sXHJcbiAgICAgICAgeyAnanMtbWQ1JzogW1snZGVmYXVsdCcsICdtZDUnXV0gfSxcclxuICAgICAgICB7IGFuaW1lanM6IFtbJ2RlZmF1bHQnLCAnYW5pbWUnXV0gfSxcclxuICAgICAgXSxcclxuICAgICAgZHRzOiAnc3JjL2F1dG8taW1wb3J0cy5kLnRzJyxcclxuICAgICAgZGlyczogWydzcmMvY29tcG9zYWJsZXMnLCAnc3JjL3N0b3JlJywgJ3NyYy91dGlscycsICdzcmMvYXBpJywgJ3NyYy9tb2RlbCddLFxyXG4gICAgICB2dWVUZW1wbGF0ZTogdHJ1ZSxcclxuICAgICAgcmVzb2x2ZXJzOiBbSWNvbnNSZXNvbHZlcih7IHByZWZpeDogJ0ljb24nIH0pLCBFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG4gICAgfSksXHJcbiAgICBjcmVhdGVTdHlsZUltcG9ydFBsdWdpbih7XHJcbiAgICAgIHJlc29sdmVzOiBbRWxlbWVudFBsdXNSZXNvbHZlKCldLFxyXG4gICAgICBsaWJzOiBbe1xyXG4gICAgICAgIGxpYnJhcnlOYW1lOiAnZWxlbWVudC1wbHVzJyxcclxuICAgICAgICBlc01vZHVsZTogdHJ1ZSxcclxuICAgICAgICByZXNvbHZlU3R5bGU6IChuYW1lOiBzdHJpbmcpID0+IHsgcmV0dXJuIGBlbGVtZW50LXBsdXMvdGhlbWUtY2hhbGsvJHtuYW1lfS5jc3NgIH0sXHJcbiAgICAgIH1dLFxyXG4gICAgfSksXHJcbiAgICBDb21wb25lbnRzKHtcclxuICAgICAgZXh0ZW5zaW9uczogWyd2dWUnLCAnbWQnXSxcclxuICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS8sIC9cXC5tZCQvXSxcclxuICAgICAgZHRzOiAnc3JjL2NvbXBvbmVudHMuZC50cycsXHJcbiAgICAgIHJlc29sdmVyczogW0ljb25zUmVzb2x2ZXIoeyBlbmFibGVkQ29sbGVjdGlvbnM6IFsnZXAnXSB9KSwgRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcclxuICAgIH0pLFxyXG5cclxuICAgIFVub0NzcygpLFxyXG4gICAgVml0ZVBXQSh7XHJcbiAgICAgIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxyXG4gICAgICBpbmNsdWRlQXNzZXRzOiBbJ2Zhdmljb24uc3ZnJywgJ3NhZmFyaS1waW5uZWQtdGFiLnN2ZyddLFxyXG4gICAgICBtYW5pZmVzdDoge1xyXG4gICAgICAgIG5hbWU6ICdWaXRlc3NlJyxcclxuICAgICAgICBzaG9ydF9uYW1lOiAnVml0ZXNzZScsXHJcbiAgICAgICAgdGhlbWVfY29sb3I6ICcjZmZmZmZmJyxcclxuICAgICAgICBpY29uczogW1xyXG4gICAgICAgICAgeyBzcmM6ICcvcHdhLTE5MngxOTIucG5nJywgZGFyazogJzE5MngxOTInLCB0eXBlOiAnaW1hZ2UvcG5nJyB9LFxyXG4gICAgICAgICAgeyBzcmM6ICcvcHdhLTUxMng1MTIucG5nJywgc2l6ZXM6ICc1MTJ4NTEyJywgdHlwZTogJ2ltYWdlL3BuZycgfSxcclxuICAgICAgICAgIHsgc3JjOiAnL3B3YS01MTJ4NTEyLnBuZycsIHNpemVzOiAnNTEyeDUxMicsIHR5cGU6ICdpbWFnZS9wbmcnLCBwdXJwb3NlOiAnYW55IG1hc2thYmxlJyB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuXHJcbiAgICBWdWVJMThuKHtcclxuICAgICAgcnVudGltZU9ubHk6IHRydWUsXHJcbiAgICAgIGNvbXBvc2l0aW9uT25seTogdHJ1ZSxcclxuICAgICAgaW5jbHVkZTogW3BhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdsb2NhbGVzLyoqJyldLFxyXG4gICAgfSksXHJcblxyXG4gICAgSWNvbnMoe1xyXG4gICAgICBjb21waWxlcjogJ3Z1ZTMnLFxyXG4gICAgICBhdXRvSW5zdGFsbDogdHJ1ZSxcclxuICAgIH0pLFxyXG5cclxuICAgIEluc3BlY3QoKSxcclxuICBdLFxyXG4gIGVzYnVpbGQ6IHtcclxuICAgIGxvZ092ZXJyaWRlOiB7ICd0aGlzLWlzLXVuZGVmaW5lZC1pbi1lc20nOiAnc2lsZW50JyB9LFxyXG4gIH0sXHJcblxyXG4gIHNzZ09wdGlvbnM6IHtcclxuICAgIHNjcmlwdDogJ2FzeW5jJyxcclxuICAgIGZvcm1hdHRpbmc6ICdtaW5pZnknLFxyXG4gICAgb25GaW5pc2hlZCgpIHsgZ2VuZXJhdGVTaXRlbWFwKCkgfSxcclxuICB9LFxyXG5cclxuICB0ZXN0OiB7XHJcbiAgICBpbmNsdWRlOiBbJ3Rlc3QvKiovKi50ZXN0LnRzJ10sXHJcbiAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcclxuICAgIGRlcHM6IHsgaW5saW5lOiBbJ0B2dWUnLCAnQHZ1ZXVzZScsICd2dWUtZGVtaSddIH0sXHJcbiAgfSxcclxuXHJcbiAgY3NzOiB7XHJcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7fSxcclxuICAgIHBvc3Rjc3M6IHtcclxuICAgICAgcGx1Z2luczogW2xvYWRlcl9weFRvUmVtLCBsb2FkZXJfYXV0b1ByZUZpeGVyXSxcclxuICAgIH0sXHJcbiAgfSxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2UCxPQUFPLFVBQVU7QUFDOVEsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUNsQixPQUFPLHFCQUFxQjtBQUM1QixPQUFPLGFBQWE7QUFDcEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxhQUFhO0FBQ3BCLFNBQVMsZUFBZTtBQUN4QixPQUFPLGFBQWE7QUFDcEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sV0FBVztBQUNsQixTQUFTLDJCQUEyQjtBQUNwQyxPQUFPLGFBQWE7QUFDcEIsT0FBTyxrQkFBa0I7QUFHekIsU0FBUyxvQkFBb0IsK0JBQStCO0FBbkI1RCxJQUFNLG1DQUFtQztBQXNCekMsSUFBTSxpQkFBaUIsUUFBUSxFQUFFLFdBQVcsTUFBTSxl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
