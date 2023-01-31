// vite.config.ts
import path from "path";
import Vue from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/@vitejs+plugin-vue@4.0.0_vite@4.0.4+vue@3.2.45/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { defineConfig } from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/vite@4.0.4_ovmyjmuuyckt3r3gpaexj2onji/node_modules/vite/dist/node/index.js";
import Pages from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/vite-plugin-pages@0.28.0_vite@4.0.4/node_modules/vite-plugin-pages/dist/index.mjs";
import generateSitemap from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/vite-ssg-sitemap@0.4.3/node_modules/vite-ssg-sitemap/dist/index.js";
import VueI18n from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/@intlify+vite-plugin-vue-i18n@7.0.0_vite@4.0.4+vue-i18n@9.2.2/node_modules/@intlify/vite-plugin-vue-i18n/lib/index.mjs";
import AutoImport from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/unplugin-auto-import@0.12.1_rollup@3.9.1/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/unplugin-vue-components@0.22.12_rollup@3.9.1+vue@3.2.45/node_modules/unplugin-vue-components/dist/vite.mjs";
import Inspect from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/vite-plugin-inspect@0.7.14_rollup@3.9.1+vite@4.0.4/node_modules/vite-plugin-inspect/dist/index.mjs";
import { VitePWA } from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/vite-plugin-pwa@0.14.1_vite@4.0.4/node_modules/vite-plugin-pwa/dist/index.mjs";
import Layouts from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/vite-plugin-vue-layouts@0.7.0_oh6kquo6biweymmreht6aj34oy/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import UnoCss from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/unocss@0.48.3_rollup@3.9.1+vite@4.0.4/node_modules/unocss/dist/vite.mjs";
import IconsResolver from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/unplugin-icons@0.15.1/node_modules/unplugin-icons/dist/resolver.mjs";
import Icons from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/unplugin-icons@0.15.1/node_modules/unplugin-icons/dist/vite.mjs";
import { ElementPlusResolver } from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/unplugin-vue-components@0.22.12_rollup@3.9.1+vue@3.2.45/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import pxToRem from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/postcss-pxtorem@6.0.0_postcss@8.4.21/node_modules/postcss-pxtorem/index.js";
import autoPreFixer from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/autoprefixer@10.4.13_postcss@8.4.21/node_modules/autoprefixer/lib/autoprefixer.js";
import { Plugin as importToCDN } from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/vite-plugin-cdn-import@0.3.5_rollup@3.9.1/node_modules/vite-plugin-cdn-import/dist/index.js";
import { ElementPlusResolve, createStyleImportPlugin } from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/vite-plugin-style-import@2.0.0_vite@4.0.4/node_modules/vite-plugin-style-import/dist/index.mjs";
import VueMacros from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/unplugin-vue-macros@1.3.2_7invlevlc6zjqi6fsizpsyazqy/node_modules/unplugin-vue-macros/dist/vite.mjs";
var __vite_injected_original_dirname = "D:\\WorkSpace\\Private-Abernethy\\big-screen";
var loader_pxToRem = pxToRem({ rootValue: 37.5, unitPrecision: 2, propList: ["*"], exclude: /(node_module)/, selectorBlackList: [], mediaQuery: true, minPixelValue: 1 });
var loader_autoPreFixer = autoPreFixer({ overrideBrowserslist: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 8", "last 10 versions"], grid: true });
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__vite_injected_original_dirname, "src")}/`
    }
  },
  server: {
    host: "localhost",
    cors: true,
    open: true,
    hmr: true
  },
  plugins: [
    VueMacros({
      plugins: {
        vue: Vue({ include: [/\.vue$/, /\.md$/], reactivityTransform: true })
      }
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
        "pinia",
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
        { animejs: [["default", "anime"]] },
        { mitt: [["default", "mitt"]] }
      ],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/composables", "src/store", "src/utils", "src/api", "src/model", "src/router", "src/components"],
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
      resolvers: [IconsResolver({}), ElementPlusResolver()]
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
    Inspect(),
    // WxLogin
    importToCDN({
      modules: [{
        name: "WxLogin",
        var: "WxLogin",
        path: "http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"
      }]
    })
  ],
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
    preprocessorOptions: {
      scss: { additionalData: "@import '~/assets/scss/mixin.scss';" }
    },
    postcss: {
      plugins: [loader_pxToRem, loader_autoPreFixer]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxXb3JrU3BhY2VcXFxcUHJpdmF0ZS1BYmVybmV0aHlcXFxcYmlnLXNjcmVlblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcV29ya1NwYWNlXFxcXFByaXZhdGUtQWJlcm5ldGh5XFxcXGJpZy1zY3JlZW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1dvcmtTcGFjZS9Qcml2YXRlLUFiZXJuZXRoeS9iaWctc2NyZWVuL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IFZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCBQYWdlcyBmcm9tICd2aXRlLXBsdWdpbi1wYWdlcydcclxuaW1wb3J0IGdlbmVyYXRlU2l0ZW1hcCBmcm9tICd2aXRlLXNzZy1zaXRlbWFwJ1xyXG5pbXBvcnQgVnVlSTE4biBmcm9tICdAaW50bGlmeS92aXRlLXBsdWdpbi12dWUtaTE4bidcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IEluc3BlY3QgZnJvbSAndml0ZS1wbHVnaW4taW5zcGVjdCdcclxuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSdcclxuaW1wb3J0IExheW91dHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWxheW91dHMnXHJcbmltcG9ydCBVbm9Dc3MgZnJvbSAndW5vY3NzL3ZpdGUnXHJcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gJ3VucGx1Z2luLWljb25zL3Jlc29sdmVyJ1xyXG5pbXBvcnQgSWNvbnMgZnJvbSAndW5wbHVnaW4taWNvbnMvdml0ZSdcclxuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcclxuaW1wb3J0IHB4VG9SZW0gZnJvbSAncG9zdGNzcy1weHRvcmVtJ1xyXG5pbXBvcnQgYXV0b1ByZUZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcidcclxuaW1wb3J0IHsgUGx1Z2luIGFzIGltcG9ydFRvQ0ROIH0gZnJvbSAndml0ZS1wbHVnaW4tY2RuLWltcG9ydCdcclxuLy8gaW1wb3J0IGV4dGVybmFsR2xvYmFscyBmcm9tICdyb2xsdXAtcGx1Z2luLWV4dGVybmFsLWdsb2JhbHMnXHJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZSwgY3JlYXRlU3R5bGVJbXBvcnRQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdHlsZS1pbXBvcnQnXHJcbmltcG9ydCBWdWVNYWNyb3MgZnJvbSAndW5wbHVnaW4tdnVlLW1hY3Jvcy92aXRlJ1xyXG5jb25zdCBsb2FkZXJfcHhUb1JlbSA9IHB4VG9SZW0oeyByb290VmFsdWU6IDM3LjUsIHVuaXRQcmVjaXNpb246IDIsIHByb3BMaXN0OiBbJyonXSwgZXhjbHVkZTogLyhub2RlX21vZHVsZSkvLCBzZWxlY3RvckJsYWNrTGlzdDogW10sIG1lZGlhUXVlcnk6IHRydWUsIG1pblBpeGVsVmFsdWU6IDEgfSlcclxuY29uc3QgbG9hZGVyX2F1dG9QcmVGaXhlciA9IGF1dG9QcmVGaXhlcih7IG92ZXJyaWRlQnJvd3NlcnNsaXN0OiBbJ0FuZHJvaWQgNC4xJywgJ2lPUyA3LjEnLCAnQ2hyb21lID4gMzEnLCAnZmYgPiAzMScsICdpZSA+PSA4JywgJ2xhc3QgMTAgdmVyc2lvbnMnXSwgZ3JpZDogdHJ1ZSB9KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnfi8nOiBgJHtwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyl9L2AsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogJ2xvY2FsaG9zdCcsXHJcbiAgICBjb3JzOiB0cnVlLFxyXG4gICAgb3BlbjogdHJ1ZSxcclxuICAgIGhtcjogdHJ1ZSxcclxuICB9LFxyXG5cclxuICBwbHVnaW5zOiBbXHJcblxyXG4gICAgVnVlTWFjcm9zKHtcclxuICAgICAgcGx1Z2luczoge1xyXG4gICAgICAgIHZ1ZTogVnVlKHsgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLm1kJC9dLCByZWFjdGl2aXR5VHJhbnNmb3JtOiB0cnVlIH0pLFxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcblxyXG4gICAgUGFnZXMoeyBleHRlbnNpb25zOiBbJ3Z1ZSddLCBleGNsdWRlOiBbJyoqL2NvbXBvbmVudHMvKi52dWUnXSB9KSxcclxuICAgIExheW91dHMoe1xyXG4gICAgICBsYXlvdXRzRGlyczogJ3NyYy9sYXlvdXRzJyxcclxuICAgICAgZGVmYXVsdExheW91dDogJ3NjcmVlbicsXHJcbiAgICB9KSxcclxuXHJcbiAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgaW1wb3J0czogWyd2dWUnLCAndnVlLXJvdXRlcicsICd2dWUtaTE4bicsICd2dWUvbWFjcm9zJywgJ0B2dWV1c2UvaGVhZCcsICdAdnVldXNlL2NvcmUnLCAncGluaWEnLFxyXG4gICAgICAgIHsgYXhpb3M6IFtbJ2RlZmF1bHQnLCAnYXhpb3MnXV0gfSxcclxuICAgICAgICB7IGNvbnNvbGE6IFtbJ2RlZmF1bHQnLCAnY29uc29sYSddXSB9LFxyXG4gICAgICAgIHsgJ2F4aW9zLW1hcHBlcic6IFtbJ2RlZmF1bHQnLCAnSHR0cENsaWVudCddXSB9LFxyXG4gICAgICAgIHsgcGluaWE6IFtbJ2RlZmF1bHQnLCAncGluaWEnXV0gfSxcclxuICAgICAgICB7IG5wcm9ncmVzczogW1snZGVmYXVsdCcsICducHJvZ3Jlc3MnXV0gfSxcclxuICAgICAgICB7ICdiaWcuanMnOiBbWydkZWZhdWx0JywgJ0JpZyddXSB9LFxyXG4gICAgICAgIHsgZWNoYXJ0czogW1snKicsICdlQ2hhcnRzJ11dIH0sXHJcbiAgICAgICAgeyAnZDMtZ2VvJzogW1snKicsICdkMyddXSB9LFxyXG4gICAgICAgIHsgJ0BhbWFwL2FtYXAtanNhcGktbG9hZGVyJzogW1snZGVmYXVsdCcsICdBTWFwTG9hZGVyJ11dIH0sXHJcbiAgICAgICAgeyAnanMtbWQ1JzogW1snZGVmYXVsdCcsICdtZDUnXV0gfSxcclxuICAgICAgICB7IGFuaW1lanM6IFtbJ2RlZmF1bHQnLCAnYW5pbWUnXV0gfSxcclxuICAgICAgICB7IG1pdHQ6IFtbJ2RlZmF1bHQnLCAnbWl0dCddXSB9LFxyXG4gICAgICBdLFxyXG4gICAgICBkdHM6ICdzcmMvYXV0by1pbXBvcnRzLmQudHMnLFxyXG4gICAgICBkaXJzOiBbJ3NyYy9jb21wb3NhYmxlcycsICdzcmMvc3RvcmUnLCAnc3JjL3V0aWxzJywgJ3NyYy9hcGknLCAnc3JjL21vZGVsJywgJ3NyYy9yb3V0ZXInLCAnc3JjL2NvbXBvbmVudHMnXSxcclxuICAgICAgdnVlVGVtcGxhdGU6IHRydWUsXHJcbiAgICAgIHJlc29sdmVyczogW0ljb25zUmVzb2x2ZXIoeyBwcmVmaXg6ICdJY29uJyB9KSwgRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcclxuICAgIH0pLFxyXG4gICAgY3JlYXRlU3R5bGVJbXBvcnRQbHVnaW4oe1xyXG4gICAgICByZXNvbHZlczogW0VsZW1lbnRQbHVzUmVzb2x2ZSgpXSxcclxuICAgICAgbGliczogW3tcclxuICAgICAgICBsaWJyYXJ5TmFtZTogJ2VsZW1lbnQtcGx1cycsXHJcbiAgICAgICAgZXNNb2R1bGU6IHRydWUsXHJcbiAgICAgICAgcmVzb2x2ZVN0eWxlOiAobmFtZTogc3RyaW5nKSA9PiB7IHJldHVybiBgZWxlbWVudC1wbHVzL3RoZW1lLWNoYWxrLyR7bmFtZX0uY3NzYCB9LFxyXG4gICAgICB9XSxcclxuICAgIH0pLFxyXG4gICAgQ29tcG9uZW50cyh7XHJcbiAgICAgIGV4dGVuc2lvbnM6IFsndnVlJywgJ21kJ10sXHJcbiAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC52dWVcXD92dWUvLCAvXFwubWQkL10sXHJcbiAgICAgIGR0czogJ3NyYy9jb21wb25lbnRzLmQudHMnLFxyXG4gICAgICByZXNvbHZlcnM6IFtJY29uc1Jlc29sdmVyKHsgfSksIEVsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXHJcbiAgICB9KSxcclxuXHJcbiAgICBVbm9Dc3MoKSxcclxuICAgIFZpdGVQV0Eoe1xyXG4gICAgICByZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcclxuICAgICAgaW5jbHVkZUFzc2V0czogWydmYXZpY29uLnN2ZycsICdzYWZhcmktcGlubmVkLXRhYi5zdmcnXSxcclxuICAgICAgbWFuaWZlc3Q6IHtcclxuICAgICAgICBuYW1lOiAnVml0ZXNzZScsXHJcbiAgICAgICAgc2hvcnRfbmFtZTogJ1ZpdGVzc2UnLFxyXG4gICAgICAgIHRoZW1lX2NvbG9yOiAnI2ZmZmZmZicsXHJcbiAgICAgICAgaWNvbnM6IFtcclxuICAgICAgICAgIHsgc3JjOiAnL3B3YS0xOTJ4MTkyLnBuZycsIGRhcms6ICcxOTJ4MTkyJywgdHlwZTogJ2ltYWdlL3BuZycgfSxcclxuICAgICAgICAgIHsgc3JjOiAnL3B3YS01MTJ4NTEyLnBuZycsIHNpemVzOiAnNTEyeDUxMicsIHR5cGU6ICdpbWFnZS9wbmcnIH0sXHJcbiAgICAgICAgICB7IHNyYzogJy9wd2EtNTEyeDUxMi5wbmcnLCBzaXplczogJzUxMng1MTInLCB0eXBlOiAnaW1hZ2UvcG5nJywgcHVycG9zZTogJ2FueSBtYXNrYWJsZScgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcblxyXG4gICAgVnVlSTE4bih7XHJcbiAgICAgIHJ1bnRpbWVPbmx5OiB0cnVlLFxyXG4gICAgICBjb21wb3NpdGlvbk9ubHk6IHRydWUsXHJcbiAgICAgIGluY2x1ZGU6IFtwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnbG9jYWxlcy8qKicpXSxcclxuICAgIH0pLFxyXG5cclxuICAgIEljb25zKHtcclxuICAgICAgY29tcGlsZXI6ICd2dWUzJyxcclxuICAgICAgYXV0b0luc3RhbGw6IHRydWUsXHJcbiAgICB9KSxcclxuXHJcbiAgICBJbnNwZWN0KCksXHJcbiAgICAvLyBXeExvZ2luXHJcbiAgICBpbXBvcnRUb0NETih7XHJcbiAgICAgIG1vZHVsZXM6IFt7XHJcbiAgICAgICAgbmFtZTogJ1d4TG9naW4nLFxyXG4gICAgICAgIHZhcjogJ1d4TG9naW4nLFxyXG4gICAgICAgIHBhdGg6ICdodHRwOi8vcmVzLnd4LnFxLmNvbS9jb25uZWN0L3poX0NOL2h0bWxlZGl0aW9uL2pzL3d4TG9naW4uanMnLFxyXG4gICAgICB9XSxcclxuICAgIH0pLFxyXG4gIF0sXHJcblxyXG4gIHNzZ09wdGlvbnM6IHtcclxuICAgIHNjcmlwdDogJ2FzeW5jJyxcclxuICAgIGZvcm1hdHRpbmc6ICdtaW5pZnknLFxyXG4gICAgb25GaW5pc2hlZCgpIHsgZ2VuZXJhdGVTaXRlbWFwKCkgfSxcclxuICB9LFxyXG5cclxuICB0ZXN0OiB7XHJcbiAgICBpbmNsdWRlOiBbJ3Rlc3QvKiovKi50ZXN0LnRzJ10sXHJcbiAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcclxuICAgIGRlcHM6IHsgaW5saW5lOiBbJ0B2dWUnLCAnQHZ1ZXVzZScsICd2dWUtZGVtaSddIH0sXHJcbiAgfSxcclxuXHJcbiAgY3NzOiB7XHJcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgIHNjc3M6IHsgYWRkaXRpb25hbERhdGE6ICdAaW1wb3J0IFxcJ34vYXNzZXRzL3Njc3MvbWl4aW4uc2Nzc1xcJzsnIH0sXHJcbiAgICB9LFxyXG4gICAgcG9zdGNzczoge1xyXG4gICAgICBwbHVnaW5zOiBbbG9hZGVyX3B4VG9SZW0sIGxvYWRlcl9hdXRvUHJlRml4ZXJdLFxyXG4gICAgfSxcclxuICB9LFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFULE9BQU8sVUFBVTtBQUN0VSxPQUFPLFNBQVM7QUFDaEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxXQUFXO0FBQ2xCLE9BQU8scUJBQXFCO0FBQzVCLE9BQU8sYUFBYTtBQUNwQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGFBQWE7QUFDcEIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sYUFBYTtBQUNwQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsMkJBQTJCO0FBQ3BDLE9BQU8sYUFBYTtBQUNwQixPQUFPLGtCQUFrQjtBQUN6QixTQUFTLFVBQVUsbUJBQW1CO0FBRXRDLFNBQVMsb0JBQW9CLCtCQUErQjtBQUM1RCxPQUFPLGVBQWU7QUFwQnRCLElBQU0sbUNBQW1DO0FBcUJ6QyxJQUFNLGlCQUFpQixRQUFRLEVBQUUsV0FBVyxNQUFNLGVBQWUsR0FBRyxVQUFVLENBQUMsR0FBRyxHQUFHLFNBQVMsaUJBQWlCLG1CQUFtQixDQUFDLEdBQUcsWUFBWSxNQUFNLGVBQWUsRUFBRSxDQUFDO0FBQzFLLElBQU0sc0JBQXNCLGFBQWEsRUFBRSxzQkFBc0IsQ0FBQyxlQUFlLFdBQVcsZUFBZSxXQUFXLFdBQVcsa0JBQWtCLEdBQUcsTUFBTSxLQUFLLENBQUM7QUFFbEssSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsTUFBTSxHQUFHLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDeEM7QUFBQSxFQUNGO0FBQUEsRUFFQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixLQUFLO0FB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
