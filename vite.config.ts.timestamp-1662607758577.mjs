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
var loader_pxToRem = pxToRem({
  rootValue: 37.5,
  unitPrecision: 2,
  propList: ["*"],
  exclude: /(node_module)/,
  selectorBlackList: [],
  mediaQuery: true,
  minPixelValue: 1
});
var loader_autoPreFixer = autoPreFixer({
  overrideBrowserslist: [
    "Android 4.1",
    "iOS 7.1",
    "Chrome > 31",
    "ff > 31",
    "ie >= 8",
    "last 10 versions"
  ],
  grid: true
});
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
        { "js-md5": [["default", "md5"]] }
      ],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/composables", "src/store", "src/utils", "src/api"],
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxXb3JrU3BhY2VcXFxcYmlnLXNjcmVlblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcV29ya1NwYWNlXFxcXGJpZy1zY3JlZW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1dvcmtTcGFjZS9iaWctc2NyZWVuL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IFZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCBQYWdlcyBmcm9tICd2aXRlLXBsdWdpbi1wYWdlcydcclxuaW1wb3J0IGdlbmVyYXRlU2l0ZW1hcCBmcm9tICd2aXRlLXNzZy1zaXRlbWFwJ1xyXG5pbXBvcnQgVnVlSTE4biBmcm9tICdAaW50bGlmeS92aXRlLXBsdWdpbi12dWUtaTE4bidcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IEluc3BlY3QgZnJvbSAndml0ZS1wbHVnaW4taW5zcGVjdCdcclxuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSdcclxuaW1wb3J0IExheW91dHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWxheW91dHMnXHJcbmltcG9ydCBVbm9Dc3MgZnJvbSAndW5vY3NzL3ZpdGUnXHJcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gJ3VucGx1Z2luLWljb25zL3Jlc29sdmVyJ1xyXG5pbXBvcnQgSWNvbnMgZnJvbSAndW5wbHVnaW4taWNvbnMvdml0ZSdcclxuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcclxuaW1wb3J0IHB4VG9SZW0gZnJvbSAncG9zdGNzcy1weHRvcmVtJ1xyXG5pbXBvcnQgYXV0b1ByZUZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcidcclxuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlLCBjcmVhdGVTdHlsZUltcG9ydFBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN0eWxlLWltcG9ydCdcclxuLy8gaW1wb3J0IHsgY29uc29sYSB9IGZyb20gJ2NvbnNvbGEnXHJcblxyXG5jb25zdCBsb2FkZXJfcHhUb1JlbSA9IHB4VG9SZW0oe1xyXG4gIC8vIHJvb3RWYWx1ZTogMTkyLFxyXG4gIC8vIHJvb3RWYWx1ZTogMTYsXHJcbiAgcm9vdFZhbHVlOiAzNy41LFxyXG4gIHVuaXRQcmVjaXNpb246IDIsXHJcbiAgcHJvcExpc3Q6IFsnKiddLFxyXG4gIGV4Y2x1ZGU6IC8obm9kZV9tb2R1bGUpLyxcclxuICBzZWxlY3RvckJsYWNrTGlzdDogW10sXHJcbiAgbWVkaWFRdWVyeTogdHJ1ZSxcclxuICBtaW5QaXhlbFZhbHVlOiAxLFxyXG59KVxyXG5jb25zdCBsb2FkZXJfYXV0b1ByZUZpeGVyID0gYXV0b1ByZUZpeGVyKHtcclxuICBvdmVycmlkZUJyb3dzZXJzbGlzdDogW1xyXG4gICAgJ0FuZHJvaWQgNC4xJyxcclxuICAgICdpT1MgNy4xJyxcclxuICAgICdDaHJvbWUgPiAzMScsXHJcbiAgICAnZmYgPiAzMScsXHJcbiAgICAnaWUgPj0gOCcsXHJcbiAgICAnbGFzdCAxMCB2ZXJzaW9ucycsXHJcbiAgXSxcclxuICBncmlkOiB0cnVlLFxyXG59KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICByZXNvbHZlOiB7IGFsaWFzOiB7ICd+Lyc6IGAke3BhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKX0vYCB9IH0sXHJcblxyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogJ2xvY2FsaG9zdCcsXHJcbiAgICBjb3JzOiB0cnVlLFxyXG4gICAgb3BlbjogdHJ1ZSxcclxuICAgIGhtcjogdHJ1ZSxcclxuICB9LFxyXG5cclxuICBwbHVnaW5zOiBbXHJcbiAgICBWdWUoe1xyXG4gICAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwubWQkL10sXHJcbiAgICAgIHJlYWN0aXZpdHlUcmFuc2Zvcm06IHRydWUsXHJcbiAgICB9KSxcclxuICAgIFBhZ2VzKHsgZXh0ZW5zaW9uczogWyd2dWUnXSwgZXhjbHVkZTogWycqKi9jb21wb25lbnRzLyoudnVlJ10gfSksXHJcbiAgICBMYXlvdXRzKHtcclxuICAgICAgbGF5b3V0c0RpcnM6ICdzcmMvbGF5b3V0cycsXHJcbiAgICAgIGRlZmF1bHRMYXlvdXQ6ICdzY3JlZW4nLFxyXG4gICAgfSksXHJcblxyXG4gICAgQXV0b0ltcG9ydCh7XHJcbiAgICAgIGltcG9ydHM6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInLCAndnVlLWkxOG4nLCAndnVlL21hY3JvcycsICdAdnVldXNlL2hlYWQnLCAnQHZ1ZXVzZS9jb3JlJyxcclxuICAgICAgICB7IGF4aW9zOiBbWydkZWZhdWx0JywgJ2F4aW9zJ11dIH0sXHJcbiAgICAgICAgeyBjb25zb2xhOiBbWydkZWZhdWx0JywgJ2NvbnNvbGEnXV0gfSxcclxuICAgICAgICB7ICdheGlvcy1tYXBwZXInOiBbWydkZWZhdWx0JywgJ0h0dHBDbGllbnQnXV0gfSxcclxuICAgICAgICB7IHBpbmlhOiBbWydkZWZhdWx0JywgJ3BpbmlhJ11dIH0sXHJcbiAgICAgICAgeyBucHJvZ3Jlc3M6IFtbJ2RlZmF1bHQnLCAnbnByb2dyZXNzJ11dIH0sXHJcbiAgICAgICAgeyAnYmlnLmpzJzogW1snZGVmYXVsdCcsICdCaWcnXV0gfSxcclxuICAgICAgICB7IGVjaGFydHM6IFtbJyonLCAnZUNoYXJ0cyddXSB9LFxyXG4gICAgICAgIHsgJ2QzLWdlbyc6IFtbJyonLCAnZDMnXV0gfSxcclxuICAgICAgICB7ICdAYW1hcC9hbWFwLWpzYXBpLWxvYWRlcic6IFtbJ2RlZmF1bHQnLCAnQU1hcExvYWRlciddXSB9LFxyXG4gICAgICAgIHsgJ2pzLW1kNSc6IFtbJ2RlZmF1bHQnLCAnbWQ1J11dIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIGR0czogJ3NyYy9hdXRvLWltcG9ydHMuZC50cycsXHJcbiAgICAgIGRpcnM6IFsnc3JjL2NvbXBvc2FibGVzJywgJ3NyYy9zdG9yZScsICdzcmMvdXRpbHMnLCAnc3JjL2FwaSddLFxyXG4gICAgICB2dWVUZW1wbGF0ZTogdHJ1ZSxcclxuICAgICAgcmVzb2x2ZXJzOiBbSWNvbnNSZXNvbHZlcih7IHByZWZpeDogJ0ljb24nIH0pLCBFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG4gICAgfSksXHJcbiAgICBjcmVhdGVTdHlsZUltcG9ydFBsdWdpbih7XHJcbiAgICAgIHJlc29sdmVzOiBbRWxlbWVudFBsdXNSZXNvbHZlKCldLFxyXG4gICAgICBsaWJzOiBbe1xyXG4gICAgICAgIGxpYnJhcnlOYW1lOiAnZWxlbWVudC1wbHVzJyxcclxuICAgICAgICBlc01vZHVsZTogdHJ1ZSxcclxuICAgICAgICByZXNvbHZlU3R5bGU6IChuYW1lOiBzdHJpbmcpID0+IHsgcmV0dXJuIGBlbGVtZW50LXBsdXMvdGhlbWUtY2hhbGsvJHtuYW1lfS5jc3NgIH0sXHJcbiAgICAgIH1dLFxyXG4gICAgfSksXHJcbiAgICBDb21wb25lbnRzKHtcclxuICAgICAgZXh0ZW5zaW9uczogWyd2dWUnLCAnbWQnXSxcclxuICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS8sIC9cXC5tZCQvXSxcclxuICAgICAgZHRzOiAnc3JjL2NvbXBvbmVudHMuZC50cycsXHJcbiAgICAgIHJlc29sdmVyczogW0ljb25zUmVzb2x2ZXIoeyBlbmFibGVkQ29sbGVjdGlvbnM6IFsnZXAnXSB9KSwgRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcclxuICAgIH0pLFxyXG5cclxuICAgIFVub0NzcygpLFxyXG4gICAgVml0ZVBXQSh7XHJcbiAgICAgIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxyXG4gICAgICBpbmNsdWRlQXNzZXRzOiBbJ2Zhdmljb24uc3ZnJywgJ3NhZmFyaS1waW5uZWQtdGFiLnN2ZyddLFxyXG4gICAgICBtYW5pZmVzdDoge1xyXG4gICAgICAgIG5hbWU6ICdWaXRlc3NlJyxcclxuICAgICAgICBzaG9ydF9uYW1lOiAnVml0ZXNzZScsXHJcbiAgICAgICAgdGhlbWVfY29sb3I6ICcjZmZmZmZmJyxcclxuICAgICAgICBpY29uczogW1xyXG4gICAgICAgICAgeyBzcmM6ICcvcHdhLTE5MngxOTIucG5nJywgZGFyazogJzE5MngxOTInLCB0eXBlOiAnaW1hZ2UvcG5nJyB9LFxyXG4gICAgICAgICAgeyBzcmM6ICcvcHdhLTUxMng1MTIucG5nJywgc2l6ZXM6ICc1MTJ4NTEyJywgdHlwZTogJ2ltYWdlL3BuZycgfSxcclxuICAgICAgICAgIHsgc3JjOiAnL3B3YS01MTJ4NTEyLnBuZycsIHNpemVzOiAnNTEyeDUxMicsIHR5cGU6ICdpbWFnZS9wbmcnLCBwdXJwb3NlOiAnYW55IG1hc2thYmxlJyB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuXHJcbiAgICBWdWVJMThuKHtcclxuICAgICAgcnVudGltZU9ubHk6IHRydWUsXHJcbiAgICAgIGNvbXBvc2l0aW9uT25seTogdHJ1ZSxcclxuICAgICAgaW5jbHVkZTogW3BhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdsb2NhbGVzLyoqJyldLFxyXG4gICAgfSksXHJcblxyXG4gICAgSWNvbnMoe1xyXG4gICAgICBjb21waWxlcjogJ3Z1ZTMnLFxyXG4gICAgICBhdXRvSW5zdGFsbDogdHJ1ZSxcclxuICAgIH0pLFxyXG5cclxuICAgIEluc3BlY3QoKSxcclxuICBdLFxyXG4gIGVzYnVpbGQ6IHtcclxuICAgIGxvZ092ZXJyaWRlOiB7ICd0aGlzLWlzLXVuZGVmaW5lZC1pbi1lc20nOiAnc2lsZW50JyB9LFxyXG4gIH0sXHJcblxyXG4gIHNzZ09wdGlvbnM6IHtcclxuICAgIHNjcmlwdDogJ2FzeW5jJyxcclxuICAgIGZvcm1hdHRpbmc6ICdtaW5pZnknLFxyXG4gICAgb25GaW5pc2hlZCgpIHsgZ2VuZXJhdGVTaXRlbWFwKCkgfSxcclxuICB9LFxyXG5cclxuICB0ZXN0OiB7XHJcbiAgICBpbmNsdWRlOiBbJ3Rlc3QvKiovKi50ZXN0LnRzJ10sXHJcbiAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcclxuICAgIGRlcHM6IHsgaW5saW5lOiBbJ0B2dWUnLCAnQHZ1ZXVzZScsICd2dWUtZGVtaSddIH0sXHJcbiAgfSxcclxuXHJcbiAgY3NzOiB7XHJcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7fSxcclxuICAgIHBvc3Rjc3M6IHtcclxuICAgICAgcGx1Z2luczogW2xvYWRlcl9weFRvUmVtLCBsb2FkZXJfYXV0b1ByZUZpeGVyXSxcclxuICAgIH0sXHJcbiAgfSxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2UCxPQUFPLFVBQVU7QUFDOVEsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUNsQixPQUFPLHFCQUFxQjtBQUM1QixPQUFPLGFBQWE7QUFDcEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxhQUFhO0FBQ3BCLFNBQVMsZUFBZTtBQUN4QixPQUFPLGFBQWE7QUFDcEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sV0FBVztBQUNsQixTQUFTLDJCQUEyQjtBQUNwQyxPQUFPLGFBQWE7QUFDcEIsT0FBTyxrQkFBa0I7QUFDekIsU0FBUyxvQkFBb0IsK0JBQStCO0FBakI1RCxJQUFNLG1DQUFtQztBQW9CekMsSUFBTSxpQkFBaUIs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
